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

    var __EC__; //execution context
    var __chain__; //return it's self except value

    function sn(executionContext) {
        __EC__ = executionContext;
        return sn;
    }

    /**********************************************
    * chaining operator allows us to chain methods sn().metod1()._.metod2()
    ************************************************/
    Object.defineProperty(sn, '_', {
        get: function() {
            __chain__ = true;
            return sn;
        }
    });


    /**********************************************
    * !!!Each public method should use this to return value
    * _return cleans current context and enables chaining
    ************************************************/
    function _return(returnValue) {
        if (__chain__) {
            __EC__ = returnValue;
            __chain__ = false;
            return sn;
        }

        __EC__ = undefined;
        return returnValue;
    }


  //app files will be concatenated here and then this will be closed with sn.end.js

