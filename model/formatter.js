sap.ui.define([], function() {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function(sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},

		iconNominationProgram: function(sValue) {
			var sIcon;
			switch (sValue) {
				case "1":
					sIcon = "sap-icon://save";
					break;
				case "2":
					sIcon = "sap-icon://complete";
					break;
				case "3":
					sIcon = "sap-icon://pending";
					break;
			}

			return sIcon;
		},

		iconNominationProgramColor: function(sValue) {
			var sIconColor;
			switch (sValue) {
				case "1":
					sIconColor = "orange";
					break;
				case "2":
					sIconColor = "green";
					break;
				case "3":
					sIconColor = "red";
					break;
			}

			return sIconColor;
		}

	};

});