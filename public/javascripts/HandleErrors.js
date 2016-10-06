showErrors = function(data){
  var text = errorText(data);
  $('.result').attr('id', 'error').text(text);
};

errorText = function(data){
  switch (data.status) {
    case 502:
      return 'Pmb is down';
      break;
    case 422:
      return prettify_errors(data.responseJSON.errors)
      break;
    default:
      return "Something went wrong";
  }
}

prettify_errors = function(obj) {
  var result = "";
  $.each(obj, function(k, v) {
    result += k + ": " + v.join(', ') + "\n";
  });
  return result;
}
