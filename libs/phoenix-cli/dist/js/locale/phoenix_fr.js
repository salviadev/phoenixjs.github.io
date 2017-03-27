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
            "minLength": "{0} doit comporter au moins {1} caractères"
        },
        "ui": {
            "Close": "Fermer",
            "Yes": "Oui",
            "Ok": "Ok",
            "No": "Non",
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
            "OpenNewTab": "Ouvrir dans un nouvel onglet",
            "Search": "Recherche"
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
            "notAuthorized": "Forbidden"
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
        }
    };
    Phoenix.ulocale.translate(fr, "fr");
})(Phoenix || (Phoenix = {}));
