# RangeBoundDatePicker

**RangeBoundDatePicker** is a versatile custom control crafted for PowerApps Component Framework (PCF) that simplifies date selection and validation. In the world of Dynamics 365 CRM, managing date ranges and applying constraints can be complex. Whether you need to:

- Ensure users select dates within a specific range
- Avoid weekends
- Exclude certain dates

Traditionally, implementing these validations requires extensive coding and custom logic. With **RangeBoundDatePicker**, these challenges become effortless.

This innovative control offers a dynamic and user-friendly solution for enforcing date constraints directly within your application. By leveraging this control, you can easily configure:

- **Custom Date Ranges**: Define precise start and end dates, or set flexible boundaries that adjust based on today's date.
- **Day Exclusions**: Automatically disable weekends or specific days, ensuring that users only select valid dates.
- **Dynamic Date Adjustments**: Customize past and future date ranges dynamically to fit your application’s needs.

Gone are the days of writing intricate validation code. **RangeBoundDatePicker** streamlines the process, offering a configurable and intuitive interface that enhances user experience while ensuring data integrity. Transform how you handle date selections with this robust and adaptable control.



https://github.com/user-attachments/assets/c9a3078e-9193-4782-9682-6510fd61f2f8


[Managed Solution](https://github.com/SahilATech/RangeBoundDatePicker/raw/39f312625ecb9b0588153b1cad27452bb0ed8d51/Solutions/Solutions_managed.zip)


## Features

- **Date and Time Selection**: Enables users to select dates with customizable constraints.
- **Range Configuration**: Choose between a specific duration or a flexible time frame for date selection.
- **Dynamic Date Ranges**: Configure past and future durations relative to the current date.
- **Disabled Days**: Disable specific days or dates in the calendar.
- **Text Input**: Optionally allow users to enter dates manually.
- **Month Picker Overlay**: Show the month picker as an overlay on the date picker.
- **Week Numbers**: Optionally display week numbers in the calendar.


## Key Properties
- **`DateAndTime`**: Bound property for synchronizing field values with the control.
- **`Range Configuration`**: Specifies whether to use a specific duration or flexible time frame for date selection.
- **`Minimum Date (YYYY-MM-DD)`**: Minimum date allowed for selection.
- **`Maximum Date (YYYY-MM-DD)`**: Maximum date allowed for selection.
- **`Past Duration (Year.Month.Day)`**: Specifies the past duration from today (Year.Month.Day) to adjust the range dynamically.
- **`Future Duration (Year.Month.Day)`**: Specifies the future duration from today (Year.Month.Day) to adjust the range dynamically.
- **`Disable Days`**: These are days to disable in the calendar (e.g., weekends, specific days).
- **`Disabled Dates (YYYY-MM-DD)`**: Comma-separated list of specific dates to disable.
- **`Allow Text Input`**: Determines if manual text input for dates is allowed.
- **`Show Month Picker As Overlay`**: Shows the month picker as an overlay on the date picker.
- **`Show Week Numbers`**: Indicates whether to display week numbers in the calendar.
- **`Is Required`**: Specifies if the date selection is required.

![RangeBoundDatePicker](https://github.com/SahilATech/RangeBoundDatePicker/blob/b43fe4819bd939b6c0067056861b1ae0e245e0ec/Images/DatePickerProperties_1.png)

![RangeBoundDatePicker](https://github.com/SahilATech/RangeBoundDatePicker/blob/b43fe4819bd939b6c0067056861b1ae0e245e0ec/Images/DatePickerProperties_2.png)


## Customization

- **Function Overrides**: Customize the RangeBoundDatePicker control’s behavior using the provided functions. The control exposes methods through the global **`pcfDateControl_{logicalNameofField}`** object, allowing you to adapt its functionality to your specific needs:

   - **dateRange(minDate: Date, maxDate: Date)** : Use this method to update the `minimum` and `maximum` date boundaries for the control. Pass `minDate` and `maxDate` as Date objects to configure the date range, and call this method during the form’s `onLoad` event to set the boundaries dynamically.
   - **restrictedDates(dates: Date[])**: This method enables you to specify dates that should be restricted or disabled within the control. By passing an array of Date objects, the control will normalize these `dates` and apply the restrictions accordingly. You can dynamically set or update these restricted dates during runtime, for instance, on the form’s `onLoad` event.

- **global Object - pcfDateControl_{logicalNameofField} (in screenshot sa_dateonly)**

![OverrideFunction](https://github.com/SahilATech/RangeBoundDatePicker/blob/b43fe4819bd939b6c0067056861b1ae0e245e0ec/Images/functionOverride.png)

**Update date range**

![OverrideFunctionExample](https://github.com/SahilATech/RangeBoundDatePicker/blob/b43fe4819bd939b6c0067056861b1ae0e245e0ec/Images/functionOverrideExample.png)


## Usage

The **RangeBoundDatePicker** control is ideal for scenarios where precise control over date selection is needed, including specifying past and future date ranges and handling specific constraints such as disabling certain dates or days. It is suitable for applications that require flexible and context-aware date-picking functionalities.

**Date Control**

![Dialog Open Button](https://github.com/SahilATech/RangeBoundDatePicker/blob/b43fe4819bd939b6c0067056861b1ae0e245e0ec/Images/DatePickerControl.png)
 
 **Date Control - Month Picker As Overlay**
 
![Dialog Box](https://github.com/SahilATech/RangeBoundDatePicker/blob/b43fe4819bd939b6c0067056861b1ae0e245e0ec/Images/DatePickerControl2.png)


[Managed Solution](https://github.com/SahilATech/RangeBoundDatePicker/raw/39f312625ecb9b0588153b1cad27452bb0ed8d51/Solutions/Solutions_managed.zip)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

You can adjust the sections and content as needed to fit your project's specifics and documentation style.

