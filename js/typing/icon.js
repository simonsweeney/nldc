var FRAMES = {
    clock: [
        require('../../assets/icons/clock1.svg'),
        require('../../assets/icons/clock2.svg'),
        require('../../assets/icons/clock3.svg'),
        require('../../assets/icons/clock4.svg'),
        require('../../assets/icons/clock5.svg'),
        require('../../assets/icons/clock6.svg'),
        require('../../assets/icons/clock7.svg'),
        require('../../assets/icons/clock8.svg'),
        require('../../assets/icons/clock9.svg'),
        require('../../assets/icons/clock10.svg'),
        require('../../assets/icons/clock11.svg'),
        require('../../assets/icons/clock12.svg')
    ],
    cloud: [ require('../../assets/icons/cloud1.svg') ],
    gear: [ require('../../assets/icons/gear1.svg') ],
    happy: [ require('../../assets/icons/happy1.svg') ],
    location: [ require('../../assets/icons/location1.svg') ],
    neutral: [ require('../../assets/icons/neutral1.svg') ],
    sad: [ require('../../assets/icons/sad1.svg') ],
    search: [ require('../../assets/icons/search1.svg') ],
    surprise: [ require('../../assets/icons/surprise1.svg') ],
    enter: [ require('../../assets/icons/enter.svg') ]
};

module.exports = class Icon {
    
    constructor ( content, element ) {
        
        if( !FRAMES[content] ) console.warn('Icon not found: ', content);
        
        this.frames = FRAMES[ content ];
        this.numFrames = FRAMES[ content ].length;
        this.currFrame = 0;
        
        if( element && element.attr('href') ) this.href = element.attr('href');
        
    }
    
    render () {
        
        var icon = this.frames[ this.currFrame - 1 ];;
        
        if ( this.href ) icon = icon.replace('<svg', `<svg class="button" href="${this.href}"`);
        
        return icon;
        
    }
    
    isTyped () {
        
        return this.currFrame === this.numFrames;
        
    }
    
    isErased () {
        
        return this.currFrame === 0;
        
    }
    
    type () {
        
        this.currFrame++;
        
        return 75;
        
    }
    
    erase () {
        
        this.currFrame = 0;
        
        return 10;
        
    }
    
};