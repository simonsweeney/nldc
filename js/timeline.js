var $ = require('jquery');
var {scale} = require('./lib/utils.js');
var tween = require('./lib/tween.js');

var PREFIXED_TRANSFORM = require('detectcss').prefixed('transform');

module.exports = function () {
    
    $('.timeline-outer').$$().forEach( $outer => {
        
        var $timeline = $outer.find('.timeline');
        
        var $stops = $timeline.children('.timeline__stop');
        
        var $handle = $timeline.children('.timeline__handle');
        
        var $year = $outer.find('.timeline-year');
        
        var years = $stops.$$().map( stop => Number( stop.data('year') ) );
        
        var $copy = $outer.find('.timeline-copy');
        
        var $blocks = $copy.children().$$();
        
        var curr = 0;
        var position = 0;
        
        function update(x) {
            
            var stops = x * ($stops.length - 1);
            
            $handle.css('left', x * 100 + '%');
            
            var fromStop = Math.floor( stops );
            var toStop = Math.ceil( stops );
            
            if( fromStop === toStop ) {
                
                if( fromStop === 0 ) {
                    toStop++;
                } else {
                    fromStop--;
                }
                
            }
            
            $blocks[ fromStop ].css('opacity', toStop - stops );
            $blocks[ toStop ].css('opacity', stops - fromStop );
            
            var fromYear = years[ fromStop ];
            var toYear = years[ toStop ];
            
            var year = scale( stops, fromStop, toStop, fromYear, toYear );
            
            $year.text( Math.round(year) );
            
            $copy.css( PREFIXED_TRANSFORM, 'translateX(' + stops * -100 + '%)' );
            
            position = x;
            
        }
        
        function goto( stop ) {
            
            curr = stop;
            
            var toPosition = stop /= $stops.length - 1;
            
            tween( 'timeline', position, toPosition, 400, 'cubicInOut', update );
            
        }
        
        $timeline.on('click', function(e){
            
            var x = e.offsetX / $timeline.width();
            
            x *= $stops.length - 1;
            
            x = Math.round(x);
            
            goto( x )
            
        })
        
        setInterval( () => {
            
            goto( (curr + 1) % $stops.length );
            
        }, 5000)
        
    })
    
}