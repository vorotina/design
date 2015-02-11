define(
    'mymodule', //название модуля
    ['jquery'], //зависимости 
    function( $ ){ //функция-фабрика, экспортируемые зависимостями переменные в аргументах
        return { // возвращает модуль 
            gallery : '<figure class="effect-bubba">' +
						'<img src="img/portfolio/all/zagerz.jpg" alt="img03"/>' +
						'<figcaption>' +
							'<h2>Fresh <span>Bubba</span></h2>' +
							'<p>Bubba likes to appear out of thin air.</p>' +
							'<a href="#">View more</a>' +
						'</figcaption>' +			
					'</figure>'
        };
    }
);