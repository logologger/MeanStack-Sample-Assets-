angular.module('deskController',['DeskService','ngMaterial'])

.controller('DeskController',function(DService,$scope,$location, CommonDataFactory,$state,$mdToast)
           {
     var last = {
      bottom: true,
      top: true,
      left: true,
      right: true
    };
  $scope.toastPosition = angular.extend({},last);
  $scope.getToastPosition = function() {
    sanitizePosition();
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };
  function sanitizePosition() {
    var current = $scope.toastPosition;
    if ( current.bottom && last.top ) current.top = true;
    if ( current.top && last.bottom ) current.bottom = true;
    if ( current.right && last.left ) current.left = true;
    if ( current.left && last.right ) current.right = true;
    last = angular.extend({},current);
  }
  
    var vm=this;
    $scope.indexvalue=0;
   vm.EnableSubmitvalue=false;
    //to show all the desk in the  select option
    vm.AllDesks=DService.giveAll()
   .success(function(data){
       
       vm.AllDesks=data;
   })

    vm.AllLocations=DService.giveAllLocation()
   .success(function(data){
       
       vm.AllLocations=data;
   })

    //capture the desk details here and put them inside 
    //EmployeeDesk Collection
    vm.submitDeskDetails=function()
    {
        //get the user id and desk id from here
        //   angular.element(document.querySelector('body')).addClass('loading');
        // angular.element(document.querySelector('body')).css("background","rgba(0,0,0,0.5)");
        if(!vm.selectedDesk) 
        {
         var pinTo = $scope.getToastPosition();
    $mdToast.show(
      $mdToast.simple()
        .textContent('Please fill the Desk Information!')
        .position(pinTo )
        .hideDelay(2000)
    ); 
        }
      
        else {
        console.log("Getting the SubmitDesk Details from the Server "+vm.selectedDesk+"User is "+vm.user);

        if(vm.selectedDesk2 && vm.middle){
            
            console.log("Desk 2  selected");
           // console.log("middle desk is"+vm.middle);
            if(typeof vm.selectedDesk!=="object")
             var selectedDesk=JSON.parse(vm.selectedDesk);
            else
               var selectedDesk=(vm.selectedDesk);  
            if(typeof vm.selectedDesk2!=="object")
            var selectedDesk2=JSON.parse(vm.selectedDesk2);
            else
             var selectedDesk2=(vm.selectedDesk2);
            
           
            if(typeof vm.selectedWing!=="object")
            var wing=JSON.parse(vm.selectedWing);
            else
             var wing=(vm.selectedWing);
            var data_to_send={};
            data_to_send.selectedDesk=selectedDesk;
            data_to_send.wing=wing;
            
            //Now we will create the Desk first and then save that Desk in EmployeeDesk reference
            var newMiddleDesk=selectedDesk.Desk+"::M::"+selectedDesk2.Desk;
            console.log(newMiddleDesk);
            var DeskDataMiddle={};
            DeskDataMiddle.desk=newMiddleDesk;
            DeskDataMiddle.wing=wing;
            DService.createMiddle(DeskDataMiddle)
            .success(function(data){
                
                    data_to_send.selectedDesk=data.deskData[0];
                     console.log("Pyar wala "+data.deskData[0]);
                    CommonDataFactory.setDeskNo(data.deskData[0].Desk);

                    DService.saveDesk(data_to_send).
                    success(function(data){
                         angular.element(document.querySelector('body')).removeClass('loading');
                      angular.element(document.querySelector('body')).css("background","");
                        console.log(data);


                    $state.go('submit.payment');
                    }); 
                
            })
            //call the Service with post method that will create a new Desk with required name and then return the reference of that Desk ..which we will save as selected Desk
 }
        else{
            
            console.log("Desk 2 not selected");
            
            if(typeof vm.selectedDesk==="object")
            var selectedDesk=(vm.selectedDesk);
            else if(typeof vm.selectedDesk==="string")
            var selectedDesk=JSON.parse(vm.selectedDesk);
            else
            var selectedDesk=(vm.selectedDesk);
            
            if(typeof vm.selectedWing==="object")
            var wing=(vm.selectedWing);
            else if(typeof vm.selectedWing==="string")
             var wing=JSON.parse(vm.selectedWing);
            else
                var wing=(vm.selectedWing); 
            var data_to_send={};
            data_to_send.selectedDesk=selectedDesk;
            
            data_to_send.wing=wing;
          
        console.log("Pyar wala "+typeof selectedDesk);
         CommonDataFactory.setDeskNo(selectedDesk.Desk);
        
        DService.saveDesk(data_to_send).
        success(function(data){
          
             angular.element(document.querySelector('body')).removeClass('loading');
            angular.element(document.querySelector('body')).css("background","");
            $state.go('submit.payment');
        });
            
        }
  }
}
     $scope.selected = false;
    
    vm.allWings=DService.getAllWing()
    .success(function(data){
        
        console.log("WingData  "+JSON.stringify(data));
        vm.allWings=data;
        
    })
    
    vm.getDeskBasedOnWing=function(index){
        //Here we will call the Service which will get the Desk Based on the Wing selected by the User
        
        console.log("Selected Wing is "+vm.selectedWing+" and typeof is "+typeof  vm.selectedWing);
        console.log("index is"+ index);
        CommonDataFactory.setIndexValue(index);
          if(vm.selectedWing && typeof vm.selectedWing==="object")
      
              var selWing=(vm.selectedWing); 
        else if(typeof vm.selectedWing==="string")
            var selWing=JSON.parse(vm.selectedWing);
         
        else
        var selWing=(vm.selectedWing); 
        console.log("Wing selected is "+selWing.Wing);
        DService.getDeskBasedOnWing(selWing.Wing)
        .success(function(data){
            vm.AllDesks=data;
            //Here the Desk will come based on the Wing selected by the User
        })
        $scope.indexvalue=CommonDataFactory.getIndexValue()-1;
    console.log("index local value"+$scope.indexvalue);
   }
    
    
    vm.CancelDeskUpdate=function(){
        
        $location.path('submit');
    }
    vm.EnableSubmit=function(){
        
       vm.EnableSubmitvalue=true;
    }
})
 .controller('ToastCtrl', function($scope, $mdToast, $mdDialog) {
      $scope.closeToast = function() {
        if (isDlgOpen) return;
        $mdToast
          .hide()
          .then(function() {
            isDlgOpen = false;
          });
      };
      $scope.openMoreInfo = function(e) {
        if ( isDlgOpen ) return;
        isDlgOpen = true;
        $mdDialog
          .show($mdDialog
            .alert()
            .title('More info goes here.')
            .textContent('Something witty.')
            .ariaLabel('More info')
            .ok('Got it')
            .targetEvent(e)
          )
          .then(function() {
            isDlgOpen = false;
          })
      };
    });
