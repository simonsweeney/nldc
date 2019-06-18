var $ = require('jquery');
var typing = require('./typing/main.js');
var $document = $(document);

module.exports = function(){
    
    var $main = $('main');
    var headers = $main.find('h2').$$().map( $header => {
        
        return {
            element: $header,
            caption: $header.data('sidebar-caption') || '',
            offset: 0
        };
        
    });
    
    function getOffsets(){
        
        headers.forEach( header => {
            
            var element = header.element;
            
            var top = header.element.offset().top;
            var margin = parseFloat( element.css('margin-top') );
            
            header.offset = top - margin;
            
        });
        
    }
    
    function onScroll(){
        
        var top = window.pageYOffset;
        var padding = window.innerHeight / 4;
        
        var content;
        
        if( top + window.innerHeight === $document.height() ) {
            
            content = 'Want to know more about our services? Let us <a class="button" href="#next">call you back</a>';
            
        } else {

            for ( var i = 0; i < headers.length; i++ ) {
                
                var h = headers[ i ];
                
                if ( h.offset - padding <= top ) {
                    
                    content = h.caption;
                    
                } else {
                    
                    break;
                    
                }
                
            }
            
        }
        
        if( content !== undefined ) typing.type( window.innerWidth <= 768 ? "" : content );
        
    }
    
    function onResize(){
        
        getOffsets();
        onScroll();
        
    }
    
    $main.find('img').on('load', getOffsets);
    
    if( $('body').hasClass('page_contact') ) {
        
        typing.type( 'Want to know more about our services? Let us <a class="button" href="#next">call you back</a>' )
        
    } else {
        
        $(window).on( 'scroll', onScroll )

    }
    
    $(window).on( 'resize', onResize );
        
    onResize();

}