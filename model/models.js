sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createFLPModel: function() {
			var fnGetUser = jQuery.sap.getObject("sap.ushell.Container.getUser"),
				bIsShareInJamActive = fnGetUser ? fnGetUser().isJamActive() : false,
				oModel = new JSONModel({
					isShareInJamActive: bIsShareInJamActive
				});
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createCompParamModel: function(params) {
			var oModel = new JSONModel(params);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		getProgramFormModel: function() {
			return new JSONModel({
				ProgId: "",
				NominId: "",
				ProgName: "",
				ProgType: "",
				NominByMgr: "",
				Status: "",
				StatusTxt: "",
				NominEmpNo: "",
				editerValue: "",
				checkbox1: "",
				checkbox2: "",
				checkbox3: "",
				checkbox4: "",
				checkbox5: "",
				checkbox6: "",
				checkbox7: "",
				checkbox8: "",
				checkbox9: "",
				checkbox10: ""
			});
		}

	};

});