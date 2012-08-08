var DirReader = require( '../lib/DirReader' );

DirReader.readDir( './levelOne', function( err, path, stats, ifDir ){

    if( err ){
        console.log( '[ ERROR ]', err );
    }
    else {
        console.log( '[ ' + ( ifDir ? 'DIRECTORY' : 'FILE' ) + ' ]', path + '\n', JSON.stringify( stats ) );
    }
}, function(){
    console.log( 'The whole directory is finished reading!' );
});

console.log( 'The directory reading is not finished!' );