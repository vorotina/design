define(
    'mymodule', 
    ['jquery'], 
    ['underscore'], 
	['backbone'],
	['text!../tpl/gallery_item.html'],
    function( $, gallery_item  ) {
	
        return {  
            gallery : gallery_item 
        }
		
	}	
);