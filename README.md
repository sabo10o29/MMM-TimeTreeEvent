# MMM-TimeTreeEvent
Display your TimeTree event on your magic mirror.

## Features

## Screenshot
- `Sample screenshot 1`  
![Screenshot](https://github.com/sabo10o29/MMM-TimeTreeEvent/blob/master/sc1.png)

- `Sample screenshot 2`  
![Screenshot](https://github.com/sabo10o29/MMM-TimeTreeEvent/blob/master/sc2.png)


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
        //You need to get the target calender id with Get calender id api[1]
        calenderid: "***Calender id***",
    }
},
```
[[1] Get calender id api](https://developers.timetreeapp.com/ja/docs/api#get-calendarscalendar_id)  

## Configuration

| Option               | Description
|--------------------- |-----------
| `upadteinterval`     | Update interval to get event from TimeTree.  <br><br>**Type:** `int` <br> **Default value:** `3 * 60 * 60 *1000 (3 hours)`
| `timeFormat`         | Display the scheduled time based on [moment.js](https://momentjs.com/docs/). <br><br>**Type:** `String` <br> **Default value:** `HH:mm`
| `eventWordCount`     | Maximum length to show the event title. <br><br>**Type:** `int` <br> **Default value:** `20`
| `days`               | Get events from today to n-th day. <br><br>**Type:** `int` <br> **Default value:** `1`

