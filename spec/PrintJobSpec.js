describe("PrintJob", function() {
  var data, printJob;
  var label, labels, result, attributes;

  beforeEach(function() {
    data = {'from': '1', 'to': '3', 'text': 'some_text', 'type': 'plate', 'printer_name': 'test'}
    printJob = new PrintJob(data);
  });

  it("should have attributes", function() {
    expect(printJob.type).toEqual('plate');
    expect(printJob.from).toEqual('1');
    expect(printJob.to).toEqual('3');
    expect(printJob.text).toEqual('some_text');
    expect(printJob.printer_name).toEqual('test');
  });

  it("should create the right label for plate", function(){
    label = printJob.label(1);
    expect(label).toEqual({"main_label": {"middle_line": 'some_text 1'}});
  });

  it("should create the right label for tube", function(){
    printJob.type = 'tube'
    label = printJob.label(1);
    expect(label).toEqual({"main_label": {"middle_line": 'some_text 1', "round_label" : '1'}});
  });

  it("should create the right labels", function(){
    labels = printJob.labels();
    result = {'body':
                [{ 'main_label': { 'middle_line': 'some_text 1' }},
                 { 'main_label': { 'middle_line': 'some_text 2' }},
                 { 'main_label': { 'middle_line': 'some_text 3' }}
                ]
              }
    expect(labels).toEqual(result);
  });

  it("should create the right attributes", function(){
    attributes = printJob.attributes(5);
    result = {"data":
                {"attributes":
                  {"printer_name" : 'test',
                  "label_template_id" : 5,
                  "labels" :
                    {'body':
                      [{ 'main_label': { 'middle_line': 'some_text 1' }},
                       { 'main_label': { 'middle_line': 'some_text 2' }},
                       { 'main_label': { 'middle_line': 'some_text 3' }}
                      ]
                    }
                  }
                }
              }
    expect(attributes).toEqual(result);
  });

  describe('execute', function(){
    var request, url, testResponses;
    var success, error;

    beforeEach(function() {
      jasmine.Ajax.install();

      testResponses = {
        execute: {
          success: {
            status: 200,
            responseText: '{"data":[{ "id": "1", "type": "label_templates", "attributes": {"name": "LabWhere"}, "relationships": {}}], "included":[]}'
          },
          error:{
            status: 502,
            responseText: '{}'
          }
        }
      };

      url = baseUrl() + 'label_templates?filter[name]=multiple_labels_walk_up_plate'
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it("should print if success", function(){

      spyOn(printJob, 'print');
      printJob.execute();

      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe(url);

      request.respondWith(testResponses.execute.success);
      expect(printJob.print).toHaveBeenCalled();

    });
    it("should handle errors if error", function(){

      spyOn(printJob, 'print');
      spyOn(window, 'showErrors');

      printJob.execute();

      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe(url);

      request.respondWith(testResponses.execute.error);
      expect(printJob.print).not.toHaveBeenCalled();
      expect(showErrors).toHaveBeenCalled();
    });
  });

  describe('print', function(){
    var request, url, testResponses, data;
    var success, error;

    beforeEach(function() {
      jasmine.Ajax.install();

      testResponses = {
        execute: {
          success: {
            status: 200,
            responseText: '{}'
          },
          error:{
            status: 502,
            responseText: '{}'
          }
        }
      };

      data = {"data":[{ "id": "1"}]}

      url = baseUrl() + 'print_jobs'
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it("should call success if success", function(){

      spyOn(printJob, 'success');
      printJob.print(data);

      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe(url);

      request.respondWith(testResponses.execute.success);
      expect(printJob.success).toHaveBeenCalled();

    });

    it("should handle errors if error", function(){

      spyOn(printJob, 'success');
      spyOn(window, 'showErrors');

      printJob.print(data);

      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe(url);

      request.respondWith(testResponses.execute.error);
      expect(printJob.success).not.toHaveBeenCalled();
      expect(showErrors).toHaveBeenCalled();
    });
  });

  it("success should add id and text to the right element", function(){
    loadFixtures( 'AppFixture.html');
    printJob.success();
    expect($('.result')).toHaveText("Your labels have been sent to printer");
    expect($('.result')).toHaveAttr( 'id', 'success' )
  });
});
