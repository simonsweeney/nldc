var Text = require('./text.js');

module.exports = class Erase extends Text {
    
    constructor ( content ) {
        
        super( content );
        
        this.numFrames = this.characters.length * 2;
        
    }
    
    render () {
        
        if( this.currFrame <= this.characters.length ) return super.render();
        
        var numChars = this.characters.length * 2 - this.currFrame;
        
        return this.characters.slice( 0, numChars ).join('');
        
    }
    
    type () {
        
        var delay = super.type();
        
        return this.currFrame === this.characters.length + 1 ? delay * 5 : delay;
        
    }
    
    erase () {
        
        if( this.currFrame >= this.characters.length ) {
            
            this.currFrame = this.characters.length * 2 - this.currFrame + 1;
            
        }
        
        this.currFrame--;
        
        return 10;
        
    }
    
}