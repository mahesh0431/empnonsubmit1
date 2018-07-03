sap.ui.define([
	"emp/nom/sub/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"emp/nom/sub/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/Binding",
	"sap/ui/model/FilterOperator",
	"emp/nom/sub/util/Helper/DataManager",
	"emp/nom/sub/util/Helper/ModelHelper",
	"emp/nom/sub/util/Helper/MessageHelper"
], function(BaseController, JSONModel, History, formatter, Filter, Binding, FilterOperator, DataManager, ModelHelper,
	MessageHelper) {
	"use strict";

	return BaseController.extend("emp.nom.sub.controller.Worklist", {

		formatter: formatter,
		ModelHelper: ModelHelper,
		MessageHelper: MessageHelper,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		onInit: function() {
			this.oModel = this.getOwnerComponent().getModel();
			this.oDataManager = new DataManager(this);
			this._messageHelper = new MessageHelper(this);
			this._initializeApplicationModels();

			// Register the routes
			// For nomral employee/manager who is viewing his data
			this.getRouter().getRoute("worklist").attachPatternMatched(this._employeeHandler, this);
			// For manager who views one his team member data
			this.getRouter().getRoute("managerteam").attachPatternMatched(this._teamMemberHandler, this);
		},

		onAfterRendering: function() {
			this._loadApplicationData();

		},

		/* ============================================================ */
		/* Control Event Handlers									    */
		/* =============================================================*/

		handleAppMessages: function() {
			var mAppMessagePopover = this.byId("idAppMessages");
			if (this._messageHelper.getMessagePopover()) {
				mAppMessagePopover.setVisible(true);
				this._messageHelper.getMessagePopover().toggle(mAppMessagePopover);
			} else {
				mAppMessagePopover.setVisible(false);
			}
		},

		handleProgramSelect: function(oEvent) {
			// var programId;

			this.navigateToRoute("program", {
				programID: "P000001"
			});
		},
		
		/** 
		 * The below function will be used to call split app which
		 * shows employee and their nominations
		 */
		handleShowTeam: function(){
			this.getOwnerComponent().getRouter().navTo("managerteam");
		},

		/* ============================================================ */
		/* Controller Methods                                           */
		/* =============================================================*/

		_initializeApplicationModels: function() {

		},

		/** 
		 * This is will be called when an employee/manager is viewing his own data
		 * @constructor 
		 */
		_employeeHandler: function() {
			this.getView().byId("idEmpTsPageCustomBarLabel").setText("Employee Award Nomination");
		},

		/** 
		 * This will be called when a manager is viewing his team members data
		 * @constructor 
		 * @param oEvent to get the employee id
		 */
		_teamMemberHandler: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").employeeId;
			this.getView().byId("idEmpTsPageCustomBarLabel").setText("Manager Award Nomination");
		},

		_loadApplicationData: function() {
			var aFilters = [];
			this.getView().setBusy(true);
			this.oDataManager.readEmpProgramList(aFilters, $.proxy(this.onProgramListLoaded, this), this.handleRequestError.bind(this));
		},

		onProgramListLoaded: function(data) {
			this.getView().setBusy(false);
		},

		handleRequestError: function(oError) {
			this.getView().setBusy(false);
		},

		navigateToRoute: function(routeName, mObject) {
			this.getRouter().navTo(routeName, mObject);
		},

		onSearch: function(oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var oTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					oTableSearchState = [new Filter("EmpName", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(oTableSearchState);
			}

		},

		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @param {object} oTableSearchState an array of filters for the search
		 * @private
		 */
		_applySearch: function(oTableSearchState) {
			var oTable = this.byId("table"),
				oViewModel = this.getModel("worklistView");
			oTable.getBinding("items").filter(oTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (oTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		}

	});
});