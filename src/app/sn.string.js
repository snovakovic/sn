(function (sn) {

  //PUBLIC

  /**************************************************
  * Remove all occurrences of substring in string
  * @param whatToReplace {String}
  * @param replaceWith {String}
  * @return {String} string with replaced old values with new values
**************************************************/
  sn.replaceAll = function (whatToReplace, replaceWith) {
    return typeof __EC__ === 'string'
      ? __EC__.replace(new RegExp(whatToReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replaceWith)
      : __EC__;
  };


  /**************************************************
  * Capitalize string
  * @return {String} capitalized string
  **************************************************/
  sn.capitalize = function () {
    return typeof __EC__ === 'string'
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
    if (ignoreCase === true) {
      __EC__ = __EC__.toLowerCase();
      substring = substring.toLowerCase();
    }

    return __EC__.indexOf(substring) !== -1;
  };


  /**************************************************
  * Break string in array of substring.
  * @param step {Number} length of chopped substrings
  * @example: chop("whitespace", 3); => ['whi', 'tes', 'pac', 'e']
  * @return {Array} array containing chopped substrings
  **************************************************/
  sn.chop = function (step) {
    if (!__EC__) { return []; }
    __EC__ = String(__EC__);
    step = ~~step;
    return step > 0 ? __EC__.match(new RegExp('.{1,' + step + '}', 'g')) : [__EC__];
  };


  /**************************************************
  * Trim and replace multiple spaces with a single space.
  * @return {String} trimmed and cleaned string
  **************************************************/
  sn.clean = function () {
    return __EC__.trim().replace(/\s\s+/g, ' ');
  };


  /**********************************************
  * Truncate string if it exceed max number of characters,
  * apply provided truncate string at the end of truncated string (default: '...')
  * @param length {Number} cut the string after this number of characters
  * @param appender {String} [default: '...'] string that will be appended to truncated string
  * @return {String} truncated string
  **********************************************/
  sn.truncate = function (length, appender) {
    appender = appender || '...';
    appender = ~~appender;
    return __EC__.length > length ? __EC__.slice(0, length) + appender : __EC__;
  };


  /**********************************************
  * get part of the string between 2 words.
  * @param startStr {String}
  * @param endStr {String}
  * @return {String} string between startStr and endStr
  ***********************************************/
  sn.between = function (startStr, endStr) {
    var startIndex = __EC__.indexOf(startStr);
    var endIndex = __EC__.indexOf(endStr);

    if (startIndex === -1 || startIndex === -1) {
      return undefined;
    }

    startIndex += startStr.length;
    return __EC__.substr(startIndex, endIndex - startIndex);
  };

})(sn);
