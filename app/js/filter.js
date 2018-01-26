'use script';
var room = [];
var floor = [];
var cost1 = 0;
var cost2 = 0;
var area1 = 0;
var area2 = 0;
var flat = {};
var data = [
   {id: 1, number: "2,18", floor: 1, room: 1, area: "22.5", cost: "2000.5", flat: "flat2.png"},
   {id: 2, number: "2,12", floor: 2, room: 1, area: "21.5", cost: "3000.5", flat: "flat3.png"},
   {id: 3, number: "2,18", floor: 1, room: 1, area: "21.5", cost: "3500.5", flat: "flat2.png"},
   {id: 4, number: "2,15", floor: 2, room: 1, area: "22", cost: "1900.5", flat: "flat3.png"},
   {id: 5, number: "2,18", floor: 2, room: 1, area: "21", cost: "2000", flat: "flat2.png"},
   {id: 6, number: "2,18", floor: 1, room: 1, area: "22.5", cost: "2000.5", flat: "flat3.png"},
   {id: 7, number: "2,18", floor: 1, room: 2, area: "50.5", cost: "2000.5", flat: "flat1.png"},
   {id: 8, number: "2,12", floor: 2, room: 2, area: "51.5", cost: "3000.5", flat: "flat1.png"},
   {id: 9, number: "2,18", floor: 3, room: 2, area: "51.5", cost: "3500.5", flat: "flat1.png"},
   {id: 10, number: "2,15", floor: 1, room: 2, area: "52", cost: "1900.5", flat: "flat1.png"},
   {id: 11, number: "2,18", floor: 2, room: 2, area: "51", cost: "2000", flat: "flat1.png"},
   {id: 12, number: "2,18", floor: 1, room: 2, area: "52.5", cost: "2000.5", flat: "flat1.png"},
   {id: 13, number: "2,18", floor: 2, room: 3, area: "100", cost: "7300.5", flat: "flat4.png"},
   {id: 14, number: "2,18", floor: 3, room: 3, area: "94", cost: "6700.5", flat: "flat4.png"},
   {id: 15, number: "2,12", floor: 3, room: 3, area: "101", cost: "7000.5", flat: "flat4.png"},
   {id: 16, number: "2,18", floor: 3, room: 3, area: "89", cost: "6500.5", flat: "flat4.png"},
   {id: 17, number: "2,15", floor: 1, room: 3, area: "102", cost: "6900.5", flat: "flat4.png"},
   {id: 18, number: "2,18", floor: 1, room: 3, area: "110", cost: "7000", flat: "flat4.png"},
   {id: 19, number: "2,18", floor: 2, room: 3, area: "90", cost: "6000.5", flat: "flat4.png"},
   {id: 20, number: "2,18", floor: 1, room: 1, area: "22.5", cost: "2000.5", flat: "flat2.png"},
   {id: 21, number: "2,18", floor: 1, room: 2, area: "62.5", cost: "2000.5", flat: "flat1.png"},
   {id: 22, number: "2,12", floor: 2, room: 2, area: "61.5", cost: "3000.5", flat: "flat1.png"},
   {id: 23, number: "2,18", floor: 3, room: 2, area: "70.5", cost: "3500.5", flat: "flat1.png"},
   {id: 24, number: "2,15", floor: 1, room: 2, area: "62", cost: "1900.5", flat: "flat1.png"},
   {id: 25, number: "2,18", floor: 2, room: 2, area: "61", cost: "2000", flat: "flat1.png"},
   {id: 26, number: "2,18", floor: 1, room: 2, area: "72.5", cost: "2000.5", flat: "flat1.png"},
   {id: 27, number: "2,18", floor: 1, room: 3, area: "100", cost: "7300.5", flat: "flat4.png"},
   {id: 28, number: "2,18", floor: 3, room: 3, area: "94", cost: "6700.5", flat: "flat4.png"},
   {id: 29, number: "2,12", floor: 2, room: 3, area: "101", cost: "7000.5", flat: "flat4.png"},
   {id: 30, number: "2,18", floor: 3, room: 3, area: "89", cost: "6500.5", flat: "flat4.png"},
   {id: 31, number: "2,15", floor: 3, room: 3, area: "102", cost: "6900.5", flat: "flat4.png"},
   {id: 32, number: "2,18", floor: 1, room: 3, area: "110", cost: "7000", flat: "flat4.png"},
   {id: 33, number: "2,18", floor: 2, room: 3, area: "90", cost: "6000.5", flat: "flat4.png"}
];

function onLoad () {
   // открывать фильтр при открытии страницы
   if (document.location.search.indexOf ("filter") > 0) openFilter ();
   screen ();
}

function select (type, val) {
   var el = "";
   if (type === "room") {
      el = document.getElementById (type + val);
      if (el.style.background) {
         el.style.background = "";
         room.splice (room.indexOf (val), 1);
      } else {
         el.style.background = "#07c551";
         room.push (val);
      }
   }
   if (type === "floor") {
      el = document.getElementById (type + val);
      if (el.style.background) {
         el.style.background = "";
         floor.splice (floor.indexOf (val), 1);
      } else {
         el.style.background = "#07c551";
         floor.push (val);
      }
   }
   screen ()
}

function toInput (type, val, event) {

   var inputText = parseFloat (event.target.value.replace (",", "."));
   if (type === "cost") inputText = parseInt (event.target.value.replace (/\s+/g, ""));

   if (type === "cost" && isNaN (inputText)) {
      document.getElementById (type + val).value = "";
   }else{
      if (type === "cost") document.getElementById (type + val).value = inputText.toLocaleString ("ru");
      if (type === "area") document.getElementById (type + val).value = event.target.value.replace (/[-":'/a-zA-Zа-яА-Я ]/, '');
   }

   if (type === "cost" && val === 1) cost1 = inputText;
   if (type === "cost" && val === 2) cost2 = inputText;
   if (type === "area" && val === 1) area1 = inputText;
   if (type === "area" && val === 2) area2 = inputText;

   screen ()
}

function screen () {
   var list = [];
   for (var i = 0; i < data.length; i++) {
      var el = data[i];
      if (room.length !== 0 && room.indexOf (el.room) === -1) continue;
      if (floor.length !== 0 && floor.indexOf (el.floor) === -1) continue;

      if (cost1 !== 0 && parseFloat (el.cost) * 1000 < cost1) continue;
      if (cost2 !== 0 && parseFloat (el.cost) * 1000 > cost2) continue;

      if (area1 !== 0 && parseFloat (el.area) < area1) continue;
      if (area2 !== 0 && parseFloat (el.area) > area2) continue;

      list.push (el)
   }

   var html = "";
   list.forEach (function (el) {
      html += "<tr onclick=\"showFlat(event)\"><td>" + el.number + "</td><td>" + el.floor + "</td><td>" + el.room + "</td><td>" + el.area + "</td><td>" + el.cost + "</td><td>" + el.flat + "</td></tr>";
   });

   if (document.getElementById ("button-planirovki")) document.getElementById ("button-planirovki").style.display = "none";
   if (document.getElementById ("divFlat")) document.getElementById ("divFlat").innerHTML = "";
   if (document.getElementById ("screen")) {
      document.getElementById ("screen").innerHTML = html;
      return;
   }

   // ниже код, для работы с картой
   var jsonAsk = {};
   if (room.length>0) jsonAsk.rooms = room;
   if (cost1 || cost2) jsonAsk.cost = [cost1, cost2];
   if (area1 || area2) jsonAsk.square = [area1, area2];
   if (floor.length>0) jsonAsk.floors = floor;

   getData ("getGenplanJSON", jsonAsk).then (function (res) {
      console.log (" res = ", res);
      initMap (res);
   });
}

function screen2 (flootArea) {

   var list = [];
   for (var i = 0; i < data.length; i++) {
      var el = data[i];
      if (flootArea === el.area) list.push (el)
   }

   var html = "";
   list.forEach (function (el) {
      html += "<tr onclick=\"showFlat(event)\"><td>" + el.number + "</td><td>" + el.floor + "</td><td>" + el.room + "</td><td>" + el.area + "</td><td>" + el.cost + "</td><td>" + el.flat + "</td></tr>";
   });
   document.getElementById ("screen").innerHTML = html;
}

function clearRoom () {
   room = [];
   document.getElementById ("room1").style.background = "";
   document.getElementById ("room2").style.background = "";
   document.getElementById ("room3").style.background = "";
}

function clearFloor () {
   floor = [];
   document.getElementById ("floor1").style.background = "";
   document.getElementById ("floor2").style.background = "";
   document.getElementById ("floor3").style.background = "";
}

function clearAll () {
   clearRoom ();
   clearFloor ();
   cost1 = 0;
   cost2 = 0;
   area1 = 0;
   area2 = 0;
   document.getElementById ("cost1").value = "";
   document.getElementById ("cost2").value = "";
   document.getElementById ("area1").value = "";
   document.getElementById ("area2").value = "";
   screen ();
}

function openFilter (bool) {
   var opener = document.getElementsByClassName ("b-filter_opener")[0];
   var filterBody = document.getElementsByClassName ("b-filter-body")[0];
   if (!bool && filterBody.style.display !== 'block') {
      opener.style.padding = '10px 14px 16px 14px';
      filterBody.style.display = 'block'
   } else {
      opener.style.padding = '10px 14px 7px';
      filterBody.style.display = 'none'
   }

   var divFlat = document.getElementById("divFlat");

   var smallFilter = document.getElementsByClassName ("b-planirovki")[0];
   var plans = document.getElementById("plans");
   if (smallFilter && filterBody.style.display !== 'block' && divFlat.innerHTML=="") {
      smallFilter.style.display = 'block';
      plans.style.display = 'block';
   } else {
      smallFilter.style.display = 'none';
      plans.style.display = 'none';
   }
}

function showFlat (event) {
   var tr = event.target.parentElement;
   var el = tr.innerHTML;

   // выбранную строку выделяем цветом
   var trLine = tr.parentElement.children;
   for (var i = 0; i < trLine.length; i++) {
      trLine[i].style.color = "";
   }
   tr.style.color = "red";

   var arr = el.substring (4, el.length - 5).split ("</td><td>");
   flat = {number: arr[0], floor: arr[1], room: arr[2], area: arr[3], cost: arr[4], flat: arr[5]};
   var text = '<img class="b-img-center" style="width: 100%" src="images/flat/' + arr[5] + '" />';
   text += '<br><br><div class="mebel">Мебель <img id="onOff" class="onOff" onclick="showWithFurniture()" src="images/off.png"/></div>';
   text += '<div id="info" class="info"></div>';
   text += '<div><h2>Квартиры с такой планировкой</h2></div>';
   document.getElementById ("divFlat").innerHTML = text;
   document.getElementById ("button-planirovki").style.display = "block";
   document.getElementById ("info").innerHTML = '<div>Квартира-студия, ' + arr[3] + ' м<sup>2</sup> </div>';


   var text = '<div><h2>' + flat.room + '-комнатная квартира, ' + flat.area + ' м<sup>2</sup></h2></div>';
   text += 'ДОМ № ' + flat.number + '<br>';
   text += 'КВ.М' + flat.area + '<br>';
   text += 'ЭТАЖ  ' + flat.floor + '<br>';
   text += 'СТОИМОСТЬ  ' + (flat.cost * 1000).toLocaleString ("ru") + ' ₽<br>';
   text += '<div class="b-button white"><a href="javascript:alert()">Оставить заявку</a></div>';
   document.getElementById ("info").innerHTML = text;

   openFilter ("скрыть");
}

function toListArea () {
   screen2 (flat.area);
   document.getElementById ("button-planirovki").style.display = "none";
}


function showWithFurniture () {
   var div = document.getElementById ("onOff");
   var boolean = div.src.indexOf ("on") > 0;
   div.src = boolean ? "images/off.png" : "images/on.png";
   alert (" function : showWithFurniture ");
}