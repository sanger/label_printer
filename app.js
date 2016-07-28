
$(document).ready(function() {

  getPrinters()

  $('form').submit(function(event) {
    refreshResult();
    formData = toObject($(this).serializeArray())
    var printJob = new PrintJob(formData);
    printJob.execute();
    event.preventDefault();
  });

});
