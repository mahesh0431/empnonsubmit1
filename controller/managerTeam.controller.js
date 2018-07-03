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
			var oList = this.getView().byId("teamMembersTable");

			this.getView().addEventDelegate({
				onBeforeFirstShow: function() {
					this.getOwnerComponent().oListSelector.setBoundMasterList(oList);
				}.bind(this)
			});

			this.getOwnerComponent().getModel().metadataLoaded().then(function() {
				this.mangerNo = '156';
				var sObjectPath = this.getModel().createKey("EmpHeaderInfoSet", {
					EmpNo: '156'
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
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

			// this.getModel().metadataLoaded().then(function() {
			// 	var sObjectPath = this.getModel().createKey("EmpHeaderInfoSet", {
			// 		EmpNo: this.mangerNo
			// 	});
			// 	this._bindView("/" + sObjectPath);
			// }.bind(this));

			this.getView().byId("teamMembersTable").getBinding("items").filter([new Filter("Empmgrno", FilterOperator.Contains, this.mangerNo)]);

			// Below logic is used when the employees are loaded and the first employe is automaticallly selected
			this.getOwnerComponent().oListSelector.oWhenListLoadingIsDone.then(
				function(mParams) {
					if (mParams.list.getMode() === "None") {
						return;
					}
					var sObjectId = mParams.firstListitem.getBindingContext().getProperty("Empno");
					this.getRouter().navTo("managerteammember", {
						managerNo: this.mangerNo,
						employeeId: sObjectId
					}, true);
				}.bind(this),
				function(mParams) {
					if (mParams.error) {
						return;
					}
					// this.getRouter().getTargets().display("detailNoObjectsAvailable");
				}
			);
		},

		/*********************************************************************************************************/
		/** Local Methods 
		/*********************************************************************************************************/

		_bindView: function(sObjectPath) {
			this.getView().bindElement({
				path: sObjectPath,
				events: {
					// change: this._onBindingChange.bind(this),
					dataRequested: function() {
						this.getOwnerComponent().getModel().metadataLoaded().then(function() {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							this.getView().setBusy(true);
						}.bind(this));
					}.bind(this),
					dataReceived: function() {
						this.getView().setBusy(false);
					}.bind(this)
				}
			});
		},

		_showDetail: function(oItem) {
			var bReplace = !Device.system.phone;
			this.getRouter().navTo("managerteammember", {
				managerNo: this.mangerNo,
				employeeId: oItem.getBindingContext().getProperty("Empno")
			}, bReplace);
		}

	});

});