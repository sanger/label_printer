
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

var removeBarcode = function(){
  if($(this).val().length ==0){
    $("label[for='barcode']").show();
    $('#barcode').show();
  } else {
    $("label[for='barcode']").hide();
    $('#barcode').hide().val('');
  };
}

var disableCheckboxIfTube = function () {
    $("label[for='size']").prop('hidden', this.value == 'tube');
    $('#cbox').prop('hidden', this.value == 'tube').prop('checked', false);
  }

var removeIrrelevantInputs = function () {
  if (this.value =='with_barcode') {
    $("label[for='barcode']").show();
    $('#barcode').show();
    $("label[for='from']").hide();
    $('#from').hide().val('');
    $("label[for='to']").hide();
    $('#to').hide().val('');
  } else {
    $("label[for='barcode']").hide();
    $('#barcode').hide().val('');
    $("label[for='from']").show();
    $('#from').show();
    $("label[for='to']").show();
    $('#to').show();
  }
}