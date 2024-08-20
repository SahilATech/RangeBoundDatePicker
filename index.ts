import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";

export class RangeBoundDatePicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    private _minDate:Date =new Date();
    private _maxDate:Date=new Date();
    
    private _selectedDate:Date;
    private _newSelectedDate: Date | null = null;
    private _uniqueKey:string;
    private _allowTextInput:boolean;
    private _showMonthPickerAsOverlay:boolean;
    private _showWeekNumbers:boolean;
    private _isRequired:boolean;
    private _disableDays:number[]=[];
    private _restrictedDates:Date[]=[];

    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._selectedDate = context.parameters.DateAndTime.raw!;
        this._uniqueKey = context.parameters.DateAndTime.attributes?.LogicalName ?? "";

        this._allowTextInput = context.parameters.allowTextInput.raw;
        this._showMonthPickerAsOverlay = context.parameters.showMonthPickerAsOverlay.raw;
        this._showWeekNumbers = context.parameters.showWeekNumbers.raw;
        this._isRequired = context.parameters.isRequired.raw;

        //Specific Duration
        if(context.parameters.dateRangeSelector.raw == '0'){             
            this._minDate = this.dateConverter(context.parameters.minDate.raw!);        
            this._maxDate = this.dateConverter(context.parameters.maxDate.raw!);
        }
        //Flexible Time Frame
        else if(context.parameters.dateRangeSelector.raw == '1'){
            this._minDate = this.dateConverter(context.parameters.pastTimeFrame.raw!,"past");        
            this._maxDate = this.dateConverter(context.parameters.futureTimeFrame.raw!,"future");          
        }

        if(context.parameters.disableDays.raw == '6')
            this._disableDays=[6]; //saturdays
        else if(context.parameters.disableDays.raw =='0')
            this._disableDays=[0]; //Sundays
        else if(context.parameters.disableDays.raw == '7')
            this._disableDays=[0,6];//saturdays & Sundays
        else 
            this._disableDays=[];

        this._restrictedDates = this.disabledDatesParse(context.parameters.disabledDates.raw!)
    }

    private disabledDatesParse (listDates:string){
        try {
            if(!listDates) return [];

            const dates: Date[] =  listDates.split(',').map(dateStr => dateStr.trim()).filter(dateStr => dateStr.length == 10)
            .map(dateStr => new Date(dateStr)).filter(date => !isNaN(date.getTime()));

            return dates;
            
        } catch (error) {
            return [];
        }
    }

    private dateConverter(date:string, duration:string="" ){
        try {
            // normal date
            if(duration=="")
                return new Date(date);  
            //durations
            else if(duration!==""){
                // Split the duration string by '.' and convert to numbers
                const [yearsStr, monthsStr, daysStr] = date.split('.').map(part => part.trim());

                // Convert strings to numbers and provide default values for missing parts
                const years = this.isValidNumber(yearsStr) ? Number(yearsStr) : 0;
                const months = this.isValidNumber(monthsStr) ? Number(monthsStr) : 0;
                const days = this.isValidNumber(daysStr) ? Number(daysStr) : 0;

                const todays = new Date();  
                
                if(duration=="future"){
                    todays.setFullYear(todays.getFullYear() + years);    
                    todays.setMonth(todays.getMonth() + months);
                    todays.setDate(todays.getDate() + days);   
                }
                else if(duration=="past"){
                    todays.setFullYear(todays.getFullYear() - years);    
                    todays.setMonth(todays.getMonth() - months);
                    todays.setDate(todays.getDate() - days);
                }         
                return todays;
            }               
            else return new Date();       
        } catch (error) {
            console.log(error);
            return new Date();
        }
    }

    private isValidNumber(value: string): boolean {
        const num = Number(value);
        return !isNaN(num) && isFinite(num);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IHelloWorldProps = {
            minDate: this._minDate,
            maxDate:this._maxDate,
            selectedDate:this._selectedDate,
            onSelectDate: this.onDateSelectChange,
            uniqueKey: this._uniqueKey,
            allowTextInput : this._allowTextInput,
            showMonthPickerAsOverlay : this._showMonthPickerAsOverlay ,
            showWeekNumbers : this._showWeekNumbers ,
            isRequired : this._isRequired,
            disableDays:this._disableDays,
            restrictedDates:this._restrictedDates
        };
        return React.createElement(
            HelloWorld, props
        );
    }

    private onDateSelectChange = (newValue: Date | null | undefined) => {
        this._newSelectedDate = newValue ?? null;
        this.notifyOutputChanged();
    };

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
            DateAndTime: this._newSelectedDate ?? undefined
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
