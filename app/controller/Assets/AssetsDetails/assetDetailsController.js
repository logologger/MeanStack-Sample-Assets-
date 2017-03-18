var EmployeeAsset=require('../../../models/EmployeeAsset');
var AssetType = require('../../../models/AssetType');
var ObjectID = require('../../../../node_modules/mongodb').ObjectID;

var assetDetailsController={
    
    getAllDesktopLaptopAssets:function(req,res){
        
        
        //Currently it will give only Dekstop Assets
        var query=EmployeeAsset.find({
            
            EmployeeID:req.decoded.id
            
        });
        
         AssetType.find({"$or":[
             
             
             {
                "AssetType":"Desktop"
             },
             {
                 "AssetType":"Laptop"
                 
             }]}).select('AssetType').exec(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({"error": true, "message": err});
			}
            
            console.log("value of all"+data);
            console.log("Stringifying it "+JSON.stringify(data[0]._id));
            //console.log("Parsing it is "+JSON.parse(data));
			

            
            query.populate('RAM HDD Processor AssetModel AssetType OSVersion Accessory','RAM HDD Processor AssetModel AssetType OSVersion Accessory');
        
        //find the Desktop Object ID here
        
        
        // query.find({AssetType:ObjectID(data[0]._id)});
       /* query.find({"$or":[
            {
                AssetType:ObjectID("5723906a07abe1a91acdf42f")
            },{
                AssetType:ObjectID("5723906a07abe1a91acdf430")
            }
        ]});*/
         query.find({"$or":[
        
             {
                AssetType:ObjectID(data[0]._id)
            },{
                AssetType:ObjectID(data[1]._id)
            }
        ]});
        query.exec(function(err,data){
          if(err)
          {
            console.log("Error message "+err);
          }
          else
          {
              
            console.log("Data from Population  is  "+data);
            EmployeeAsset.find({},{"AssetID":1,_id:0},function(err,AssetID){
                
                var AssetIDobj=JSON.parse(JSON.stringify(AssetID));
                data.AssetID=AssetIDobj;
                //console.log("AssetID is " +JSON.stringify(AssetID));
                
            });
            res.json(data);
          }
        });
            
            
        });

        

      



        //function(err,EmployeeAssetData){
            
        //     var EmpAssetData=JSON.parse(JSON.stringify(EmployeeAssetData));
        //     console.log(EmpAssetData);
        //     // console.log(EmpAssetData[2].RAM);
        //     //first get the length of EmpAssetData
        //     //run a loop and store all info in an array of JSON objects
        //     ///return that JSON object
        //     var responseObject=[];
        //     responseObject[i]=indivual_response
        //     var indivual_response={};
        //     for(var i=0;i<EmpAssetData.length;i++){
                
            
        //     RAM.find({"_id":ObjectID(EmpAssetData[i].RAM)},function(err,RAM){
                
        //         var RAM_data=JSON.parse(JSON.stringify(RAM));
        //                            if(RAM_data[0]){
        //         console.log(RAM_data[0].RAM);
        //         indivual_response.RAM=RAM_data[0].RAM;
        //            }


        //     })
        //     HDD.find({"_id":ObjectID(EmpAssetData[i].HDD)},function(err,HDD){
                
        //         var HDD_data=JSON.parse(JSON.stringify(HDD));
        //                            if(HDD_data[0]){
        //         console.log(HDD_data[0].HDD);
        //         indivual_response.HDD=HDD_data[0].HDD;
        //            }


        //     })
        //     Processor.find({"_id":ObjectID(EmpAssetData[i].Processor)},function(err,Processor){
                
        //         var Processor_data=JSON.parse(JSON.stringify(Processor));
        //                            if(Processor_data[0]){
        //         console.log(Processor_data[0].Processor);
        //         indivual_response.Processor=Processor_data[0].Processor;
        //            }


        //     })
        //     AssetType.find({"_id":ObjectID(EmpAssetData[i].AssetType)},function(err,AssetType){
                
        //         var AssetType_data=JSON.parse(JSON.stringify(AssetType));
        //                            if(AssetType_data[0]){
        //         console.log(AssetType_data[0].AssetType);
        //         indivual_response.AssetType=AssetType_data[0].AssetType;
        //            }


        //     })

        //    AssetModel.find({"_id":ObjectID(EmpAssetData[i].AssetModel)},function(err,AssetModel){
                
        //         var AssetModel_data=JSON.parse(JSON.stringify(AssetModel));
        //                            if(AssetModel_data[0]){
        //         console.log(AssetModel_data[0].AssetModel);
        //         indivual_response.AssetModel=AssetModel_data[0].AssetModel;
        //            }


        //     })

            
        //     //create an array of JSON objects
        //     // responseObject[i]=indivual_response;//Thiere is some twaek required here
        //       responseObject[i]=indivual_response;
        //       console.log("Respoonse"+responseObject);

        //       res.json(responseObject);

        //     }
        //     // console.log(responseObject);//same goes here
            
            
        // })
        
    },
    getAllPhoneTabletOtherAssets:function(req,res){
        
        
         AssetType.find({"$or":[
             
             {
                 "AssetType":"Android Tablet"
             },
             {
                  "AssetType":"Windows Tablet"
             },
             { 
                  "AssetType":"BB Tablet"
             },
             { 

                "AssetType":"Android Phone" 
             },
             {
                "AssetType":"Windows Phone"
             },
             {
                "AssetType":"Apple Phone"
             },
             {
                "AssetType":"BB Phone"
             },
             {
                "AssetType":"BB Tablet"
             },{
                "AssetType":"Apple IPAD"
             },
             {
                "AssetType":"Apple Watch"
             },
             {
                "AssetType":"Samsung Watch"
             },
             {
                "AssetType":"Other"
             },
            {
                 "AssetType":"Apple Tablet"
                 
             }]}).select('AssetType').exec(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({"error": true, "message": err});
			}
            
            console.log("value of all"+data);
            console.log("Stringifying it fromn Phone tablet is  "+JSON.stringify(data[0]._id));
        
        
        
        
         var query=EmployeeAsset.find({
            
            EmployeeID:req.decoded.id
            
        });

        query.populate('EmployeeID LastName RAM HDD Processor AssetModel AssetType OSVersion Accessory','EmployeeID LastName RAM HDD Processor AssetModel AssetType OSVersion Accessory');
        //query.find({AssetType:ObjectID("5723906a07abe1a91acdf42e")});
        query.find({"$or":[
            {
                AssetType:ObjectID(data[0]._id)
            },
            {
                AssetType:ObjectID(data[1]._id)
            },
            {
                AssetType:ObjectID(data[2]._id)
            },
            {
                AssetType:ObjectID(data[3]._id)
            },
            {
                AssetType:ObjectID(data[4]._id)
            },
            {
                AssetType:ObjectID(data[5]._id)
            },
            {
                AssetType:ObjectID(data[6]._id)
            },
            {
                AssetType:ObjectID(data[7]._id)
            },
            {
                AssetType:ObjectID(data[8]._id)
            },
            {
                AssetType:ObjectID(data[9]._id)
            },
            {
                AssetType:ObjectID(data[10]._id)
            },
            {
                AssetType:ObjectID(data[11]._id)
            }

        ]});
        query.exec(function(err,data){
          if(err)
          {
            console.log("Error message "+err);
          }
          else
          {
              
            console.log("Data from Population  is  "+data);
            EmployeeAsset.find({},{"AssetID":1,_id:0},function(err,AssetID){
                
                var AssetIDobj=JSON.parse(JSON.stringify(AssetID));
                data.AssetID=AssetIDobj;
                //console.log("AssetID is " +JSON.stringify(AssetID));
                
            });
            res.json(data);
          }
        });

      


        
    });
    },
    checkEmployeeAssets:function(req,res){
            var success={};
             EmployeeAsset.find({
            
            EmployeeID:req.decoded.id 
        },function(err,data){
                if(err)
                {
                    res.json(err);
                }
                if(data==0)
                       {

                        success.result=false;
                       } 
                       else
                       {
                        success.result=true;
                       }
                       res.json(success);
        })

        },
    deleteAssets:function(req,res){
        
     console.log("DeleteRow Api called "+req.params.assetId);
     
        EmployeeAsset.remove({
            
            AssetID:req.params.assetId
        },function(err,message){
            
            if(err){
                res.send(err);
                return err;
            }
            res.json({"message":"Successfully Deleted Asset"});
        })
    },
    updateAssets:function(req,res){
        
        console.log("Updating Assets Row Api called");
        //api should get old assetID in order to update the Assets
        console.log("Updated Assets "+JSON.stringify(req.body));
        EmployeeAsset.update({AssetID:req.body.AssetID},{$set:{OSVersion:req.body.OSVersion,RAM:req.body.RAM,HDD:req.body.HDD,Processor:req.body.Processor}},function(err,response){
            
            if(err){
                
                res.send(err);
                return err;
            }
            res.json({"message":"Updated Successfully"})
            
        })
        
        
       
        
    }
    
    
}

module.exports=assetDetailsController;