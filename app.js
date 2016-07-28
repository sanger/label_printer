
$(document).ready(function() {

  getPrinters()

  $('form').submit(function(event) {
    refreshResult();
    var printJob = new PrintJob(toObject($(this).serializeArray()));
    printJob.execute();
    event.preventDefault();
  });

});
