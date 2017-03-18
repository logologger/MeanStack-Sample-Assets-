angular.module('AdminController',[])
.controller('AdminController',function(DService,$scope,$location,assetService)
           {
          //var vm=this;
          $scope.DisplayDefaultTable;
          $scope.IsVisible = false;
          $scope.IsVisible1 = false;
          $scope.DisplayDefaultTable1;
          $scope.$location = $location;
          var desks;
         var excel_desk=[];
  /*This function displays defaulters list*/

$scope.isDefault=function() {
          console.log("default function called");
          assetService.defaultLink().success(function(data){
          $scope.IsVisible = $scope.IsVisible ? false : true;
          $scope.IsVisible1=false;
          console.log("AdminController Data"+data);
          $scope.DisplayDefaultTable= data;
          var array = typeof data != 'object' ? JSON.parse(data) : data;
          var str = '';
          var line = '';
          var head = array[0];
          for (var index in array[0]) {
                      var value = index + "";
                      var value2;
          console.log("index value "+value);
          if(value!="_id" && value!="updatedAt" && value!="createdAt" && value!="Password" && value!="__v" && value!="Admin") {
            value2=value;
            console.log("i am not id "+value2);
            line += '"' + value2.replace(/"/g, '""') + '",';
        } 
        }
             line = line.slice(0, -1);
             str += line + '\r\n';
             console.log("str value"+str);
         for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              var value1 = index + "";
        if(value1!="_id" && value1!="updatedAt" && value1!="createdAt" && value1!="Password" && value1!="__v" && value1!="Admin") {
            var value = array[i][index] + "";
            console.log("value is"+value);
            line += '"' + value.replace(/"/g, '""') + '",';
       }
      }
           line = line.slice(0, -1);
           str += line + '\r\n';
    }
    if (str == '') {        
        alert("Invalid data");
        return;
    }   
     var fileName = "Defaulter_List";
     var uri = 'data:text/csv;charset=utf-8,' + escape(str);
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(str);
      });
     }



 /*This is displays device list of employee*/
       $scope.isDevice=function() { 
        assetService.devicelist().success(function(data){
            $scope.IsVisible = $scope.IsVisible ? false : true;
            $scope.IsVisible1=false;
            console.log("AdminController Data"+JSON.stringify(data));
            var excel_array=[];
            for(i=0; i<data.length;i++) {
                var excel_data={};
                if(data[i].EmployeeID){
            excel_data.EmployeeID=data[i].EmployeeID.EmployeeID;

            excel_data.LastName=data[i].EmployeeID.LastName;
          }
          if(data[i].AssetType){
            excel_data.AssetType=data[i].AssetType.AssetType;
          }
          if(data[i].AssetModel){           
           excel_data.AssetModel=data[i].AssetModel.AssetModel;
          }
           excel_data.AssetID=data[i].AssetID;
            excel_array[i]=excel_data;
            }
            $scope.DisplayreportTable= data;
            $scope.var=JSON.stringify($scope.DisplayreportTable)
            console.log("Assetmodel value"+JSON.stringify($scope.DisplayreportTable ));
            var array = typeof excel_array != 'object' ? JSON.parse(excel_array) : excel_array;
           console.log("string value"+JSON.stringify(array));
           var str = '';
           var line = '';
           var head = array[0];
          for (var index in array[0]) {
                  var value = index + "";
                  var value2;
        if(value!="_id" && value!="updatedAt" && value!="createdAt" && value!="Processor" && value!="__v" && value!="RAM" && value!="HDD" && value!="Accessory" && value!="OSVersion"){
            value2=value;
            line += '"' + value2.replace(/"/g, '""') + '",';
        }
        }
             line = line.slice(0, -1);
             str += line + '\r\n';
            console.log("str value"+str);
        for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            var value1 = index + "";
            if(value1!="_id" && value1!="updatedAt" && value1!="createdAt" && value1!="Processor" && value1!="__v" && value1!="RAM" && value1!="HDD" && value1!="Accessory" && value1!="OSVersion")
        {
            var value = array[i][index] + "";
            console.log("value is"+value);
            line += '"' + value.replace(/"/g, '""') + '",';
        }
        }
            line = line.slice(0, -1);
            str += line + '\r\n';
       }
          if (str == '') {        
            alert("Invalid data");
            return;
    }   
         var fileName = "device";
         var uri = 'data:text/csv;charset=utf-8,' + escape(str);
         var link = document.createElement("a");    
         link.href = uri;
         link.style = "visibility:hidden";
         link.download = fileName + ".csv";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         console.log(str);
     });
    }
     

  /*This will dispaly the system report with selceted desk*/  
     $scope.isReport=function(){ 
            
            console.log("report function called");
            assetService.deskreport().success(function(data){
            $scope.IsVisible = $scope.IsVisible ? false : true;
            $scope.IsVisible1=false;
            var excel_array=[];
        for(i=0;i<data.length;i++) {
                 var excel_data={};
        if(data[i].EmployeeID){
                 excel_data.EmployeeID=data[i].EmployeeID.EmployeeID;
                  excel_data.FirstName=data[i].EmployeeID.FirstName;
                 excel_data.LastName=data[i].EmployeeID.LastName;
         }
          if(data[i].AssetType){
            excel_data.AssetType=data[i].AssetType.AssetType;
          }
          if(data[i].AssetModel){            
            excel_data.AssetModel=data[i].AssetModel.AssetModel;
          }
         excel_data.AssetID=data[i].AssetID;
         if(data[i].DeskNo) {
          excel_data.DeskNo=data[i].DeskNo.Desk;
          excel_data.Wing=data[i].DeskNo.Wing;
         }
           excel_array[i]=excel_data;
         }
            $scope.DisplayreportTable= data;
            $scope.var=JSON.stringify($scope.DisplayreportTable)
            console.log("Assetmodel value"+JSON.stringify($scope.DisplayreportTable ));
            var array = typeof excel_array != 'object' ? JSON.parse(excel_array) : excel_array;
            console.log("string value"+JSON.stringify(array));
            var str = '';
            var line = '';
            var head = array[0];
         for (var index in array[0]) {
            var value = index + "";
            var value2;
if(value!="_id" && value!="updatedAt" && value!="createdAt" && value!="Processor" && value!="__v" && value!="RAM" && value!="HDD" && value!="Accessory" && value!="OSVersion")
        {
            value2=value;
            line += '"' + value2.replace(/"/g, '""') + '",';
        }
        }
            line = line.slice(0, -1);
            str += line + '\r\n';
            console.log("str value"+str);
        for (var i = 0; i < array.length; i++) {
            var line = '';
        for (var index in array[i]) {
            var value1 = index + "";
if(value1!="_id" && value1!="updatedAt" && value1!="createdAt" && value1!="Processor" && value1!="__v" && value1!="RAM" && value1!="HDD" && value1!="Accessory" && value1!="OSVersion")
        {
            var value = array[i][index] + "";
            console.log("value is"+value);
            line += '"' + value.replace(/"/g, '""') + '",';
        }
        }
            line = line.slice(0, -1);
            str += line + '\r\n';
    }
       if (str == '') {        
           alert("Invalid data");
           return;
        }   
            var fileName = "report";
            var uri = 'data:text/csv;charset=utf-8,' + escape(str);
            var link = document.createElement("a");    
            link.href = uri;
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log(str);
        });
    }


 /*This will dispaly EmptyDesk details*/   
  $scope.isEmptyDesk=function() {

         console.log("desk function called");
         assetService.emptyDeskLink().
         success(function(data){
              $scope.IsVisible=false;
              $scope.IsVisible1 = $scope.IsVisible1 ? false : true;
              console.log("emptydesk Data"+data);
              $scope.DisplayDefaultTable1= data;
              console.log("deskempty value"+$scope.DisplayDefaultTable1 );
              var array = typeof data != 'object' ? JSON.parse(data) : data;
              var str = '';
              var line = '';
              var head = array[0];
       for (var index in array[0]) {
                var value = index + "";
                var value2;
                console.log("index value"+value);
if(value!="_id" && value!="updatedAt" && value!="createdAt" &&  value!="__v" && value!="isFilled") {
                value2=value;
                console.log("i am not id"+value2);
                line += '"' + value2.replace(/"/g, '""') + '",';
        }
       }
                line = line.slice(0, -1);
                str += line + '\r\n';
       for (var i = 0; i < array.length; i++) {
                var line = '';
       for (var index in array[i]) {
            var value1 = index + "";
if(value1!="_id" && value1!="updatedAt" && value1!="createdAt"  && value1!="__v" && value1!="isFilled") {
            var value= array[i][index] + "";
            line += '"' + value.replace(/"/g, '""') + '",';
        }
      }
            line = line.slice(0, -1);
            str += line + '\r\n';
    }
       if (str == '') {        
          alert("Invalid data");
          return;
    }   
           var fileName = "Emptydesks_";
           var uri = 'data:text/csv;charset=utf-8,' + escape(str);
           var link = document.createElement("a");    
           link.href = uri;
           link.style = "visibility:hidden";
           link.download = fileName + ".csv";
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
           console.log(str);
    });
    }
/*this for history back */
    $scope.goback=function(){
          window.history.back();
        }
 })
