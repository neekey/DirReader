/*!
 * DirReader.js
 *
 * Recursive read the file directory.
 * Copyright(c) 2012 Neekey <ni184775761@gmail.com>
 * MIT Licensed
 */

var fs = require( 'fs' );
var Path = require( 'path' );

/**
 * Recursive read the file directory.
 * @param {String} dir          Relative/absolute
 * @param {Function} next       function( err, path, stats, ifDir )
 * @param {Function} onFinish   Called when the whole directory is finished reading.
 */
var readDir = module.exports.readDir = function readDir( dir, next, onFinish ){

    // Convert to absolute path.
    dir = Path.resolve( dir );

    fs.stat( dir, function ( err, stats ){

        if( err ){
            next( err, dir );
            return;
        }

        if( stats.isDirectory() ){
            next( undefined, dir, stats, true );
            _readDir( dir, next, onFinish );
        }
        else {
            throw new Error( dir + ' is not a directory' );
        }
    });
};

/**
 * This function does the real thing: Recursive reading.
 * @param {String} dir          Relative/absolute
 * @param {Function} next       function( err, path, stats, ifDir )
 * @param {Function} onFinish   Called when the whole directory is finished reading.
 */
function _readDir( dir, next, onFinish ){

    dir = Path.resolve( dir );
    // Save arguments for recursive usage.
    var _arguments = arguments;
    // These two variable is for counting the finished directory children.
    var pathLength = 0;
    var pathCount = 0;

    fs.stat( dir, function ( err, stats ){

        if( err ){
            next( err, dir );
            return;
        }

        if( stats.isDirectory() ){

            fs.readdir( dir, function ( err, pathArr ){

                if( err ){
                    next( err, dir );
                }
                else {

                    pathLength = pathArr.length;
                    pathArr.forEach( function ( path ){

                        var subPath = Path.resolve( dir, path );

                        fs.stat( subPath, function ( err, stats ){

                            if( err ){
                                next( err, subPath );
                            }
                            else {
                                var ifDir = false;
                                if( stats.isDirectory() ){
                                    ifDir = true;
                                    _arguments.callee( subPath, next, function(){

                                        pathCount++;
                                        if( pathCount === pathLength && typeof onFinish === 'function' ){
                                            onFinish();
                                        }
                                    });
                                }
                                else {
                                    // Every path not a directory is treated as 'finished reading'.
                                    pathCount++;
                                }

                                next( undefined, subPath, stats, ifDir );
                                if( pathCount === pathLength && typeof onFinish === 'function' ){
                                    onFinish();
                                }
                            }
                        });
                    });
                }
            });
        }
        else {
            throw new Error( dir + ' is not a directory' );
        }
    } );
}

/**
 * Synchronize version of readDir.
 * Note that the `onFinish` is for nothing but make a unified interface with `readDir`.
 *
 * @param dir
 * @param next
 */
var readDirSync = module.exports.readDirSync = function( dir, next, onFinish ){

    // Convert to absolute path.
    dir = Path.resolve( dir );

    try{
        var stats = fs.statSync( dir );
    }
    catch( err ){
        return next( err, dir );
    }

    if( stats && stats.isDirectory() ){

        _readDirSync( dir, next );
        // Useless, just to make a unified interface.
        if( typeof onFinish === 'function' ){
            onFinish();
        }
    }
    else {
        throw new Error( dir + ' is not a directory' );
    }
};

/**
 * Synchronize version of _readDirSync.
 *
 * @param dir
 * @param next
 * @private
 */
var _readDirSync = function( dir, next ){

    // Convert to absolute path.
    dir = Path.resolve( dir );

    var _arguments = arguments;

    try{
        var stats = fs.statSync( dir );
    }
    catch( err ){
        return next( err, dir );
    }

    if( stats.isDirectory() ){

        // Trigger directory info.
        next( undefined, dir, stats, true );

        // Read directory.
        try{
            var pathArr = fs.readdirSync( dir );
        }
        catch( err ){
            return next( err, dir );
        }

        pathArr.forEach( function ( path ){

            var subPath = Path.resolve( dir, path );

            try{
                var stats = fs.statSync( subPath );
            }
            catch( err ){
                return next( err, subPath );
            }

            // If it's a directory, than recursive read it.
            if( stats.isDirectory() ){

                _arguments.callee( subPath, next );
            }
            else {
                next( undefined, subPath, stats, false );
            }

        });
    }
    else {
        throw new Error( dir + ' is not a directory' );
    }
};



