var Employee=require('../../models/Employee');
var config=require('../../../config');
var secretKey=config.secretKey;
var jsonwebtoken=require('jsonwebtoken');
function createToken(user)
{
   var token= jsonwebtoken.sign({
       id:user._id,
        name:user.name,
        username:user.userName,
        isAdmin:user.Admin
        
    },secretKey,
                     {  
        expiresInMinute:1440
    });
    return token;
    
}
var login={
    
    doLogin:function(req,res){
       
        Employee.findOne({
            EmployeeID:req.body.username
        }).exec(function(err,user)
         {
            console.log("user"+user);
            
            if(err)
                throw err;
            if(!user){
                res.send({"message":"*Employee-ID does not exist."});
            }
            else if(user)
                {
                    user.comparePassword(req.body.password, function(err, isMatch){
                        if (err) throw err;
                        if(!isMatch)
                       {
                          return res.send({"message":"*Password is wrong."}); 
                           
                       } else {
                            var token=createToken(user);
                        return res.json({
                           success:true,
                            message:"Successfully logged in",
                            token:token,
                            Admin:user.Admin

                            
                        });
                    }
                    });
                }
        });
    },
    getDecodedRequest:function(req,res){
        
       res.json(req.decoded); 

    },
    getLoggedInUserId:function(req,res){
        
         Employee.find({
            
           _id:req.decoded.id
            
        },function(err,data){
            if(err){
                console.log("Employee decoded "+err);
            }
           var employeeObj=JSON.parse(JSON.stringify(data));
            var returnedObj={};
               returnedObj.Admin=employeeObj[0].EmployeeID;
               res.json(returnedObj);
             // console.log("Something came or not "+employeeObj[0].Admin);
            
           });
        
    }

    
    
}
module.exports=login;
