##Hash a string, local file or content served by http/https url. 

# Installation:
```javascript
$ npm install hashk
```

# How to use:

note that default hashing algorithm is sha256 and default encoding is hex

### use of asyncFileHash:
asyncFileHash takes local file path, an optional option and a callback. It will return hash of that file 

```javascript
const hashk=require('hashk');
hashk.asyncFileHash('./abc.png',function(err,data){
   // data is sha256 hash of file abc.png 
});

// Example 2
var option = {algorithm:'md5',encoding:'base64'}
hashk.asyncFileHash('./abc.png',option, function(err,data){
   // data is md5 hash of file abc.png 
});

```


### use of asyncUrlHash:
asyncUrlHash takes a http/https url, an optional option and a callback. It will return hash of the content of url

```javascript
const hashk=require('hashk');
hashk.asyncFileHash('http://localhost/iamges/abc.png',function(err,data){
   // data is sha256 hash of abc.png 
});

// Example 2
var option = {algorithm:'md5',encoding:'base64'}
hashk.asyncFileHash('http://localhost/iamges/abc.png',option, function(err,data){
   // data is md5 hash of abc.png 
});


```

### use of syncTextHash:
syncTextHash take a string and an optional option. It will return hash of that string. Note that this
is synchronus function.

```javascript
const hashk=require('hashk');
var ret=hashk.syncTextHash('abcdefghij');
// ret is sha256 hash os string abcdefghij

// Example 2
var option = {algorithm:'md5',encoding:'base64'}
var ret=hashk.syncTextHash('abcdefghij',option);
// ret is md5 hash os string abcdefghij

```


