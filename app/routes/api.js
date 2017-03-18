var ObjectID = require('../../node_modules/mongodb').ObjectID;
var User=require('../models/user');
var Story=require('../models/story');
var Employee=require('../models/Employee');
var Desk=require('../models/Desk');
var Accessory=require('../models/Accessory');
var EmployeeDesk=require('../models/EmployeeDesk');
var EmployeeAsset=require('../models/EmployeeAsset');
var AssetType = require('../models/AssetType');
var AssetModel = require('../models/AssetModel');
var Processor = require('../models/Processor');
var RAM = require('../models/RAM');
var HDD = require('../models/HDD');
var OSVersion = require('../models/OSVersion');
var Location = require('../models/Location');
var EmployeeLocation = require('../models/EmployeeLocation');
var Wing=require('../models/wing');
var async=require('../../node_modules/async');
var config=require('../../config');
var loginController=require('../controller/login/loginController');
var adminController=require('../controller/Admin/adminController');
var deskController=require('../controller/desk/deskController');
var locationController=require('../controller/location/locationController');
var assetFetchController=require('../controller/Assets/Assetfetch/assetFetchController');
var assetDetailsController=require('../controller/Assets/AssetsDetails/assetDetailsController');

var secretKey=config.secretKey;
var jsonwebtoken=require('jsonwebtoken');

module.exports=function(app,express,io)
{
    var api=express.Router();
   
   //LoginController
    api.post('/login',loginController.doLogin);
    api.get('/me',loginController.getDecodedRequest);
    api.get('/getUserID',loginController.getLoggedInUserId);

    
    
    //MiddleWare
    api.use(function(req,res,next)
           {
        console.log("Somebody Came to our api");
        var token=req.body.token || req.param('token') || req.headers['x-access-token'];
        if(token)
            {
                jsonwebtoken.verify(token,secretKey,function(err,decoded)
                                   {
                    if(err)
                        {
                        res.status(403).send({success:false,message:"wrong Token"})    
                        }
                    else{
                        req.decoded=decoded;
                        next();
                    }
                });
            }
        else{
            res.status(403).send({success:false,message:"No token found"});
        }
    });
    
    //AdminController
    api.get('/CheckAdmin',adminController.checkAdmin);
    api.get('/getDefaulterList',adminController.getDefaulterList);
    api.get('/defaulterlink',adminController.getDefaulterLink);
    api.get('/report',adminController.getReport);
    api.get('/devicelist',adminController.getDeviceList);
    api.get('/emptydesklink',adminController.getEmptyDeskLink);
    api.get('/deskreport',adminController.getSystemDesklink); 
   
    
    
    //locationController
    api.get('/locationlink',locationController.getAllLocations);
    api.post('/locationSave',locationController.saveLocation);
    
    
    //DeskController
    api.get('/desk',deskController.getEmptyDesk);
    api.post('/getDeskBasedOnWing',deskController.getDeskBasedOnWing);
    api.post('/deskSave',deskController.saveDeskDetails);
    api.get('/checkDesk',deskController.checkUniqueDesk);
    api.post('/createMiddleDesk',deskController.createMiddleDesk)
    api.get('/getAllWings',deskController.getAllWings); 
    
    
    //AssetFetchController
    api.get('/assetType',assetFetchController.getAllAssetType);
    api.get('/assetModel',assetFetchController.getAllAssetModel);
    api.get('/processor',assetFetchController.getAllProcessor);
    api.get('/ram',assetFetchController.getAllRAM);
    api.get('/hdd',assetFetchController.getAllHDD);
    api.get('/osversion',assetFetchController.getAllOSVersion);
    api.get('/accessory',assetFetchController.getAllAccessory);
    api.post('/assetSave',assetFetchController.saveFetchedAssets);
    api.post('/assetModelBasedonAssetType',assetFetchController.getassetModelBasedonAssetType);
    api.post('/checkAssetIDUnique',assetFetchController.checkforUniqueAssets);
    
    
    
    //AssetDetailsController
    api.get('/getAllAsset',assetDetailsController.getAllDesktopLaptopAssets);
    api.get('/getPhoneTabAsset',assetDetailsController.getAllPhoneTabletOtherAssets);
    api.get('/checkEmployeeAsset',assetDetailsController.checkEmployeeAssets);
    api.delete('/deleteRow/:assetId',assetDetailsController.deleteAssets);
    api.put('/updateRow',assetDetailsController.updateAssets);
    
  return api;
}
