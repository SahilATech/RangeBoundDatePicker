/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    DateAndTime: ComponentFramework.PropertyTypes.DateTimeProperty;
    dateRangeSelector: ComponentFramework.PropertyTypes.EnumProperty<"0" | "1">;
    minDate: ComponentFramework.PropertyTypes.StringProperty;
    maxDate: ComponentFramework.PropertyTypes.StringProperty;
    pastTimeFrame: ComponentFramework.PropertyTypes.StringProperty;
    futureTimeFrame: ComponentFramework.PropertyTypes.StringProperty;
    disableDays: ComponentFramework.PropertyTypes.EnumProperty<"-1" | "6" | "0" | "7">;
    disabledDates: ComponentFramework.PropertyTypes.StringProperty;
    allowTextInput: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    showMonthPickerAsOverlay: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    showWeekNumbers: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    isRequired: ComponentFramework.PropertyTypes.TwoOptionsProperty;
}
export interface IOutputs {
    DateAndTime?: Date;
}
