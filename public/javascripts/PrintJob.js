
PrintJob = function(data){
  this.from = data['from'];
  this.to = data['to'];
  this.number_of_copies = data['number_of_copies'];
  this.text = data['text'];
  this.labware_type = data['labware_type'];
  this.printer_name = data['printer_name'];
  this.barcode = data['barcode'];
  this.size = (typeof data['size'] === 'undefined') ? '' : ('_' + data['size']);
};

PrintJob.prototype.attributes = function(label_template_id){
	return {"data":{"attributes":{"printer_name" : this.printer_name, "label_template_id" : label_template_id, "labels" : this.labels()}}}
};

PrintJob.prototype.labels = function(){
  var result  = new Array();
  for (i = this.from; i <= this.to; i++) {
    label = this.label(String(i));
    for (j = 1; j <= this.number_of_copies; j++) {
      result.push(label)
    }
  }
  return {"body" : result}
};

PrintJob.prototype.label = function(number){
  switch (this.labware_type) {
    case 'plate':
      return this.labelPlate(number);
      break;
    case 'tube':
      return this.labelTube(number);
  }
};

PrintJob.prototype.labelTube = function(number){
	return	{"main_label": {"middle_line": this.text + " " + number, "round_label": number.toString(), "barcode": this.barcode}}
};

PrintJob.prototype.labelPlate = function(number){
	return  {"main_label": {"middle_line": this.text + " " + number, "barcode": this.barcode}}
};

PrintJob.prototype.printUrl=function(){
	return baseUrl() + 'print_jobs'
};

PrintJob.prototype.headers=function(){
	return {"Accept": "application/vnd.api+json",
					"Content-Type": "application/vnd.api+json"}
};

PrintJob.prototype.execute=function(){
  $.ajax({
    url : this.labelTemplateUrl(),
    type : 'GET',
    success: this.print.bind(this),
    error: showErrors
  })
}

PrintJob.prototype.labelTemplateUrl=function(){
  var label_template_name = 'multiple_labels_walk_up_' + this.labware_type + this.size
  var label_template_url = baseUrl()+'label_templates?filter[name]=' + label_template_name
  return label_template_url
};

PrintJob.prototype.print = function(data){
	var label_template_id = data['data'][0]['id']
	var attributes = this.attributes(label_template_id)
		request = $.ajax({
			headers: this.headers(),
			url : this.printUrl(),
			type : 'POST',
			dataType: 'json',
			data: JSON.stringify(attributes),
      success: this.success,
      error: showErrors
		})
};

PrintJob.prototype.success = function(data){
  $('.result').attr('id', 'success').text('Your labels have been sent to printer')
};
