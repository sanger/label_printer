
$(document).ready(function() {

  getPrinters()

  $('#labels_options').change(removeIrrelevantInputs)

  $('#labware_type').change(disableCheckboxIfTube);

  $('form').submit(function(event) {
    refreshResult();
    formData = toObject($(this).serializeArray())
    var printJob = new PrintJob(formData);
    printJob.execute();
    event.preventDefault();
  });

});
