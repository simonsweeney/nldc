var $ = require('jquery');
require('jquery-smooth-scroll');

var prefixed = require('detectcss').prefixed;

var typing = require('./typing/main.js');

var PREFIXED_TRANSFORM = prefixed('transform');
var PREFIXED_TRANSITION = prefixed('transition');

module.exports = function(){

    $('.carousel').each(function(){
        
        var $this = $(this);
        var $inner = $this.children('.carousel__slides');
        var $slides = $inner.children().$$();
        
        var captions = $slides.map( slide => slide.data('sidebar-caption') );
        
        var curr = -1;
        var step = -100 / $slides.length;
        
        var onScreen = false;
        
        function change(){
            
            curr++;
            
            $inner.css( PREFIXED_TRANSITION, 'transform 1s' );
            $inner.css( PREFIXED_TRANSFORM, 'translateX(' + step * curr + '%)' );
            
            onScreen = window.pageYOffset <= window.innerHeight * .75;
            
            if ( onScreen ) {
                    
                typing.type( captions[ curr ] );
                
            }
            
            setTimeout(function(){
                
                $inner.css(PREFIXED_TRANSITION, 'none');
                
                if( curr === $slides.length - 1 ) {
                    
                    $inner.css(PREFIXED_TRANSFORM, 'translateX(0)');
                    curr = 0;
                    
                }
                
            }, 1000)
            
            setTimeout( change, 8000 )
            
        }
        
        $( window ).on('scroll', function(){
            
            if( curr === -1 || window.pageYOffset >= window.innerHeight * .75 ) return;
            
            typing.type( captions[ curr ] );
            
        })
        
        change();
        
    });
    
    $('.carousel__down').smoothScroll();

}