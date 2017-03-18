angular.module('mainController',[])

.controller('MainController',function($rootScope,$state,$location,Auth,CommonDataFactory,assetService,$mdDialog, $mdMedia,SharedServiceFactory)
           {
    

    
    var vm=this;
    vm.showPwd="password";
    
   vm.loggedIn=Auth.isLoggedIn();
   console.log("logged in value"+vm.loggedIn);
    var t=assetService.getUser()
        .success(function(data){
            
           console.log("Came to isAdmin now from Rajat in mainController "+data.Admin);
           vm.isAdmin_there=data.Admin;
               
            
        });
    
    $rootScope.$on('$stateChangeStart',function(event,next,prev)
    {
        console.log("route change was called");
                      console.log("next is "+next.isLogin);
                       vm.loggedIn=Auth.isLoggedIn(); 
                        console.log(vm.loggedIn);
                if(vm.loggedIn===true && next.isLogin===true){
                    $location.path('/submit/click');
                    
                 
                }
                

                
        
               // console.log("Next for Admin is "+next.isAdmin +" vm.isAdmin_there is  "+vm.isAdmin_there);
                
                if(next.isAdmin===true){
                    
                    
                 
        
                                // assetService.getUser()
                                // .success(function(data){
                                //    // angular.element(document.querySelector('body')).removeClass('loading');
                            //Temporary Fix Need to have a permananent Fix for this
                            
                              //  console.log("Came to isAdmin now from Rajat in mainController "+data.Admin);
                                   // vm.isAdmin_there=data.Admin;
                                  vm.isAdmin_there=(atob(atob(atob(atob(atob(atob(localStorage.ghfuydffuifuilfuif)))))));
                                     if(next.isAdmin===true && vm.isAdmin_there==='false' ){

                                  $location.path('/submit/click');

                                   }


                                        // });
                          
                    
                }
        
        
        
                                    
        
        
               
                        

                       Auth.getUser()
                       .then(function(data)
                            {
                           vm.user=data.data;
                       });
     });
    
    vm.showPassword=function(){
        if(vm.showPwd==="password")
            vm.showPwd="text";
        else
            vm.showPwd="password";
        
        
    }

    vm.checktoShowPassword=function(){
        var password=angular.element(document.querySelector("#password")).val();
        if(password!==""){
            return true;
        }
        else{
         return false;   
        }
        
    }
    vm.doLogin=function()
    {
        vm.processing=true;
        vm.error='';
        Auth.login(vm.loginData.username,vm.loginData.password)
        .success(function(data)
                {
            vm.processing=false;
            Auth.getUser()
            .then(function(data)
                 {
               vm.user=data.data; 
            });
            
            if(data.success)
                {
                    //Here we will check for Desk
                    
                      vm.deskCheck=Auth.deskCheck()
    .success(function(data){
            
            console.log("Desk checking "+data.result);
//            return data;
                          
                          
            if(data.result===false){
//                vm.deskCheck_controller=true;
                
                $state.go('submit.desk');
            }
            else{
//                 vm.deskCheck_controller=false;
              
                CommonDataFactory.setDeskNo(data.DeskNo);
                console.log(" CommonDataFactory.getDeskNo "+data.DeskNo+"  "+ CommonDataFactory.getDeskNo());
                //Need to Use CommonDataFactory and CommonServiceFactory
                $state.go('submit.desk');
            }
        });
    
                   
                    
                    
                    
                  //  $location.path('/desk');
                    
                    
                    
                    
                }
            else{
                vm.error=data.message;
            }
            
        });
        
    }
    
    vm.doLogout=function(ev)
    {
        console.log("Event is "+ev);
        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to Logout?')
         // .textContent('You .')
         // .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Logout!')
          .cancel('Cancel');
        
        
    $mdDialog.show(confirm).then(function() {
        //Log Him Out 
        
                Auth.logout();
                $state.go('login');
    }, function() {
      //Do nothing IF he doen't wants to logout
    });
        
        
        
    }
    
    
   
    
    
})

















