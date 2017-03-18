var Employee=require('../../models/Employee');
var Desk=require('../../models/Desk');
var Wing=require('../../models/wing');
var EmployeeDesk=require('../../models/EmployeeDesk');
var ObjectID = require('../../../node_modules/mongodb').ObjectID;

var deskController={
    
    getEmptyDesk:function(req,res){
        
        
        //Now Get the Desk based on the Wing
        
        console.log("Inside Desk api called");
        
        Desk.find({isFilled:false},function(err,desk)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
//            console.log("desk is what "+desk);
            res.json(desk);
        });
    },
    getDeskBasedOnWing:function(req,res){
        
         console.log("Inside Desk api called " +JSON.stringify(req.body.Wing));
       
        Desk.find({isFilled:false,Wing:req.body.Wing},function(err,desk)
                 {
            if(err)
                {
                    res.send(err);
                    return;
                }
//            console.log("desk is what "+desk);
            res.json(desk);
        });
        
        
    },
    saveDeskDetails:function(req,res){
        
        //Delete the Desk that is already there if any is there and Then Newly save it
        //So first we will check whether the EmployeeDesk with that EmployeeID is there or not
        //If Not then directly call the Api 
        //Else Remove the previuos one and call the Api
        EmployeeDesk.find({
            EmployeeID:req.decoded.id
        },function(err,employeeDeskinfo){
            
           console.log("Desk to this Employee is "+employeeDeskinfo); 
            if(employeeDeskinfo!=0){
                
                //Just Edit the Previous Desk Info isFilled Parameter to false
                var employeeDesk_information_object=JSON.parse(JSON.stringify(employeeDeskinfo));
                var previous_Desk=employeeDesk_information_object[0].DeskNo;
                
                console.log("Previous Desk to the Employee is "+previous_Desk);
                //Call the update Query here 
                
                Desk.update({_id:previous_Desk},{$set:{isFilled:false}},function(err,result){
                    if(err){
                        
                        console.log("There is Error in making False the Desk");
                        res.send(err);
                    }
                    console.log("Desk Value Updated Successfully");
                });//This can go Parallel with other
                
                
               //EmployeeDesk.populate(DeskNo,DeskNo);
                
                
                //Means He has a previous Desk and Now we will 
                
                //means Desk are already allocated to him so we will remove everything from the EmployeeDesk of that EmployeeId
                //Previous Desk isFilled should become false now
                
                EmployeeDesk.remove({EmployeeID:req.decoded.id},function(Removeerr,removeResult){
                    if(err){
                        console.log("error in EmployeeDesk Removing "+Removeerr);
                        res.send(err);
                    }
                    
                    console.log("Desk removed Successfullly "+removeResult);
                    
                    //After Removing Update the Desk isFilled to true and Insert the Desk reference inside EmployeeDesk
                    
                     console.log("user is   "+req.decoded.id+" Desk is "+req.body.selectedDesk._id +"request body is "+req.body);
            var employeedesk=new EmployeeDesk({
            EmployeeID:req.decoded.id,
            DeskNo:req.body.selectedDesk._id,
            
           Wing:req.body.selectedDesk._id
            
        });
        
       
       
        Desk.update({_id:req.body._id},{$set:{isFilled:true}},function(DeskUpdateerr,result){
            
            if(err){
                console.log("Error in Desk Service "+DeskUpdateerr);
                return err;
            }
            console.log("IsFillled Field  in desk updated Successfully")
        });  
            
        
        
        employeedesk.save(function(errEmployeeDesk,employee_desk){
            
            if(err)
                {
                    res.send(errEmployeeDesk);
                    return;
                }
            
            
            console.log("EmployeeDesk saved Successfully");
            var success={};
            success.message="Desk Allocated Successfully";
            res.json(success);
            //After Desk Allocation we have to give him Asset Details
        });
            
                    
                    
               // });
                
            });
            }//End of if clause for checking whether he has already one Desk or not
            
            
            else{
            //Just save the EmployeeDesk information here
            console.log("Came in Else clause Employee has no previous desk");
            console.log("user is   "+req.decoded.id+" Desk is "+req.body.selectedDesk._id +"request body is "+req.body);
            var employeedesk=new EmployeeDesk({
            EmployeeID:req.decoded.id,
            DeskNo:req.body.selectedDesk._id,
            Wing:req.body.selectedDesk._id
            
        });
        
       
       
        Desk.update({_id:req.body._id},{$set:{isFilled:true}},function(DeskUpdateerr,result){
            
            if(err){
                console.log("Error in Desk Service "+DeskUpdateerr);
                return err;
            }
            console.log("IsFillled Field  in desk updated Successfully")
        });  
            
        
          
                
        employeedesk.save(function(errEmployeeDesk,employee_desk){
            
            if(err)
                {
                    res.send(errEmployeeDesk);
                    return;
                }
            
            
            console.log("EmployeeDesk saved Successfully");
            var success={};
            success.message="Desk Allocated Successfully";
            res.json(success);
            //After Desk Allocation we have to give him Asset Details
        });
                
                
            }//end of else clause
            
            
        });
    },
    createMiddleDesk:function(req,res){
        
        
//        var deskMiddle=new Desk
        console.log("Middle api called");
        
        var deskMiddle=new Desk({
            Desk:req.body.desk,
            isFilled:false,
            Wing:req.body.wing.Wing
        });
        var dataDeskreturn;
        
        deskMiddle.save(function(err){
            
            if(err){
                res.send(err);
                return err;
            }
            
            Desk.find({Desk:req.body.desk},function(err,data){
                
                if(err){
                    return err;
                }
                dataDeskreturn=data;
                console.log("Desk daqrta os "+dataDeskreturn);
                 res.json({
                    "success":true,
                    "message":"Desk Information has been saved",
                    "deskData":dataDeskreturn
                    
                });
//                res.json(data);
                
            
            
            });//end of Desk
        });
        
//         res.json({
//                    "success":true,
//                    "message":"Desk Information has been saved",
//                    "deskData":dataDeskreturn
//                    
//                });
        
        
    },
    checkUniqueDesk:function(req,res){
        
        //Here we will check whether has been allocated Desk or not
        
        console.log("/checkDesk Api called");
        EmployeeDesk.find({
            EmployeeID:req.decoded.id
        },function(err,EmployeeId){
            
            if(err){
                res.send(err);
                return;
            }
            
//            console.log("returned data is "+EmployeeId);
           
            
            console.log("typeof Desk  object is "+( EmployeeId==0)+"  conditon is "+(typeof EmployeeId.DeskNo==="undefined"))
            
            
            
            
            var success={};
                
            
            
            if(EmployeeId==0)
                {
                     success.result=false;
                     res.json(success);
                }
            else{
                
                
                 var EmployeeID_obj=JSON.parse(JSON.stringify(EmployeeId));
                
                
            console.log("Returned ID is "+EmployeeID_obj[0]._id);
            var Desk_id=EmployeeID_obj[0].DeskNo;
                
                success.result=true;
                //Get the Desk No from here
               /* Desk.find({"_id":ObjectId("570d2ba08797cb850edf4009")},{"Desk":1}*/
               
            
//               var Desk_id_o= mongoose.Types.ObjectId(Desk_id);
//                console.log(typeof Desk_id_o);
                 var DeskNumber_value;
                var desk_value="";
                Desk.find({"_id":ObjectID(Desk_id)},function(err,DeskNumber){
                    if(err){
                        console.log(err);
                     return;   
                    }
                    
                    
//                    var string_j=JSON.stringify(DeskNumber);
//                        var json_obj=JSON.parse(string_j);
//                        console.log(json_obj[0].Desk);
//                        console.log(json_obj);
                    console.log("DeskNumber"+(DeskNumber));
                     DeskNumber_value=JSON.parse(JSON.stringify(DeskNumber));
                    console.log("Desk is "+DeskNumber_value[0].Desk);
                     desk_value=DeskNumber_value[0].Desk;
                     console.log("desk_value"+desk_value);
                    success.DeskNo=desk_value;
                     res.json(success);
                    
                })
               
                  
                
            }
//            res.json(EmployeeId);
        })
    },
    getAllWings:function(req,res){
        
        Wing.find({},function(err,wing){
                  
                  if(err){
                      
                      res.send(err);
                      return err;
                  }
            res.json(wing);
                  
                  
                  });
    }
    
}

module.exports=deskController;