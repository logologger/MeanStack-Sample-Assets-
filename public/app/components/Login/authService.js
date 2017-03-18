angular.module('authService',[])

.factory('Auth',function($http,$q,AuthToken,SharedServiceFactory)
        {
   
    var authFactory={};
    
    
    authFactory.login=function(username,password)
    {
         angular.element(document.querySelector('body')).addClass('loading');
        angular.element(document.querySelector('body')).css("background","rgba(0,0,0,0.5)");
        var data={
             username:username,
            password:password
            
        };
        
  //      SharedServiceFactory.ServiceCall('/api/login', data, 'POST', loginSuccess, errorResponse);
 
        return $http.post('/api/login',{
            username:username,
            password:password
        })
        
   /*     function loginSuccess(data){
            
            console.log("data is "+data);
             AuthToken.setToken(data.data.token);
            return data.data;
            
        }
        function errorResponse(){
            console.log("Error Respone Cant Access the data");
            
        }
        */
        .success(function(data)
                {
                    console.log("admin is"+JSON.stringify(data));
                   var isAdmin=btoa("isAdmin");
                    localStorage.ghfuydffuifuilfuif=btoa(btoa(btoa(btoa(btoa(btoa(data.Admin))))));
                    console.log("local value is"+localStorage.isAdmin);
             angular.element(document.querySelector('body')).removeClass('loading');
            angular.element(document.querySelector('body')).css("background","");
            AuthToken.setToken(data.token);
            return data;
        })
        
    }
    
    
    authFactory.logout=function()
    {
         angular.element(document.querySelector('body')).addClass('loading');
        AuthToken.setToken();
        sessionStorage.removeItem("DeskNo");
        localStorage.removeItem("isAdmin");
        angular.element(document.querySelector('body')).removeClass('loading');
    }
    authFactory.isLoggedIn=function()
    {
        if(AuthToken.getToken())
          {
           return true;
           }
        else{
            return false;
        }
            
    }
    
    
    authFactory.getUser=function()
    {
        if(AuthToken.getToken())
            {
                return $http.get('/api/me');
            }
        else{
            return $q.reject({message:"User has no token"});
        }
    }
    
    authFactory.deskCheck=function(){
        
       return $http.get('/api/checkDesk');
        
        
    }
    
    return authFactory;
})

.factory('AuthToken',function($window)
        {
    var authTokenFactory={};
    
    
    authTokenFactory.getToken=function()
    {
        console.log("local storage "+$window.localStorage.getItem('token'));
        return $window.localStorage.getItem('token');
    }
    authTokenFactory.setToken=function(token)
    {
        if(token)
            {
                $window.localStorage.setItem('token',token);
            }
        else{
            $window.localStorage.removeItem('token');
        }
        
    }
    
    return authTokenFactory; 
    
})

.factory('AuthInterceptor',function($q,$location,AuthToken)
        {
   var interceptorFactory={};
    
    
    interceptorFactory.request=function(config)
    {
    var token=AuthToken.getToken();
    if(token)
        {
            config.headers['x-access-token']=token;
            
        }
    return config;
    }
    
    interceptorFactory.responseError=function(response)
    {
      if(response.status==403)
          {
              $location.path('/login');
          }
        return $q.reject(response);
        
    }
    
    return interceptorFactory;
        })

    










