var esc = require('lodash/escape');

module.exports = class Text {
    
    constructor ( content ) {
        
        this.content = content;

        this.characters = content.split('').map(character => {
            return character === '\n' ? '<br>' : esc( character );
        });
        
        this.numFrames = Math.max( content.length, 1 );

        this.currFrame = 0;
        
    }
    
    render () {
        
        return this.characters.slice(0, this.currFrame).join('');
        
    }
    
    isTyped () {
        
        return this.currFrame === this.numFrames;
        
    }
    
    isErased () {
        
        return this.currFrame === 0;
        
    }
    
    type () {
        
        this.currFrame++;
        
        return 35;
        
    }
    
    erase () {
        
        this.currFrame--;
        
        return 10;
        
    }
    
}