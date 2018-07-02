sap.ui.define([
		"emp/nom/sub/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("emp.nom.sub.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);