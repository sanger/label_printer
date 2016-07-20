
PrintJob = function(data){
	this.baseUrl = 'http://localhost:8080/pmb/';
  this.startNum = data['from'];
  this.endNum = data['to'];
  this.text = data['text'];
  this.type = data['type'];
  this.printer_name = data['printer_name'];
};

PrintJob.prototype.attributes = function(label_template_id){
	return {"data":{"attributes":{"printer_name" : this.printer_name, "label_template_id" : label_template_id, "labels" : this.labels()}}}
};

PrintJob.prototype.labelTube = function(number){
	return	{"main_label": {"middle_line": this.text + " " + number, "round_label": number}}
};

PrintJob.prototype.labelPlate = function(number){
	return	{"main_label": {"middle_line": this.text + " " + number}}
};

PrintJob.prototype.label = function(number){
	switch (this.type) {
		case 'plate':
			return this.labelPlate(number);
			break;
		case 'tube':
			return this.labelTube(number);
	}
};

PrintJob.prototype.labels = function(){
	var result  = new Array();
	for (i = this.startNum; i <= this.endNum; i++) {
	  label = this.label(String(i));
	  result.push(label)
	}
	return {"body" : result}
};

PrintJob.prototype.labelTemplateUrl=function(){
	var label_template_name = 'multiple_labels_walk_up_' + this.type
	var label_template_url = this.baseUrl+'label_templates?filter[name]=' + label_template_name
	return label_template_url
};

PrintJob.prototype.printUrl=function(){
	return this.baseUrl + 'print_jobs'
};

PrintJob.prototype.headers=function(){
	return {"Accept": "application/vnd.api+json",
					"Content-Type": "application/vnd.api+json"}
};

PrintJob.prototype.print = function(data){
	label_template_id = data['data'][0]['id']

	var attributes = this.attributes(label_template_id)

		request = $.ajax({
			headers: this.headers(),
			url : this.printUrl(),
			type : 'POST',
			dataType: 'json',
			data: JSON.stringify(attributes)
		})
      .done(function(data) {

          console.log(data);

          // validations and errors
      });
}