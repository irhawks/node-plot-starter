// create map in div 'map'
// var map = new maptalks.Map('map', {
// 	center: [0, 0],
// 	zoom: 2,
// 	baseLayer: new maptalks.TileLayer('base', {
// 		'urlTemplate' : 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
// 		'subdomains'  : ['a','b','c','d'],
// 		'attribution'  : '&copy; <a href="http://www.osm.org/copyright">OSM</a> contributors, '+
// 		'&copy; <a href="https://carto.com/attributions">CARTO</a>'
// 	})
// });

var map = geo.map({
    node: "#map",
    center: {x: -0.1704, y: 51.5047},
    zoom: 14
});
map.createLayer('osm');
