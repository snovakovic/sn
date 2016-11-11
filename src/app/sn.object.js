(function(global) {

    var internals = {
        deepSealOrFreez: function deepSealOrFreez(obj, action, check) {
            action(obj);

            Object.getOwnPropertyNames(obj).forEach(function(key) {
                if (obj.hasOwnProperty(key)
                    && obj[key] !== null
                    && (typeof obj[key] === 'object' || typeof obj[key] === 'function')
                    && !check(obj[key])) {
                    deepSealOrFreez(obj[key], action, check);
                }
            });

            return obj;
        }
    };

    /**********************************************
    * Apply Object.freez recursively on object and property of object.
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
    ************************************************/
    global.deepFreeze = function deepFreez() {
        return _return(internals.deepSealOrFreez(__EC__, Object.freeze, Object.isFrozen));
    };

    /**********************************************
    * Apply Object.seal recursively on object and property of object.
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal
    ************************************************/
    global.deepSeal = function deepSeal() {
        return _return(internals.deepSealOrFreez(__EC__, Object.seal, Object.isSealed));
    };



    /**********************************************
    * Extend object with the properties from other provided objects.
    * In case of same properties names value from first object will be overriden with the value from second object
    ************************************************/
    global.extend = function() {
        var objects = Array.prototype.slice.call(arguments);
        objects.unshift(__EC__);

        for (var i = 1; i < objects.length; i++) {
            Object.getOwnPropertyNames(objects[i]).forEach(function(key) {
                if (objects[i].hasOwnProperty(key)) {
                    objects[0][key] = objects[i][key];
                }
            });
        }

        return _return(objects[0]);
    };

})(sn);
