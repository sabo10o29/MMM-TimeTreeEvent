/* global Log, Module, moment, config */
/* Magic Mirror
 * Module: MMM-TimeTreeEvent
 *
 * By sabo10o29
 * MIT Licensed.
 */
Module.register("MMM-TimeTreeEvent",{
	// Module config defaults.
	defaults: {

		apiBase: "https://timetreeapis.com/",
		calendarsEndpoint: "calendars",
		eventEndpoint: "upcoming_events",
		timezone: "Asia/Tokyo",
		include: "creator,label,attendees",
		timeformat: "HH:mm",
		upadteinterval: 3 * 60 * 60 *1000, //msec
		eventwordcount: 20,
		days: 1,

	},

	todayEvents: [],

	// Define required scripts.
	getScripts: function() {
		return ["moment.js", "eventobject.js"];
	},
	// Define styles.
	getStyles: function() {
		return ["timetree_styles.css"];
	},
	// Define start sequence.
	start: function() {
		var self = this;
		Log.info("Starting module: " + self.name);

		setInterval(function() {
			that.sendSocketNotification("GET-TIMETREE-EVENT", this.getOptions());
		}, self.config.upadteinterval);

		this.sendSocketNotification("GET-TIMETREE-EVENT", this.getOptions());
	},

	//描画内容を更新するための設定
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("ul");
		wrapper.className = "timetree";

		for(var i = 0; i < this.todayEvents.length; i++){
			var event = this.todayEvents[i];
			var eventLi = document.createElement("li");
			eventLi.className = "event";

			if(event.all_day){
				eventLi.appendChild(this.getAlldayEvent(event));
			}else{
				eventLi.appendChild(this.getTimeEvent(event));
			}
			wrapper.appendChild(eventLi);

		}
		return wrapper;
	},

	getContentText: function(event) {
		var content = "";
		for(var j = 0; j < event.attendee_ids.length; j++){
			for(var k = 0; k < this.config.users.length; k++){
				var id = this.config.users[k].id;
				if(id == event.attendee_ids[j]){
					content += this.config.users[k].initial;
				}
			}
			if(j != event.attendee_ids.length - 1){
				content += ", ";
			}
		}
		content += ": " + event.title;
		content = this.multByteStringSlice(content, this.config.eventwordcount);
		return content;
	},

	strLength: function( strSrc ){
		len = 0;
		strSrc = escape(strSrc);
		for(i = 0; i < strSrc.length; i++, len++){
			if(strSrc.charAt(i) == "%"){
				if(strSrc.charAt(++i) == "u"){
					i += 3;
					len++;
				}
				i++;
			}
		}
		return len;
	},

	multByteStringSlice: function(str , strLimit ){
		var isSlice = false;
		while( this.strLength(str) > strLimit ){
			str = str.slice(0, str.length-1);
			isSlice = true;
		}
		if( isSlice ){
			str += "...";
		}
		return str;
	},

	getAlldayEvent: function(event) {
		var eventDiv = document.createElement("div");
		eventDiv.className = "event";
		//Create time
		var alldayList = document.createElement("ul");
		alldayList.className = "allday";
		var allday = document.createElement("li");
		allday.innerHTML = "All-day";
		//Create content
		var content = document.createElement("text");
		content.className = "allday_content";
		content.innerHTML = this.getContentText(event);
		//
		alldayList.appendChild(allday);
		eventDiv.appendChild(alldayList);
		eventDiv.appendChild(content);
		return eventDiv;
	},

	getTimeEvent: function(event) {
		var eventDiv = document.createElement("div");
		eventDiv.className = "event";
		//Create time
		var time = document.createElement("ul");
		time.className = "time";
		var st = document.createElement("li");
		st.innerHTML = moment(event.start_at).format(this.config.timeformat);
		var to = document.createElement("li");
		to.innerHTML = "-";
		var end = document.createElement("li");
		end.innerHTML = moment(event.end_at).format(this.config.timeformat);
		time.appendChild(st);
		time.appendChild(to);
		time.appendChild(end);
		//Create content
		var content = document.createElement("text");
		content.className = "time_content";
		content.innerHTML = this.getContentText(event);
		//
		eventDiv.appendChild(time);
		eventDiv.appendChild(content);
		return eventDiv;
	},

	getUrl() {
		return this.config.apiBase + this.config.calendarsEndpoint + "/" +this.config.calenderid + "/" +this.config.eventEndpoint + this.getParams();
	},

	getParams() {
		let params = "?";
		params += "timezone=" + this.config.timezone;
		params += "&days=" + this.config.days;
		params += "&include=" + this.config.include;
		return params;
	},

	getHeaders() {
		return headers = {
			"Authorization": "Bearer " + this.config.appid
		};
	},

	getOptions() {
		return options = {
			url: this.getUrl(),
			method: "GET",
			headers: this.getHeaders()
		};
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "GOT-TIMETREE-EVENT" && payload != null) {
			Log.info("Success to get timetree event!!");
			this.todayEvents = [];
			for (var i = 0; i < payload.result.data.length; i ++) {
				const o = new EventObject(payload.result.data[i]);
				this.todayEvents.push(o);
			}
			this.updateDom(1000);
		}
	}

});

