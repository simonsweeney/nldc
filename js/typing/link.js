var Text = require('./text.js');

module.exports = class Link extends Text {
    
    constructor ( content, element ) {
        
        super( content );
        
        if ( element ) {
            
            if ( element.attr ) {
                
                this.href = element.attr('href');
                
            } else {
                
                this.href = element;
                
            }
            
        } else {
            
            this.href = '';
            
        }
        
    }
    
    render () {
        
        return '<a href=' + this.href + '>' + super.render() + '</a>';
        
    }
    
}