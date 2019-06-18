<?php
namespace Craft;

class StrongPasswordPlugin extends BasePlugin
{
	/**
	 * @return mixed
	 */
	public function getName()
	{
		return Craft::t('Strong Password');
	}

	/**
	 * @return string
	 */
	public function getVersion()
	{
		return '1.0.1';
	}

	/**
	 * @return string
	 */
	public function getDeveloper()
	{
		return 'BONG';
	}

	/**
	 * @return string
	 */
	public function getDeveloperUrl()
	{
		return 'http://bong.international';
	}
	
	public function init() {
	    
	    craft() -> on( 'users.beforeSetPassword', function( Event $e ) {
	        
	        $user = $e -> params['user'];
	        
	        $password = $e -> params['password'];
	        
	        $validates = true;
	        
	        if (
	            !preg_match('/^\S*(?=\S{10,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])(?=\S*[\W])\S*$/', $password )
            ) {
	            
	            $e -> performAction = false;
	            
	            $user -> addError('newPassword', 'Passwords must be at least 10 characters long, including a lowercase letter, an uppercase letter, a number and a symbol.');
	            
	        }
	        
	    });
	    
	}
	
}
