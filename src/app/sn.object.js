//DeepFreez / DeepSeal
(function (sn) {

  /**********************************************
  * Apply Object.freez on object and each children object as deep as it goes.
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
  ************************************************/
  sn.deepFreez = function deepFreez(obj) {
    return deepSealOrFreez(obj, Object.freez);
  };

  /**********************************************
  * Apply Object.seal on object and each children object as deep as it goes.
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal
  ************************************************/
  sn.deepSeal = function deepSeal(obj) {
    return deepSealOrFreez(obj, Object.seal);
  };

  function deepSealOrFreez(obj, action) {
    action(obj);

    Object.getOwnPropertyNames(obj).forEach(function (key) {
      if (obj.hasOwnProperty(key)
        && obj[key] !== null
        && (typeof obj[key] === 'object' || typeof obj[key] === 'function')
        && !Object.isSealed(obj[key]))
      {
        deepSealOrFreez(obj[key]);
      }
    });

    return obj;
  }

})(sn);



/**********************************************
* Extend object with the properties from other provided objects.
* In case of same propertie names value from first object will be overriden with the value from second object
************************************************/
sn.extend = function() {
  for(var i=1; i < arguments.length; i++) {
    Object.getOwnPropertyNames(arguments[i]).forEach(function (key) {
      if(arguments[i].hasOwnProperty(key)) {
        arguments[0][key] = arguments[i][key]
      }
    });
  }
  return arguments[0];
};
