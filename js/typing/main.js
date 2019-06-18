var $ = require('jquery');

var el = $('<div>');

var TYPES = {
    TEXT: require('./text.js'),
    COUNTER: require('./counter.js'),
    FIELD: require('./field.js'),
    A: require('./link.js'),
    ICON: require('./icon.js'),
    ERASE: require('./erase.js'),
    CTA: require('./cta.js')
}

class Animator {
    
    constructor ( container, beforeElement ) {
        
        this.curr = [];
        this.target = [];
        
        this.container = container;
        this.beforeElement = beforeElement;
        this.element = $();
        
        this.currContent = '';
        
        this.animating = false;
        
        this.mouseover = false;
        
        //this.container.on('mouseenter', this.onMouseenter.bind(this) );
        
        //this.container.on('mouseleave', this.onMouseleave.bind(this) );
        
    }
    
    onMouseenter () {
        
        if( window.innerWidth <= 768 ) return;
        
        if( ! ( this.target[ this.target.length - 1 ] instanceof TYPES.CTA ) ) {
            
            if ( this.locked ) {
                
                this.nextTarget.push( new TYPES.CTA( !!this.target.length ) );
                
            } else {
                
                this.target.push( new TYPES.CTA( !!this.target.length ) );
                
            }
            
        }
        
        this.mouseover = true;
        
        this.animate();
        
    }
    
    onMouseleave () {
        
        if( window.innerWidth <= 768 ) return;
        
        this.target = this.target.filter( item => !( item instanceof TYPES.CTA ) );
        
        this.mouseover = false;
        
        this.animate();
        
    }
    
    getDir () {
        
        if( this.curr.length === 0 && this.target.length === 0 ) return 0;
        
        if ( this.target.length < this.curr.length ) return -1;
        
        for ( var i = 0; i < this.curr.length; i++ ) {
        
            if( this.curr[ i ].content !== this.target[ i ].content ) {
                
                return -1;
                
            }
            
        }
        
        if ( this.curr.length < this.target.length ) return 1;
        
        if( this.curr[ this.curr.length - 1 ].isTyped() ) {
            
            return 0;
            
        }
        
        return 1;
        
    }
    
    tick () {
        
        this.animating = true;
        
        var dir = this.getDir();
        
        this.render( !dir );
        
        var last = this.curr[ this.curr.length - 1 ];
        
        var delay = 0;
        
        if ( dir === 1 ) {
            
            if ( this.curr.length === 0 ) delay = 500;
            
            if( !last || last.isTyped() ) {
                
                var next = this.target[ this.curr.length ];
                
                this.curr.push( next );
                
                last = next;
                
            }
            
            delay += last.type();
            
        } else if ( dir === -1 ) {
            
            delay = last.erase();
            
            if( last.isErased() ) {
                
                this.curr.pop();
                
            }
            
        } else if ( dir === 0 ) {
            
            this.animating = false;
            
        }
        
        if ( delay ) setTimeout( this.tick.bind(this), delay );
        
    }
    
    render ( end ) {
        
        var html = '';
        
        for( var i = 0; i < this.curr.length; i++ ) {
            
            html += this.curr[ i ].render();
            
        }
        
        if( html === this.currHTML ) return;
        
        this.currHTML = html;

        this.element.remove();
        
        this.element = $('<span>').addClass('typing').html( html );
        
        this.beforeElement.after( this.element );
        
        this.container.toggleClass( 'flash', end );
        
        this.container.toggleClass( 'empty', !this.curr.length );
        
        if( end ) {
            
            var input = this.container.find('.input');
            if(input.length === 1) input.focus();
            
        }
        
    }
    
    parse ( content ) {
        
        return el.html(content).contents().$$().map( el => {
            
            var tagName = el.prop('tagName');
            var content = el.text();
            
            if( !tagName ) {
                
                tagName = 'TEXT';

            }
            
            if( tagName === 'IMG' ) debugger;
            
            return new TYPES[ tagName ]( content, el );
            
        });
        
    }
    
    type ( content, force ) {
        
        if( content === this.currContent ) return;
        
        this.currContent = content;
        
        var target = this.parse( content );
        
        if ( this.locked && !force ) {
            
            this.nextTarget = target;
            
        } else {
            
            this.target = target;
            
        }
        
        if( this.mouseover ) this.onMouseenter();
        
        this.animate();
        
    }
    
    animate () {
        
        if ( !this.animating ) this.tick();
        
    }
    
    lock () {
        
        this.nextTarget = this.target;
        
        this.target = [];
        
        this.locked = true;
        
        this.animate();
        
    }
    
    unlock () {
        
        this.target = this.nextTarget;
        
        this.nextTarget = null;
        
        this.locked = false;
        
        this.animate();
        
    }
    
    override ( content ) {
        
        this.target = this.parse( content );
        
        this.animate();
        
    }
    
}

module.exports = new Animator( $('.sidebar'), $('.logo-nl') );

// set thing
// add contact link
// remove contact link