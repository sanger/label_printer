var toObject = function(array){
  var formData = new Object;
  for (i = 0; i < array.length; i++) {
    formData[array[i]['name']] = array[i]['value']
  }
  return formData
}