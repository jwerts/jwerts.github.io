/**
 * Main JS file for behaviours
 */

/*globals jQuery, document */
(function ($) {
  "use strict";

  $(document).ready(function(){
    var $locationMapDiv = $('#locationMap');
    var latLong = $locationMapDiv.data('latlong');
    var locationName = $locationMapDiv.data('location');

    var tokens = latLong.split(",");
    var lat = parseFloat(tokens[0].trim(), 10);
    var lon = parseFloat(tokens[1].trim(), 10);

    var map = L.map('locationMap').setView([lat, lon], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
      .bindPopup(locationName)
      .openPopup();
  });

}(jQuery));
