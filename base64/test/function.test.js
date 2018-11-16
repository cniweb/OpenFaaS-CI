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

    testTarget(JSON.stringify({ encode: true, text: RAW_VALUE }), testHandler);
  });

  it("should fallback to empty string when no text is present", done => {
    const encodeHandler = (err, result) => {
      expect(err).to.be.undefined;
      expect(result).to.equal("");
    };
    const decodeHandler = (err, result) => {
      expect(err).to.be.undefined;
      expect(result).to.equal("");
      done();
    };

    testTarget(JSON.stringify({ encode: true }), encodeHandler);
    testTarget(JSON.stringify({ decode: true }), decodeHandler);
  });

  it("should decode the provided text", done => {
    const testHandler = (err, result) => {
      expect(err).to.be.undefined;
      expect(result).to.equal(RAW_VALUE);
      done();
    };

    testTarget(
      JSON.stringify({ decode: true, text: ENCODED_VALUE }),
      testHandler
    );
  });

  it("should return an error when no operation is specified", done => {
    const testHandler = (err, result) => {
      expect(result).to.be.undefined;
      expect(err.message).to.equal("Decode or Encode needs to be true");
      done();
    };

    testTarget(JSON.stringify({ text: ENCODED_VALUE }), testHandler);
  });

  it("should return an error when no json was provided", done => {
    const testHandler = (err, result) => {
      expect(result).to.be.undefined;
      expect(err.message).to.equal("Wrong Input was presented, expect JSON");
      done();
    };

    testTarget(null, testHandler);
  });
});
