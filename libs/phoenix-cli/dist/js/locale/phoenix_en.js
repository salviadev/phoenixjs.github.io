var Phoenix;
(function (Phoenix) {
    var en = {
        "layouts": {
            "design": {
                "Save": "Save",
                "New": "New page",
                "Open": { "title": "Open page", "open": "Open", "close": "Close" },
                "PageName": "Page Name",
                "InvalidPageName": "Invalid page name",
                "ConflictedPageName": "A page of that name exists, do you want to give another name ?",
                "Delete": "Delete page",
                "ConfirmDelete": "Are you sure you want to delete this page ?",
                "Preview": "Preview",
                "AuthoringMode": "Authoring",
                "layouts": "Blocks",
                "widgets": "Widgets",
                "fields": "Fields",
                "actions": "Actions"
            },
            "NoData": 'No data'
        },
        "schema": {
            "required": "{0} is required.",
            "minNumber": "{0} must be at least {1}",
            "maxNumber": "{0} cannot exceed {1}",
            "minNumberExclusive": "{0} must be greater than {1}",
            "maxNumberExclusive": "{0} must be less than {1}",
            "uniqueColumn": "The column '{0}' must be unique.",
            "uniqueColumns": "Duplicate value for columns '{0}' found.",
            "passwordMismatch": "Password mismatch.",
            "invalidEmail": "Invalid Email Address",
            "minLength": "{0} must be at least {1} characters"
        },
        "ui": {
            "Close": "Close",
            "Ok": "Ok",
            "Yes": "Yes",
            "No": "No",
            "Warning": "Warning",
            "Info": "Information",
            "Disconnect": "Disconnect",
            "Confirm": "Confirm",
            "Validate": "Validate",
            "password": {
                "oldPassword": "Old Password",
                "newPassword": "New Password",
                "change": "Change password"
            },
            "ApplyDetailChanges": "Apply"
        },
        "errors": {
            "Title": "Oops! An unknown error has occurred.",
            "SendMail": "Send",
            "MailSubject": "Error in JS client",
            "ErrorTitle": "Error:",
            "ErrorUser": "User:",
            "ErrorDate": "Date and time:",
            "Browser": "Browser:",
            "ErrorURI": "Address:",
            "Stack": "Call stack:",
            "Context": "Context:",
            "error500": "Internal server error",
            "unknownError": "An unknown error has occurred.",
            "notAuthorized": "Forbidden"
        },
        "listView": {
            "search": {
                "Search": "Search",
                "Nodata": "Aucun résultat trouvé ..."
            }
        },
        "pagination": {
            "Next": "»",
            "Previous": "«",
            "First": "First",
            "Last": "Last"
        },
        "number": {
            "decimal": ".",
            "thousand": " ",
            "places": 2,
            "symbol": "$",
            "format": "%s %v"
        },
        "charts": {
            "numericSymbols": ["k", "M", "G", "T", "P", "E"],
            "resetZoom": "Reset zoom",
            "resetZoomTitle": "Reset zoom level 1:1",
            "rangeSelectorZoom": "Zoom",
            "rangeSelectorFrom": "From",
            "rangeSelectorTo": "To"
        },
        "date": {
            "weekdaysShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "weekdaysMin": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            "weekdays": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "dateShort": "mm/dd/yyyy",
            "dateLong": "d mmmm, yyyy",
            "monthYear": "mmmm yyyy",
            "daySep": "-",
            "weekStart": 0,
            "today": "Today",
            "clear": "Clear"
        }
    };
    Phoenix.ulocale.translate(en, "en");
})(Phoenix || (Phoenix = {}));
//# sourceMappingURL=phoenix_en.js.map