var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

var mapBox = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoibWF0aXVsbGFoMjMiLCJhIjoiY2ppaGE0OWh5MHAxdTNwdGk4MDRyNXFheiJ9._sGKHlQ1kA9JvQ1glTFoQA";

var myMap = L.map("map", {
  center: [19.41, -155.27],
  zoom: 2.5
});

L.tileLayer(mapBox).addTo(myMap);





d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  // console.log(data.features);

});

function getColor(d) {
  return d > 3.5 ? '#ff0000' :
    d > 3 ? '#ff4f00' :
    d > 2.5 ? '#ff7100' :
    d > 2 ? '#ff8d00' :
    d > 1.5 ? '#ffa600' :
    d > 1.0 ? '#ffbd00' :
    d > 0.5 ? '#ffd300' :
    d > 0 ? '#ffea00' :
    '#ffff00';
}

function createFeatures(earthquakeData) {
  var tectonicLength = tData.features[0].geometry.coordinates.length

  for (var i = 0; i < earthquakeData.length; i++) {
    L.circle(earthquakeData[i].geometry.coordinates.reverse().splice(1), {
      fillOpacity: 0.75,
      color: "white",
      fillColor: getColor(earthquakeData[i].properties.mag),
      radius: earthquakeData[i].properties.mag * 50000
    }).bindPopup("<h2>Magnitude: " + earthquakeData[i].properties.mag + "</h2> <hr> <h3>" + earthquakeData[i].properties.place + "</h3>").addTo(myMap);


    console.log(tData.features)
    // for (var i = 0; i < tectonicLength; i++) {
    //   tectonicArray = (tData.features[i].geometry.coordinates[i]);
    // };
    //
    // // var multiPolyLineOptions = {color:'red'};
    // // var multipolyline = L.polyline(tectonicArray, multiPolyLineOptions);
    // // multipolyline.addTo(myMap);
    // //
    // // for (var j = 0; j < tectonicArray.length; j++) {
    // //   tectonicCoordinates = tectonicArray[j].j;
    // // };
    //
    // // var polyline = L.polyline(tectonicCoordinates, {color: 'red'}).addTo(myMap);
    // // map.fitBounds(polyline.getBounds());
    // console.log(tData.features[0].geometry.coordinates[0]);
    // console.log(tectonicArray);

    // console.log





  }
}
