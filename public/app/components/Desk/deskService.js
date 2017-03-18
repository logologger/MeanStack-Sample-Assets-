angular.module('DeskService',[])

.factory('DService',function($http){
    
    
    var allDesk={};
    
allDesk.giveAll=function()
    {
        return  $http.get('/api/desk');
    }
allDesk.giveAllLocation=function()
    {
        return $http.get('/api/locationlink');
    }
allDesk.giveAllAssetType=function()
    {
        return $http.get('/api/assetType');
    }
    
    //getting the assetsModel Based on AssetType
allDesk.giveAssetModelBasedOnAssetType=function(data){
        
        return $http.post('/api/assetModelBasedonAssetType',data);
    }

allDesk.giveAllAssetModel=function()
    {
        return $http.get('/api/assetModel');
    }
allDesk.giveAllProcessor=function()
    {
        return $http.get('/api/processor');
    }
allDesk.giveAllRAM=function()
    {
        return $http.get('/api/ram');
    }
allDesk.giveAllHDD=function()
    {
        return $http.get('/api/hdd');
    }
allDesk.giveAllOSVersion=function()
    {
        return $http.get('/api/osversion');
    }
allDesk.giveAllAccessory=function()
    {
        return $http.get('/api/accessory');
    }
    
allDesk.saveDesk=function(Deskdata)
    {
        return $http.post("/api/deskSave",Deskdata);
    }
allDesk.saveLocation=function(Deskdata)
    {
        return $http.post("/api/locationSave",Deskdata);
    }
    
allDesk.checkDesk=function(){
        return $http.get('/api/checkDesk');
    }
allDesk.getAllWing=function(){
        
        return $http.get('/api/getAllWings');
    }
    
allDesk.getDeskBasedOnWing=function(Wing){
        var data={};
        data.Wing=Wing;
        return $http.post('/api/getDeskBasedOnWing',data);
    }
allDesk.createMiddle=function(data){
        return $http.post('/api/createMiddleDesk',data);

    }
    
    
    return allDesk;
})
