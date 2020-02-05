/* Magic Mirror Module: MMM-TimeTreeEvent helper
 * Version: 1.0.0
 *
 * By Yoshikazu Murase https://github.com/sabo10o29
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require("request");

module.exports = NodeHelper.create({

	start: function () {
		console.log("MMM-TimeTreeEvent helper, started...");
		this.result = null;

	},

	getTimeTreeEventData: function(payload) {

		var that = this;
		this.url = payload.url;

		request(payload, function(error, response, body) {
			var result = JSON.parse(body);

			if (!error && response.statusCode == 200) {
				that.result = result;
			} else {
				Log.info("Failed to get time tree event data!");
				that.result = null;
			}

			that.sendSocketNotification("GOT-TIMETREE-EVENT", {"url": that.url, "result": that.result});
		});
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "GET-TIMETREE-EVENT") {
			this.getTimeTreeEventData(payload);
		}
	}

});