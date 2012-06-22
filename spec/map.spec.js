/*
 vim:sw=2:ts=2:et
*/
var TaleOfTwoMongos = require('../taleoftwomongos');

global.emitCall = {
} ;

global.emit = function(key, value) {
  emitCall.callCount++;

  if (typeof emitCall.map[key] === 'undefined') {
    return emitCall.map[key] = [value];
  }

  return emitCall.map[key] = emitCall.map[key].concat(value);
}

describe("The map function for counting words", function() {
  var context ;

  beforeEach(function() {
    emitCall = {
      callCount: 0, 
      map: {}
    };

    context = {
      line: "",
    };
  });
  
  it("should exist", function() {
    expect(TaleOfTwoMongos.map).toBeDefined();
  });

  it("should emit nothing for an empty string", function() {

    TaleOfTwoMongos.map.apply(context);
    
    expect(emitCall.callCount).toBe(0);
  });

  it("should emit 1 for \"the\"", function() {
    context.line = "the";

    TaleOfTwoMongos.map.apply(context);

    expect(emitCall.callCount).toBe(1);
    expect(emitCall.map["the"]).toBeDefined();
    expect(emitCall.map["the"]).toEqual([1]);
  });

  it("should emit 1 for \"these\"", function() {
    context.line = "these";

    TaleOfTwoMongos.map.apply(context);

    expect(emitCall.callCount).toBe(1);
    expect(emitCall.map["these"]).toBeDefined();
    expect(emitCall.map["these"]).toEqual([1]);
  });

  it("should emit  for \"the the\"", function() {
    context.line = "the the";

    TaleOfTwoMongos.map.apply(context);

    expect(emitCall.callCount).toBe(2);
    expect(emitCall.map["the"]).toBeDefined();
    expect(emitCall.map["the"]).toEqual([1,1]);
  });

});
