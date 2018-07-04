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
				checkbox1: false,
				checkbox2: false,
				checkbox3: false,
				checkbox4: false,
				checkbox5: false,
				checkbox6: false,
				checkbox7: false,
				checkbox8: false,
				checkbox9: false,
				checkbox10: false
			});
		}

	};

});