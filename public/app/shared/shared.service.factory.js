angular.module('SharedServiceFactoryModule',[])
    
    .factory('SharedServiceFactory', SharedServiceFactory);
SharedServiceFactory.$inject = ['$http', '$location', '$rootScope', '$timeout' ];
function SharedServiceFactory($http, $location, $rootScope, $timeout) {
	return {
		ServiceCall : function(url, input, method, successCallBack, errorResponse) {
						
            
            
            angular.element(document.querySelector('body')).addClass('loading');
		

			
				$http({
					method : method,
					url : url,
					data : input,
					headers : {
						"Content-Type" : "application/json"
					},
					timeout : 90000
				}).then(function(data, status, headers, config) {
					 angular.element(document.querySelector('body')).removeClass('loading');
				
					successCallBack(data);
					
					

				}, function(data, status, headers, config) {
					console.log(data);
					errorResponse(data);
					 angular.element(document.querySelector('body')).removeClass('loading');
					if (data.status == -1) {
						alert("Network error, please try again after some time");
					}
				});
			
		}
	};
};
