sap.ui.define([
		"sap/ui/model/Filter"
	],

	function(Filter) {
		"use strict";

		var ModelHelper = {
			getNewFilter: function(path, operator, value1, value2) {
				return new Filter({
					path: path,
					operator: operator,
					value1: value1,
					value2: value2
				});
			}
		};

		return ModelHelper;

	});