
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

var removeFromAndTo = function(){
  if($(this).val().length ==0){
    $("label[for='from']").show();
    $('#from').show();
    $("label[for='to']").show();
    $('#to').show();
  } else {
    $("label[for='from']").hide();
    $('#from').hide().val('');
    $("label[for='to']").hide();
    $('#to').hide().val('');
  };
}

var disableCheckboxIfTube = function () {
    $("label[for='size']").prop('hidden', this.value == 'tube');
    $('#cbox').prop('hidden', this.value == 'tube').prop('checked', false);
  }