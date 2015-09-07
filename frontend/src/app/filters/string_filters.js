angular.module('app')

  // _.available("foo Bar")
  // => "foo Bar"
  // _.available("")
  // => "N/A"
  .filter('available', function() {
    return function(input, attr) {
      attr = attr || attr === '' ? attr : 'N/A';

      if (_.isString(input))
        input = input.trim();

      return (_.isNull(input) || _.isBlank(input) || _.isUndefined(input)) ? attr : input;
    };
  })

  // _.conditional(true)
  // => "Yes"
  // _.conditional(1)
  // => "Yes"
  // _.conditional(null)
  // => "No"
  // _.conditional(false, "Aja", "Nei")
  // => "Nei"
  .filter('conditional', function() {
    return function(input, positive, negative) {
      var t = positive || 'Yes';
      var f = negative || 'No';
      return input ? t : f;
    };
  })

  // Converts first letter of the string to uppercase.
  // _.capitalize("foo Bar")
  // => "Foo Bar"
  .filter('capitalize', function() {
    return function(string) { return _.capitalize(string); };
  })

  // Converts first letter of the string to lowercase.
  // _.decapitalize("Foo Bar")
  // => "foo Bar"
  .filter('decapitalize', function() {
    return function(string) { return _.decapitalize(string); };
  })

  // _.chop('whitespace', 3)
  // => ['whi','tes','pac','e']
  .filter('chop', function() {
    return function(string, size) { return _.chop(string, size); };
  })

  // Trim and replace multiple spaces with a single space.
  // _.clean(" foo    bar   ")
  // => 'foo bar'
  .filter('clean', function() {
    return function(string) { return _.clean(string); };
  })

  // _.chars('Hello')
  // => ['H','e','l','l','o']
  .filter('chars', function() {
    return function(string) { return _.chars(string); };
  })

  // Returns a copy of the string in which all the case-based characters have had their case swapped.
  // _.swapCase('hELLO')
  // => 'Hello'
  .filter('swapCase', function() {
    return function(string) { return _.swapCase(string); };
  })

  // available only through _.str object, because Underscore has function with the same name.
  // _.include("foobar", "ob")
  // => true
  .filter('isInclude', function() {
    return function(string, substr) { return _.str.include(string, substr); };
  })

  // _.count('Hello world', 'l')
  // => 3
  .filter('countSubstr', function() {
    return function(string, substr) {
      return substr && substr.length ? _.count(string, substr) : string.length;
    };
  })

  // Converts HTML special characters to their entity equivalents.
  // _.escapeHTML('<div>Blah blah blah</div>');
  // => '&lt;div&gt;Blah blah blah&lt;/div&gt;'
  .filter('escapeHTML', function() {
    return function(string) { return _.escapeHTML(string); };
  })

  // Converts entity characters to HTML equivalents.
  // _.unescapeHTML('&lt;div&gt;Blah blah blah&lt;/div&gt;');
  // => '<div>Blah blah blah</div>'
  .filter('unescapeHTML', function() {
    return function(string) { return _.unescapeHTML(string); };
  })

  // _.insert('Hello ', 6, 'world')
  // => 'Hello world'
  .filter('insert', function() {
    return function(string, index, substr) { return _.insert(string, index, substr); };
  })

  // _('').isBlank(); // => true
  // _('\n').isBlank(); // => true
  // _(' ').isBlank(); // => true
  // _('a').isBlank(); // => false
  .filter('isBlank', function() {
    return function(string) { return _.isBlank(string); };
  })

  // Joins strings together with given separator
  // _.joinBy(["hello", "world"], " - ")
  // => "hello - world"
  .filter('joinBy', function() {
    return function(array, separator) { return (array || []).join(separator || ', '); };
  })

  // _.lines("Hello\nWorld")
  // => ["Hello", "World"]
  .filter('lines', function() {
    return function(string) { return _.lines(string); };
  })

  // _.str.reverse("foobar")
  // => 'raboof'
  .filter('reverseString', function() {
    return function(string) { return _.str.reverse(string); };
  })

  // _('https://edtsech@bitbucket.org/edtsech/underscore.strings').splice(30, 7, 'epeli')
  // => 'https://edtsech@bitbucket.org/epeli/underscore.strings'
  .filter('spliceString', function() {
    return function(string, index, howmany, substr) { return _.splice(string, index, howmany, substr); };
  })

  // This method checks whether the string begins with starts at position (default: 0).
  // _("image.gif").startsWith("image")
  // => true
  // _(".vimrc").startsWith("vim", 1)
  // => true
  .filter('startsWith', function() {
    return function(string, starts, position) { return _.startsWith(string, starts, position); };
  })

  // This method checks whether the string ends with ends at position (default: string.length).
  // _("image.gif").endsWith("gif")
  // => true
  // _("image.old.gif").endsWith("old", 9)
  // => true
  .filter('endsWith', function() {
    return function(string, ends, position) { return _.endsWith(string, ends, position); };
  })

  // Returns the successor to str.
  // _('a').succ()
  // => 'b'
  // _('A').succ()
  // => 'B'
  .filter('successor', function() {
    return function(string) { return _.succ(string); };
  })

  // _('my name is epeli').titleize()
  // => 'My Name Is Epeli'
  .filter('titleize', function() {
    return function(string) { return _.titleize(string); };
  })

  // Converts underscored or dasherized string to a camelized one. Begins with a lower case letter unless it starts with an underscore, dash or an upper case letter.
  // _('moz-transform').camelize()
  // => 'mozTransform'
  // _('-moz-transform').camelize()
  // => 'MozTransform'
  .filter('camelize', function() {
    return function(string) { return _.camelize(string); };
  })

  // Converts string to camelized class name. First letter is always upper case
  // _('some_class_name').classify()
  // => 'SomeClassName'
  .filter('classify', function() {
    return function(string) { return _.classify(string); };
  })

  // Converts a camelized or dasherized string into an underscored one
  // _('MozTransform').underscored()
  // => 'moz_transform'
  .filter('underscored', function() {
    return function(string) { return _.underscored(string); };
  })

  // Converts a underscored or camelized string into an dasherized one
  // _('MozTransform').dasherize()
  // => '-moz-transform'
  .filter('dasherize', function() {
    return function(string) { return _.dasherize(string); };
  })

  // Converts an underscored, camelized, or dasherized string into a humanized one. Also removes beginning and ending whitespace, and removes the postfix '_id'.
  // _('  capitalize dash-CamelCase_underscore trim  ').humanize()
  // => 'Capitalize dash camel case underscore trim'
  .filter('humanize', function() {
    return function(string) { return _.humanize(string); };
  })

  // Trims defined characters from begining and ending of the string. Defaults to whitespace characters.
  // _.trim("  foobar   ")
  // => "foobar"
  // _.trim("_*foobar*_", "_*")
  // => "foobar"
  .filter('trim', function() {
    return function(string, characters) { return _.trim(string, characters); };
  })

  .filter('ltrim', function() {
    return function(string, characters) { return _.ltrim(string, characters); };
  })

  .filter('rtrim', function() {
    return function(string, characters) { return _.rtrim(string, characters); };
  })

  // _('Hello world').truncate(5)
  // => 'Hello...'
  // _('Hello').truncate(10)
  // => 'Hello'
  .filter('truncate', function() {
    return function(string, length, truncateString) { return _.truncate(string, length, truncateString); };
  })

  // Elegant version of truncate. Makes sure the pruned string does not exceed the original length. Avoid half-chopped words when truncating.
  // _('Hello, world').prune(5)
  // => 'Hello...'
  // _('Hello, world').prune(8)
  // => 'Hello...'
  // _('Hello, world').prune(5, ' (read a lot more)')
  // => 'Hello, world' (as adding "(read a lot more)" would be longer than the original string)
  // _('Hello, cruel world').prune(15)
  // => 'Hello, cruel...'
  // _('Hello').prune(10)
  // => 'Hello'
  .filter('prune', function() {
    return function(string, length, truncateString) { return _.prune(string, length, truncateString); };
  })

  // Split string by delimiter (String or RegExp), /\s+/ by default.
  // _.words("   I   love   you   ")
  // => ["I","love","you"]
  // _.words("I_love_you", "_")
  // => ["I","love","you"]
  // _.words("I-love-you", /-/)
  // => ["I","love","you"]
  // _.words("   ")
  // => []
  .filter('split', function() {
    return function(string, delimiter) { return _.words(string, delimiter); };
  })

  // pads the str with characters until the total string length is equal to the passed length parameter. By default, pads on the left with the space char (" "). padStr is truncated to a single character if necessary.
  // _.pad("1", 8)
  // -> "       1";
  // _.pad("1", 8, '0')
  // -> "00000001";
  // _.pad("1", 8, '0', 'right')
  // -> "10000000";
  // _.pad("1", 8, '0', 'both')
  // -> "00001000";
  // _.pad("1", 8, 'bleepblorp', 'both')
  // -> "bbbb1bbb";
  .filter('pad', function() {
    return function(string, length, padStr, type /* 'left'|'right'|'both' */) { return _.pad(string, length, padStr, type); };
  })

  .filter('lpad', function() {
    return function(string, length, padStr) { return _.lpad(string, length, padStr); };
  })

  .filter('rpad', function() {
    return function(string, length, padStr) { return _.rpad(string, length, padStr); };
  })

  // 'Both'
  .filter('lrpad', function() {
    return function(string, length, padStr) { return _.lrpad(string, length, padStr); };
  })

  // Searches a string from left to right for a pattern and returns a substring consisting of the characters in the string that are to the right of the pattern or all string if no match found.
  // _('This_is_a_test_string').strRight('_')
  // => "is_a_test_string";
  .filter('strRight', function() {
    return function(string, pattern) { return _.strRight(string, pattern); };
  })

  // Searches a string from right to left for a pattern and returns a substring consisting of the characters in the string that are to the right of the pattern or all string if no match found.
  // _('This_is_a_test_string').strRightBack('_')
  // => "string";
  .filter('strRightBack', function() {
    return function(string, pattern) { return _.strRightBack(string, pattern); };
  })

  // Searches a string from left to right for a pattern and returns a substring consisting of the characters in the string that are to the left of the pattern or all string if no match found.
  // _('This_is_a_test_string').strLeft('_')
  // => "This";
  .filter('strLeft', function() {
    return function(string, pattern) { return _.strLeft(string, pattern); };
  })

  // Searches a string from right to left for a pattern and returns a substring consisting of the characters in the string that are to the left of the pattern or all string if no match found.
  // _('This_is_a_test_string').strLeftBack('_')
  // => "This_is_a_test";
  .filter('strLeftBack', function() {
    return function(string, pattern) { return _.strLeftBack(string, pattern); };
  })

  // Removes all html tags from string.
  // _('a <a href="#">link</a>').stripTags()
  // => 'a link'
  // _('a <a href="#">link</a><script>alert("hello world!")</script>').stripTags()
  // => 'a linkalert("hello world!")'
  .filter('stripTags', function() {
    return function(string) { return _.stripTags(string); };
  })

  // Join an array into a human readable sentence.
  // _.toSentence(['jQuery', 'Mootools', 'Prototype'])
  // => 'jQuery, Mootools and Prototype';
  // _.toSentence(['jQuery', 'Mootools', 'Prototype'], ', ', ' unt ')
  // => 'jQuery, Mootools unt Prototype';
  .filter('toSentence', function() {
    return function(array, delimiter, lastDelimiter) { return _.toSentence(array, delimiter, lastDelimiter); };
  })

  // The same as toSentence, but adjusts delimeters to use Serial comma.
  // _.toSentenceSerial(['jQuery', 'Mootools'])
  // => 'jQuery and Mootools';
  // _.toSentenceSerial(['jQuery', 'Mootools', 'Prototype'])
  // => 'jQuery, Mootools, and Prototype'
  // _.toSentenceSerial(['jQuery', 'Mootools', 'Prototype'], ', ', ' unt ');
  // => 'jQuery, Mootools, unt Prototype';
  .filter('toSentenceSerial', function() {
    return function(array, delimiter, lastDelimiter) { return _.toSentenceSerial(array, delimiter, lastDelimiter); };
  })

  // Repeats a string count times.
  // _.repeat("foo", 3)
  // => 'foofoofoo';
  // _.repeat("foo", 3, "bar")
  // => 'foobarfoobarfoo'
  .filter('repeatString', function() {
    return function(string, count, separator) { return _.repeat(string, count, separator); };
  })

  // Surround a string with another string.
  // _.surround("foo", "ab")
  // => 'abfooab';
  .filter('surround', function() {
    return function(string, wrap) { return _.surround(string, wrap); };
  })

  // Quotes a string. quoteChar defaults to ".
  // _.quote('foo', quoteChar)
  // => '"foo"';
  .filter('quote', function() {
    return function(string, quoteChar) { return _.quote(string, quoteChar); };
  })

  // Unquotes a string. quoteChar defaults to ".
  // _.unquote('"foo"')
  // => 'foo';
  // _.unquote("'foo'", "'")
  // => 'foo';
  .filter('unquote', function() {
    return function(string, quoteChar) { return _.unquote(string, quoteChar); };
  })

  // Transform text into an ascii slug which can be used in safely in URLs. Replaces whitespaces, accentuated, and special characters with a dash. Limited set of non-ascii characters are transformed to similar versions in the ascii character set such as ä to a.
  // _.slugify("Un éléphant à l\'orée du bois")
  // => 'un-elephant-a-l-oree-du-bois';
  .filter('slugify', function() {
    return function(string) { return _.slugify(string); };
  })

  // Turn strings that can be commonly considered as booleas to real booleans. Such as "true", "false", "1" and "0". This function is case insensitive.
  // _.toBoolean("true")
  // => true
  // _.toBoolean("FALSE")
  // => false
  // _.toBoolean("random")
  // => undefined
  .filter('toBool', function() {
    return function(string) { return _.toBool(string); };
  });

