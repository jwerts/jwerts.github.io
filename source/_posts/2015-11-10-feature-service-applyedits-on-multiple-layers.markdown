---
layout: post
title: "Feature Service applyEdits on Multiple Layers"
date: 2015-11-10 13:09:37 -0500
comments: true
categories: ["ArcGIS Server", "esri", "Javascript", "REST", "testing"]
---

_OR "Unit testing esri Javascript API services with Karma/Mocha/Chai/Sinon"_

If you've worked with any of the esri web API's over the last several years, chances are you've used a Feature Service to edit an SDE feature class at some point.  Using the web API's, the obvious way to do this would be to construct a <a href="https://developers.arcgis.com/javascript/jsapi/featurelayer-amd.html">FeatureLayer</a> and call its <a href="https://developers.arcgis.com/javascript/jsapi/featurelayer-amd.html#applyedits">applyEdits</a> method.  This is well supported and in reality, makes use of the ArcGIS Server REST API's applyEdits endpoint on an individual service layer.  Example:

```
http://[host]/arcgis/rest/services/[folder]/[service]/[layerid]/FeatureServer/applyEdits
```

But what happens if you want to applyEdits to multiple layers within the Feature Service instead of just one layer?  You've got a few options here after constructing multiple feature layers:

- Call applyEdits on each FeatureLayer with <a href="https://dojotoolkit.org/api/?qs=1.10/dojo/promise/all">dojo/promise/all</a>:

```js
// construct FeatureLayers
flayer1 = new FeatureLayer("http://MyServer/arcgis/rest/services/MyServiceFolder/MyService/0");
flayer2 = new FeatureLayer("http://MyServer/arcgis/rest/services/MyServiceFolder/MyService/1");

// call applyEdits
var deferred1 = flayer.applyEdits(adds1, deletes1, updates1);
var deferred2 = flayer.applyEdits(adds2, deletes2, updates2);

// use dojo/All to respond to success or failure when both operations finish
all([deferred1, deferred2], function(results) {
  // do something with results
}, function(error) {
  // uh oh, one of them failed.
});
```
