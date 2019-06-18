var Link = require('./link.js');

module.exports = class CTA extends Link {
    
    constructor ( prependLineBreaks ) {
        
        var str = "GET IN TOUCH???";
        
        if ( prependLineBreaks ) str = '\n\n' + str;
        
        super( str, '#contact' );
        
    }
    
}