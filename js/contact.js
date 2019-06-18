var $ = require('jquery');
var typing = require('./typing/main.js');
var validate = require('email-validator').validate;
var esc = require('lodash/escape');

module.exports = function(){
    
    var sidebar = $('.sidebar');
    
    var data = {};
    
    var next = "<icon href='#next'>enter</icon>";
    
    $(window).on('keypress', function( e ){
        
        if( e.keyCode === 13 ) { // enter
        
            e.preventDefault()
            
            sidebar.find('[href="#next"]').trigger('click');
        
        }
        
    })
    
    function listener ( fn, validate, unbind ) {
        
        validate = validate || ( () => true );
        
        return function wrapped ( event ) {
            
            var target = $(event.target);
            
            if( !target.is('.button, a') ) target = target.parent('.button, a');
            
            var href = target.attr('href');
            
            if ( href !== '#next' && href !== '#cancel' ) return;
            
            if ( href ) {

                event.preventDefault();
                
                var input = sidebar.find('.input');
                
                var text = esc( input.text() );
                
                if( !input.length || ( text.length && validate(text) ) ) {
                    
                    if ( href === '#next' ) {
                        fn( text );
                    } else if ( href === '#cancel' ) {
                        start();
                    }
                    
                    if( !unbind ) sidebar.off( 'click.contact', wrapped );
                    
                }
                
            }
            
        }
        
    }
    
    var start = () => {
        
        data = {};
        
        typing.lock();
        
        typing.override("Firstly, what's your name?\n\n<field></field>" + next);
        
        sidebar.on('click.contact', listenForCompany);
        
    }
    
    var listenForStart = listener( start );
    
    var listenForCompany = listener( input => {
        
        data.name = input;
        
        typing.override('Hi ' + data.name + ', what company do you work for?\n\n<field></field>' + next);
        
        sidebar.on('click.contact', listenForPhone);
        
    })
    
    var listenForPhone = listener( input => {
        
        data.company = input;
        
        typing.override("And what's your phone number?\n\n<field></field>" + next);
        
        sidebar.on('click.contact', listenForEmail);
        
    })
    
    var listenForEmail = listener( input => {
        
        data.phone = input;
        
        typing.override("Finally, what's your e-mail address?\n\n<field></field>" + next);
        
        sidebar.on('click.contact', confirm);
        
    })
    
    var confirm = listener( input => {
        
        data.email = input;
        
        typing.override(`So your name is <field>${data.name}</field>, you work for <field>${data.company}</field>, your phone number is <field>${data.phone}</field>, and your email address is <field>${data.email}</field>, is this all correct?\n\n<a href="#next">SUBMIT</a>`)
        
        sidebar.on('click.contact', finish);
        
    }, validate)
    
    var finish = listener( input => {
        
        var inputs = sidebar.find('.input');
        
        data = {
            name: esc( inputs.eq(0).text() ),
            phone: esc( inputs.eq(1).text() ),
            company: esc( inputs.eq(2).text() ),
            email: esc( inputs.eq(3).text() )
        }
        
        var message = '';
        
        for ( var field in data ) {
            
            message += field + ': ' + data[ field ] + '\n\n';
            
        }
        
        var postData = {
            fromEmail: data.email,
            fromName: data.name,
            subject: 'nl-dc.nl – Contact request',
            message
        }
        
        $.post('mail.php', postData, response => {
            
            if( response.success ) {
                
                typing.override(`Thanks ${data.name}, we'll be in touch soon!`);
                
                setTimeout( () => typing.unlock(), 5000 );
                
            } else {
                
                console.log(response);
                
                typing.override(`Error! Sorry, please try again`);
                
            }

            
        }, false, true);
        
        
    })
    
    sidebar.on( 'click.contact', listenForStart )
    
}