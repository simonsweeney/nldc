var commaNumber = require('comma-number');

function len(number) {
    
    return String(number).length;
    
}

var MAX_DURATION = 500;
var MIN_INTERVAL = 16;
var MAX_INTERVAL = 50;
var MAX_INCREMENTS = Math.floor( MAX_DURATION / MIN_INTERVAL );

module.exports = class Counter {
    
    constructor ( content ) {
        
        this.content = content;
        
        content = content.replace('.', '');
        
        this.total = Number( content );
        
        this.curr = 0;
        
        this.maxLength = this.format( this.total ).length;
        
        this.slice = this.maxLength;
        
        if ( MAX_INTERVAL * this.total < MAX_DURATION ) {
            
            this.interval = MAX_INTERVAL;
            this.increment = 1;
            
        } else if ( MIN_INTERVAL * this.total > MAX_DURATION ) {
            
            this.interval = MIN_INTERVAL;
            this.increment = Math.ceil( this.total / MAX_INCREMENTS );
            
        } else {
            
            this.interval = MAX_DURATION / this.total;
            this.increment = 1;
            
        }
        
    }
    
    format ( number ) {
        
        return commaNumber( number, '.' );
        
    }
    
    render () {
        
        return this.format( this.curr ).slice( 0, this.slice );
        
    }
    
    type () {
        
        if( this.slice < this.maxLength ) {
            
            this.slice = this.maxLength;
            this.curr = 0;
            
        }
        
        this.curr += this.increment;
        
        this.curr = Math.min( this.curr, this.total );
        
        return this.interval;
        
    }
    
    erase () {
        
        this.slice--;
        
        return 15;
        
    }
    
    isTyped () {
        
        return this.curr === this.total;
        
    }
    
    isErased () {
        
        return this.slice === 0;
        
    }
    
}