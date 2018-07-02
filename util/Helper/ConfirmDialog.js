sap.ui.define([
		"sap/m/Dialog",
		"sap/m/Button"
	],
	function(Dialog, Button) {
		"use strict";

		return {
			confirmProceedMessageType: function(fnOk, fnCancel, objectData) {
				// fnOk = fnOk;
				var oDialog = new Dialog({
					icon: objectData.icon,
					title: objectData.title,
					type: objectData.type,
					content: objectData.content,
					beginButton: new Button({
						text: objectData.buttonText,
						press: function() {
							fnOk();
							oDialog.close();
						}
					}),
					endButton: new Button({
						text: 'Cancel',
						press: function() {
							fnCancel();
							oDialog.close();
						}
					}),
					afterClose: function() {
						oDialog.destroy();
					}
				});
				oDialog.addStyleClass("sapUiSizeCompact");
				oDialog.open();
			}
		};

	});