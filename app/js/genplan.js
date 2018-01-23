$ (document).ready (function () {

   var act = null;
   var data = null;

   // получаем из адресной строки параметры поиска
   var search = document.location.search;
   if (search) {
      params = search.split ("&");
      act = params[0].split ("=")[1];
      data = params[1].split ("=")[1];
      data = JSON.parse (decodeURIComponent (data));
   }


   if ($ ('#leafletmap').length > 0) {
      try {
         getData (act, data)
         // getData (act, {"rooms":[3],"cost":[3029366,3474504],"square":[47,61],"floors":[3],"remont":true})
         .then (function (res) {
            if (console && console.log) {
               // console.log("====",res);
               // s.data = res;
               // s.mapLayers = res;

               // if(res.filterSetDefault !== "undefined") {
               //    s.filterSetDefault   = res.filterSetDefault
               //    	// console.log(s.data.filterSetDefault)
               //     // console.log(s.filterSetDefault)
               // }

               initMap (res);
            }
         });
      }
      catch (e) {
         console.log (e)
      }
   }
});
