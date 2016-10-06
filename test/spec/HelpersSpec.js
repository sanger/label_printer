describe("Helpers", function() {
  var arr, result;

  it("should convert array to object", function(){
    arr = [{'name': 'name1', 'value': 'value1'}, {'name': 'name2', 'value': 'value2'}, {'name': 'name3', 'value': 'value3'}];
    result = {'name1': 'value1', 'name2': 'value2', 'name3': 'value3'};
    expect(toObject(arr)).toEqual(result)
  });

});