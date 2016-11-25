/*****************************************************
	s.js https://github.com/snovakovic/s.js
    author: stefan.novakovich@gmail.com
    version: 0.0.1
 ***************************************************/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.sn = factory());
} (this, (function () {

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
        get: function () {
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

        return _returnImmediate(returnValue);
    }

    /**********************************************
    * Used for functions that does not support chaining
    ************************************************/
    function _returnImmediate(returnValue) {
        _clearContext();
        return returnValue;
    }

    function _clearContext() {
        __EC__ = undefined;
    }


    //CORE FUNCTIONS USED ACCROSS MODULES
    function _isString(val) {
        return typeof val === 'string';
    }

    function _isNumber(val) {
        //NaN will produce false because NaN !== NaN
        return typeof val === 'number' && val === val;
    }

    function _isDate(val) {
        return !!val && Object.prototype.toString.call(val) === '[object Date]';
    }

    function _isArray(val) {
        return Array.isArray(val);
    }


  //app files will be concatenated here and then this will be closed with sn.end.js

