var $ = require('jquery');
var typing = require('./typing/main.js');

module.exports = function(){
    
    var $body = $('body');

    var menuOpen = false;
    var $menuButton = $('.menu-button');
    
    function openMenu() {
        $body.addClass('menu-open');
        menuOpen = true;
        typing.lock();
        typing.override('What are you looking for?')
    }
    
    function closeMenu() {
        $body.removeClass('menu-open');
        menuOpen = false;
        typing.unlock();
    }
    
    $menuButton.click(function(){
        
        if( !menuOpen ) {
            openMenu();
        } else {
            closeMenu();
        }
        
    });
    
    var loc = window.location.href.split('#')[0];
    
    $('nav a').filter(function(){
        
        return $(this).attr('href').indexOf(loc) > -1;
        
    }).click( closeMenu );
    
    var $columns = $('nav .nav__category');
    
    function sizeColumns(){
        
        $columns.css('height', '');
        
        if( window.innerWidth <= 415 ) return;
        
        var max = 0;
        
        $columns.each( function(){
            max = Math.max( max, $(this).height() );
        })
        
        $columns.height( max );
        
    }
    
    $(window).on('resize', sizeColumns);
    
    sizeColumns();
    
}