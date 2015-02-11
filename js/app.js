require(
    ['mymodule', 'jquery'],
    function( Module, $ ){ //Module при этом не будет доступна в глобальной области видимости, доллар в глобальную область 
		for (i=0; i<20; i++) {
			$('.grid').append( Module.gallery );
		}
    }
);