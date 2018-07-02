/**
* This file was auto-generated by SAP Web IDE build and includes all
* the source files required by SAPUI5 runtime for performance optimization.
* PLEASE DO NOT EDIT THIS FILE!! Changes will be overwritten the next time the build is run.
*/
jQuery.sap.registerPreloadedModules({
	"version": "2.0",
	"name": "emp/nom/sub/Component-preload",
	"modules": {
		"emp/nom/sub/Component.js": "sap.ui.define([\n\t\t\"sap/ui/core/UIComponent\",\n\t\t\"sap/ui/Device\",\n\t\t\"emp/nom/sub/model/models\",\n\t\t\"emp/nom/sub/controller/ErrorHandler\"\n\t], function (UIComponent, Device, models, ErrorHandler) {\n\t\t\"use strict\";\n\n\t\treturn UIComponent.extend(\"emp.nom.sub.Component\", {\n\n\t\t\tmetadata : {\n\t\t\t\tmanifest: \"json\"\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.\n\t\t\t * In this function, the FLP and device models are set and the router is initialized.\n\t\t\t * @public\n\t\t\t * @override\n\t\t\t */\n\t\t\tinit : function () {\n\t\t\t\t// call the base component's init function\n\t\t\t\tUIComponent.prototype.init.apply(this, arguments);\n\n\t\t\t\t// initialize the error handler with the component\n\t\t\t\tthis._oErrorHandler = new ErrorHandler(this);\n\n\t\t\t\t// set the device model\n\t\t\t\tthis.setModel(models.createDeviceModel(), \"device\");\n\t\t\t\t// set the FLP model\n\t\t\t\tthis.setModel(models.createFLPModel(), \"FLP\");\n\n\t\t\t\t// create the views based on the url/hash\n\t\t\t\tthis.getRouter().initialize();\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * The component is destroyed by UI5 automatically.\n\t\t\t * In this method, the ErrorHandler is destroyed.\n\t\t\t * @public\n\t\t\t * @override\n\t\t\t */\n\t\t\tdestroy : function () {\n\t\t\t\tthis._oErrorHandler.destroy();\n\t\t\t\t// call the base component's destroy function\n\t\t\t\tUIComponent.prototype.destroy.apply(this, arguments);\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy\n\t\t\t * design mode class should be set, which influences the size appearance of some controls.\n\t\t\t * @public\n\t\t\t * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set\n\t\t\t */\n\t\t\tgetContentDensityClass : function() {\n\t\t\t\tif (this._sContentDensityClass === undefined) {\n\t\t\t\t\t// check whether FLP has already set the content density class; do nothing in this case\n\t\t\t\t\tif (jQuery(document.body).hasClass(\"sapUiSizeCozy\") || jQuery(document.body).hasClass(\"sapUiSizeCompact\")) {\n\t\t\t\t\t\tthis._sContentDensityClass = \"\";\n\t\t\t\t\t} else if (!Device.support.touch) { // apply \"compact\" mode if touch is not supported\n\t\t\t\t\t\tthis._sContentDensityClass = \"sapUiSizeCompact\";\n\t\t\t\t\t} else {\n\t\t\t\t\t\t// \"cozy\" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table\n\t\t\t\t\t\tthis._sContentDensityClass = \"sapUiSizeCozy\";\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn this._sContentDensityClass;\n\t\t\t}\n\n\t\t});\n\n\t}\n);",
		"emp/nom/sub/controller/BaseController.js": "sap.ui.define([\n\t\t\"sap/ui/core/mvc/Controller\"\n\t], function (Controller) {\n\t\t\"use strict\";\n\n\t\treturn Controller.extend(\"emp.nom.sub.controller.BaseController\", {\n\t\t\t/**\n\t\t\t * Convenience method for accessing the router.\n\t\t\t * @public\n\t\t\t * @returns {sap.ui.core.routing.Router} the router for this component\n\t\t\t */\n\t\t\tgetRouter : function () {\n\t\t\t\treturn sap.ui.core.UIComponent.getRouterFor(this);\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Convenience method for getting the view model by name.\n\t\t\t * @public\n\t\t\t * @param {string} [sName] the model name\n\t\t\t * @returns {sap.ui.model.Model} the model instance\n\t\t\t */\n\t\t\tgetModel : function (sName) {\n\t\t\t\treturn this.getView().getModel(sName);\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Convenience method for setting the view model.\n\t\t\t * @public\n\t\t\t * @param {sap.ui.model.Model} oModel the model instance\n\t\t\t * @param {string} sName the model name\n\t\t\t * @returns {sap.ui.mvc.View} the view instance\n\t\t\t */\n\t\t\tsetModel : function (oModel, sName) {\n\t\t\t\treturn this.getView().setModel(oModel, sName);\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Getter for the resource bundle.\n\t\t\t * @public\n\t\t\t * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component\n\t\t\t */\n\t\t\tgetResourceBundle : function () {\n\t\t\t\treturn this.getOwnerComponent().getModel(\"i18n\").getResourceBundle();\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Event handler when the share by E-Mail button has been clicked\n\t\t\t * @public\n\t\t\t */\n\t\t\tonShareEmailPress : function () {\n\t\t\t\tvar oViewModel = (this.getModel(\"objectView\") || this.getModel(\"worklistView\"));\n\t\t\t\tsap.m.URLHelper.triggerEmail(\n\t\t\t\t\tnull,\n\t\t\t\t\toViewModel.getProperty(\"/shareSendEmailSubject\"),\n\t\t\t\t\toViewModel.getProperty(\"/shareSendEmailMessage\")\n\t\t\t\t);\n\t\t\t}\n\n\t\t});\n\n\t}\n);",
		"emp/nom/sub/controller/Worklist.controller.js": "sap.ui.define([\n\t\t\"emp/nom/sub/controller/BaseController\",\n\t\t\"sap/ui/model/json/JSONModel\",\n\t\t\"sap/ui/core/routing/History\",\n\t\t\"emp/nom/sub/model/formatter\",\n\t\t\"sap/ui/model/Filter\",\n\t\t\"sap/ui/model/FilterOperator\"\n\t], function (BaseController, JSONModel, History, formatter, Filter, FilterOperator) {\n\t\t\"use strict\";\n\n\t\treturn BaseController.extend(\"emp.nom.sub.controller.Worklist\", {\n\n\t\t\tformatter: formatter,\n\n\t\t\t/* =========================================================== */\n\t\t\t/* lifecycle methods                                           */\n\t\t\t/* =========================================================== */\n\n\t\t\t/**\n\t\t\t * Called when the worklist controller is instantiated.\n\t\t\t * @public\n\t\t\t */\n\t\t\tonInit : function () {\n\t\t\t\t// var oViewModel,\n\t\t\t\t// \tiOriginalBusyDelay,\n\t\t\t\t// \toTable = this.byId(\"table\");\n\n\t\t\t\t// // Put down worklist table's original value for busy indicator delay,\n\t\t\t\t// // so it can be restored later on. Busy handling on the table is\n\t\t\t\t// // taken care of by the table itself.\n\t\t\t\t// iOriginalBusyDelay = oTable.getBusyIndicatorDelay();\n\t\t\t\t// // keeps the search state\n\t\t\t\t// this._oTableSearchState = [];\n\n\t\t\t\t// // Model used to manipulate control states\n\t\t\t\t// oViewModel = new JSONModel({\n\t\t\t\t// \tworklistTableTitle : this.getResourceBundle().getText(\"worklistTableTitle\"),\n\t\t\t\t// \tsaveAsTileTitle: this.getResourceBundle().getText(\"worklistViewTitle\"),\n\t\t\t\t// \tshareOnJamTitle: this.getResourceBundle().getText(\"worklistViewTitle\"),\n\t\t\t\t// \tshareSendEmailSubject: this.getResourceBundle().getText(\"shareSendEmailWorklistSubject\"),\n\t\t\t\t// \tshareSendEmailMessage: this.getResourceBundle().getText(\"shareSendEmailWorklistMessage\", [location.href]),\n\t\t\t\t// \ttableNoDataText : this.getResourceBundle().getText(\"tableNoDataText\"),\n\t\t\t\t// \ttableBusyDelay : 0\n\t\t\t\t// });\n\t\t\t\t// this.setModel(oViewModel, \"worklistView\");\n\n\t\t\t\t// // Make sure, busy indication is showing immediately so there is no\n\t\t\t\t// // break after the busy indication for loading the view's meta data is\n\t\t\t\t// // ended (see promise 'oWhenMetadataIsLoaded' in AppController)\n\t\t\t\t// oTable.attachEventOnce(\"updateFinished\", function(){\n\t\t\t\t// \t// Restore original busy indicator delay for worklist's table\n\t\t\t\t// \toViewModel.setProperty(\"/tableBusyDelay\", iOriginalBusyDelay);\n\t\t\t\t// });\n\t\t\t},\n\n\t\t\t/* =========================================================== */\n\t\t\t/* event handlers                                              */\n\t\t\t/* =========================================================== */\n\n\t\t\t/**\n\t\t\t * Triggered by the table's 'updateFinished' event: after new table\n\t\t\t * data is available, this handler method updates the table counter.\n\t\t\t * This should only happen if the update was successful, which is\n\t\t\t * why this handler is attached to 'updateFinished' and not to the\n\t\t\t * table's list binding's 'dataReceived' method.\n\t\t\t * @param {sap.ui.base.Event} oEvent the update finished event\n\t\t\t * @public\n\t\t\t */\n\t\t\tonUpdateFinished : function (oEvent) {\n\t\t\t\t// update the worklist's object counter after the table update\n\t\t\t\tvar sTitle,\n\t\t\t\t\toTable = oEvent.getSource(),\n\t\t\t\t\tiTotalItems = oEvent.getParameter(\"total\");\n\t\t\t\t// only update the counter if the length is final and\n\t\t\t\t// the table is not empty\n\t\t\t\tif (iTotalItems && oTable.getBinding(\"items\").isLengthFinal()) {\n\t\t\t\t\tsTitle = this.getResourceBundle().getText(\"worklistTableTitleCount\", [iTotalItems]);\n\t\t\t\t} else {\n\t\t\t\t\tsTitle = this.getResourceBundle().getText(\"worklistTableTitle\");\n\t\t\t\t}\n\t\t\t\tthis.getModel(\"worklistView\").setProperty(\"/worklistTableTitle\", sTitle);\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Event handler when a table item gets pressed\n\t\t\t * @param {sap.ui.base.Event} oEvent the table selectionChange event\n\t\t\t * @public\n\t\t\t */\n\t\t\tonPress : function (oEvent) {\n\t\t\t\t// The source is the list item that got pressed\n\t\t\t\tthis._showObject(oEvent.getSource());\n\t\t\t},\n\n\n\t\t\t/**\n\t\t\t * Event handler for navigating back.\n\t\t\t * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history\n\t\t\t * If not, it will navigate to the shell home\n\t\t\t * @public\n\t\t\t */\n\t\t\tonNavBack : function() {\n\t\t\t\tvar sPreviousHash = History.getInstance().getPreviousHash(),\n\t\t\t\t\toCrossAppNavigator = sap.ushell.Container.getService(\"CrossApplicationNavigation\");\n\n\t\t\t\tif (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {\n\t\t\t\t\thistory.go(-1);\n\t\t\t\t} else {\n\t\t\t\t\toCrossAppNavigator.toExternal({\n\t\t\t\t\t\ttarget: {shellHash: \"#Shell-home\"}\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Event handler when the share in JAM button has been clicked\n\t\t\t * @public\n\t\t\t */\n\t\t\tonShareInJamPress : function () {\n\t\t\t\tvar oViewModel = this.getModel(\"worklistView\"),\n\t\t\t\t\toShareDialog = sap.ui.getCore().createComponent({\n\t\t\t\t\t\tname: \"sap.collaboration.components.fiori.sharing.dialog\",\n\t\t\t\t\t\tsettings: {\n\t\t\t\t\t\t\tobject:{\n\t\t\t\t\t\t\t\tid: location.href,\n\t\t\t\t\t\t\t\tshare: oViewModel.getProperty(\"/shareOnJamTitle\")\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\toShareDialog.open();\n\t\t\t},\n\n\t\t\tonSearch : function (oEvent) {\n\t\t\t\tif (oEvent.getParameters().refreshButtonPressed) {\n\t\t\t\t\t// Search field's 'refresh' button has been pressed.\n\t\t\t\t\t// This is visible if you select any master list item.\n\t\t\t\t\t// In this case no new search is triggered, we only\n\t\t\t\t\t// refresh the list binding.\n\t\t\t\t\tthis.onRefresh();\n\t\t\t\t} else {\n\t\t\t\t\tvar oTableSearchState = [];\n\t\t\t\t\tvar sQuery = oEvent.getParameter(\"query\");\n\n\t\t\t\t\tif (sQuery && sQuery.length > 0) {\n\t\t\t\t\t\toTableSearchState = [new Filter(\"EmpName\", FilterOperator.Contains, sQuery)];\n\t\t\t\t\t}\n\t\t\t\t\tthis._applySearch(oTableSearchState);\n\t\t\t\t}\n\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Event handler for refresh event. Keeps filter, sort\n\t\t\t * and group settings and refreshes the list binding.\n\t\t\t * @public\n\t\t\t */\n\t\t\tonRefresh : function () {\n\t\t\t\tvar oTable = this.byId(\"table\");\n\t\t\t\toTable.getBinding(\"items\").refresh();\n\t\t\t},\n\n\t\t\t/* =========================================================== */\n\t\t\t/* internal methods                                            */\n\t\t\t/* =========================================================== */\n\n\t\t\t/**\n\t\t\t * Shows the selected item on the object page\n\t\t\t * On phones a additional history entry is created\n\t\t\t * @param {sap.m.ObjectListItem} oItem selected Item\n\t\t\t * @private\n\t\t\t */\n\t\t\t_showObject : function (oItem) {\n\t\t\t\tthis.getRouter().navTo(\"object\", {\n\t\t\t\t\tobjectId: oItem.getBindingContext().getProperty(\"EmpNo\")\n\t\t\t\t});\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Internal helper method to apply both filter and search state together on the list binding\n\t\t\t * @param {object} oTableSearchState an array of filters for the search\n\t\t\t * @private\n\t\t\t */\n\t\t\t_applySearch: function(oTableSearchState) {\n\t\t\t\tvar oTable = this.byId(\"table\"),\n\t\t\t\t\toViewModel = this.getModel(\"worklistView\");\n\t\t\t\toTable.getBinding(\"items\").filter(oTableSearchState, \"Application\");\n\t\t\t\t// changes the noDataText of the list in case there are no filter results\n\t\t\t\tif (oTableSearchState.length !== 0) {\n\t\t\t\t\toViewModel.setProperty(\"/tableNoDataText\", this.getResourceBundle().getText(\"worklistNoDataWithSearchText\"));\n\t\t\t\t}\n\t\t\t}\n\n\t\t});\n\t}\n);",
		"emp/nom/sub/view/Worklist.view.xml": "<core:View xmlns:core=\"sap.ui.core\" xmlns=\"sap.m\" xmlns:uxap=\"sap.uxap\" xmlns:layout=\"sap.ui.layout\" xmlns:f=\"sap.ui.layout.form\"\n\tcontrollerName=\"emp.nom.sub.controller.Worklist\" height=\"100%\">\n\t<Page id=\"idEmpPage\" class=\"cl_EmpPage\" navButtonPress=\"onNavBack\" showFooter=\"true\" showNavButton=\"true\" title=\"{i18n>worklistViewTitle}\">\n\t\t<customHeader>\n\t\t\t<Toolbar id=\"idEmpPageCustomBar\" class=\"cl_EmpTsWlPageCustBar\">\n\t\t\t\t<content>\n\t\t\t\t\t<Image class=\"waslLogo\" src=\"images/wasl_logo.jpg\" width=\"60px\" height=\"38px\"/>\n\t\t\t\t\t<ToolbarSpacer/>\n\t\t\t\t\t<core:Icon src=\"sap-icon://competitor\"/>\n\t\t\t\t\t<Label id=\"idEmpTsPageCustomBarLabel\" text=\"Employee Timesheet Entry\"></Label>\n\t\t\t\t\t<core:Icon src=\"sap-icon://competitor\"/>\n\t\t\t\t\t<ToolbarSpacer/>\n\t\t\t\t\t<Button icon=\"sap-icon://log\" class=\"cl_EmpPageLogOff\" press=\"onAppLogoff\" tooltip=\"Close\"></Button>\n\t\t\t\t</content>\n\t\t\t</Toolbar>\n\t\t</customHeader>\n\t\t<content>\n\t\t\t<uxap:ObjectPageLayout id=\"idEmpPageObjLayout\" class=\"cl_EmpPageObjLayout\" showTitleInHeaderContent=\"true\" showHeaderContent=\"true\">\n\t\t\t\t<uxap:headerTitle>\n\t\t\t\t\t<uxap:ObjectPageHeader id=\"idEmpPageHeader\" class=\"sapUiSmallMarginTop cl_EmpPageHeader\" objectTitle=\"Punith Babu\" showTitleSelector=\"false\" showMarkers=\"false\"\n\t\t\t\t\t\tmarkFavorite=\"false\" markFlagged=\"false\" markChanges=\"false\" markChangesPress=\"handleMarkChangesPress\" objectSubtitle=\"SAP Developer\"\n\t\t\t\t\t\tobjectImageURI=\"images/sap_logo.jpg\" objectImageShape=\"Circle\" isObjectIconAlwaysVisible=\"false\" isObjectTitleAlwaysVisible=\"false\"\n\t\t\t\t\t\tisObjectSubtitleAlwaysVisible=\"false\" isActionAreaAlwaysVisible=\"false\" showPlaceholder=\"true\">\n\t\t\t\t\t<!--\t<uxap:actions>\n\t\t\t\t\t\t\t<uxap:ObjectPageHeaderActionButton class=\"sapUiSmallMarginEnd cl_EmpTsActButton\" tooltip=\"View Org Chart\" visible=\"true\" icon=\"sap-icon://org-chart\"\n\t\t\t\t\t\t\t\tpress=\"onOrgChart\"/>\n\t\t\t\t\t\t</uxap:actions>-->\n\t\t\t\t\t</uxap:ObjectPageHeader>\n\t\t\t\t</uxap:headerTitle>\n\t\t\t\t<uxap:headerContent>\n\t\t\t\t\t<layout:VerticalLayout >\n\t\t\t\t\t\t<ObjectStatus title=\"Department\" text=\"Information Technology\"/>\n\t\t\t\t\t</layout:VerticalLayout>\n\t\t\t\t\t<layout:VerticalLayout >\n\t\t\t\t\t\t<ObjectStatus title=\"Mobile\" text=\"971509772754\"/>\n\t\t\t\t\t\t<ObjectStatus title=\"Email\" text=\"pbabu@wasl.ae\"/>\n\t\t\t\t\t</layout:VerticalLayout>\n\t\t\t\t\t<layout:VerticalLayout>\n\t\t\t\t\t\t<ObjectStatus title=\"Manager\" text=\"Simyon Stanli\"/>\n\t\t\t\t\t</layout:VerticalLayout>\n\t\t\t\t\t<layout:VerticalLayout visible=\"{= ${device>/system/desktop} === true}\"/>\n\t\t\t\t\t<layout:VerticalLayout>\n\t\t\t\t\t\t<ObjectStatus title=\"Overall Status\" text=\"Pending\" state=\"Error\"/>\n\t\t\t\t\t\t<!--<ObjectStatus title=\"Rejected Reason\" text=\"{tsEmpAppData>/status/stateText}\" visible=\"{path: 'tsEmpAppData>/status/description', formatter: '.formatter.showRejectedReason'}\"  state=\"{path: 'tsEmpAppData>/status/state', formatter: '.formatter.getTsHeaderStatus'}\" />-->\n\t\t\t\t\t</layout:VerticalLayout>\n\t\t\t\t</uxap:headerContent>\n\t\t\t\t<uxap:sections>\n\t\t\t\t\t<uxap:ObjectPageSection title=\"Program Nominations\" class=\"cl_EmpPageObjPageSection\">\n\t\t\t\t\t\t<uxap:subSections>\n\t\t\t\t\t\t\t<uxap:ObjectPageSubSection title=\"\">\n\t\t\t\t\t\t\t\t<Panel expandable=\"false\" expanded=\"true\" class=\"cl_EmpPageProgPanel\">\n\t\t\t\t\t\t\t\t\t<layout:Grid defaultSpan=\"L12 M12 S12\" class=\"sapUiSmallMarginTop\">\n\t\t\t\t\t\t\t\t\t\t<layout:content>\n\t\t\t\t\t\t\t\t\t\t\t<List mode=\"None\" items=\"\" noDataText=\"NO ITEMS FOUND\">\n\t\t\t\t\t\t\t\t\t\t\t\t<CustomListItem class=\"sapUiSmallMarginTopBottom PRITems\" type=\"Active\" press=\"handlePressPRItem\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<HBox>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<core:Icon size=\"2rem\" tooltip=\"Will be deleted on save\" src=\"sap-icon://delete\" visible=\"{= ${oPRModel>DeleteInd}==='X'}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"sapUiSmallMarginBegin sapUiSmallMarginTopBottom\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<core:Icon size=\"2rem\" src=\"sap-icon://sales-order-item\" visible=\"{= ${oPRModel>DeleteInd}!=='X'}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"sapUiSmallMarginBegin sapUiSmallMarginTopBottom\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMarginBegin sapUiSmallMarginTopBottom\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label text=\"{oPRModel>PreqItem}\" class=\"bold headerInfo\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Text text=\"{oPRModel>PreqName}\" class=\"bold headerInfo\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMarginBegin sapUiSmallMarginTopBottom\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label text=\"{i18n>Description}\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label text=\"{oPRModel>ShortText}\" class=\"headerItemInfo\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMarginBegin sapUiSmallMarginTopBottom\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label text=\"Plant\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label text=\"{oPRModel>Plant}\" class=\"headerItemInfo\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMarginBegin sapUiSmallMarginTopBottom\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label text=\"Material Group\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Label text=\"{oPRModel>MatlGroup}\" class=\"headerItemInfo\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<VBox class=\"sapUiSmallMarginBegin sapUiSmallMarginTopBottom\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ObjectNumber number=\"{path:'oPRModel>ValueItem', type:'sap.ui.model.type.Float', formatOptions:{maxFractionDigits:2, minFractionDigits:2}}\"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass=\"amount sapUiSmallMarginBegin sapUiTinyMarginTop\" unit=\"AED\" state=\"Error\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</VBox>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</HBox>\n\t\t\t\t\t\t\t\t\t\t\t\t</CustomListItem>\n\t\t\t\t\t\t\t\t\t\t\t</List>\n\t\t\t\t\t\t\t\t\t\t</layout:content>\n\t\t\t\t\t\t\t\t\t</layout:Grid>\n\t\t\t\t\t\t\t\t</Panel>\n\t\t\t\t\t\t\t</uxap:ObjectPageSubSection>\n\t\t\t\t\t\t</uxap:subSections>\n\t\t\t\t\t</uxap:ObjectPageSection>\n\t\t\t\t</uxap:sections>\n\t\t\t</uxap:ObjectPageLayout>\n\t\t</content>\n\t\t\n\t\t<footer>\n\t\t\t<Toolbar>\n\t\t\t\t<ToolbarSpacer />\n\t\t\t\t<Button icon=\"sap-icon://history\" text=\"History\" type=\"Emphasized\" />\n\t\t\t</Toolbar>\n\t\t</footer>\n\t</Page>\n</core:View>",
		"emp/nom/sub/model/formatter.js": "sap.ui.define([\n\t] , function () {\n\t\t\"use strict\";\n\n\t\treturn {\n\n\t\t\t/**\n\t\t\t * Rounds the number unit value to 2 digits\n\t\t\t * @public\n\t\t\t * @param {string} sValue the number string to be rounded\n\t\t\t * @returns {string} sValue with 2 digits rounded\n\t\t\t */\n\t\t\tnumberUnit : function (sValue) {\n\t\t\t\tif (!sValue) {\n\t\t\t\t\treturn \"\";\n\t\t\t\t}\n\t\t\t\treturn parseFloat(sValue).toFixed(2);\n\t\t\t}\n\n\t\t};\n\n\t}\n);",
		"emp/nom/sub/controller/App.controller.js": "sap.ui.define([\n\t\t\"emp/nom/sub/controller/BaseController\",\n\t\t\"sap/ui/model/json/JSONModel\"\n\t], function (BaseController, JSONModel) {\n\t\t\"use strict\";\n\n\t\treturn BaseController.extend(\"emp.nom.sub.controller.App\", {\n\n\t\t\tonInit : function () {\n\t\t\t\tvar oViewModel,\n\t\t\t\t\tfnSetAppNotBusy,\n\t\t\t\t\tiOriginalBusyDelay = this.getView().getBusyIndicatorDelay();\n\n\t\t\t\toViewModel = new JSONModel({\n\t\t\t\t\tbusy : true,\n\t\t\t\t\tdelay : 0\n\t\t\t\t});\n\t\t\t\tthis.setModel(oViewModel, \"appView\");\n\n\t\t\t\tfnSetAppNotBusy = function() {\n\t\t\t\t\toViewModel.setProperty(\"/busy\", false);\n\t\t\t\t\toViewModel.setProperty(\"/delay\", iOriginalBusyDelay);\n\t\t\t\t};\n\n\t\t\t\tthis.getOwnerComponent().getModel().metadataLoaded().\n\t\t\t\t\tthen(fnSetAppNotBusy);\n\n\t\t\t\t// apply content density mode to root view\n\t\t\t\tthis.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());\n\t\t\t}\n\t\t});\n\n\t}\n);",
		"emp/nom/sub/controller/ErrorHandler.js": "sap.ui.define([\n\t\t\"sap/ui/base/Object\",\n\t\t\"sap/m/MessageBox\"\n\t], function (UI5Object, MessageBox) {\n\t\t\"use strict\";\n\n\t\treturn UI5Object.extend(\"emp.nom.sub.controller.ErrorHandler\", {\n\n\t\t\t/**\n\t\t\t * Handles application errors by automatically attaching to the model events and displaying errors when needed.\n\t\t\t * @class\n\t\t\t * @param {sap.ui.core.UIComponent} oComponent reference to the app's component\n\t\t\t * @public\n\t\t\t * @alias emp.nom.sub.controller.ErrorHandler\n\t\t\t */\n\t\t\tconstructor : function (oComponent) {\n\t\t\t\tthis._oResourceBundle = oComponent.getModel(\"i18n\").getResourceBundle();\n\t\t\t\tthis._oComponent = oComponent;\n\t\t\t\tthis._oModel = oComponent.getModel();\n\t\t\t\tthis._bMessageOpen = false;\n\t\t\t\tthis._sErrorText = this._oResourceBundle.getText(\"errorText\");\n\n\t\t\t\tthis._oModel.attachMetadataFailed(function (oEvent) {\n\t\t\t\t\tvar oParams = oEvent.getParameters();\n\t\t\t\t\tthis._showServiceError(oParams.response);\n\t\t\t\t}, this);\n\n\t\t\t\tthis._oModel.attachRequestFailed(function (oEvent) {\n\t\t\t\t\tvar oParams = oEvent.getParameters();\n\t\t\t\t\t// An entity that was not found in the service is also throwing a 404 error in oData.\n\t\t\t\t\t// We already cover this case with a notFound target so we skip it here.\n\t\t\t\t\t// A request that cannot be sent to the server is a technical error that we have to handle though\n\t\t\t\t\tif (oParams.response.statusCode !== \"404\" || (oParams.response.statusCode === 404 && oParams.response.responseText.indexOf(\"Cannot POST\") === 0)) {\n\t\t\t\t\t\tthis._showServiceError(oParams.response);\n\t\t\t\t\t}\n\t\t\t\t}, this);\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Shows a {@link sap.m.MessageBox} when a service call has failed.\n\t\t\t * Only the first error message will be display.\n\t\t\t * @param {string} sDetails a technical error to be displayed on request\n\t\t\t * @private\n\t\t\t */\n\t\t\t_showServiceError : function (sDetails) {\n\t\t\t\tif (this._bMessageOpen) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t\tthis._bMessageOpen = true;\n\t\t\t\tMessageBox.error(\n\t\t\t\t\tthis._sErrorText,\n\t\t\t\t\t{\n\t\t\t\t\t\tid : \"serviceErrorMessageBox\",\n\t\t\t\t\t\tdetails: sDetails,\n\t\t\t\t\t\tstyleClass: this._oComponent.getContentDensityClass(),\n\t\t\t\t\t\tactions: [MessageBox.Action.CLOSE],\n\t\t\t\t\t\tonClose: function () {\n\t\t\t\t\t\t\tthis._bMessageOpen = false;\n\t\t\t\t\t\t}.bind(this)\n\t\t\t\t\t}\n\t\t\t\t);\n\t\t\t}\n\t\t});\n\t}\n);",
		"emp/nom/sub/controller/NotFound.controller.js": "sap.ui.define([\n\t\t\"emp/nom/sub/controller/BaseController\"\n\t], function (BaseController) {\n\t\t\"use strict\";\n\n\t\treturn BaseController.extend(\"emp.nom.sub.controller.NotFound\", {\n\n\t\t\t/**\n\t\t\t * Navigates to the worklist when the link is pressed\n\t\t\t * @public\n\t\t\t */\n\t\t\tonLinkPressed : function () {\n\t\t\t\tthis.getRouter().navTo(\"worklist\");\n\t\t\t}\n\n\t\t});\n\n\t}\n);",
		"emp/nom/sub/controller/Object.controller.js": "/*global location*/\nsap.ui.define([\n\t\t\"emp/nom/sub/controller/BaseController\",\n\t\t\"sap/ui/model/json/JSONModel\",\n\t\t\"sap/ui/core/routing/History\",\n\t\t\"emp/nom/sub/model/formatter\"\n\t], function (\n\t\tBaseController,\n\t\tJSONModel,\n\t\tHistory,\n\t\tformatter\n\t) {\n\t\t\"use strict\";\n\n\t\treturn BaseController.extend(\"emp.nom.sub.controller.Object\", {\n\n\t\t\tformatter: formatter,\n\n\t\t\t/* =========================================================== */\n\t\t\t/* lifecycle methods                                           */\n\t\t\t/* =========================================================== */\n\n\t\t\t/**\n\t\t\t * Called when the worklist controller is instantiated.\n\t\t\t * @public\n\t\t\t */\n\t\t\tonInit : function () {\n\t\t\t\t// Model used to manipulate control states. The chosen values make sure,\n\t\t\t\t// detail page is busy indication immediately so there is no break in\n\t\t\t\t// between the busy indication for loading the view's meta data\n\t\t\t\tvar iOriginalBusyDelay,\n\t\t\t\t\toViewModel = new JSONModel({\n\t\t\t\t\t\tbusy : true,\n\t\t\t\t\t\tdelay : 0\n\t\t\t\t\t});\n\n\t\t\t\tthis.getRouter().getRoute(\"object\").attachPatternMatched(this._onObjectMatched, this);\n\n\t\t\t\t// Store original busy indicator delay, so it can be restored later on\n\t\t\t\tiOriginalBusyDelay = this.getView().getBusyIndicatorDelay();\n\t\t\t\tthis.setModel(oViewModel, \"objectView\");\n\t\t\t\tthis.getOwnerComponent().getModel().metadataLoaded().then(function () {\n\t\t\t\t\t\t// Restore original busy indicator delay for the object view\n\t\t\t\t\t\toViewModel.setProperty(\"/delay\", iOriginalBusyDelay);\n\t\t\t\t\t}\n\t\t\t\t);\n\t\t\t},\n\n\t\t\t/* =========================================================== */\n\t\t\t/* event handlers                                              */\n\t\t\t/* =========================================================== */\n\n\t\t\t/**\n\t\t\t * Event handler when the share in JAM button has been clicked\n\t\t\t * @public\n\t\t\t */\n\t\t\tonShareInJamPress : function () {\n\t\t\t\tvar oViewModel = this.getModel(\"objectView\"),\n\t\t\t\t\toShareDialog = sap.ui.getCore().createComponent({\n\t\t\t\t\t\tname: \"sap.collaboration.components.fiori.sharing.dialog\",\n\t\t\t\t\t\tsettings: {\n\t\t\t\t\t\t\tobject:{\n\t\t\t\t\t\t\t\tid: location.href,\n\t\t\t\t\t\t\t\tshare: oViewModel.getProperty(\"/shareOnJamTitle\")\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\toShareDialog.open();\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Event handler  for navigating back.\n\t\t\t * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history\n\t\t\t * If not, it will replace the current entry of the browser history with the worklist route.\n\t\t\t * @public\n\t\t\t */\n\t\t\tonNavBack : function() {\n\t\t\t\tvar sPreviousHash = History.getInstance().getPreviousHash(),\n\t\t\t\t\toCrossAppNavigator = sap.ushell.Container.getService(\"CrossApplicationNavigation\");\n\n\t\t\t\tif (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {\n\t\t\t\t\thistory.go(-1);\n\t\t\t\t} else {\n\t\t\t\t\tthis.getRouter().navTo(\"worklist\", {}, true);\n\t\t\t\t}\n\t\t\t},\n\n\t\t\t/* =========================================================== */\n\t\t\t/* internal methods                                            */\n\t\t\t/* =========================================================== */\n\n\t\t\t/**\n\t\t\t * Binds the view to the object path.\n\t\t\t * @function\n\t\t\t * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'\n\t\t\t * @private\n\t\t\t */\n\t\t\t_onObjectMatched : function (oEvent) {\n\t\t\t\tvar sObjectId =  oEvent.getParameter(\"arguments\").objectId;\n\t\t\t\tthis.getModel().metadataLoaded().then( function() {\n\t\t\t\t\tvar sObjectPath = this.getModel().createKey(\"EmpHeaderInfoSet\", {\n\t\t\t\t\t\tEmpNo :  sObjectId\n\t\t\t\t\t});\n\t\t\t\t\tthis._bindView(\"/\" + sObjectPath);\n\t\t\t\t}.bind(this));\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * Binds the view to the object path.\n\t\t\t * @function\n\t\t\t * @param {string} sObjectPath path to the object to be bound\n\t\t\t * @private\n\t\t\t */\n\t\t\t_bindView : function (sObjectPath) {\n\t\t\t\tvar oViewModel = this.getModel(\"objectView\"),\n\t\t\t\t\toDataModel = this.getModel();\n\n\t\t\t\tthis.getView().bindElement({\n\t\t\t\t\tpath: sObjectPath,\n\t\t\t\t\tevents: {\n\t\t\t\t\t\tchange: this._onBindingChange.bind(this),\n\t\t\t\t\t\tdataRequested: function () {\n\t\t\t\t\t\t\toDataModel.metadataLoaded().then(function () {\n\t\t\t\t\t\t\t\t// Busy indicator on view should only be set if metadata is loaded,\n\t\t\t\t\t\t\t\t// otherwise there may be two busy indications next to each other on the\n\t\t\t\t\t\t\t\t// screen. This happens because route matched handler already calls '_bindView'\n\t\t\t\t\t\t\t\t// while metadata is loaded.\n\t\t\t\t\t\t\t\toViewModel.setProperty(\"/busy\", true);\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t},\n\t\t\t\t\t\tdataReceived: function () {\n\t\t\t\t\t\t\toViewModel.setProperty(\"/busy\", false);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t},\n\n\t\t\t_onBindingChange : function () {\n\t\t\t\tvar oView = this.getView(),\n\t\t\t\t\toViewModel = this.getModel(\"objectView\"),\n\t\t\t\t\toElementBinding = oView.getElementBinding();\n\n\t\t\t\t// No data for the binding\n\t\t\t\tif (!oElementBinding.getBoundContext()) {\n\t\t\t\t\tthis.getRouter().getTargets().display(\"objectNotFound\");\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tvar oResourceBundle = this.getResourceBundle(),\n\t\t\t\t\toObject = oView.getBindingContext().getObject(),\n\t\t\t\t\tsObjectId = oObject.EmpNo,\n\t\t\t\t\tsObjectName = oObject.EmpName;\n\n\t\t\t\t// Everything went fine.\n\t\t\t\toViewModel.setProperty(\"/busy\", false);\n\t\t\t\toViewModel.setProperty(\"/saveAsTileTitle\", oResourceBundle.getText(\"saveAsTileTitle\", [sObjectName]));\n\t\t\t\toViewModel.setProperty(\"/shareOnJamTitle\", sObjectName);\n\t\t\t\toViewModel.setProperty(\"/shareSendEmailSubject\",\n\t\t\t\toResourceBundle.getText(\"shareSendEmailObjectSubject\", [sObjectId]));\n\t\t\t\toViewModel.setProperty(\"/shareSendEmailMessage\",\n\t\t\t\toResourceBundle.getText(\"shareSendEmailObjectMessage\", [sObjectName, sObjectId, location.href]));\n\t\t\t}\n\n\t\t});\n\n\t}\n);",
		"emp/nom/sub/view/ObjectNotFound.view.xml": "<mvc:View\n\tcontrollerName=\"emp.nom.sub.controller.NotFound\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\">\n\n\t<MessagePage\n\t\ttitle=\"{i18n>objectTitle}\"\n\t\ttext=\"{i18n>noObjectFoundText}\"\n\t\ticon=\"{sap-icon://product}\"\n\t\tdescription=\"\"\n\t\tid=\"page\">\n\t\t<customDescription>\n\t\t\t<Link id=\"link\" text=\"{i18n>backToWorklist}\" press=\"onLinkPressed\" />\n\t\t</customDescription>\n\t</MessagePage>\n\n</mvc:View>",
		"emp/nom/sub/view/NotFound.view.xml": "<mvc:View\n\tcontrollerName=\"emp.nom.sub.controller.NotFound\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\">\n\n\t<MessagePage\n\t\ttitle=\"{i18n>notFoundTitle}\"\n\t\ttext=\"{i18n>notFoundText}\"\n\t\ticon=\"{sap-icon://document}\"\n\t\tid=\"page\"\n\t\tdescription=\"\">\n\t\t<customDescription>\n\t\t\t<Link id=\"link\" text=\"{i18n>backToWorklist}\" press=\"onLinkPressed\" />\n\t\t</customDescription>\n\t</MessagePage>\n\n</mvc:View>",
		"emp/nom/sub/model/models.js": "sap.ui.define([\n\t\t\"sap/ui/model/json/JSONModel\",\n\t\t\"sap/ui/Device\"\n\t], function (JSONModel, Device) {\n\t\t\"use strict\";\n\n\t\treturn {\n\n\t\t\tcreateDeviceModel : function () {\n\t\t\t\tvar oModel = new JSONModel(Device);\n\t\t\t\toModel.setDefaultBindingMode(\"OneWay\");\n\t\t\t\treturn oModel;\n\t\t\t},\n\n\t\t\tcreateFLPModel : function () {\n\t\t\t\tvar fnGetUser = jQuery.sap.getObject(\"sap.ushell.Container.getUser\"),\n\t\t\t\t\tbIsShareInJamActive = fnGetUser ? fnGetUser().isJamActive() : false,\n\t\t\t\t\toModel = new JSONModel({\n\t\t\t\t\t\tisShareInJamActive: bIsShareInJamActive\n\t\t\t\t\t});\n\t\t\t\toModel.setDefaultBindingMode(\"OneWay\");\n\t\t\t\treturn oModel;\n\t\t\t}\n\n\t\t};\n\n\t}\n);",
		"emp/nom/sub/view/Object.view.xml": "<mvc:View\n\tcontrollerName=\"emp.nom.sub.controller.Object\"\n\txmlns=\"sap.m\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns:semantic=\"sap.m.semantic\"\n\txmlns:footerbar=\"sap.ushell.ui.footerbar\">\n\n\t<semantic:FullscreenPage\n\t\tid=\"page\"\n\t\tnavButtonPress=\"onNavBack\"\n\t\tshowNavButton=\"true\"\n\t\ttitle=\"{i18n>objectTitle}\"\n\t\tbusy=\"{objectView>/busy}\"\n\t\tbusyIndicatorDelay=\"{objectView>/delay}\">\n\n\t\t<semantic:content>\n\t\t\t<ObjectHeader\n\t\t\t\tid=\"objectHeader\"\n\t\t\t\ttitle=\"{EmpName}\"\n>\n\t\t\t</ObjectHeader>\n \t\t</semantic:content>\n\n\t\t<semantic:sendEmailAction>\n\t\t\t<semantic:SendEmailAction id=\"shareEmail\" press=\"onShareEmailPress\"/>\n\t\t</semantic:sendEmailAction>\n\n\t\t<semantic:shareInJamAction>\n\t\t\t<semantic:ShareInJamAction id=\"shareInJam\" visible=\"{FLP>/isShareInJamActive}\" press=\"onShareInJamPress\"/>\n\t\t</semantic:shareInJamAction>\n\n\t\t<semantic:saveAsTileAction>\n\t\t\t<footerbar:AddBookmarkButton id =\"shareTile\" title=\"{objectView>/saveAsTileTitle}\" />\n\t\t</semantic:saveAsTileAction>\n\n\t</semantic:FullscreenPage>\n\n</mvc:View>",
		"emp/nom/sub/view/App.view.xml": "<mvc:View\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\tcontrollerName=\"emp.nom.sub.controller.App\"\n\tdisplayBlock=\"true\"\n\txmlns=\"sap.m\">\n\n\t<App id=\"app\"\n\t\t busy=\"{appView>/busy}\"\n\t\t busyIndicatorDelay=\"{appView>/delay}\"/>\n\n</mvc:View>",
		"emp/nom/sub/localService/mockserver.js": "sap.ui.define([\n\t\t\"sap/ui/core/util/MockServer\"\n\t], function (MockServer) {\n\t\t\"use strict\";\n\t\tvar oMockServer,\n\t\t\t_sAppModulePath = \"emp/nom/sub/\",\n\t\t\t_sJsonFilesModulePath = _sAppModulePath + \"localService/mockdata\";\n\n\t\treturn {\n\n\t\t\t/**\n\t\t\t * Initializes the mock server.\n\t\t\t * You can configure the delay with the URL parameter \"serverDelay\".\n\t\t\t * The local mock data in this folder is returned instead of the real data for testing.\n\t\t\t * @public\n\t\t\t */\n\t\t\tinit : function () {\n\t\t\t\tvar oUriParameters = jQuery.sap.getUriParameters(),\n\t\t\t\t\tsJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),\n\t\t\t\t\tsManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + \"manifest\", \".json\"),\n\t\t\t\t\tsEntity = \"EmpHeaderInfoSet\",\n\t\t\t\t\tsErrorParam = oUriParameters.get(\"errorType\"),\n\t\t\t\t\tiErrorCode = sErrorParam === \"badRequest\" ? 400 : 500,\n\t\t\t\t\toManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,\n\t\t\t\t\toMainDataSource = oManifest[\"sap.app\"].dataSources.mainService,\n\t\t\t\t\tsMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(\".xml\", \"\"), \".xml\"),\n\t\t\t\t\t// ensure there is a trailing slash\n\t\t\t\t\tsMockServerUrl = /.*\\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + \"/\";\n\n\t\t\t\toMockServer = new MockServer({\n\t\t\t\t\trootUri : sMockServerUrl\n\t\t\t\t});\n\n\t\t\t\t// configure mock server with a delay of 1s\n\t\t\t\tMockServer.config({\n\t\t\t\t\tautoRespond : true,\n\t\t\t\t\tautoRespondAfter : (oUriParameters.get(\"serverDelay\") || 1000)\n\t\t\t\t});\n\n\t\t\t\t// load local mock data\n\t\t\t\toMockServer.simulate(sMetadataUrl, {\n\t\t\t\t\tsMockdataBaseUrl : sJsonFilesUrl,\n\t\t\t\t\tbGenerateMissingMockData : true\n\t\t\t\t});\n\n\t\t\t\tvar aRequests = oMockServer.getRequests(),\n\t\t\t\t\tfnResponse = function (iErrCode, sMessage, aRequest) {\n\t\t\t\t\t\taRequest.response = function(oXhr){\n\t\t\t\t\t\t\toXhr.respond(iErrCode, {\"Content-Type\": \"text/plain;charset=utf-8\"}, sMessage);\n\t\t\t\t\t\t};\n\t\t\t\t\t};\n\n\t\t\t\t// handling the metadata error test\n\t\t\t\tif (oUriParameters.get(\"metadataError\")) {\n\t\t\t\t\taRequests.forEach( function ( aEntry ) {\n\t\t\t\t\t\tif (aEntry.path.toString().indexOf(\"$metadata\") > -1) {\n\t\t\t\t\t\t\tfnResponse(500, \"metadata Error\", aEntry);\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\t// Handling request errors\n\t\t\t\tif (sErrorParam) {\n\t\t\t\t\taRequests.forEach( function ( aEntry ) {\n\t\t\t\t\t\tif (aEntry.path.toString().indexOf(sEntity) > -1) {\n\t\t\t\t\t\t\tfnResponse(iErrorCode, sErrorParam, aEntry);\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t\toMockServer.start();\n\n\t\t\t\tjQuery.sap.log.info(\"Running the app with mock data\");\n\t\t\t},\n\n\t\t\t/**\n\t\t\t * @public returns the mockserver of the app, should be used in integration tests\n\t\t\t * @returns {sap.ui.core.util.MockServer} the mockserver instance\n\t\t\t */\n\t\t\tgetMockServer : function () {\n\t\t\t\treturn oMockServer;\n\t\t\t}\n\t\t};\n\n\t}\n);"
	}
});