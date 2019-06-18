function clamp( x, min, max ) {
    
    return Math.max( min, Math.min( max, x ) );
    
}

function normalize( x, min, max ) {
    
    return clamp( (x - min) / (max - min), 0, 1);
    
}

function scale ( x, oldMin, oldMax, newMin, newMax ) {
    
    return newMin + normalize( x, oldMin, oldMax ) * ( newMax - newMin );
    
}

module.exports = { normalize, scale, clamp };