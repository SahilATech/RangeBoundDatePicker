/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    DateAndTime: ComponentFramework.PropertyTypes.DateTimeProperty;
    minDate: ComponentFramework.PropertyTypes.StringProperty;
    maxDate: ComponentFramework.PropertyTypes.StringProperty;
    pastTimeFrame: ComponentFramework.PropertyTypes.StringProperty;
    futureTimeFrame: ComponentFramework.PropertyTypes.StringProperty;
    dateRangeSelector: ComponentFramework.PropertyTypes.EnumProperty<"0" | "1">;
    allowTextInput: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    showMonthPickerAsOverlay: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    showWeekNumbers: ComponentFramework.PropertyTypes.TwoOptionsProperty;
    isRequired: ComponentFramework.PropertyTypes.TwoOptionsProperty;
}
export interface IOutputs {
    DateAndTime?: Date;
}
