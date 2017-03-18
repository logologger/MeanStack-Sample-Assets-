var Accessory=require('../../../models/Accessory');
var AssetType = require('../../../models/AssetType');
var AssetModel = require('../../../models/AssetModel');
var Processor = require('../../../models/Processor');
var RAM = require('../../../models/RAM');
var HDD = require('../../../models/HDD');
var OSVersion = require('../../../models/OSVersion');
var EmployeeAsset=require('../../../models/EmployeeAsset');

var assetFetchController={
    getAllAssetType:function(req,res){
        
        console.log("Inside  assetType api called");
        
        AssetType.find({},function(err,assetType)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
           
            res.json(assetType);
        });
    },
    getAllAssetModel:function(req,res){
        
        console.log("Inside  assetModel api called");
        
        AssetModel.find({},function(err,assetModel)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
            
            res.json(assetModel);
        });
    },
    getAllProcessor:function(req,res){
        
        console.log("Inside  assetModel api called");
        
        Processor.find({},function(err,processor)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
            
            res.json(processor);
        });
    },
    getAllRAM:function(req,res){
        
        console.log("Inside  assetModel api called");
        
        RAM.find({},function(err,ram)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
           
            res.json(ram);
        });
    },
    getAllHDD:function(req,res){
        
        console.log("Inside  assetModel api called");
        
        HDD.find({},function(err,hdd)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
            
            res.json(hdd);
        });
    },
    getAllOSVersion:function(req,res){
        
        console.log("Inside  assetModel api called");
        
        OSVersion.find({},function(err,osversion)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
            
            res.json(osversion);
        });
    },
    getAllAccessory:function(req,res){
        
        console.log("Inside  assetModel api called");
        
        Accessory.find({},function(err,accessory)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
            
            res.json(accessory);
        });
    },
    getassetModelBasedonAssetType:function(req,res){
        
       console.log("assetModelBasedonAssetType api called");
        console.log("request body is "+req.body.AssetType);
          AssetModel.find({"AssetType":req.body.AssetType},function(err,assetModel)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
            
            res.json(assetModel);
        });
        
    },
    saveFetchedAssets:function(req,res){

        
        
        console.log("In Asset Save "+JSON.stringify(req.body));
           var employeeasset=new  EmployeeAsset({
               
               EmployeeID:req.decoded.id,
               AssetType:req.body.assetType,
               AssetModel:req.body.assetModel,
               Processor:req.body.processorValue,
               RAM:req.body.ramValue,
               HDD:req.body.hddValue,
               OSVersion:req.body.osversionValue,
               AssetID:req.body.assetId,
               Accessory:req.body.Accessory
               
               
           });
        
        employeeasset.save(function(err){
            
            
             if(err)
                {
//                    res.json({"message":"Error in connecting to database"});
                    console.log("There is error in saving to database");
                    res.send(err);
                    return;
                }
           
                res.json({
                    "success":true,
                    "message":"Asset Information has been saved",
                    
                });
           
        })

    },
    checkforUniqueAssets:function(req,res){
        
        
        console.log("Request AssetId for Checking  is "+req.body.Id);
        
        
       EmployeeAsset.find({
           AssetID:req.body.Id
            
       },function(err,result){
           if(err){
               
               res.send(err);
               return;
           }
           console.log("result from server is "+result);
            var Assetresult={};
           if(result==0){
               
               Assetresult.haveAsset=true;
           }
           else{
                Assetresult.haveAsset=false;
           }
           res.json(Assetresult);   
           
       }); 
        
        
        
        
    }
    
    
    
}

module.exports=assetFetchController;