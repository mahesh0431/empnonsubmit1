sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("emp.nom.sub.controller.BaseController", {

		getMessageManager: function() {
			return sap.ui.getCore().getMessageManager();
		},

		getMessageModel: function() {
			return this.getMessageManager().getMessageModel();
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		getModel: function(sName) {
			return this.getView().getModel(sName);
		},

		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
		
		navBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		},

		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		}

	});

});