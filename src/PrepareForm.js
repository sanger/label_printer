
var addPrinters = function(data){
  var printers_names = new Array;
  for (i = 0; i < data['data'].length; i++) {
    name = data['data'][i]['attributes']['name'];
    printers_names.push(name)
  }
  $.each(printers_names, function(val, text) {
    $('#printer_name').append( $('<option></option>').attr('id', text).html(text) )
  });
};

var getPrinters = function(){
  $.ajax({
    url : baseUrl() + 'printers',
    type : 'GET',
    success: addPrinters,
    error: showErrors
  })
};