import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";

export class RangeBoundDatePicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    private _minDate:string;
    private _maxDate:string;
    
    private _selectedDate:Date;
    private _newSelectedDate: Date | null = null;
    private _uniqueKey:string;
    private _allowTextInput:boolean;
    private _showMonthPickerAsOverlay:boolean;
    private _showWeekNumbers:boolean;
    private _isRequired:boolean;

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
        this._minDate = context.parameters.minDate.raw!;
        this._maxDate = context.parameters.maxDate.raw!;
        this._selectedDate = context.parameters.DateAndTime.raw!;
        this._uniqueKey = context.parameters.DateAndTime.attributes?.LogicalName ?? "";

        this._allowTextInput = context.parameters.allowTextInput.raw;
        this._showMonthPickerAsOverlay = context.parameters.showMonthPickerAsOverlay.raw;
        this._showWeekNumbers = context.parameters.showWeekNumbers.raw;
        this._isRequired = context.parameters.isRequired.raw;
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
            isRequired : this._isRequired
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
