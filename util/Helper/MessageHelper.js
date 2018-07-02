sap.ui.define([
		"sap/ui/base/EventProvider",
		"sap/m/MessageBox",
		'sap/m/MessagePopover',
		'sap/m/MessagePopoverItem',
		"sap/ui/model/Binding"
	],

	function(EventProvider, MessageBox, MessagePopover, MessagePopoverItem, Binding) {
		"use strict";

		return EventProvider.extend("emp.nom.sub.util.Helper.MessageHelper", {

			constructor: function(baseController) {
				this._baseController = baseController;
				this._initHandleMessages();
			},

			information: function(message) {
				MessageBox.information(message);
			},

			_getMessagePopoverItem: function() {
				if (!this.oMessagePopoverItem) {
					this.oMessagePopoverItem = new MessagePopoverItem({
						type: "{messages>type}",
						title: "{messages>message}",
						description: "{messages>description}"
					});
				}
				return this.oMessagePopoverItem;
			},

			_initHandleMessages: function() {
				this._initializeMessagePopver();
				var oBinding = new Binding(this._baseController.getMessageModel(), "/", this._baseController.getMessageModel().getContext("/"));
				oBinding.attachChange(this._baseController.handleAppMessages.bind(this._baseController));
			},

			_initializeMessagePopver: function() {
				var fnPopoverItem = function() {
					return new MessagePopoverItem({
						type: "{messages>type}",
						title: "{messages>message}",
						description: "{messages>description}"
					});
				};
				if (!this.oMessagePopver) {
					this.oMessagePopver = new MessagePopover({
						items: {
							path: 'messages>/',
							template: fnPopoverItem()
						}
					});
					this.oMessagePopver.setModel(this._baseController.getMessageModel(), "messages");
				}
			},

			getMessagePopover: function() {
				if (this.oMessagePopver.getModel("messages").getData().length > 0) {
					return this.oMessagePopver;
				} else {
					return false;
				}
			}

		});
	});