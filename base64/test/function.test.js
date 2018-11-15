const { expect } = require("chai");
const testTarget = require("../handler");

const RAW_VALUE = "Hello ContainerConf";
const ENCODED_VALUE = "SGVsbG8gQ29udGFpbmVyQ29uZg==";

describe("Base64 Function", function() {
  it("should encode the provided text", done => {
    const testHandler = (err, result) => {
      expect(err).to.be.undefined;
      expect(result).to.equal(ENCODED_VALUE);
      done();
    };

    testTarget({ encode: true, text: RAW_VALUE }, testHandler);
  });

  it("should decode the provided text", done => {
    const testHandler = (err, result) => {
      expect(err).to.be.undefined;
      expect(result).to.equal(RAW_VALUE);
      done();
    };

    testTarget({ decode: true, text: ENCODED_VALUE }, testHandler);
  });

  it("should return an error when no operation is specified", done => {
    const testHandler = (err, result) => {
      expect(result).to.be.undefined;
      expect(err.message).to.equal("Decode or Encode needs to be true");
      done();
    };

    testTarget({ text: ENCODED_VALUE }, testHandler);
  });

  it("should return an error when no json was provided", done => {
    const testHandler = (err, result) => {
      expect(result).to.be.undefined;
      expect(err.message).to.equal("Decode or Encode needs to be true");
      done();
    };

    testTarget(null, testHandler);
  });
});
