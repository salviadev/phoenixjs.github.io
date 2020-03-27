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
                "DeletePreferences": "Delete preferences",
                "ConfirmDelete": "Are you sure you want to delete this page ?",
                "ConfirmDeletePrefs": "Are you sure you want to delete preferences for this page ?",
                "Preview": "Preview",
                "AuthoringMode": "Authoring",
                "layouts": "Blocks",
                "widgets": "Widgets",
                "fields": "Fields",
                "actions": "Actions",
                "properties": "Properties",
                "childrenFlow": "Children disposition",
                "childrenFlowVertical": "Vertical Flow",
                "childrenTableCell": "Table cell",
                "childrenAccordionGroup": "Accordion Group",
                "customStyle": "Custom style",
                "nestedLayoutName": "Nested Layout Name",
                "nestedLayoutBind": "Bind for nested layout",
                "nestedFormController": "Controller for nested form",
                "columnSize": "Size",
                "customColumnSize": "Custom Size",
                "appearance": "Appearance",
                "appearanceAccordion": "Accordion",
                "appearanceTabs": "Tabs",
                "appearanceWizard": "None",
                "showTitle": "Show title",
                "bindPagesTitle": "Bind",
                "name": "Name",
                "forceDisplayTable": "Force display(Css) table",
                "title": "Title",
                "actionApply": "Apply",
                "formType": "Form Type",
                "ftVertical": "Vertical Form",
                "ftHorizontal": "Horizontal Form",
                "ftInline": "Inline form",
                "labelSize": "Label width (Bootstrap cols)",
                "blockPosition": "Position",
                "bpStatic": "Static",
                "bpStickyTop": "Sticky Top",
                "bpStickyBottom": "Sticky Bottom",
                "noTitlesForFields": "Don't show field's titles",
                "fieldsTitle": "Children (Fields)"
            },
            "defaultTitle": "No title",
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
            "invalidEmail": "Invalid Email Address.",
            "invalidChars": "Some characters are invalid.",
            "invalidPhone": "Invalid Url Address.",
            "invalidUrl": "Invalid Phone Number.",
            "minLength": "{0} must be at least {1} characters"
        },
        "ui": {
            "disclaimer": "The user is informed that any processing of personal data in this free comment area must be carried out in accordance with the applicable legislation, in particular with respect to the provisions of Regulation No 2016/679, said general regulation on the protection of data. data (GDPR), applicable as of May 1, 2018. More specifically, any processing of « sensitive » personal data (including, but not limited to, racial or ethnic origin, political views, philosophical or religious, union membership, health or sex life) is not allowed in Salvia Pilotage Operations.",
            "Close": "Close",
            "Abandon": "Abandon",
            "Ok": "Ok",
            "Yes": "Yes",
            "No": "No",
            "false": "False",
            "true": "True",
            "Warning": "Warning",
            "Info": "Information",
            "Disconnect": "Disconnect",
            "Confirm": "Confirm",
            "Validate": "Validate",
            "Create": "Create",
            "password": {
                "oldPassword": "Old Password",
                "newPassword": "New Password",
                "change": "Change password"
            },
            "ChooseColumns": "Choose columns",
            "value": "Value",
            "valuePlaceHolder": "One or more values (separated by semicolon: val1;val2;...)",
            "AllColumns": "List of fields",
            "ApplyDetailChanges": "Apply",
            "Selected": "Sel.",
            "Add": "Add",
            "title": "Title",
            "selectedFilters": "Selected filters",
            "OpenNewTab": "Open link in new tab",
            "Search": "Search",
            "Actions": "Actions",
            "FileUpload": "Choose File",
            "Apply": "Apply",
            "Remove": "Remove",
            "Clear": "Clear",
            "ExportCsv": "Export as CSV",
            "ExpandAll": "Expand all",
            "CollapseAll": "Collapse all",
            "SaveSuccessful": "Changes saved successfully.",
            "cancelWarning": "All changes will be lost if you leave this page without saving. Are you sure to continue ?",
            "removeWarning": "Are you sure you want to delete this item?"
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
            "notAuthorized": "Forbidden",
            "invalidUploadFileName": "Blocked for security reasons!",
            "invalidUploadFileSize": "File too large!"
        },
        "listView": {
            "search": {
                "Search": "Search",
                "Nodata": "No results found ..."
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
            "coef": ["U", "K"],
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
            "dateLong": "d mmm, yyyy",
            "monthYear": "mmmm yyyy",
            "shortTime": "hh:MM A",
            "daySep": "-",
            "weekStart": 0,
            "today": "Today",
            "clear": "Clear"
        },
        "operators": {
            "in": { "symbol": "=", "title": "equal", "binary": false },
            "nin": { "symbol": "!=", "title": "not equal", "binary": false },
            "gt": { "symbol": ">", "title": "is greater than", "binary": false },
            "ge": { "symbol": ">=", "title": "is greater or equal than", "binary": false },
            "lt": { "symbol": "<", "title": "is less than", "binary": false },
            "le": { "symbol": ">", "title": "is less or equal than", "binary": false },
            "between": { "symbol": "between", "title": "between", "binary": true },
            "nbetween": { "symbol": "not between", "title": "not between", "binary": true },
            "like": { "symbol": "contains", "title": "contains", "binary": false },
            "nlike": { "symbol": "not contains", "title": "not contains", "binary": false },
            "empty": { "symbol": "is null", "title": "is null", "binary": false },
            "nempty": { "symbol": "is not null", "title": "is not null", "binary": false }
        },
        "types": {
            "number": { "title": "Number", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "decimal": { "title": "Decimal", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "money": { "title": "Money", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "integer": { "title": "Integer", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "date": { "title": "Date", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "time": { "title": "Time", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "date-time": { "title": "Date Time", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "string": { "title": "String", "operators": ["in", "nin", "like", "nlike", "empty", "nempty"] },
            "enum": { "title": "Enum", "operators": ["in", "nin", "empty", "nempty"] },
            "lookup": { "title": "Lookup", "operators": ["in", "nin", "empty", "nempty"] },
            "boolean": { "title": "Boolean", "operators": ["in", "nin", "empty", "nempty"] }
        }
    };
    Phoenix.ulocale.translate(en, "en");
})(Phoenix || (Phoenix = {}));
