# MMM-TimeTreeEvent
Display your TimeTree event on your magic mirror.

## Features
- Aggregate headlines from multiple sources at once.

## Screenshot
- `Sample screenshot 1`
![Screenshot](https://github.com/sabo10o29/MMM-TimeTreeEvent.git/sc1.png)

- `Sample screenshot 1`
![Screenshot](https://github.com/sabo10o29/MMM-TimeTreeEvent.git/sc2.png)


## UPDATE
**1.0.0**
- Simple viewer for TimeTree event.

## Installation
```javascript
cd ~/MagicMirror/modules/
git clone https://github.com/sabo10o29/MMM-TimeTreeEvent.git
cd MMM-TimeTreeEvent
npm install
```

## Get `timetreeapp.com` API Key
https://timetreeapp.com/personal_access_tokens

## Necessary Configuration
```javascript
{
    module: "MMM-TimeTreeEvent",
    position: "top_left",
    config: {
        appid: "***Your api key***",
        //You need to get the target calender id with [Get calender id api][1]
        [1]:https://developers.timetreeapp.com/ja/docs/api#get-calendarscalendar_id
        calenderid: "***Calender id***",
        users: [
            {
                //Optinal, If you want to display your name, need to get your user id with [Get user id api][2]
                [2]:https://developers.timetreeapp.com/ja/docs/api#get-user
                id: "***Your user id***",
                initial: "Display name"
            },
            {
                //Optional, If you want to display the attendees on your magic mirror,
                //you need to check them ids. 
                id: "***Id of an attendee to the calendar***",
                initial: "Display name"
            },
        ],
    }
},
```

## Configuration

| Option               | Description
|--------------------- |-----------
| `upadteinterval`     | The map type to display (roadmap, satellite, hybrid, terrain).  <br><br>**Type:** `int` <br> **Default value:** `3 * 60 * 60 *1000 (3 hours)`