var Location = require('../../models/Location');
var EmployeeLocation = require('../../models/EmployeeLocation');

var locationController={
    getAllLocations:function(req,res){
        
        console.log("Inside location api called");
        
        Location.find({},function(err,desk)
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
    saveLocation:function(req,res){
        
       
       console.log("user is   "+req.decoded.id+" Location is "+req.body._id);
        var employeelocation=new EmployeeLocation({
           EmployeeID:req.decoded.id,
            Location:req.body._id
            
        });
        
        employeelocation.save(function(err,employee_location){
            
            if(err)
                {
                    res.send(err);
                    return;
                }
            var success={};
            success.message="Location Allocated";
            res.json(success);
            //After Desk Allocation we have to give him Asset Details
        });
        
    }
        
}
module.exports=locationController;