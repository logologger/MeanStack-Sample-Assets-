var app=angular.module("myApp",['mainController','authService','ngAnimate', 'ui.router','DeskService','deskController','AssetController','CommonData','AssetService','AssetDetailController','ngTable','AdminController','LocationController','ngMaterial','ngMessages','SharedServiceFactoryModule'])


.config(function($stateProvider, $urlRouterProvider,$httpProvider)
       {
    
      $stateProvider
    
     
        .state('/', {
            url: '/',
            templateUrl:'app/components/Login/login.html',
            controller:'MainController',
            controllerAs:'main',
            isLogin:true
        })
        
       
        .state('login', {
            url: '/login',
            templateUrl:'app/components/Login/login.html',
            isLogin:true
        })
        
       
       
        // url will be /form/payment

        .state('submit', {
            url: '/submit',
            templateUrl:'app/components/Assets/AssetFetch/AssetInfo.html',
            controller:'assetInfoCtrl',
            controllerAs:'assetInfo'
        })
        
         .state('submit.payment', {
            url: '/payment',
            templateUrl: 'app/components/Assets/AssetFetch/form-assetinfo.html',
            controller:'assetInfoCtrl',
            controllerAs:'assetInfo'
        })
          .state('submit.desk', {
            url: '/desk',
            templateUrl:'app/components/Desk/desk.html',
            controller:'DeskController',
           controllerAs:'desk'
        })
        
        .state('submit.click', {
            url: '/click',
            templateUrl:'app/components/Assets/AssetInfo/AssetDetails.html',
            controller:'assetDetailController'
        
        })
        .state('submit.adminlink', {
            url: '/adminlink',
           templateUrl:'app/components/Admin/AdminDetails.html',
        controller:'AdminController',
        isAdmin:true
         
        });
        $urlRouterProvider.otherwise('submit/desk');
    
  


    $httpProvider.interceptors.push('AuthInterceptor'); 
    
})




