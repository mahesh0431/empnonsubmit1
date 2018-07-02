/* global _:true */
sap.ui.define([
	"sap/ui/comp/valuehelpdialog/ValueHelpDialog",
	"sap/ui/table/Table"
], function(ValueHelpDialog) {
	"use strict";

	return {

		initializeValueRequestDialog: function(valueHelpTexts, cols, keys) {
			this.oValueHelpTexts = valueHelpTexts;
			this.aCols = cols;
			this.aKeys = keys;
			this.oColModel = new sap.ui.model.json.JSONModel();
			this.oRowModel = new sap.ui.model.json.JSONModel();
		},

		onInputValueRequest: function(baseController, valueReqObj, fnHandleSelected) {
			this.baseController = baseController;
			this.valueHelpHandleOk = fnHandleSelected;
			switch (valueReqObj) {
				case "ProjectSearch":
					this.valueRequestDialogForProject();
					break;
				case 'EmployeSearch':
					this.valueRequestDialogForEmployees();
				default:
			}
		},

		valueRequestDialogForProject: function() {
			var vEmpNo, aFilters = [],
				aCols = [],
				aKeys = [],
				oValueHelpTexts = {};
			aCols = [{
				label: "Project Def.",
				template: "Key"
			}, {
				label: "Description",
				template: "Value"
			}, {
				label: "WBS Element",
				template: "WbsEle"
			}, {
				label: "WBS Description",
				template: "WbsDescr"
			}];

			vEmpNo = this.baseController.getView().getModel("tsEmpAppData").getData().empData.EmpNo;
			aFilters.push(new sap.ui.model.Filter({
				path: "EmpNo",
				operator: "EQ",
				value1: vEmpNo
			}));
			aKeys = [aCols[0].template, [], aCols[1].template];
			oValueHelpTexts = {
				valueHelpTitle: "Search for Projects",
				valueHelpTableTitle: "Project Search Results"
			};

			this.initializeValueRequestDialog(oValueHelpTexts, aCols, aKeys);
			this.baseController.oDataManager.readProjectValueRequest(aFilters, jQuery.proxy(this.onValueRequestDataLoadSuccess, this));
		},

		valueRequestDialogForEmployees: function() {
			var aCols = [],
				aKeys = [],
				oValueHelpTexts = {};
			aCols = [{
				label: "Employee No.",
				template: "Key"
			}, {
				label: "Employee Name",
				template: "Value"
			}];

			aKeys = [aCols[0].template, [], aCols[1].template];
			oValueHelpTexts = {
				valueHelpTitle: "Search for Employees",
				valueHelpTableTitle: "Emploee Search Results"
			};

			this.initializeValueRequestDialog(oValueHelpTexts, aCols, aKeys);
			this.baseController.oDataManager.readEmployeeValueRequest(jQuery.proxy(this.onValueRequestDataLoadSuccess, this));
		},

		onValueRequestDataLoadSuccess: function(data, response) {
			// Initialize Value Help Dialog
			this.baseController.getView().setBusy(false);
			if (!this.oValueHelpDialog) {
				this.oValueHelpDialog = new ValueHelpDialog({
					basicSearchText: "",
					supportMultiselect: false,
					title: this.oValueHelpTexts.valueHelpTitle,
					key: this.aKeys[0],
					keys: this.aKeys[1],
					descriptionKey: this.aKeys[2],
					stretchOnPhone: true,
					ok: function(oEvent) {
						this.valueHelpHandleOk(oEvent.getParameter("tokens"));
						this.oValueHelpDialog.fireCancel();
					}.bind(this),
					cancel: function(oEvent) {
						this.oValueHelpDialog.close();
					}.bind(this),
					afterClose: function() {
						this.oFilterBar.destroy();
						this.oValueHelpDialog.destroy();
						this.oValueHelpDialog = undefined;
						this.oFilterBar = undefined;
						this.valueHelpCloneTableData = undefined;
					}.bind(this)
				});
			}

			// Value help Dialog Table Modelling

			// Set Table Rows & Columns Data
			this.oColModel.setData({
				cols: this.aCols
			});
			this.oRowModel.setData(data.results);

			// Set Table Columns and Row Data Model
			this.oValueHelpDialog.getTable().setModel(this.oColModel, "columns");
			this.oValueHelpDialog.getTable().setModel(this.oRowModel);

			// Set Table bindings
			if (this.oValueHelpDialog.getTable().bindRows) {
				this.oValueHelpDialog.getTable().bindRows("/");
			}

			if (this.oValueHelpDialog.getTable().bindItems) {
				var oTable;
				oTable = this.oValueHelpDialog.getTable();
				if (oTable) {
					oTable.bindAggregation("items", "/", function(id, context) {
						var aCols = oTable.getModel("columns").getData().cols;
						return new sap.m.ColumnListItem({
							cells: aCols.map(function(element) {
								var colname = element.template;
								return new sap.m.Label({
									text: "{" + colname + "}"
								});
							})
						});
					});
				}
			}
			// Set Table Properties

			// Initialize Filter Bar for Value Help
			if (!this.oFilterBar) {
				this.oFilterBar = new sap.ui.comp.filterbar.FilterBar({
					advancedMode: true,
					filterBarExpanded: false,
					showGoOnFB: !sap.ui.Device.system.phone,
					search: function(odata, fnSearch, oEvent) {
						this.oValueHelpDialog.getFilterBar().getBasicSearch().search();
						// sap.m.MessageToast.show("Search pressed '" + arguments[0].mParameters.selectionSet[0].getValue() + "''");
					}.bind(this)
				});
			}

			if (this.oFilterBar.setBasicSearch) {
				var searchString;
				this.oFilterBar.setBasicSearch(new sap.m.SearchField({
					showSearchButton: sap.ui.Device.system.phone,
					placeholder: "Search",
					liveChange: function(oEvent) {
						searchString = oEvent.getParameter("newValue");
						this.onValueHelpBasicSearch(searchString);
					}.bind(this),
					search: function(oEvent) {
						searchString = oEvent.getParameter("query");
						this.onValueHelpBasicSearch(searchString);
					}.bind(this)
				}));
			}

			// Set Filter Bar for Value Help Dialog 
			this.oValueHelpDialog.setFilterBar(this.oFilterBar);
			this.oValueHelpDialog.addStyleClass("sapUiSizeCompact");
			this.oValueHelpDialog.open();
			this.oValueHelpDialog.update();
			// Set table Properties
			// this.oValueHelpDialog.getTable().getTitle().setText(this.oValueHelpTexts.valueHelpTableTitle + " : " + data.results.length);

		},

		onValueHelpBasicSearch: function(string) {
			var oValueHelpTableModel, valueHelpTableData, searchResultData;
			oValueHelpTableModel = this.oValueHelpDialog.getTable().getModel();
			if (!this.valueHelpCloneTableData)
				this.valueHelpCloneTableData = oValueHelpTableModel.getData();

			if (this.valueHelpCloneTableData)
				valueHelpTableData = this.valueHelpCloneTableData;

			if (valueHelpTableData) {
				searchResultData = _.filter(valueHelpTableData, function(item) {
					for (var i = 0; i < this.aCols.length; i++) {
						var col = this.aCols[i].template;
						// if (item[col].toLowerCase().indexOf(string.toLowerCase()) !== -1 || item[col].toLowerCase().indexOf(string.toLowerCase()) !== -1)
						if (item[col].toLowerCase().indexOf(string.toLowerCase()) !== -1)
							return item;
					}

				}.bind(this));
				oValueHelpTableModel.setData(searchResultData);
			}
			oValueHelpTableModel.refresh();
		}

	};

});