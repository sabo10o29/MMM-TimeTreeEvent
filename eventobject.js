
class EventObject {
	constructor(data) {

		this.id = data.id;
		this.title = data.attributes.title;
		this.all_day = data.attributes.all_day;
		this.start_at = data.attributes.start_at;
		this.end_at = data.attributes.end_at;
		this.description = data.attributes.description;
		this.location = data.attributes.location;
		this.user_id = this.getUserID(data.relationships.creator.data.id);
		this.attendee_ids = this.getAttendees(data);

	}

	getUserID(id){
		return id.substring(id.indexOf(",") + 1, id.length);
	}

	getAttendees(data){
		let datalist = data.relationships.attendees.data;
		let attendees = [];
		for(var i = 0; i < datalist.length; i ++){
			attendees.push(this.getUserID(datalist[i].id));
		}
		return attendees;
	}

}