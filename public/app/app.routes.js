angular.module('appRoutes',['ngAnimate', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider)
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
        
       
        .state('desk', {
            url: '/desk',
            templateUrl:'app/components/Desk/desk.html',
            controller:'DeskController',
           controllerAs:'desk'
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
            templateUrl: 'app/components/Assets/AssetFetch/form-payment.html',
            controller:'assetInfoCtrl',
            controllerAs:'assetInfo'
        })
        
        .state('click', {
            url: '/click',
            templateUrl:'app/components/Assets/AssetInfo/AssetDetails.html',
            controller:'assetDetailController'
        
        })
        .state('adminlink', {
            url: '/adminlink',
           templateUrl:'app/components/Admin/AdminDetails.html',
        controller:'AdminController',
        isAdmin:true
         
        });
       
  
    $urlRouterProvider.otherwise('/desk');
    $stateProvider.html5Mode(true);



    
    
})



