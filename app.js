
$(document).ready(function() {

  getPrinters()

  $('form').submit(function(event) {
    var printJob = new PrintJob(toObject($(this).serializeArray()));
    printJob.execute();
    event.preventDefault();
  });

});
