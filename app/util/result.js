"use strict";

module.exports = {
  ERROR: function(msg = "failed", data = "") {
    return {
      code: 1,
      msg: msg,
      data: data
    };
  },
  SUCCESS: function(msg = "success", data = "") {
    return {
      code: 0,
      msg: msg,
      data: data
    };
  },
  ODD: function(msg = "error", data = "") {
    return {
      code: -1,
      msg: msg,
      data: data
    };
  },
  LIST_ERROR: function(msg = "failed", data = "") {
    return {
      code: 1,
      msg: msg,
      data: data
    };
  },
  LIST_SUCCESS: function(msg = "success", data = "") {
    return {
      code: 0,
      msg: msg,
      data: data
    };
  },
  LIST_ODD: function(msg = "error", data = "") {
    return {
      code: -1,
      msg: msg,
      data: data
    };
  }
};
