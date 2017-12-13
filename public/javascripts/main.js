
$(document).ready(function() {

  formSetup()

  $('#labels_options').change(removeIrrelevantInputs);
  $('#labware_type').change(changeFormBasedOnLabwareType);
  $('#small').change(changeBarcodeLengthIfLabelSizeHasChanged);
  $('#ean13').change(changeBarcodeLengthIfBarcodeTypeChanged);

  $('form').submit(function(event) {
    refreshResult();
    formData = toObject($(this).serializeArray())
    var printJob = new PrintJob(formData);
    printJob.execute();
    event.preventDefault();
  });

});
