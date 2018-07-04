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
			this.getRouter().getRoute("program").attachPatternMatched(this._onRouteMatched, this);
		},

		onBeforeRendering: function() {

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
		_onRouteMatched: function(mObject) {
			this.programId = mObject.getParameter("arguments").programID;
			// this.getModel().attachEventOnce("requestFailed", this._programRequestFailed, this);

			// this.getView().bindElement("/" + this.getModel().createKey("EmpProgListSet", {
			// 	ProgId: programId
			// }), {
			// 	events: {
			// 		dataReceived: function(oEvent) {

			// 		}.bind(this)
			// 	}
			// });
		},

		_programRequestFailed: function(oEvent) {

		},

		getFormData: function() {
			var formValue, reasonList, aFormAnswers = [];
			formValue = this.byId("idFormEditor").getValue();
			this.byId("idNominCheckboxGrid").getContent().forEach(function(mItem, index) {
				if (mItem.getSelected() === true) {
					reasonList = reasonList + String(index) + "/";
				}
			});
			aFormAnswers = [{
				Questno: "001",
				Answer: formValue
			}, {
				Questno: "002",
				Answer: reasonList
			}];

			return {
					ProgId: this.programId,
					NominByMgr: "",
					NominId: "",
					ProgName: "",
					ProgType: "",
					ProgTypeDescr: "",
					Status: "",
					NominFormDetailSet: aFormAnswers
				};
		},

		onNominFormSave: function() {
			var formData = this.getFormData();
			formData.Status = "1";
			this._createNominationForm(formData);
		},

		onNominFormSubmit: function() {
			// Check confirm before submit
			var formData = this.getFormData();
			formData.Status = "2";
			this._createNominationForm(formData);
		},

		_createNominationForm: function(formData) {
			this.getView().getModel().create("/EmpProgListSet", formData, {
				success: function(data, response) {
					
				}.bind(this),
				error: function(oError) {

				}
			});

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