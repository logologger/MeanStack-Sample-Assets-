var Employee=require('../../models/Employee');
var AssetType = require('../../models/AssetType');
var EmployeeAsset=require('../../models/EmployeeAsset');
var ObjectID = require('../../../node_modules/mongodb').ObjectID;
var Desk=require('../../models/Desk');
var EmployeeDesk=require('../../models/EmployeeDesk');
var async=require('../../../node_modules/async');

var AdminController={
    
    
checkAdmin:function(req,res){
        
    console.log("Came to AdminController ");
    
           Employee.find({
            
           _id:req.decoded.id
            
        },function(err,data){
            if(err){
                console.log("Employee decoded "+err);
            }
           var employeeObj=JSON.parse(JSON.stringify(data));
            console.log("Employee Object in fetching Admin is "+JSON.stringify(employeeObj));
            var returnedObj={};
               if(employeeObj.length!=0)
               returnedObj.Admin=employeeObj[0].Admin;
               res.json(returnedObj);
             // console.log("Something came or not "+employeeObj[0].Admin);
            
           });
    },
getDefaulterList:function(req,res){
        
        EmployeeAsset.find({}).select('EmployeeID').exec(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({"error": true, "message": err});
			}
            
            console.log("Data from EmployeeAset is "+data);
			
			var all = data.map(function(v, i) {return v.EmployeeID});
			
            console.log("DAta from all mapping  is "+all+" typeof all is "+typeof all);
            
			Employee.find({_id: {$nin: all}}, function(err, edata) {
				if(err) {
					console.log(err);
					return res.status(500).json({"error": true, "message": err});
				}
                
               // console.log("final data from Employee is "+edata);

				return res.status(200).json(edata);
			})
		});
        
    },
getDefaulterLink:function(req,res){
        
        

       EmployeeAsset.find({}).select('EmployeeID').exec(function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({"error": true, "message": err});
      }
      
      var all = data.map(function(v, i) {return v.EmployeeID});
      
      Employee.find({_id: {$nin: all}}, function(err, edata) {
        if(err) {
          console.log(err);
          return res.status(500).json({"error": true, "message": err});
        }

        return res.status(200).json(edata);
      })
    });

  
    },
getReport:function(req,res){
        
console.log("Inside  empasset report api called");
        
       var query=EmployeeAsset.find({
            
           // EmployeeID:req.decoded.id
            
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
            

            
            query.populate('EmployeeID LastName AssetModel AssetType EmployeeDesk','EmployeeID LastName AssetModel AssetType EmployeeDesk');
        
        
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
                console.log("data is"+data);
                data.AssetID=AssetIDobj;
                //console.log("AssetID is " +JSON.stringify(AssetID));
                
            });
            res.json(data);
          }
        });
            
            
        });

        

      
    },
getDeviceList:function(req,res) {
       
    var query=EmployeeAsset.find({
            
           // EmployeeID:req.decoded.id
            
        });

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
        
        
        
        
       

        query.populate('EmployeeID LastName AssetModel AssetType','EmployeeID LastName AssetModel AssetType');
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
getEmptyDeskLink:function(req,res){
        
        

       EmployeeDesk.find({}).select('DeskNo').exec(function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({"error": true, "message": err});
      }
      
      var all = data.map(function(v, i) {return v.DeskNo});
      
      Desk.find({_id: {$nin: all}}, function(err, edata) {
        if(err) {
          console.log(err);
          return res.status(500).json({"error": true, "message": err});
        }

        return res.status(200).json(edata);
      })
    });
  
    },
 getSystemDesklink: function(req,res) {

 async.series([
        function(callback2) {
             
        EmployeeDesk.find().lean().populate('EmployeeID DeskNo', 'EmployeeID FirstName LastName Desk Wing -_id')
        .exec(function(err,empdesk) {
            if(err) {
                   res.send(err);
                    return;
                }
            callback2(null, empdesk);
        });
        
        },
         function(callback2) {
           
             var query=EmployeeAsset.find({
            
           // EmployeeID:req.decoded.id
            
        }).lean();
        
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
            

            
        query.populate('EmployeeID FirstName LastName AssetModel AssetType', 'EmployeeID FirstName LastName AssetType AssetModel');
        
        
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
                console.log("data is"+data);
                data.AssetID=AssetIDobj;
                //console.log("AssetID is " +JSON.stringify(AssetID));
                
            });
            callback2(null, data);
           // res.json(data);
          }
        });
            
            
        });
        }
        ], function(err, results)
        {
            if(err)
                {console.log(err); return;} 
            console.log("empaaset is"+JSON.stringify(results[1]));
            var result={};
            var all = results[1].map(function(v, i) {return v});
            var ally = results[0].map(function(v, i) {return v});
            console.log("all value us"+JSON.stringify(all));
            var result = results[1].map(x => Object.assign(x, results[0].find(y => y.EmployeeID.EmployeeID === x.EmployeeID.EmployeeID)));
        // var result = results[1].map(x => 
              // Object.assign(all, ally.find( 
           // ally.EmployeeID.EmployeeID === all.EmployeeID.EmployeeID
      // ))
     // )
    
            console.log('All called');
            res.json(result);
     
});
    


 }   



}
module.exports=AdminController;