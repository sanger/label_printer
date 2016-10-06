
$(document).ready(function() {

  getPrinters()

  $('#barcode').keyup(removeFromAndTo)

  $('#type').change(disableCheckboxIfTube);

  $('form').submit(function(event) {
    refreshResult();
    formData = toObject($(this).serializeArray())
    var printJob = new PrintJob(formData);
    printJob.execute();
    event.preventDefault();
  });

});
