angular.module('LocationController',['DeskService'])

.controller('LocationController',function(DService,$scope,$location, CommonDataFactory,$mdDialog)
           {
    
    var vm=this;
     

    vm.AllLocations=DService.giveAllLocation()
   .success(function(data){
         
       vm.AllLocations=data;

   })


vm.showItLocation=function(ev)
    {
        
        var finalselectedvalue={};
        console.log("Came to Location ");
      
        
        console.log("Getting the SubmitDesk Details from the Server "+$scope.editLocation);
        //$scope.editLocation.id == (any id in $scope.users.map(function(u) { return u.id; }));
        console.log("locations "+vm.AllLocations);
        for(var index in vm.AllLocations) {
          console.log("index value location is"+vm.AllLocations[index].Location);
          if($scope.editLocation===vm.AllLocations[index].Location) {
              finalselectedvalue=vm.AllLocations[index];
              console.log("final value "+JSON.stringify(finalselectedvalue));
              $scope.editLocation=vm.AllLocations[index].Location;
          }
         
        }
        console.log("index value is"+$scope.editLocation);
        if(typeof finalselectedvalue!=="object")
        var selectedLocation=JSON.parse(finalselectedvalue);
        else
        var selectedLocation=finalselectedvalue;
        console.log("Return type "+typeof selectedLocation);
        CommonDataFactory.setLocation(selectedLocation.Location);
      
         $scope.LocationFinal=selectedLocation.Location;
        vm.LocationValue=selectedLocation.Location;
       

        
         DService.saveLocation(selectedLocation).
        success(function(data){
          
            console.log("Updating Locatin Response "+JSON.stringify(data));
           
            
             vm.finish(ev);
 window.location.reload();
            
        });
        
        
    }

  vm.showWing = function(thing) {
          $scope.editLocation = angular.copy(thing); 
        };
    
  vm.openDialog = function(ev) {
      $mdDialog.show({
        controller: 'LocationController',
        controllerAs: 'loc',
        templateUrl: 'app/components/Location/location_update.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
    };
    
vm.cancel = function($event) {
      $mdDialog.cancel();
    };
vm.finish = function($event) {
      $mdDialog.hide();
    };

    
})