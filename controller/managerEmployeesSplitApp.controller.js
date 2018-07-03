sap.ui.define([
	"emp/nom/sub/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(Controller) {
	"use strict";

	return Controller.extend("emp.nom.sub.controller.managerEmployeesSplitApp", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf emp.nom.sub.view.managerEmployeesSplitApp
		 */
		onInit: function() {
			var oListSelector = this.getOwnerComponent().oListSelector;
			// Makes sure that master view is hidden in split app
			// after a new list entry has been selected.
			oListSelector.attachListSelectionChange(function() {
				this.byId("idSplitAppControl").hideMaster();
			}, this);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf emp.nom.sub.view.managerEmployeesSplitApp
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf emp.nom.sub.view.managerEmployeesSplitApp
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf emp.nom.sub.view.managerEmployeesSplitApp
		 */
		//	onExit: function() {
		//
		//	}

	});

});