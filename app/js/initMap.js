'use strict';
var map;
var maxBounds = [[-140.625, 0], [0, 250]];
// var mapInitZoom = 3;
// var map_w = 8000;
// var map_h = 2800;
// var map_z = 5;
var maxZoom = 6;

var poligons = [];         // полигоны
var markersPoligon = [];   // названия полигонов
var markers = [];          // квартиры

map = L.map ('leafletmap', {
   editable: false,
   maxZoom: maxZoom,
   minZoom: 3,
   crs: L.CRS.Simple,
   pin: true,
   maxBounds: maxBounds,
   pinCircle: true,
   pinControl: true,
   guideLayers: [],
   scrollWheelZoom: true
});

function plusMinus (val) {
   var currentZoom = map.getScaleZoom (1);
   map.setZoom (currentZoom + val);
}


// tile layer
L.tileLayer ('http://tsarevodom.ru/tiles/{z}-{x}-{y}.jpg', {}).addTo (map);


function initMap (res) {

   if (!res) {
      alert ("не получены данные для карты")
   }

   clearFlatsFromMap();

   if (res.zoomId[4]) addPoligons (res.zoomId[4].areas);
   if (res.zoomId[5]) addMarkers (res.zoomId[5].areas);

   map.on ('moveend', function () {
      var mapBoundX = 1999; // ширина генплана
      var widthDiv = 270; // ширина поля указателя зума
      var div = document.getElementsByClassName ('leaflet-zoom-boat')[0];
      var Bounds = map.getPixelBounds ();

      var minX = Bounds.min.x;
      var maxX = Bounds.max.x;
      var zoom = map.getZoom ();
      var scale = Math.pow (2, zoom - 3);
      var left = widthDiv * minX / mapBoundX / (scale);
      var width = (maxX - minX) * widthDiv / mapBoundX / (scale);

      div.style.width = (width - 2) + "px";
      div.style.left = left + "px";

      toVisibilytes (zoom);
   });

   /*скрытие/показ слоев*/
   function toVisibilytes (zoom) {
      if (zoom > 2 && zoom < 4) {
         poligons.forEach (function (poligon) {
            addObject (poligon)
         });
         markersPoligon.forEach (function (marker) {
            addObject (marker)
         });
         markers.forEach (function (mark) {
            removeObject (mark)
         });
      } else {
         poligons.forEach (function (poligon) {
            removeObject (poligon)
         });
         markersPoligon.forEach (function (marker) {
            removeObject (marker)
         });
         markers.forEach (function (mark) {
            addObject (mark)
         });
      }
   }

}

function clearFlatsFromMap(){
   poligons.forEach (function (poligon) {
      removeObject (poligon)
   });
   markersPoligon.forEach (function (marker) {
      removeObject (marker)
   });
   markers.forEach (function (mark) {
      removeObject (mark)
   });
   poligons = [];
   markersPoligon = [];
   markers = [];
}

function removeObject (val) {
   map.removeLayer (val);
}

function addObject (val) {
   val.addTo (map);
}

function addMarkers (areas) {
   markers = [];
   for (var i = 0; i < areas.length; i++) {
      var el = areas[i];
      for (var j = 0; j < el.markers.length; j++) {
         var item = el.markers[j];
         var number = item.house_no;
         var latlang = item.latlang;
         var myIcon2 = new L.DivIcon ({
            html: '<img class="leafletFlatMark" src="images/point.png"/>' +
            '<span class="leafletFlatMark">' + number + '<p>ДОМ</p></span>'
         });

         // console.log (" item = ", item); // todo в маркер внести данные
         var mark = L.marker (latlang, {icon: myIcon2}).addTo (map);
         L.DomEvent.addListener (mark, 'click', function () {
            document.location = "03_planirovki.html"
         });
         markers.push (mark);
      }
   }
}

function addPoligons (areas) {
   markersPoligon = [];
   poligons = [];
   for (var i = 0; i < areas.length; i++) {
      var el = areas[i];
      var polygon = L.polygon (el.polygon, {color: el.fillColor}).addTo (map);
      poligons.push (polygon);
      map.fitBounds (polygon.getBounds ());

      var myIcon1 = new L.DivIcon ({
         html: '<img class="leafletDarkMark" src="images/point2.png"/>' +
         '<span class="leafletDarkMark">' + el.tooltip + '</span>'
      });

      var point = [el.polygon[0][0] - 1, el.polygon[0][1] + 15];
      var marker = L.marker (point, {icon: myIcon1}).addTo (map);
      markersPoligon.push (marker);
      ///L.DomEvent.addListener(marker, 'click', function(){document.location="03_planirovki.html"});
   }
}