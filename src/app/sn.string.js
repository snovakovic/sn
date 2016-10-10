sn.replaceAll = function(whatToReplace) {
  return {
    with: function(replaceWith) {
      return typeof sn.__EC__ === 'string'
        ? sn.__EC__.replace(new RegExp(whatToReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replaceWith)
        : sn.__EC__;
    }
  }
};

sn.capitalize = function(str) {
  return typeof str === 'string' ? str[(0)].toUpperCase() + str.slice(1) : str;
};

/***********************************************
 * Below methods has been taken from
 * https://github.com/epeli/underscore.string
************************************************/

/*
 * test if string contains substring
 * @ignore case - case is ignored on comparation
 * @example capitalize('foo Bar', 'oo'); => 'Foo Bar'; capitalize('FOO Bar', true); => 'Foo bar'
 * https://github.com/epeli/underscore.string
*/
sn.contains = function(str1, str2, ignoreCase) {
  if (ignoreCase === true) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
  }
  return str1.indexOf(str2) !== -1;
};

/*
 * Break string in array of substring
 * @example: chop("whitespace", 3); => ['whi', 'tes', 'pac', 'e']
*/
sn.chop = function(str, step) {
  if (!str) { return []; }
  str = String(str);
  step = ~~step;
  return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
};

/*
* Trim and replace multiple spaces with a single space.
* @example clean(' foo    bar   '); => 'foo bar'
*/
sn.clean = function(str) {
  return str.trim().replace(/\s\s+/g, ' ');
};


/**
* Truncate string if it exceed max number of characters,
* apply provided truncate string at the end of truncated string (default: '...')
*/
sn.truncate = function(str, length, truncateStr) {
  truncateStr = truncateStr || '...';
  length = ~~length;
  return str.length > length ? str.slice(0, length) + truncateStr : str;
};

/****
* RegExp tests
****/
sn.is.alphabetic = function(str) {
  var re = /^[a-zA-Z ]*$/;
  return re.test(str);
};

sn.is.alphanumeric = function(str) {
  var re = /^[a-zA-Z0-9 ]*$/;
  return re.test(str);
};

sn.is.numeric = function(str) {
  var re = /^[0-9 ]*$/;
  return re.test(str);
};

sn.is.lowercase = function(str) {
  var re = /^[a-z ]*$/;
  return re.test(str);
};

sn.is.uppercase = function(str) {
  var re = /^[A-Z ]*$/;
  return re.test(str);
};

sn.is.email = function(str) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(str);
};

sn.is.strongpassword = function(str) {
  var re = /^(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
  return re.test(str);
};

sn.is.ip = function(str) {
  var re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return re.test(str);
};

