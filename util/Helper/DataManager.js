sap.ui.define([
		"sap/ui/base/EventProvider"
	],
	function(EventProvider) {
		"use strict";

		return EventProvider.extend("emp.nom.sub.util.Helper.dataManager", {
			constructor: function(baseController) {
				this.oBaseController = baseController;
				this.oModel = this.oBaseController.getOwnerComponent().getModel();
			},

			readEmpProgramList: function(filters, fnSuccess, fnError) {
				var path, aFilters = [],
					urlParams = null;
				path = "/EmpHeaderInfoSet";
				aFilters = filters;
				urlParams = {
					$expand: "EmpProgNomList"
				};
				if(!fnError) {
					fnError = jQuery.proxy(this.handleReadRequestFailed, this);
				}
				this.oModel.metadataLoaded().then(function() {
					this.oDataReadRequest(path, aFilters, urlParams, fnSuccess, fnError);
				}.bind(this));
			},

			// readEmpTimesheetFiltered: function(filters, fnSuccess) {
			// 	var path, aFilters = null,
			// 		urlParams = null;
			// 	path = "/EmployeeTimesheetSet";
			// 	aFilters = filters;
			// 	urlParams = {
			// 		$expand: "CalendarMonthsSet,TimesheetEntrySet,AdminProjectsSet"
			// 	};
			// 	this.oBaseController.getOwnerComponent().oWhenMetadataLoaded.then(function() {
			// 		this.oDataReadRequest(path, aFilters, urlParams, fnSuccess, jQuery.proxy(this.handleReadRequestFailed, this));
			// 	}.bind(this));
			// },

			// readProjectValueRequest: function(filters, fnSuccess) {
			// 	var path, aFilters = null,
			// 		urlParams = null;
			// 	path = "/VH_ProjectsSet";
			// 	aFilters = filters;
			// 	this.oBaseController.getOwnerComponent().oWhenMetadataLoaded.then(function() {
			// 		this.oDataReadRequest(path, aFilters, urlParams, fnSuccess, jQuery.proxy(this.handleReadRequestFailed, this));
			// 	}.bind(this));
			// },

			oDataReadRequest: function(path, filters, urlParams, fnSuccess, fnError) {
				this.oModel.read(path, {
					filters: filters,
					urlParameters: urlParams,
					success: fnSuccess,
					error: fnError
				});

			},

			handleReadRequestFailed: function(oError) {
				this.oBaseController.getView().setBusy(false);
			}

		});

	});