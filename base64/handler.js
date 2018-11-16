"use strict";

module.exports = (context, callback) => {
  try {
    if (context) {
      context = JSON.parse(context);
    } else {
      throw new Error("Nothing provided");
    }
  } catch (error) {
    return callback(
      new Error("Wrong Input was presented, expect JSON"),
      undefined
    );
  }

  if (context.encode) {
    const { text } = context;
    return callback(undefined, Buffer.from(text || "").toString("base64"));
  } else if (context && context.decode) {
    const { text } = context;
    return callback(
      undefined,
      Buffer.from(text || "", "base64").toString("utf8")
    );
  } else {
    return callback(new Error("Decode or Encode needs to be true"), undefined);
  }
};
