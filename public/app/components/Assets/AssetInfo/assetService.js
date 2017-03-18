angular.module('AssetService',[])
.factory('assetService',function($http,$q,$timeout,SharedServiceFactory){
    
    
    var assetServer={};
assetServer.assetSave=function(data){
        console.log("Sending this data "+JSON.stringify(data)); 
        return $http.post('/api/assetSave',data);
    }
    
assetServer.assetDisplay=function(){
    	 return $http.get('/api/getAllAsset');
     	 
    }
    
assetServer.removeAsset=function(assetId){
        
        return $http.delete('/api/deleteRow/'+assetId);
    } 
assetServer.updateAsset=function(asset){
        
        return $http.put('/api/updateRow',asset);
    }
    
assetServer.checkAssetID=function(assetID){
        
        return $http.post('/api/checkAssetIDUnique',assetID);
    }
    
assetServer.assetPhoneTabDisplay=function(){
        return $http.get('/api/getPhoneTabAsset');
    }
    
assetServer.getUser=function() {
   // angular.element(document.querySelector('body')).addClass('loading');
        return $http.get('/api/CheckAdmin');
      }
    
    
assetServer.defaultLink=function(){
    
         
        return $http.get('/api/defaulterlink');
        
    }
assetServer.report=function(){
         
        return $http.get('/api/report');
      
    }
assetServer.devicelist=function(){
         
        return $http.get('/api/devicelist');
        
    }
assetServer.deskreport=function(){
         
        return $http.get('/api/deskreport');
       
    }
assetServer.emptyDeskLink=function(){
         
        return $http.get('/api/emptydesklink');
        
    }
    
    return assetServer;
})