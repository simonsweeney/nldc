var $ = require('jquery');

module.exports = function(){
    
    var $footer = $('footer');
    var $pusher = $('#pusher');
    
    function onResize(){
        
        $pusher.css('bottom', -$footer.outerHeight() );
        
    }
    
    $(window).on( 'resize', onResize );
    
    onResize();
    
}