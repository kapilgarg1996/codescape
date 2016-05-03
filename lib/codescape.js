var fs = require('fs'),
	cheerio = require('cheerio'),
	detab = require('detab'),
	escapeHtml = require('escape-html') ;

var codescape = function(){
	if(typeof arguments[0] != 'object'){
		console.log('Codescape : Requires arguments object') ;
		return null;
	}
	this.options = {} ;
	this.options.filename = arguments[0].filename === undefined ? '' : arguments[0].filename ;
	this.options.selector = arguments[0].selector === undefined ? '' : arguments[0].selector ;
	this.options.string = arguments[0].string === undefined ? '' : arguments[0].string ;

	if(this.options.string != ''){
		this.html = this.options.string ;
		return escapeCode.call(this, 0) ;
	}
	else{
		var global = this ;
		if(this.options.filename != ''){
			fs.readFile(this.options.filename, function(err, data){
				if(err){
					console.log('Codescape : Error while reading file', err);
					return ;
				}
				global.html = data.toString() ;
				escapeCode.call(global, 1) ;
			}) ;
		}
	}
};

var escapeCode = function(isFile){
	var html = this.html,
		code = '' ;
	var global = this ;
	var $ = cheerio.load(html, {xmlMode : true}) ;
	if(this.options.selector != ''){
		$(this.options.selector).each(function(index, element){
			var escaped = getEscaped($(this).html()) ;
			$(this).html(escaped) ;
		}) ;
		if(isFile){
			fs.writeFile(global.options.filename, $.html(), function(err){
				if(err){
					console.log('Codescape : Error while writing to file') ;
					return ;
				}
				console.log('Codescape : File Saved') ;
			});
		}
		else{
			return $.html() ;
		}
	}
	else{
		if(isFile){
			var modified = getEscaped(html) ;
			fs.writeFile(global.options.filename, modified, function(err){
				if(err){
					console.log('Codescape : Error while writing to file') ;
					return ;
				}
				console.log('Codescape : File Saved') ;
				return ;
			});
		}
		else{
			return getEscaped(html) ;
		}
	}
};

var getEscaped = function(string){
	var modified = '' ;
	modified = escapeHtml(string) ;
	modified = detab(modified) ;
	return modified ;
};

module.exports = codescape ;
