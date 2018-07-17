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

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
        labels = ['0-0.5', '0.5-1.0', '1.0-1.5', '1.5-2.0', '2.0-2.5', '2.5-3.0', '3.0-3.5', '3.5+'];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);


function createFeatures(earthquakeData) {


  for (var i = 0; i < earthquakeData.length; i++) {
    L.circle(earthquakeData[i].geometry.coordinates.reverse().splice(1), {
      fillOpacity: 0.75,
      color: "white",
      fillColor: getColor(earthquakeData[i].properties.mag),
      radius: earthquakeData[i].properties.mag * 50000
    }).bindPopup("<h2>Magnitude: " + earthquakeData[i].properties.mag + "</h2> <hr> <h3>" + earthquakeData[i].properties.place + "</h3>").addTo(myMap);


    var data1 = (tData.features[0].geometry.coordinates);

    var data2 = (data1[0]);

    var multiPolyLineOptions = {color:'red'};
    var polyline = L.polyline(data2, multiPolyLineOptions).addTo(myMap);






  }
}
