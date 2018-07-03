sap.ui.define([
	"emp/nom/sub/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/Device"
], function(Controller, Filter, FilterOperator, Device) {
	"use strict";

	return Controller.extend("emp.nom.sub.controller.managerTeam", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf emp.nom.sub.view.managerTeam
		 */
		onInit: function() {
			this.getRouter().getRoute("managerteam").attachPatternMatched(this._handleManagerTeamPattern, this);
		},

		/*********************************************************************************************************/
		/** Event Handler Methods 
		/*********************************************************************************************************/
		/** 
		 * Navigate back
		 */
		handleNavBack: function() {
			this.navBack();
		},

		/**
		 * Event handler for the list selection event
		 * @param {sap.ui.base.Event} oEvent the list selectionChange event
		 * @public
		 */
		onSelectionChange: function(oEvent) {
			// get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
			this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
		},

		/** 
		 * For reading the manager no
		 * @constructor 
		 * @param oEvent event data
		 */
		_handleManagerTeamPattern: function(oEvent) {
			this.mangerNo = oEvent.getParameter("arguments").managerNo;
			this.getView().byId("teamMembersTable").getBinding("items").filter([new Filter("Empmgrno", FilterOperator.Contains, this.mangerNo)]);
		},

		/*********************************************************************************************************/
		/** Local Methods 
		/*********************************************************************************************************/
		_showDetail: function(oItem) {
			var bReplace = !Device.system.phone;
			this.getRouter().navTo("managerteammember", {
				managerNo: this.mangerNo,
				employeeId: oItem.getBindingContext().getProperty("Empno")
			}, bReplace);
		}

	});

});