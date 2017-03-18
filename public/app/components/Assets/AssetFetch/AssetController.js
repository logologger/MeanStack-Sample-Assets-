angular.module('AssetController',['ngAnimate'])
.controller('assetInfoCtrl',function(DService,$scope,$state,$location,$mdDialog,$mdMedia,CommonDataFactory,assetService,$mdToast)
           {
     var vm=this;
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
       vm.logoutposition=false; 
       var screenResoultion={};
       screenResoultion.height=screen.height;
       screenResoultion.width=screen.width;
       console.log("secreen is"+JSON.stringify(screenResoultion));
       if(screenResoultion.height==1080 && screenResoultion.width==1920)
       {
        vm.logoutposition=true;
        console.log("height called"+vm.logoutposition);
       }
        
         var arr1=[];
         var arr2=[];
         vm.others_hide=true;
         $scope.locationchange=false;
         vm.AssetDataCheck="";
         console.log("Come to Assets "+ CommonDataFactory.getDeskNo());
         vm.DeskNumber=CommonDataFactory.getDeskNo();
         vm.LocationValue;
         vm.LocationValue=CommonDataFactory.getLocation();
         console.log("loction value"+CommonDataFactory.getLocation());
         vm.EmployeeAsset={};
         $scope.assetDetails;
         vm.AssetType=DService.giveAllAssetType()
        .success(function(data){
         vm.AssetType=data;
       })
        console.log("Asstetype is "+vm.assetTypeValue); 

   vm.assetModelValueChange=function(){
        console.log("value of location change "+$scope.locationchange);
        console.log("Value of selected Asset Type is "+JSON.stringify(vm.assetTypeValue)+" typeof "+typeof vm.assetTypeValue);
        if(vm.assetTypeValue!=""){
            var selectedAssetType={};
            selectedAssetType.assetTypeValue=(vm.assetTypeValue);
            var post_data={};
            post_data.AssetType=selectedAssetType.assetTypeValue.AssetType;
            console.log("After Assigning Value of selected Asset Type is "+vm.assetTypeValue+" typeof "+typeof vm.assetTypeValue); 
            DService.giveAssetModelBasedOnAssetType(post_data)
            .success(function(data){
               console.log("Response from giveAssetModelBasedOnAssetType API is "+JSON.stringify(data));   
               vm.AssetModel=data;
        })
       if(selectedAssetType.assetTypeValue.AssetType=="Desktop" || selectedAssetType.assetTypeValue.AssetType=="Laptop"){
           vm.others_hide=false;
          
     } 
        else{
        vm.others_hide=true;
} 
 }
}
  vm.Procesoor=DService.giveAllProcessor()
       .success(function(data){
           vm.Processor=data;
           CommonDataFactory.setProcessor(data);
     })
       vm.RAM=DService.giveAllRAM()
       .success(function(data){
        vm.RAM=data;
        CommonDataFactory.setRAM(data);
   })
      vm.HDD=DService.giveAllHDD()
      .success(function(data){
       vm.HDD=data;
       CommonDataFactory.setHDD(data);
   })
      vm.OSVersion=DService.giveAllOSVersion()
      .success(function(data){
       vm.OSVersion=data;
       CommonDataFactory.setOSVersion(data);
   })
      vm.Accessory=DService.giveAllAccessory()
      .success(function(data){
        vm.Accessory=data;
        console.log("accessory"+vm.Accessory);
   })
  vm.submitAssetDetails=function()
     {
       if(vm.assetId && vm.assetModelValue && vm.assetTypeValue)
       {
           angular.element(document.querySelector('body')).addClass('loading');
      angular.element(document.querySelector('body')).css("background","rgba(0,0,0,0.5)");
          var assetId={};
          assetId.Id=vm.assetId;
          assetService.checkAssetID(assetId)
          .success(function(result){
         if(result.haveAsset==true){
            
                vm.AssetDataCheck="";
                var data_to_sent={};
                var assetInformation_post=(vm.assetTypeValue);
                console.log(assetInformation_post._id);
                data_to_sent.assetType=assetInformation_post._id;
                assetInformation_post=JSON.parse(vm.assetModelValue);
                data_to_sent.assetModel=assetInformation_post._id;
                data_to_sent.assetId=vm.assetId;

         if(vm.processorValue){
         if(typeof vm.processorValue!=="object")
                assetInformation_post=JSON.parse(vm.processorValue);
         else
                assetInformation_post=(vm.processorValue);       
                data_to_sent.processorValue=assetInformation_post._id;
             }

         if(vm.ramValue){
         if(typeof vm.ramValue!=="object")
                assetInformation_post=JSON.parse(vm.ramValue);
         else
                assetInformation_post=(vm.ramValue);      
                data_to_sent.ramValue=assetInformation_post._id;
              }
         if(vm.hddValue){
         if(typeof vm.hddValue!=="object")
                assetInformation_post=JSON.parse(vm.hddValue);
         else
                assetInformation_post=(vm.hddValue);       
                data_to_sent.hddValue=assetInformation_post._id;
          }
          if(vm.osversionValue){
          if(typeof vm.osversionValue!=="object")
                assetInformation_post=JSON.parse(vm.osversionValue);
          else
                assetInformation_post=(vm.osversionValue);      
                data_to_sent.osversionValue=assetInformation_post._id;
          }
                 console.log("Accessory "+JSON.stringify(vm.Accessory_checked));
                 console.log("accessory"+JSON.stringify(vm.Accessory));
                 var Accessory_obj=[];
                 var index_accessory=0;
          for(i in vm.Accessory_checked)
                  {
                  console.log("accesory checked value is"+vm.Accessory_checked[i]);
                  console.log(vm.Accessory[i].Accessory)
          if(vm.Accessory_checked[i]===true) {
                  
                                
                       console.log("it was called instead");
                       Accessory_obj[index_accessory++]=vm.Accessory[i]._id;

                    
                    }
                  }
                  index_accessory=0;
                  console.log("Object "+JSON.stringify(Accessory_obj));
                  data_to_sent.Accessory=Accessory_obj;
                  console.log(data_to_sent);
                   assetService.assetSave(data_to_sent).
                                success(function(data){
                        angular.element(document.querySelector('body')).removeClass('loading');
                       angular.element(document.querySelector('body')).css("background","");
                                      console.log(data);
                                      $state.go('submit.click');
                     })
                   ;
               }
             else{
                angular.element(document.querySelector('body')).removeClass('loading');
                       angular.element(document.querySelector('body')).css("background","");
                 vm.AssetDataCheck="Asset is already Taken by Other User.";
             }
             
         });
       }
       else {
        var pinTo = $scope.getToastPosition();
    $mdToast.show(
      $mdToast.simple()
        .textContent('Please fill your Asset information!')
        .position(pinTo )
        .hideDelay(2000)
    );
       
}
     }
 

    vm.AssetTable = function() {
        
        
        console.log("path changed");
     $state.go("submit.click");

    }
    
    
})
