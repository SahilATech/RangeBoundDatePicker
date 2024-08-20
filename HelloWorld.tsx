import * as React from 'react';
import { DatePicker, DefaultButton, defaultCalendarStrings, defaultDatePickerStrings, IDatePickerStrings, IDatePickerStyles, mergeStyleSets } from '@fluentui/react';

export interface IHelloWorldProps {
  minDate: Date;
  maxDate: Date;
  selectedDate?: Date;
  onSelectDate: (newValue: Date | null | undefined) => void;
  uniqueKey:string;
  allowTextInput : boolean;
  showMonthPickerAsOverlay  : boolean;
  showWeekNumbers  : boolean;
  isRequired  : boolean;
}

interface IHelloWorldState {
  minDate: Date;
  maxDate: Date;
  initialSelectedDate?:Date;
  currentSelectedDate?:Date | null | undefined
}

export class HelloWorld extends React.Component<IHelloWorldProps,IHelloWorldState> {

  constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {
      minDate: props.minDate,
      maxDate : props.maxDate,
      initialSelectedDate : props.selectedDate,
      currentSelectedDate : props.selectedDate
    };
     // Attach methods and state to the global window object
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     (window as any)[`pcfCalendarControl_${props.uniqueKey}`] = {  
      DateRange: this.DateRange
    };

    this.updateSelectedDate = this.updateSelectedDate.bind(this);
  }

  private DateRange = (minDate: Date, maxDate: Date) => {
    this.setState({ minDate, maxDate });
  };

  private getDatePickerStrings(): IDatePickerStrings {
    return {
      ...defaultDatePickerStrings,
      isOutOfBoundsErrorMessage: `Date must be between ${this.state.minDate.toLocaleDateString()} and ${this.state.maxDate.toLocaleDateString()}`,
    };
  }

  private updateSelectedDate(newValue: Date | null | undefined){
    this.props.onSelectDate(newValue);    
    this.setState({ currentSelectedDate: newValue ?? null });
  }

  
  private resetDatePicker = () => {
      this.setState({ currentSelectedDate : this.state.initialSelectedDate});
      this.props.onSelectDate(this.state.initialSelectedDate);
  };

  public render(): React.ReactNode {
    return (
      <>
        <div className={styles.container}>
          <DatePicker
            className={styles.datePicker}
            placeholder="Select a date..."
            ariaLabel="Select a date"
            strings={this.getDatePickerStrings()}
            minDate={this.state.minDate}
            maxDate={this.state.maxDate}            
            onSelectDate={this.updateSelectedDate}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            value={this.state.currentSelectedDate??undefined}
            showGoToToday={true}                        
            highlightSelectedMonth={true}

            allowTextInput={this.props.allowTextInput}
            showMonthPickerAsOverlay={this.props.showMonthPickerAsOverlay}
            showWeekNumbers={this.props.showWeekNumbers}
            isRequired={this.props.isRequired}
          />    
          <DefaultButton
            id={"DefaultButton"}
            onClick={this.resetDatePicker}
            text={"Revert"}
          />      
        </div>
      </>
    );
  }
}


const styles = mergeStyleSets({
  container: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '10px', // Adjust space between DatePicker and button
    minWidth: '-webkit-fill-available',
  },
  datePicker: {
    flexGrow: 1, // Allows DatePicker to take available space
  }
});
