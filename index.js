const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const http = require('http');


function checkIfFunction(func){
	return Object.prototype.toString.call(func) === '[object Function]';
}

function asyncFileHash(filePath, option, cb){
	var callBack = null;
	if(checkIfFunction(option)) callBack=option;
	else callBack = cb;
	var algo = option.algorithm?option.algorithm:'sha256';
	var encoding = option.encoding?option.encoding:'hex';
	var input = fs.createReadStream(filePath);
	var output=crypto.createHash(algo);
	input.on('error', function (err) {
    	callBack(err)
  	});
	input.on('end',function(){
  		output.end();
  		callBack(null, output.read().toString(encoding))
  	});
  	input.pipe(output);
}

function asyncUrlHash(url,option,cb){
	var callBack = null;
	if(checkIfFunction(option)) callBack=option;
	else callBack = cb;
	var algo = option.algorithm?option.algorithm:'sha256';
	var encoding = option.encoding?option.encoding:'hex';
	var output=crypto.createHash(algo);
	var httpMethod=url.startsWith('https')?https:http;
	httpMethod.get(url,function(res){
		if(res.statusCode != 200){
			return callBack(new Error('can not download file'));
		}
		res.pipe(output);
		res.on('end',function(){
			output.end();
  			callBack(null, output.read().toString(encoding))
		});
	});
}

function syncTextHash(text,opt){
	var option=opt?opt:{};
	var algo = option.algorithm?option.algorithm:'sha256';
	var encoding = option.encoding?option.encoding:'hex';
	var output=crypto.createHash(algo);
	return output.update(text).digest(encoding);
}

exports.asyncFileHash=asyncFileHash;
exports.asyncUrlHash=asyncUrlHash;
exports.syncTextHash = syncTextHash;
