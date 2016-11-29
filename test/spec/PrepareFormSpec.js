describe("PrepareForm", function() {
  var data;

  it("should add printers", function(){
    loadFixtures( 'AppFixture.html');
    data ={'data': [{'attributes': {'name': 'name1'}}, {'attributes': {'name': 'name2'}}, {'attributes': {'name': 'name3'}}]};
    addPrinters(data);
    expect($("select[id='printer_name']>option")).toHaveLength(3);
    expect($("#name1")).toHaveText("name1");
    expect($("#name2")).toHaveText("name2");
    expect($("#name3")).toHaveText("name3");
  });

  describe('get printers from pmb', function(){
    var request, url, testResponses;
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

      url = baseUrl() + 'printers'
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it("should call addPrinters if success", function(){

      spyOn(window, 'addPrinters');
      getPrinters();

      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe(url);

      request.respondWith(testResponses.execute.success);
      expect(addPrinters).toHaveBeenCalled();

    });

    it("should handle errors if error", function(){

      spyOn(window, 'addPrinters');
      spyOn(window, 'showErrors');

      getPrinters();

      request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe(url);

      request.respondWith(testResponses.execute.error);
      expect(addPrinters).not.toHaveBeenCalled();
      expect(showErrors).toHaveBeenCalled();
    });
  });

  it("should hide barcode if walk_up option was chosen", function(){

    loadFixtures( 'AppFixture.html');
    formSetup()

    expect($("#from")).toBeHidden();
    expect($("#to")).toBeHidden();
    expect($("#barcode")).toBeVisible();

    var labels_options = $('#labels_options');
    labels_options.change(removeIrrelevantInputs)
    labels_options.val('walk_up').change()

    expect($("#from")).toBeVisible();
    expect($("#to")).toBeVisible();
    expect($("#barcode")).toBeHidden();
  });

  it("should hide small size option if tube was chosen", function(){
    loadFixtures( 'AppFixture.html');
    formSetup()

    expect($("#cbox")).toBeVisible();
    expect($("#barcode").attr('maxlength')).toEqual('17');

    var labware_type = $('#labware_type');
    labware_type.change(changeFormBasedOnLabwareType)
    labware_type.val('tube').change()

    expect($("#cbox")).toBeHidden();
    expect($("#barcode").attr('maxlength')).toEqual('2');

  });

});