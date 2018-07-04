sap.ui.define([
	"emp/nom/sub/controller/BaseController",
	"sap/ui/richtexteditor/RichTextEditor",
	"emp/nom/sub/model/models"
], function(BaseController, RTE, models) {
	"use strict";

	return BaseController.extend("emp.nom.sub.controller.ProgNominForm", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		onInit: function() {
			this.getRouter().getRoute("program").attachPatternMatched(this._onRouteMatched, this);
			this.getRouter().getRoute("managerteammemberprogram").attachPatternMatched(this._onRouteMatchedTeamMember, this);
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

		/** 
		 * This below method is triggered when the manager opens his team member submission
		 * @constructor 
		 * @param oEvent
		 */
		_onRouteMatchedTeamMember: function(oEvent) {

		},

		/** 
		 * This below method is triggered when the manager/employee opens his own submission
		 * @constructor 
		 * @param mObject
		 */
		_onRouteMatched: function(mObject) {
			var programId = mObject.getParameter("arguments").programID;
			// this.getModel().attachEventOnce("requestFailed", this._programRequestFailed, this);
			this._readProgramById(programId);
		},

		_readProgramById: function(programId) {
			this.setInitViewModels();
			var mPage = this.getView().byId("idProgNominForm");

			mPage.setTitle("Program Nomination Form");
			var fmSetProgramData = function(mData) {
				var programFormModel = this.getView().getModel("programForm");
				mPage.setTitle("Program " + mData.ProgId);
				// mForm.getTitle().setText((mData.Status === "2" ? "Display" : "Change") + " Program");
				programFormModel.getData().ProgId = mData.ProgId;
				programFormModel.getData().NominId = mData.ProgName;
				programFormModel.getData().ProgName = mData.ProgType;
				programFormModel.getData().ProgType = mData.ProgType;
				programFormModel.getData().NominByMgr = mData.NominByMgr;
				programFormModel.getData().Status = mData.Status;
				programFormModel.getData().StatusTxt = mData.StatusTxt;
				programFormModel.getData().NominEmpNo = mData.NominEmpNo;
				mData.NominFormDetailSet.results.forEach(function(item) {
					switch (item.Questno) {
						case "001":
							programFormModel.getData().editerValue = item.Answer;
							break;
						case "002":
							var aCheckedItems = item.Answer.split("/");
							aCheckedItems.forEach(function(checked) {
								programFormModel.getData()["checked" + checked] = true;
							});
					}
				});
				programFormModel.refresh();
			}.bind(this);
			this.getModel().read("/" + this.getModel().createKey("EmpProgListSet", {
				ProgId: programId
			}), {
				urlParameters: {
					$expand: "NominFormDetailSet"
				},
				success: function(data, response) {
					fmSetProgramData(data);
				},
				error: function(oError) {

				}
			});

		},

		setInitViewModels: function() {
			this.getView().setModel(models.getProgramFormModel(), "programForm");
		},

		_programRequestFailed: function(oEvent) {

		},

		getFormData: function() {
			var formValue, reasonList = "",
				aFormAnswers = [];
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