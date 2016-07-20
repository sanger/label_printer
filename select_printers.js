$(document).ready(function() {

	$.ajax({

		url : 'http://localhost:8080/pmb/printers',
		type : 'GET'

	})
    .done(function(data) {

      var printers_names = new Array;

    	for (i = 0; i < data['data'].length; i++) {
			  name = data['data'][i]['attributes']['name'];
			  printers_names.push(name)
			}

      $.each(printers_names, function(val, text) {
				$('#printer_name').append( $('<option></option>').val(text).html(text) )
			});

    });

});