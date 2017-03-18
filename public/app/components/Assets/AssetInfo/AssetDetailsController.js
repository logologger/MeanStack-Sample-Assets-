angular.module('AssetDetailController',[])
.controller('assetDetailController',function($location,$scope,assetService,CommonDataFactory, ngTableParams, $filter,$q,$mdDialog, $mdMedia,$rootScope)
           {
   
    var before_Updating;
    $scope.displayUpdate={};
    $scope.displayTabPhoneUpdate={};
      $scope.LocationValue;
      $rootScope.preventNavigation = false;
    $scope.LocationValue=CommonDataFactory.getLocation();
    
    if(CommonDataFactory.getProcessor()!="")
        $scope.processor=JSON.parse(CommonDataFactory.getProcessor());
    else
        $scope.processor="";
    console.log("typeof processor"+typeof $scope.processor);
    if(CommonDataFactory.getRAM()!="")
        $scope.RAM=JSON.parse(CommonDataFactory.getRAM());
    else
        $scope.RAM="";
    if(CommonDataFactory.getHDD()!="")
        $scope.HDD=JSON.parse(CommonDataFactory.getHDD());
    else
        $scope.HDD="";
    if(CommonDataFactory.getOSVersion()!="")
        $scope.OSVersion=JSON.parse(CommonDataFactory.getOSVersion());
    else
        $scope.OSVersion="";
    $scope.updatedAsset={};
    $scope.hideDesktopDetails=false;
    $scope.hideTabPhoneDetails=false;
    assetService.getUser()
        .success(function(data){
            
    console.log("Came to isAdmin now from Rajat "+data.Admin);
    $scope.isAdmin_there=data.Admin;
   });
      
    var vm=this;
    console.log("Come to Assets "+ CommonDataFactory.getDeskNo());
    $scope.DeskNumber=CommonDataFactory.getDeskNo();
    $scope.LocationValue=CommonDataFactory.getLocation();
    console.log("DeskNo"+$scope.DeskNumber);
    $scope.isAdmin = function() {
    console.log("Is HE Admin "+JSON.stringify($scope.isAdmin_there));
     return $scope.isAdmin_there;
    };
    

    $scope.displayAsset=function()
    {
      console.log("submit");
      $location.path('submit');
    }
    
   $scope.DisplayTable=[];
         $scope.assetTable = new ngTableParams({
                page: 1,
                count: 10
            }, {
                counts:[],
                total: $scope.DisplayTable.length, 
                getData: function ($defer, params) {
                        assetService.assetDisplay().success(function(data) {
                        console.log("data is "+data+"data.length "+data.length);  
                         if(data.length===0){
                                
                              $scope.hideDesktopDetails=true;
                          }
                                else{
                                     $scope.hideDesktopDetails=false;
                                    
                                }
                           
                            $scope.DisplayTable= data;
        
                    
                $scope.data = params.sorting() ? $filter('orderBy')($scope.DisplayTable, params.orderBy()) : $scope.DisplayTable;
                                
                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                                
                $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                for(var i=0;i<$scope.data.length;i++){
                       $scope.displayUpdate[i]=true;
                  }
                     $defer.resolve($scope.data);
                }
           )}
         });
            $scope.DisplayPhoneTabTable=[];
            $scope.assetPhoneTabTable = new ngTableParams({
                page: 1,
                count: 10
            }, {
                counts:[],
                total: $scope.DisplayPhoneTabTable.length, 
                getData: function ($defer, params) {
                            assetService.assetPhoneTabDisplay().success(function(data)
                                                                
                                                                {
                                
                                   if(data.length===0){
                                
                                        $scope.hideTabPhoneDetails=true;
                                    }
                                else{
                                        $scope.hideTabPhoneDetails=false;
                                    
                                    }
                              
                            $scope.DisplayPhoneTabTable= data;
        
                    
              $scope.PhoneTabdata = params.sorting() ? $filter('orderBy')($scope.DisplayPhoneTabTable, params.orderBy()) : $scope.DisplayPhoneTabTable;
                                
              $scope.PhoneTabdata = params.filter() ? $filter('filter')($scope.PhoneTabdata, params.filter()) : $scope.PhoneTabdata;
                                
              $scope.PhoneTabdata = $scope.PhoneTabdata.slice((params.page() - 1) * params.count(), params.page() * params.count());
              for(var i=0;i<$scope.PhoneTabdata.length;i++){
                  $scope.displayTabPhoneUpdate[i]=true;
               }
                $defer.resolve($scope.PhoneTabdata);
                }
           )}
         });
$scope.deleteRow=function(assetId,index,ev){
          var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete the Assets ?')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel ');
          $mdDialog.show(confirm).then(function() {
          console.log("deleting row "+JSON.stringify(assetId));
          $scope.data.splice(index,1);
          assetService.removeAsset(assetId).success(function(){
            
            console.log("deleting row from Controller");
            
        });
        
        if($scope.data.length==0){
            
             $scope.hideDesktopDetails=true;
        }
     }, function() {
               
    });
 //call the remove api from here
    }
    
    $scope.deleteTabletPhoneRow=function(assetId,index,ev){
        
        console.log("deleting row "+JSON.stringify(assetId));
        
          var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete the Assets ?')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
        //Log Him Out 
          $scope.PhoneTabdata.splice(index,1);
          assetService.removeAsset(assetId).success(function(){
          console.log("deleting row from Controller");
            
        });
        
        if($scope.PhoneTabdata.length==0){
            
             $scope.hideTabPhoneDetails=true;
        }
    }, function() {
      //Do nothing IF he doen't wants to logout
    });
        
      //call the remove api from here
    }
    
$scope.updateRow=function(assetId,index,asset){

       $rootScope.preventNavigation = true;
        $scope.displayUpdate[index]=false;
       before_Updating=angular.copy($scope.data);
        console.log("Updating row "+JSON.stringify(assetId));
        console.log("Asset before Editing is "+JSON.stringify($scope.data));
 }
    
       $scope.phoneTabupdateRow=function(assetId,index,asset){
       $scope.displayTabPhoneUpdate[index]=false;
       console.log("Updating row "+JSON.stringify(assetId));
       CommonDataFactory.setCheckRouteChangeWhileUpdate(true);
   }
    $scope.resetUpdate=function(index){
    //Need to write some other condition like angular.copy using for this
     $scope.displayUpdate[index]=true;
     $rootScope.preventNavigation=false;
     console.log("Value of $scope after editing is  "+JSON.stringify($scope.data));
     $scope.data=angular.copy(before_Updating);
     $scope.assetId_alert="";
        
    }
    $scope.resetPhoneTabUpdate=function(index){
    //Need to write some other condition like angular.copy using for this
     $scope.displayTabPhoneUpdate[index]=true;
     $scope.assetId_alert="";
        
    }
    
    $scope.performUpdate=function(asset,index){
       var dataforUpdate={};
       console.log("Updated Model data is "+JSON.stringify(asset));
       console.log("Updated Asset is "+JSON.stringify($scope.updatedAsset));
        //get the selected  Id from RAM 
       $rootScope.preventNavigation=false;
        if(asset.RAM){
            //means RAM is selected or not
            var selectedRAM=asset.RAM.RAM;
            for(var i=0;i<$scope.updatedAsset.RAM.length;i++){
                
                if($scope.updatedAsset.RAM[i].RAM==selectedRAM){
                    console.log("selected RAM is "+$scope.updatedAsset.RAM[i]._id);
                    dataforUpdate.RAM=$scope.updatedAsset.RAM[i]._id;
                    
                }
                
            }
            
            
        }
        if(asset.Processor){
            //means RAM is selected or not
            var selectedProcessor=asset.Processor.Processor;
            for(var i=0;i<$scope.updatedAsset.Processor.length;i++){
                
                if($scope.updatedAsset.Processor[i].Processor==selectedProcessor){
                    console.log("selected Processor is "+$scope.updatedAsset.Processor[i]._id);
                    dataforUpdate.Processor=$scope.updatedAsset.Processor[i]._id;
                    
                }
                
            }
            
            
        }
        
         if(asset.HDD){
            //means RAM is selected or not
            var selectedHDD=asset.HDD.HDD;
            for(var i=0;i<$scope.updatedAsset.HDD.length;i++){
                
                if($scope.updatedAsset.HDD[i].HDD==selectedHDD){
                    console.log("selected HDD is "+$scope.updatedAsset.HDD[i]._id);
                    dataforUpdate.HDD=$scope.updatedAsset.HDD[i]._id;
                    
                }
                
            }
            
            
        }
        
         if(asset.OSVersion){
            //means RAM is selected or not
            var selectedOSVersion=asset.OSVersion.OSVersion;
            console.log("os version is"+selectedOSVersion);
            for(var i=0;i<$scope.updatedAsset.OSVersion.length;i++){
                
                if($scope.updatedAsset.OSVersion[i].OSVersion==selectedOSVersion){
                    console.log("selected OSVersion is "+$scope.updatedAsset.OSVersion[i]._id);
                    dataforUpdate.OSVersion=$scope.updatedAsset.OSVersion[i]._id;
                    
                }
                
            }
            
            
        }
        dataforUpdate.AssetID=asset.AssetID;
        //Check Whether this New AssetID is unique or not
         var data_check={};
        data_check.Id=asset.AssetID;
         console.log("data for update is "+JSON.stringify(dataforUpdate));
            //calling the service from here
                    
                        assetService.updateAsset(dataforUpdate).success(function(){

                            console.log("updating row from Controller");

                        });

                         $scope.displayUpdate[index]=true;
                          $scope.assetId_alert="";
       
        }
    
    $scope.checkUniqueAssetId=function(assetID){
        
        
        console.log("changing "+assetID);
         $scope.assetId_alert="";
        var data_check={};
        data_check.Id=assetID;
         assetService.checkAssetID(data_check)
         .success(function(result){
             
             if(result.haveAsset==true){
                 //means AssetID given by him is unique
                  $scope.assetId_alert="";
           }
             else{
                
                 $scope.assetId_alert="Please Enter a Unique AssetID";
          }
    })
         
    }
 });
    
   
   
    

