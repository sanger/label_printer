describe("PrintJob", function() {
  var printJob;
  var label;
  var labels;

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

  it("should create the right label", function(){
    label = printJob.label(1);
    expect(label).toEqual({"main_label": {"middle_line": 'some_text 1'}});
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

  describe('execute job', function(){
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

      url = printJob.baseUrl + 'label_templates?filter[name]=multiple_labels_walk_up_plate'
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it("should execute the job if success", function(){

      spyOn(printJob, 'print');
      printJob.execute();

      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe(url);

      request.respondWith(testResponses.execute.success);
      expect(printJob.print).toHaveBeenCalled();

    });
    it("should handle errors if error", function(){

      spyOn(printJob, 'print');
      handleErrors = jasmine.createSpy();

      printJob.execute();

      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe(url);

      request.respondWith(testResponses.execute.error);
      expect(printJob.print).not.toHaveBeenCalled();
      expect(handleErrors).toHaveBeenCalled();
    });
  });
});
