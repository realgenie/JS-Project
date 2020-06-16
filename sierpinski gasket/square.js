"use strict";

var canvas;
var gl;
var points = [];
var NumTimesToSubdivde = 7;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
 
    // Four Vertices
    
    var vertices = [
        vec2( -1, 1 ),
        vec2(  -1, -1 ),
        vec2( 1, -1 ),
        vec2( 1, 1 )
    ];

    divideSquare( vertices[0], vertices[1],
        vertices[2], vertices[3], 
        NumTimesToSubdivde);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 0.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

function square( a, b, c, d ) 
{
    points.push( a, b, c, d );
}

function divideSquare( a, b, c, d, count )
{
    if(count == 0) {
        square( a, b, c, d );
    }
    else {
        var e = mix( a, b, 1/3 );
        var f = mix( a, b, 2/3 );
        var g = mix( b, c, 1/3 );
        var h = mix( b, c, 2/3 );
        var i = mix( c, d, 1/3 );
        var j = mix( c, d, 2/3 );
        var k = mix( a, d, 1/3 );
        var l = mix( a, d, 2/3 );
        
        var m = mix( e, j, 1/3 );
        var n = mix( e, j, 2/3 );
        var o = mix( f, i, 1/3 );
        var p = mix( f, i, 2/3 );

        --count;


        divideSquare( a, e, m, k, count );
        divideSquare( e, f, o, m, count );
        divideSquare( f, b, g, o, count );
        divideSquare( o, g, h, p, count );
        divideSquare( p, h, c, i, count );
        divideSquare( n, p, i, j, count );
        divideSquare( l, n, j, d, count );
        divideSquare( k, m, n, l, count );
        

    }
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE, 0, points.length );
}