var tubeLabelBarcodeMaxlength = 2;
var plateLabelBarcodeMaxlength = 17;
var smallPlateLabelBarcodeMaxlength = 13;


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

var hideWalkUpInputs = function(){
  $("label[for='from']").hide();
  $('#from').hide().val('');
  $("label[for='to']").hide();
  $('#to').hide().val('');
}

var showWalkUpInputs = function(){
  $("label[for='from']").show();
  $('#from').show();
  $("label[for='to']").show();
  $('#to').show();
}

var hideBarcodeInput = function(){
  $("label[for='barcode']").hide();
  $('#barcode').hide().val('');
}

var showBarcodeInput = function(){
  $("label[for='barcode']").show();
  $('#barcode').show();
}

var formSetup = function(){
  $("#labels_options").val('with_barcode')
  hideWalkUpInputs()
  $("#labware_type").val('plate')
  $('#barcode').attr('maxlength', plateLabelBarcodeMaxlength);
  getPrinters()
}

var changeFormBasedOnLabwareType = function () {
  $('#small').prop('checked', false);
  $('#ean13').prop('checked', false);
  if ($('#labware_type').val() == 'tube') {
    $("label[for='size']").prop('hidden', true)
    $('#small').prop('hidden', true)
    $('#barcode').attr('maxlength', tubeLabelBarcodeMaxlength)
  } else {
    $('#barcode').attr('maxlength', plateLabelBarcodeMaxlength)
  }
}

var changeBarcodeLengthIfLabelSizeHasChanged = function() {
  if (this.checked) {
    $('#barcode').attr('maxlength', smallPlateLabelBarcodeMaxlength)
  } else {
    changeFormBasedOnLabwareType();
  }
}

var changeBarcodeLengthIfBarcodeTypeChanged = function() {
  if (this.checked) {
    $('#barcode').attr('maxlength', '13')
  } else {
    changeFormBasedOnLabwareType();
  }
}

var removeIrrelevantInputs = function () {
  if (this.value =='with_barcode') {
    showBarcodeInput()
    hideWalkUpInputs()
  } else {
    hideBarcodeInput()
    showWalkUpInputs()
  }
}