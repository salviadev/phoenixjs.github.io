var Phoenix;
(function (Phoenix) {
    var fr = {
        "layouts": {
            "design": {
                "Save": "Enregistrer",
                "New": "Nouvelle page",
                "Open": { "title": "Ouvrir page", "open": "Ouvrir", "close": "Fermer" },
                "PageName": "Le nom de la page",
                "InvalidPageName": "Nom de page incorrect",
                "ConflictedPageName": "Une page portant ce nom existe, voulez-vous donner un autre nom ?",
                "Delete": "Supprimer page",
                "DeletePreferences": "Supprimer préferences",
                "ConfirmDelete": "Êtes-vous sûr de vouloir supprimer cette page ?",
                "ConfirmDeletePrefs": "Êtes-vous sûr de vouloir supprimer les préferences de cette page ?",
                "Preview": "Aperçu",
                "AuthoringMode": "Mode conception",
                "layouts": "Blocks",
                "widgets": "Widgets",
                "fields": "Champs",
                "actions": "Actions",
                "properties": "Propriétés",
                "childrenFlow": "Alignement des enfants",
                "childrenFlowVertical": "Vertical",
                "childrenTableCell": "Cellules d'un tableau",
                "childrenAccordionGroup": "Élément de groupe réductible",
                "customStyle": "CSS personnalisé",
                "nestedLayoutName": "Nom du block enfant",
                "nestedLayoutBind": "Bind for nested layout",
                "nestedFormController": "Controller for nested form",
                "columnSize": "Dimension de colonne",
                "customColumnSize": "Dimension personnalisé",
                "appearance": "Affichage sous forme de ",
                "appearanceAccordion": "Accordéon",
                "appearanceTabs": "Onglets",
                "appearanceWizard": "None",
                "showTitle": "Afficher le titre",
                "bindPagesTitle": "Bind",
                "name": "Nom",
                "forceDisplayTable": "Forcer display(Css) table",
                "title": "Titre",
                "actionApply": "Appliquer",
                "formType": "Type du formulaire",
                "ftVertical": "Formulaire vertical",
                "ftHorizontal": "Formulaire horizontal",
                "ftInline": "Formulaire sur une ligne",
                "labelSize": "Dimension de libellé (en colonnes Bootstrap)",
                "blockPosition": "Position",
                "bpStatic": "Static",
                "bpStickyTop": "Sticky Top",
                "bpStickyBottom": "Sticky Bottom",
                "noTitlesForFields": "Ne pas afficher les titres des champs",
                "fieldsTitle": "Champs"
            },
            "defaultTitle": "Pas de titre",
            "NoData": "Données manquantes"
        },
        "schema": {
            "required": "{0} est obligatoire.",
            "minNumber": "{0} doit être supérieur(e) ou égal(e) à {1}",
            "maxNumber": "{0} doit être inférieur(e) ou égal(e) à {1}",
            "minNumberExclusive": "{0} doit être supérieur(e) à {1}",
            "maxNumberExclusive": "{0} doit être inférieur(e) à  {1}",
            "uniqueColumn": "La colonne '{0}' doit être unique.",
            "uniqueColumns": "La combinaison de colonnes '{0}' doit être unique.",
            "passwordMismatch": "Les deux mots de passe sont différents",
            "invalidEmail": "Adresse e-mail incorrecte",
            "invalidChars": "Certains caractères saisis ne sont pas autorisés.",
            "invalidPhone": "Le numéro saisi est invalide",
            "invalidUrl": "Le site internet saisi n'est pas valide (exemple : http://www.google.com).",
            "minLength": "{0} doit comporter au moins {1} caractères"
        },
        "ui": {
            "Close": "Fermer",
            "Abandon": "Annuler",
            "Yes": "Oui",
            "Ok": "Ok",
            "No": "Non",
            "false": "Faux",
            "true": "Vrai",
            "Warning": "Avertissement",
            "Info": "Information",
            "Disconnect": "Déconnexion",
            "Confirm": "Confirmation",
            "Validate": "Valider",
            "Create": "Créer",
            "password": {
                "oldPassword": "Ancien mot de passe",
                "newPassword": "Nouveau mot de passe",
                "change": "Modifier le mot de passe"
            },
            "ApplyDetailChanges": "Appliquer",
            "Selected": "Sel.",
            "Add": "Ajouter",
            "title": "Libelllé",
            "selectedFilters": "Filtres sélectionnés",
            "OpenNewTab": "Ouvrir dans un nouvel onglet",
            "Search": "Recherche",
            "Actions": "Actions",
            "FileUpload": "Choisir un Fichier",
            "Apply": "Appliquer",
            "Remove": "Supprimer",
            "ExportCsv": "Exporter au format CSV",
            "SaveSuccessful": "L'enregistrement a été effectué avec succès.",
            "cancelWarning": "Vos modifications seront perdues. Êtes-vous sûr(e) de vouloir continuer ?",
            "removeWarning": "Êtes-vous sûr(e) de vouloir supprimer cet élément ?"
        },
        "errors": {
            "Title": "Oops! Une erreur s'est produite.",
            "SendMail": "Envoyer",
            "MailSubject": "Erreur sur le client JS",
            "ErrorTitle": "Erreur:",
            "ErrorUser": "Utilisateur:",
            "ErrorDate": "Date et l'heure:",
            "Browser": "Navigateur:",
            "ErrorURI": "L'url de la page:",
            "Stack": "Pile d'exécution:",
            "Context": "Contexte:",
            "error500": "Erreur de connexion au serveur",
            "unknownError": "Une erreur s'est produite.",
            "notAuthorized": "Forbidden",
            "invalidUploadFileName": "Bloqué pour des raisons de sécurité!",
            "invalidUploadFileSize": "Fichier trop large!"
        },
        "listView": {
            "search": {
                "Search": "Recherche",
                "Nodata": "Aucun résultat trouvé ..."
            }
        },
        "pagination": {
            "Next": "»",
            "Previous": "«",
            "First": "Premier",
            "Last": "Dernier"
        },
        "number": {
            "decimal": ",",
            "thousand": " ",
            "places": 2,
            "symbol": "€",
            "coef": ["U", "K"],
            "format": "%v %s"
        },
        "charts": {
            "numericSymbols": ["k", "M", "G", "T", "P", "E"],
            "resetZoom": "Réinitialiser le zoom",
            "resetZoomTitle": "Réinitialiser le zoom au niveau 1:1",
            "rangeSelectorZoom": "Zoom",
            "rangeSelectorFrom": "De",
            "rangeSelectorTo": "à"
        },
        "date": {
            "weekdaysShort": ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
            "weekdaysMin": ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
            "weekdays": ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
            "monthsShort": ["Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "juil", "Août", "Sept", "Oct", "Nov", "Déc"],
            "months": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
            "shortTime": "HH:MM",
            "dateShort": "dd/mm/yyyy",
            "dateLong": "d mmm, yyyy",
            "monthYear": "mmmm yyyy",
            "daySep": "/",
            "weekStart": 1,
            "today": "Aujourd'hui",
            "clear": "Effacer"
        },
        "operators": {
            "in": { "symbol": "=", "title": "égal à", "binary": false },
            "nin": { "symbol": "!=", "title": "différent de", "binary": false },
            "gt": { "symbol": ">", "title": "supérieur à", "binary": false },
            "ge": { "symbol": ">=", "title": "supérieur ou égal à", "binary": false },
            "lt": { "symbol": "<", "title": "inférieur à", "binary": false },
            "le": { "symbol": ">", "title": "inférieur ou égal à", "binary": false },
            "between": { "symbol": "entre", "title": "entre", "binary": true },
            "nbetween": { "symbol": "pas entre", "title": "pas entre", "binary": true },
            "like": { "symbol": "contient", "title": "contient", "binary": false },
            "nlike": { "symbol": "ne contient pas", "title": "ne contient pas", "binary": false },
            "empty": { "symbol": "vide", "title": "est vide", "binary": false },
            "nempty": { "symbol": "pas vide", "title": "n'est pas vide", "binary": false }
        },
        "types": {
            "number": { "title": "Nombre", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "decimal": { "title": "Décimal", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "money": { "title": "Money", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "integer": { "title": "Entier", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "date": { "title": "Date", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "time": { "title": "Heure", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "date-time": { "title": "Date at heure", "operators": ["in", "nin", "gt", "ge", "lt", "le", "between", "nbetween", "empty", "nempty"] },
            "string": { "title": "Chaîne de caractères", "operators": ["in", "nin", "like", "nlike", "empty", "nempty"] },
            "enum": { "title": "Enum", "operators": ["in", "nin", "empty", "nempty"] },
            "lookup": { "title": "Lookup", "operators": ["in", "nin", "empty", "nempty"] },
            "boolean": { "title": "Booléen", "operators": ["in", "nin", "empty", "nempty"] }
        }
    };
    Phoenix.ulocale.translate(fr, "fr");
})(Phoenix || (Phoenix = {}));