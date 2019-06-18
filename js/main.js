var $ = require('jquery');
require('./lib/jquery.plugins.js');

var FontFaceObserver = require('fontfaceobserver');

var $body = $('body');

function init(){
    
    require('./menu.js')();
    require('./carousel.js')();
    require('./content.js')();
    require('./contact.js')();
    require('./map.js')();
    require('./timeline.js')();
    require('./footer.js')();
    
}

var font = new FontFaceObserver('Typ1451-Bold');

font.load().then( () => {
    
    $body.removeClass('loading');
    
    if( $body.hasClass('intro') ) {
        
        setTimeout( () => {
            $body.removeClass('intro-start');
            setTimeout( () => {
                $body.removeClass('intro');
                init();
            }, 1000)
        }, 2000);
        
    } else {
        
        init();
        
    }
    
});