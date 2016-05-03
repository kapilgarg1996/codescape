var codescape = require('../'),
	expect = require('expect.js'),
	path = require('path') ;

describe('codescape', function(){
	describe('arguments not specified', function(){
		it('should return nothing when arguments are not fulfilling', function(){
			var result = codescape() ;
			expect(result).to.be(null) ;
		})
	});
	describe('given string', function(){
		it('should return escaped string when selector is not given', function(){
			var string = '<pre>var x= 10 ;</pre>' ;
			var resultString = '&lt;pre&gt;var x= 10 ;&lt;/pre&gt;' ;
			var escapedString = codescape({'string': string}) ;
			expect(escapedString).to.be(resultString) ;
		}) ;
		it('should return escaped string when selector is given', function(){
			var string = '<p><b>Heading</b><code class="print"><script src="something.js"/></code></p>' ;
			var selector = 'p code.print'
			var resultString = '<p><b>Heading</b><code class="print">&lt;script src=&quot;something.js&quot;/&gt;</code></p>' ;
			var escapedString = codescape({'string': string, 'selector':selector}) ;
			expect(escapedString).to.be(resultString) ;
		}) ;
	});
	describe('given file', function(){
		it('should escape whole file if selector is not given', function(){
			var filename = 'test/input.html' ;
			var callback = function(result){
				expect(result).to.be(false) ;
			} ;
			codescape({'filename': filename, 'callback':callback}) ;
		});
	});
}) ;
