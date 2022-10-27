# MMM-TimeTreeEvent
Display your TimeTree event on your magic mirror.

## Features

## Screenshot
- `Sample screenshot 1`  
![Screenshot](https://github.com/sabo10o29/MMM-TimeTreeEvent/blob/master/sc01.png)

- `Sample screenshot 2`  
![Screenshot](https://github.com/sabo10o29/MMM-TimeTreeEvent/blob/master/sc02.png)


## UPDATE
**1.0.0**
- Simple viewer for TimeTree event.

**1.0.1**
- Temporary fix: Add request lib.

**1.0.2**
- Migrate to axios from request.

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
    //Positions of *_bar and *_third are not support.
    position: "top_left",
    config: {
        appid: "***Your api key***",
        //You need to get the target calender id with Get calender id api[1]
        calenderid: "***Calender id***",
    }
},
```
[[1] Get calender id api](https://developers.timetreeapp.com/ja/docs/api#get-calendarscalendar_id)  

## Optional Configuration

| Option               | Description
|--------------------- |-----------
| `upadteinterval`     | Update interval to get event from TimeTree.  <br><br>**Type:** `int` <br> **Default value:** `3 * 60 * 60 *1000 (3 hours)`
| `timeFormat`         | Display the scheduled time based on [moment.js](https://momentjs.com/docs/). <br><br>**Type:** `String` <br> **Default value:** `HH:mm`
| `eventWordCount`     | Maximum length to show the event title. <br><br>**Type:** `int` <br> **Default value:** `10`
| `days`               | Get events from today to n-th day. <br><br>**Type:** `int` <br> **Default value:** `1`
| `title`              | Title name <br><br>**Type:** `String` <br> **Default value:** `Today's event　　`
| `timezone`           | Timezone. The format is according to the [Time Zone Database](https://www.iana.org/time-zones). <br><br>**Type:** `String` <br> **Default value:** `Asia/Tokyo`

