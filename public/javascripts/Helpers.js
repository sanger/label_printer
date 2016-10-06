var toObject = function(array){
  var result = new Object;
  for (i = 0; i < array.length; i++) {
    result[array[i]['name']] = array[i]['value']
  }
  return result
}

var baseUrl = function(){
  return '/pmb'
}

var refreshResult = function(){
  $('.result').removeAttr('id').text('.')
}