sap.ui.define([
	"emp/nom/sub/controller/BaseController",
	"sap/ui/richtexteditor/RichTextEditor"
], function(BaseController, RTE) {
	"use strict";

	return BaseController.extend("emp.nom.sub.controller.ProgNominForm", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		onInit: function() {
			this.getRouter().getRoute("program").attachPatternMatched(this._onObjectMatched, this);
		},

		onBeforeRendering: function() {

		},

		onAfterRendering: function() {
			// var oRichTextEditor = new RTE("idFormEditor", {
			// 	editorType: sap.ui.richtexteditor.EditorType.TinyMCE4,
			// 	width: "100%",
			// 	height: "600px",
			// 	customToolbar: true,
			// 	showGroupFont: true,
			// 	showGroupLink: true,
			// 	showGroupInsert: true,
			// 	value: ""
			// });

			// this.getView().byId("idFormEditorLayout").addContent(oRichTextEditor);
			// sap.ui.getCore().applyChanges();
		},

		/* ============================================================ */
		/* Event Handlers                                               */
		/* =============================================================*/

		handleNavBack: function() {
			this.navBack();
		},

		/* ============================================================ */
		/* Controller Methods                                           */
		/* =============================================================*/
		_onObjectMatched: function(mObject) {
			var programId = mObject.getParameter("arguments").programID;
			this.getModel().attachEventOnce("requestFailed", this._programRequestFailed, this);
			this.getView().bindElement("/" + this.getModel().createKey("EmpProgListSet", {
				ProgId: programId
			}), {
				events: {
					dataReceived: function(oEvent) {

					}.bind(this)
				}
			});

		},

		_programRequestFailed: function(oEvent) {

		},

		_onBindingChange: function() {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

		}
	});

});