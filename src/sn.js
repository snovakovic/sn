/*****************************************************
	  s.js https://github.com/snovakovic/s.js
    author: stefan.novakovich@gmail.com
    version: 0.0.1
 ***************************************************/
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.sn = factory());
} (this, (function() {

  'use strict';

  function sn(executionContext) {
    sn.__EC__ = executionContext;
    return sn;
  }

  //app files will be concatinated here and then this will be closed with sn.end.js

