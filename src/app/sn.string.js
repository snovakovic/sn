(function (sn) {

    function isString() {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] !== 'string') {
                return false;
            }
        }

        return true;
    }

    /**************************************************
    * Remove all occurrences of substring in string
    * @param whatToReplace {String}
    * @param replaceWith {String}
    * @return {String} string with replaced old values with new values
    **************************************************/
    sn.replaceAll = function (whatToReplace, replaceWith) {
        return isString(__EC__, whatToReplace, replaceWith)
            ? __EC__.replace(new RegExp(whatToReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replaceWith)
            : __EC__;
    };


    /**************************************************
    * Capitalize string
    * @return {String} capitalized string
    **************************************************/
    sn.capitalize = function () {
        return isString(__EC__)
            ? __EC__[(0)].toUpperCase() + __EC__.slice(1)
            : __EC__;
    };


    /**************************************************
    * test if string contains substring
    * @param substring {String} substring we want to check for existance
    * @param ignoreCase {Boolean} if true ignore case when comparing string
    * @example capitalize('foo Bar', 'oo'); => 'Foo Bar'; capitalize('FOO Bar', true); => 'Foo bar'
    * https://github.com/epeli/underscore.string
    **************************************************/
    sn.contains = function (substring, ignoreCase) {

        if (isString(__EC__, substring)) {
            if (ignoreCase === true) {
                __EC__ = __EC__.toLowerCase();
                substring = substring.toLowerCase();
            }

            return __EC__.indexOf(substring) !== -1;
        }

        return false;

    };


    /**************************************************
    * Break string in array of substring.
    * @param step {Number} length of chopped substrings
    * @example: chop("whitespace", 3); => ['whi', 'tes', 'pac', 'e']
    * @return {Array} array containing chopped substrings
    **************************************************/
    sn.chop = function (step) {
        if (isString(__EC__)) {
            __EC__ = String(__EC__);
            step = ~~step;
            return step > 0 ? __EC__.match(new RegExp('.{1,' + step + '}', 'g')) : [__EC__];
        }

        return [];
    };


    /**************************************************
    * Trim and replace multiple spaces with a single space.
    * @return {String} trimmed and cleaned string
    **************************************************/
    sn.clean = function () {
        return isString(__EC__)
            ? __EC__.trim().replace(/\s\s+/g, ' ')
            : __EC__;
    };


    /**********************************************
    * Truncate string if it exceed max number of characters,
    * apply provided truncate string at the end of truncated string (default: '...')
    * @param length {Number} cut the string after this number of characters
    * @param appender [optional, default: '...'] {String} string that will be appended to truncated string
    * @return {String} truncated string
    **********************************************/
    sn.truncate = function (length, appender) {
        appender = appender || '...';
        length = ~~length;
        return (isString(__EC__) && __EC__.length > length)
            ? __EC__.slice(0, length) + appender
            : __EC__;
    };


    /**********************************************
    * Returns part of the string between 2 words.
    * @param str1 {String}
    * @param str2 {String}
    * @return {String} string between startStr and endStr
    ***********************************************/
    sn.between = function (str1, str2) {
        if (isString(__EC__, str1, str2)) {
            var index1 = __EC__.indexOf(str1);
            var index2 = __EC__.indexOf(str2);

            if (index1 === -1 || index2 === -1) {
                return undefined;
            }

            if (index2 > index1) {
                index1 += str1.length;
                return __EC__.substr(index1, index2 - index1);
            } else {
                index2 += str2.length;
                return __EC__.substr(index2, index1 - index2);
            }
        }

    };

})(sn);
