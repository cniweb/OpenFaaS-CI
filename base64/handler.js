"use strict";

module.exports = (context, callback) => {
  if (context && context.encode) {
    const { text } = context;
    return callback(undefined, Buffer.from(text).toString("base64"));
  } else if (context && context.decode) {
    const { text } = context;
    return callback(undefined, Buffer.from(text, "base64").toString("utf8"));
  } else {
    return callback(new Error("Decode or Encode needs to be true"), undefined);
  }
};
