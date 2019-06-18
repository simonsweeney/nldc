var Text = require('./text.js');

module.exports = class Feild extends Text {
    
    render () {
        
        return '<span class="input" contenteditable>' + super.render() + '</span>';
        
    }
    
}