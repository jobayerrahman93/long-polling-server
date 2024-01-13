# What To Build

1. We want to build an awkward mix between a realtime long-polling server and a queue system.
2. When someone requests `http://localhost:3031/blocking-get?key=tomato`, the browser will hang for 30 seconds, or until some data shows up for the `key` `tomato`.
3. If `30` seconds passes without any data being sent to the key `tomato` the server will return `null`
4. If data shows up for the `key` `tomato` before the `30` seconds are up the server will immediately return the data to the browser without any waiting or delay.
5. JSON data will be sent to the server via `POST` request to `http://localhost:3031/push?key=tomato`
6. The `key` can honestly be anything we want.
7. If there are multiple browsers listening for the same `key` , and only a single data for that `key` is posted to the server, only one of the browsers will recieve this data, the other will wait for more data or will timeout and return `null`
