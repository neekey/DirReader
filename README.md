DirReader
=========

Recursive read the file directory.

## Install

```
npm install dirreader
```

## Usage

```js
var DirReader = require( 'DirReader' );

DirReader.readDir( 'path/to/read', function( err, path, stats, ifDir ){

    if( err ){
        console.log( 'A error occurred when reading path: ' + path, err );
    }
    else {
        console.log( 'Path: ' + path + ', is a ' + ( ifDir ? 'directory' : 'file' ) + '. Stats:', stats );
    }
}, function onFinish(){
    console.log( 'The whole directory is finish reading' );
});
```

## API

### readDir( path, onPath, onFinish )
 * `path`: The directory path you want to read.
 * `onPath`: Called when a path is read. Four arguments is provided:
    * `err`: When an error occurred.
    * `path`: The path that read.
    * `stats`: The fs.Stats instance of the path.
    * `ifDir`: If the path is a directory.
 * `onFinish`: Called when directory reading is done.

### readDirSync( path, onPath, onFinish )

Synchronize version of `readDir`. Note the `onFinish` parameter is just for making an unified interface with `readDir`.

## TODO

* Directory filter.

## License

(The MIT License)

Copyright (c) 2012 Neekey <ni184775761@gmail.com>;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.