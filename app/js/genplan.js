$ (document).ready (function () {
   if ($ ('#leafletmap').length > 0) {
      try {
         getData ()
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
