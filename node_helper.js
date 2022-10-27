/* Magic Mirror Module: MMM-TimeTreeEvent
 * Version: 1.0.0
 *
 * By sabo10o29 https://github.com/sabo10o29
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var axios = require('axios');

module.exports = NodeHelper.create({

	start: function () {
		console.log("MMM-TimeTreeEvent helper, started...");
		this.result = null;

	},

	getTimeTreeEventData: function(payload) {
		var that = this;
		axios.get(payload.url, {
			headers: payload.headers
		  })
		  .then(function (response) {
			that.sendSocketNotification("GOT-TIMETREE-EVENT", {"url": payload.url, "result": response.data});
		  })
		  .catch(function (error) {
			that.sendSocketNotification("GOT-TIMETREE-EVENT", {"url": payload.url, "result": null});
		  })
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "GET-TIMETREE-EVENT") {
			this.getTimeTreeEventData(payload);
		}
	}

});