# codescape
A node tool to escape characters to html entities and to convert tabs to spaces so that your code indentation and symbols does not change in blogs or websites.

# Installation

`npm install codescape`

# Usage

It requires an object as an argument. The parameter object has 4 properties :-

* `'string'` : It specifies the html string. If string is specified then it returns the escaped string.

* `'filename'` : It specifies the filename of which contents you want to escape. Only one parameter should be present. It can either be `filename` or `string`. The input file will be overwritten.

* `'selector'` : It specifies the selection query which we use in jquery. Codescape will select the specified portion of the html based on your selector. If selector is not specified then the whole content will be escaped.

* `'callback'` : It is the function which will be called after successful or unsuccessful escaping. It is only valid if you are passing a `filename` for escaping. On successful escaping, callback will be passed `true` otherwise `false`

# Example

ALl possible uses of the codescape tool.

```javascript
var codescape = require('codescape') ;
var string = '<p class='example'><code>Some Code</code></p>' ;
var selector = 'p.example code' ;
var callback = function(result){
	console.log(result) ;
} ;

//string operations

var escapedString = codescape({'string': string}) ; // string without selector
var escapedCode = codescape({'string': string, 'selector':'p.example code'}) ; //string with selector

// file operations

codescape({'filename':'anyfile.html'}) //escapes whole file without callback
codescape({'filename':'anyfile.html', 'callback': callback}) //escapes whole file with callback
codescape({'filename':'anyfile.html', 'selector': selector}) //escapes only selected portion and replaces that portion of the file with the escaped code  without callback
codescape({'filename':'anyfile.html', 'selector':selector, 'callback', callback}) //escapes selected portion of file with callback

```
