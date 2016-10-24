describe("Handle errors", function() {
  var errors, result, data;

  it("should prettify errors", function(){
    errors = {"printer":["Something is wrong"], "label_template":["Something is wrong", "Something else is wrong"]}
    result = "printer: Something is wrong\nlabel_template: Something is wrong, Something else is wrong\n"
    expect(prettify_errors(errors)).toEqual(result);
  });

  it("should return the right text", function(){
    data = {'status' : null}
    expect(errorText(data)).toEqual("Something went wrong");
    data = {'status' : 502}
    expect(errorText(data)).toEqual("Pmb is down");
    data = {'status' : 422, 'responseJSON' : {'errors' : ''}}
    expect(errorText(data)).toEqual("");
  });

  it("should add id and text to the right element", function(){
    loadFixtures( 'AppFixture.html');
    data = {'status' : null};
    showErrors(data);
    expect($('.result')).toHaveText("Something went wrong");
    expect($('.result')).toHaveAttr( 'id', 'error' )
  });


});