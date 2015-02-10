require(
    ['mymodule', 'jquery'],
    function( Module, $ ){ //Module при этом не будет доступна в глобальной области видимости, доллар в глобальную область 
        $('body').append( Module.foo );
    }
);