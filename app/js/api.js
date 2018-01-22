var getData = function (actionType, data) {
   var _actionType = actionType || 'getGenplanJSON'
   var _datasend = {act: _actionType}


   if (data !== undefined) {
      _datasend.data = JSON.stringify (data)
   }

   return $.ajax ({
      url: 'http://tsarevodom.ru/ajax.php',
      crossDomain: true,
      data: _datasend,
      dataType: 'json'
   })
};