var mongoose = require('mongoose'),
    async = require('./async');
require('../../config/mongodb').db;

var AssetType = require('../models/AssetType');
var AssetModel = require('../models/AssetModel');
var Processor = require('../models/Processor');
var RAM = require('../models/RAM');
var HDD = require('../models/HDD');
var Accessory = require('../models/Accessory');
var Desk = require('../models/Desk');
var OSVersion = require('../models/OSVersion');
var Employee = require('../models/Employee');
var Location = require('../models/Location');
var wings=require('../models/wing');
var Converter = require("csvtojson").Converter;//For Employees Database Teja


//Every Desk Will be with attached With Wing.....so that While Fetching we can have 

var DeskDataWingB=[
 {
   "Desk":"10B-GL-1"
 },
 {
   "Desk":"10B-GL-2"
 },
 {
   "Desk":"10B-PL-1"
 },
 {
   "Desk":"10B-PL-2"
 },
 {
   "Desk":"10B-PL-3"
 },
 {
   "Desk":"10B-PL-4"
 },
 {
   "Desk":"10B-PL-5"
 },
 {
   "Desk":"10B-PL-6"
 },
 {
   "Desk":"10B-1"
 },
 {
   "Desk":"10B-2"
 },
 {
   "Desk":"10B-3"
 },
 {
   "Desk":"10B-4"
 },
 {
   "Desk":"10B-5"
 },
 {
   "Desk":"10B-6"
 },
 {
   "Desk":"10B-7"
 },
 {
   "Desk":"10B-8"
 },
 {
   "Desk":"10B-9"
 },
 {
   "Desk":"10B-10"
 },
 {
   "Desk":"10B-11"
 },
 {
   "Desk":"10B-12"
 },
 {
   "Desk":"10B-13"
 },
 {
   "Desk":"10B-14"
 },
 {
   "Desk":"10B-15"
 },
 {
   "Desk":"10B-16"
 },
 {
   "Desk":"10B-17"
 },
 {
   "Desk":"10B-18"
 },
 {
   "Desk":"10B-19"
 },
 {
   "Desk":"10B-20"
 },
 {
   "Desk":"10B-21"
 },
 {
   "Desk":"10B-22"
 },
 {
   "Desk":"10B-23"
 },
 {
   "Desk":"10B-24"
 },
 {
   "Desk":"10B-25"
 },
 {
   "Desk":"10B-26"
 },
 {
   "Desk":"10B-27"
 },
 {
   "Desk":"10B-28"
 },
 {
   "Desk":"10B-29"
 },
 {
   "Desk":"10B-30"
 },
 {
   "Desk":"10B-31"
 },
 {
   "Desk":"10B-32"
 },
 {
   "Desk":"10B-33"
 },
 {
   "Desk":"10B-34"
 },
 {
   "Desk":"10B-35"
 },
 {
   "Desk":"10B-36"
 },
 {
   "Desk":"10B-37"
 },
 {
   "Desk":"10B-38"
 },
 {
   "Desk":"10B-39"
 },
 {
   "Desk":"10B-40"
 },
 {
   "Desk":"10B-41"
 },
 {
   "Desk":"10B-42"
 },
 {
   "Desk":"10B-43"
 },
 {
   "Desk":"10B-44"
 },
 {
   "Desk":"10B-45"
 },
 {
   "Desk":"10B-46"
 },
 {
   "Desk":"10B-47"
 },
 {
   "Desk":"10B-48"
 },
 {
   "Desk":"10B-49"
 },
 {
   "Desk":"10B-50"
 },
 {
   "Desk":"10B-51"
 },
 {
   "Desk":"10B-52"
 },
 {
   "Desk":"10B-53"
 },
 {
   "Desk":"10B-54"
 },
 {
   "Desk":"10B-55"
 },
 {
   "Desk":"10B-56"
 },
 {
   "Desk":"10B-57"
 },
 {
   "Desk":"10B-58"
 },
 {
   "Desk":"10B-59"
 },
 {
   "Desk":"10B-60"
 },
 {
   "Desk":"10B-61"
 },
 {
   "Desk":"10B-62"
 },
 {
   "Desk":"10B-63"
 },
 {
   "Desk":"10B-64"
 },
 {
   "Desk":"10B-65"
 },
 {
   "Desk":"10B-66"
 },
 {
   "Desk":"10B-67"
 },
 {
   "Desk":"10B-68"
 },
 {
   "Desk":"10B-69"
 },
 {
   "Desk":"10B-70"
 },
 {
   "Desk":"10B-71"
 },
 {
   "Desk":"10B-72"
 },
 {
   "Desk":"10B-73"
 },
 {
   "Desk":"10B-74"
 },
 {
   "Desk":"10B-75"
 },
 {
   "Desk":"10B-76"
 },
 {
   "Desk":"10B-77"
 },
 {
   "Desk":"10B-78"
 },
 {
   "Desk":"10B-79"
 },
 {
   "Desk":"10B-80"
 },
 {
   "Desk":"10B-81"
 },
 {
   "Desk":"10B-82"
 },
 {
   "Desk":"10B-83"
 },
 {
   "Desk":"10B-84"
 },
 {
   "Desk":"10B-85"
 },
 {
   "Desk":"10B-86"
 },
 {
   "Desk":"10B-87"
 },
 {
   "Desk":"10B-88"
 },
 {
   "Desk":"10B-89"
 },
 {
   "Desk":"10B-90"
 },
 {
   "Desk":"10B-91"
 },
 {
   "Desk":"10B-92"
 },
 {
   "Desk":"10B-93"
 },
 {
   "Desk":"10B-94"
 },
 {
   "Desk":"10B-95"
 },
 {
   "Desk":"10B-96"
 },
 {
   "Desk":"10B-97"
 },
 {
   "Desk":"10B-98"
 },
 {
   "Desk":"10B-99"
 },
 {
   "Desk":"10B-100"
 },
 {
   "Desk":"10B-101"
 },
 {
   "Desk":"10B-102"
 },
 {
   "Desk":"10B-103"
 },
 {
   "Desk":"10B-104"
 },
 {
   "Desk":"10B-105"
 },
 {
   "Desk":"10B-106"
 },
 {
   "Desk":"10B-107"
 },
 {
   "Desk":"10B-108"
 },
 {
   "Desk":"10B-109"
 },
 {
   "Desk":"10B-110"
 },
 {
   "Desk":"10B-111"
 },
 {
   "Desk":"10B-112"
 },
 {
   "Desk":"10B-113"
 },
 {
   "Desk":"10B-114"
 },
 {
   "Desk":"10B-115"
 },
 {
   "Desk":"10B-116"
 },
 {
   "Desk":"10B-117"
 },
 {
   "Desk":"10B-118"
 },
 {
   "Desk":"10B-119"
 },
 {
   "Desk":"10B-120"
 },
 {
   "Desk":"10B-121"
 },
 {
   "Desk":"10B-122"
 },
 {
   "Desk":"10B-123"
 },
 {
   "Desk":"10B-124"
 },
 {
   "Desk":"10B-125"
 },
 {
   "Desk":"10B-126"
 },
 {
   "Desk":"10B-127"
 },
 {
   "Desk":"10B-128"
 },
 {
   "Desk":"10B-129"
 },
 {
   "Desk":"10B-130"
 },
 {
   "Desk":"10B-131"
 },
 {
   "Desk":"10B-132"
 },
 {
   "Desk":"10B-133"
 },
 {
   "Desk":"10B-134"
 },
 {
   "Desk":"10B-135"
 },
 {
   "Desk":"10B-136"
 },
 {
   "Desk":"10B-137"
 },
 {
   "Desk":"10B-138"
 },
 {
   "Desk":"10B-139"
 },
 {
   "Desk":"10B-140"
 }
];

var DeskDataWingA=[
 {
   "Desk":"10A-GL-1"
 },
 {
   "Desk":"10A-GL-2"
 },
 {
   "Desk":"10A-PL-1"
 },
 {
   "Desk":"10A-PL-2"
 },
 {
   "Desk":"10A-PL-3"
 },
 {
   "Desk":"10A-PL-4"
 },
 {
   "Desk":"10A-PL-5"
 },
 {
   "Desk":"10A-PL-6"
 },
 {
   "Desk":"10A-1"
 },
 {
   "Desk":"10A-2"
 },
 {
   "Desk":"10A-3"
 },
 {
   "Desk":"10A-4"
 },
 {
   "Desk":"10A-5"
 },
 {
   "Desk":"10A-6"
 },
 {
   "Desk":"10A-7"
 },
 {
   "Desk":"10A-8"
 },
 {
   "Desk":"10A-9"
 },
 {
   "Desk":"10A-10"
 },
 {
   "Desk":"10A-11"
 },
 {
   "Desk":"10A-12"
 },
 {
   "Desk":"10A-13"
 },
 {
   "Desk":"10A-14"
 },
 {
   "Desk":"10A-15"
 },
 {
   "Desk":"10A-16"
 },
 {
   "Desk":"10A-17"
 },
 {
   "Desk":"10A-18"
 },
 {
   "Desk":"10A-19"
 },
 {
   "Desk":"10A-20"
 },
 {
   "Desk":"10A-21"
 },
 {
   "Desk":"10A-22"
 },
 {
   "Desk":"10A-23"
 },
 {
   "Desk":"10A-24"
 },
 {
   "Desk":"10A-25"
 },
 {
   "Desk":"10A-26"
 },
 {
   "Desk":"10A-27"
 },
 {
   "Desk":"10A-28"
 },
 {
   "Desk":"10A-29"
 },
 {
   "Desk":"10A-30"
 },
 {
   "Desk":"10A-31"
 },
 {
   "Desk":"10A-32"
 },
 {
   "Desk":"10A-33"
 },
 {
   "Desk":"10A-34"
 },
 {
   "Desk":"10A-35"
 },
 {
   "Desk":"10A-36"
 },
 {
   "Desk":"10A-37"
 },
 {
   "Desk":"10A-38"
 },
 {
   "Desk":"10A-39"
 },
 {
   "Desk":"10A-40"
 },
 {
   "Desk":"10A-41"
 },
 {
   "Desk":"10A-42"
 },
 {
   "Desk":"10A-43"
 },
 {
   "Desk":"10A-44"
 },
 {
   "Desk":"10A-45"
 },
 {
   "Desk":"10A-46"
 },
 {
   "Desk":"10A-47"
 },
 {
   "Desk":"10A-48"
 },
 {
   "Desk":"10A-49"
 },
 {
   "Desk":"10A-50"
 },
 {
   "Desk":"10A-51"
 },
 {
   "Desk":"10A-52"
 },
 {
   "Desk":"10A-53"
 },
 {
   "Desk":"10A-54"
 },
 {
   "Desk":"10A-55"
 },
 {
   "Desk":"10A-56"
 },
 {
   "Desk":"10A-57"
 },
 {
   "Desk":"10A-58"
 },
 {
   "Desk":"10A-59"
 },
 {
   "Desk":"10A-60"
 },
 {
   "Desk":"10A-61"
 },
 {
   "Desk":"10A-62"
 },
 {
   "Desk":"10A-63"
 },
 {
   "Desk":"10A-64"
 },
 {
   "Desk":"10A-65"
 },
 {
   "Desk":"10A-66"
 },
 {
   "Desk":"10A-67"
 },
 {
   "Desk":"10A-68"
 },
 {
   "Desk":"10A-69"
 },
 {
   "Desk":"10A-70"
 },
 {
   "Desk":"10A-71"
 },
 {
   "Desk":"10A-72"
 },
 {
   "Desk":"10A-73"
 },
 {
   "Desk":"10A-74"
 },
 {
   "Desk":"10A-75"
 },
 {
   "Desk":"10A-76"
 },
 {
   "Desk":"10A-77"
 },
 {
   "Desk":"10A-78"
 },
 {
   "Desk":"10A-79"
 },
 {
   "Desk":"10A-80"
 },
 {
   "Desk":"10A-81"
 },
 {
   "Desk":"10A-82"
 },
 {
   "Desk":"10A-83"
 },
 {
   "Desk":"10A-84"
 },
 {
   "Desk":"10A-85"
 },
 {
   "Desk":"10A-86"
 },
 {
   "Desk":"10A-87"
 },
 {
   "Desk":"10A-88"
 },
 {
   "Desk":"10A-89"
 },
 {
   "Desk":"10A-90"
 },
 {
   "Desk":"10A-91"
 },
 {
   "Desk":"10A-92"
 },
 {
   "Desk":"10A-93"
 },
 {
   "Desk":"10A-94"
 },
 {
   "Desk":"10A-95"
 },
 {
   "Desk":"10A-96"
 },
 {
   "Desk":"10A-97"
 },
 {
   "Desk":"10A-98"
 },
 {
   "Desk":"10A-99"
 },
 {
   "Desk":"10A-100"
 },
 {
   "Desk":"10A-101"
 },
 {
   "Desk":"10A-102"
 },
 {
   "Desk":"10A-103"
 },
 {
   "Desk":"10A-104"
 },
 {
   "Desk":"10A-105"
 },
 {
   "Desk":"10A-106"
 },
 {
   "Desk":"10A-107"
 },
 {
   "Desk":"10A-108"
 },
 {
   "Desk":"10A-109"
 },
 {
   "Desk":"10A-110"
 },
 {
   "Desk":"10A-111"
 },
 {
   "Desk":"10A-112"
 },
 {
   "Desk":"10A-113"
 }
];

for(var i=0;i<DeskDataWingA.length;i++){
    
    var DeskWingAObj=DeskDataWingA[i];
    DeskWingAObj.Wing="A";
    
    
}
//console.log("DeskDataWingA "+JSON.stringify(DeskDataWingA));

for(var i=0;i<DeskDataWingB.length;i++){
    
    var DeskWingAObj=DeskDataWingB[i];
    DeskWingAObj.Wing="B";
    
    
}

//console.log("DeskDataWingB "+JSON.stringify(DeskDataWingB));

var deskData=DeskDataWingA.concat(DeskDataWingB);

console.log("Desk Data is "+JSON.stringify(deskData));
//Desk  will fetch Shown based on the Wing Selected by the User
//Now On Saving The Desk We need to add inside Employee Wing along with the Desk selected by the User
//That Wing Should also be the reference of the WingData JSON Object

var converter = new Converter({});
converter.fromFile("./data/Emp.csv",function(err,result){
     
    if(err) {
        console.log(err);
        return;
    }
   
     
        employeeData =result;

});




var WingData=[{"Wing":"A"},{"Wing":"B"}];

var accessoryData = [{"Accessory":"Charger"},{"Accessory":"Cable"},{"Accessory":"Earphone"},{"Accessory":"Mouse"},{"Accessory":"Keyboard"}];
var assetModelData = [{"AssetModel":"iMac","AssetType":"Desktop"},{"AssetModel":"Mac Mini","AssetType":"Desktop"},{"AssetModel":"Windows","AssetType":"Desktop"},{"AssetModel":"Imac Battery Charger", "AssetType":"Other"},{"AssetModel":"Leap", "AssetType":"Other"},{"AssetModel":"HDMI Cable", "AssetType":"Other"},{"AssetModel":"Gear S2", "AssetType":"Samsung Watch"},{"AssetModel":"iWatch", "AssetType":"Apple Watch"},{"AssetModel":"IPAD Air", "AssetType":"Apple IPAD"},{"AssetModel":"IPAD Mini", "AssetType":"Apple IPAD"},{"AssetModel":"Iphone 6+", "AssetType":"Apple Phone"},{"AssetModel":"Iphone 6", "AssetType":"Apple Phone"},{"AssetModel":"iPhone5", "AssetType":"Apple Phone"},{"AssetModel":"iPhone 5c", "AssetType":"Apple Phone"},{"AssetModel":"iPhone4", "AssetType":"Apple Phone"},{"AssetModel":"iPhone4S", "AssetType":"Apple Phone"},{"AssetModel":"BB Play Book", "AssetType":"BB Tablet"},{"AssetModel":"BB Mobile", "AssetType":"BB Phone"},{"AssetModel":"BB 9900", "AssetType":"BB Phone"},{"AssetModel":"Omnia", "AssetType":"Windows Phone"},{"AssetModel":"Nokia", "AssetType":"Windows Phone"},{"AssetModel":"Sony Xperia S", "AssetType":"Android Phone"},{"AssetModel":"LG Optimus G", "AssetType":"Android Phone"},{"AssetModel":"Sony Xperia X10 mini", "AssetType":"Android Phone"},{"AssetModel":"Google Nexus4", "AssetType":"Android Phone"},{"AssetModel":"Google Nexus5", "AssetType":"Android Phone"},{"AssetModel":"Samsung Galaxy Note4", "AssetType":"Android Phone"},{"AssetModel":"Galaxy Note 800", "AssetType":"Android Phone"},{"AssetModel":"Samsung Galaxy S4", "AssetType":"Android Phone"},{"AssetModel":"HTC One", "AssetType":"Android Phone"},{"AssetModel":"Nexus 6", "AssetType":"Android Phone"},{"AssetModel":"Galaxy Note", "AssetType":"Android Phone"},{"AssetModel":"Galaxy Note S10", "AssetType":"Android Phone"},{"AssetModel":"Galaxy S3", "AssetType":"Android Phone"},{"AssetModel":"HTC Incredible", "AssetType":"Android Phone"},{"AssetModel":"Sony Erricson", "AssetType":"Android Phone"},{"AssetModel":"HTC Desire", "AssetType":"Android Phone"},{"AssetModel":"Galaxy S2", "AssetType":"Android Phone"},{"AssetModel":"Moto Razor", "AssetType":"Android Phone"},{"AssetModel":"Windows8", "AssetType":"Windows Tablet"},{"AssetModel":"Samsung Slate", "AssetType":"Windows Tablet"},{"AssetModel":"iPad4", "AssetType":"Apple Tablet"},{"AssetModel":"iPad Mini", "AssetType":"Apple Tablet"},{"AssetModel":"iPad2", "AssetType":"Apple Tablet"},{"AssetModel":"iPad1", "AssetType":"Apple Tablet"},{"AssetModel":"iPad3", "AssetType":"Apple Tablet"},{"AssetModel":"Nexus 9","AssetType":"Android Tablet"},{"AssetModel":"Samsung Galaxy TabS","AssetType":"Android Tablet"},{"AssetModel":"Galaxy Note 800","AssetType":"Android Tablet"},{"AssetModel":"Samsung Galaxy TAB PRO","AssetType":"Android Tablet"},{"AssetModel":"Samsung Tab4","AssetType":"Android Tablet"},{"AssetModel":"Samsung Tab3(8Inch)","AssetType":"Android Tablet"},{"AssetModel":"Asus Nexus(7 inches)","AssetType":"Android Tablet"},{"AssetModel":"Samsung Galaxy Tab3(7inches)","AssetType":"Android Tablet"},{"AssetModel":"iball Slide","AssetType":"Android Tablet"},{"AssetModel":"Dell Venue 7","AssetType":"Android Tablet"},{"AssetModel":"Galaxy Tab 3","AssetType":"Android Tablet"},{"AssetModel":"Galaxy Tab S","AssetType":"Android Tablet"},{"AssetModel":"Google Nexus","AssetType":"Android Tablet"},{"AssetModel":"Nexus 9","AssetType":"Android Tablet"},{"AssetModel":"Samsung Galaxy Tab2","AssetType":"Android Tablet"},{"AssetModel":"HCL Me","AssetType":"Android Tablet"},{"AssetModel":"Kindle","AssetType":"Android Tablet"},{"AssetModel":"Motorola Xoom","AssetType":"Android Tablet"},{"AssetModel":"Samsung Galaxy Tab3","AssetType":"Android Tablet"},{"AssetModel":"Google Nexus", "AssetType":"Android Tablet"},{"AssetModel":"Nexus", "AssetType":"Android Tablet"},{"AssetModel":"Windows", "AssetType":"Laptop"},{"AssetModel":"Macbook Pro", "AssetType":"Laptop"},{"AssetModel":"Macbook Air", "AssetType":"Laptop"}]
var assetTypeData = [{"AssetType":"Android Tablet"},{"AssetType":"Apple Tablet"},{"AssetType":"Android Phone"},{"AssetType":"Apple Phone"},{"AssetType":"Apple IPAD"},{"AssetType":"BB Tablet"},{"AssetType":"BB Phone"},{"AssetType":"Desktop"},{"AssetType":"Laptop"},{"AssetType":"Apple Watch"},{"AssetType":"Samsung Watch"},{"AssetType":"Windows Tablet"},{"AssetType":"Windows Phone"},{"AssetType":"Other"}];
var hddData = [{"HDD":"128GB"},{"HDD":"256GB"},{"HDD":"320GB"},{"HDD":"512GB"},{"HDD":"1TB"},{"HDD":"2TB"}];
var processorData = [{"Processor":"Intel Core i3"},{"Processor":"Intel Core i5"},{"Processor":"Intel Core i7"}];
var ramData = [{"RAM":"2GB"},{"RAM":"3GB"},{"RAM":"4GB"},{"RAM":"5GB"},{"RAM":"6GB"},{"RAM":"7GB"},{"RAM":"8GB"}];
var osVersionData = [{"OSVersion":"Windows 7"},{"OSVersion":"Windows 8 (x86)"},{"OSVersion":"Windows 8 (x64)"},{"OSVersion":"Windows 8.1 (x32)"},{"OSVersion":"Windows 8.1 (x64)"},{"OSVersion":"Windows 10 (x86)"},{"OSVersion":"Windows 10 (x64)"},{"OSVersion":"Mac OS 10.10 Yosemite"},{"OSVersion":"Mac OS Mountain Lion"},{"OSVersion":"Mac OS Mavericks"}];
//var employeeData = [{"EmployeeID":"784793","FirstName":"Adam","LastName":"Frazier","Stream":"Mobility","Password":"784793@Frazier","Admin":"true"},{"EmployeeID":"926371","FirstName":"Frances","LastName":"Allen","Stream":"BigData","Password":"926371@Allen","Admin":"false"},{"EmployeeID":"435761","FirstName":"Carl","LastName":"Wright","Stream":"BigData","Password":"435761@Wright","Admin":"true"},{"EmployeeID":"467616","FirstName":"Larry","LastName":"Hamilton","Stream":"ABIAP","Password":"467616@Hamilton","Admin":"true"},{"EmployeeID":"247181","FirstName":"Phillip","LastName":"Perry","Stream":"Mobility","Password":"247181@Perry","Admin":"true"},{"EmployeeID":"871158","FirstName":"Jonathan","LastName":"Dean","Stream":"Mobility","Password":"871158@Dean","Admin":"false"},{"EmployeeID":"885806","FirstName":"Alan","LastName":"Elliott","Stream":"Mobility","Password":"885806@Elliott","Admin":"true"},{"EmployeeID":"444123","FirstName":"Craig","LastName":"Freeman","Stream":"BigData","Password":"444123@Freeman","Admin":"true"},{"EmployeeID":"121168","FirstName":"Billy","LastName":"Garrett","Stream":"ABIAP","Password":"121168@Garrett","Admin":"false"},{"EmployeeID":"361673","FirstName":"Roy","LastName":"Reyes","Stream":"Mobility","Password":"361673@Reyes","Admin":"true"},{"EmployeeID":"421201","FirstName":"Harold","LastName":"Parker","Stream":"BigData","Password":"421201@Parker","Admin":"false"},{"EmployeeID":"311903","FirstName":"Kimberly","LastName":"Hall","Stream":"BigData","Password":"311903@Hall","Admin":"false"},{"EmployeeID":"229836","FirstName":"Robert","LastName":"Barnes","Stream":"BigData","Password":"229836@Barnes","Admin":"false"},{"EmployeeID":"861582","FirstName":"Heather","LastName":"Watkins","Stream":"BigData","Password":"861582@Watkins","Admin":"true"},{"EmployeeID":"576651","FirstName":"Jonathan","LastName":"Holmes","Stream":"Mobility","Password":"576651@Holmes","Admin":"true"},{"EmployeeID":"268331","FirstName":"Irene","LastName":"Oliver","Stream":"ABIAP","Password":"268331@Oliver","Admin":"false"},{"EmployeeID":"449372","FirstName":"Angela","LastName":"Ramirez","Stream":"ABIAP","Password":"449372@Ramirez","Admin":"true"},{"EmployeeID":"958531","FirstName":"Patrick","LastName":"Wagner","Stream":"ABIAP","Password":"958531@Wagner","Admin":"true"},{"EmployeeID":"294864","FirstName":"Willie","LastName":"Gonzales","Stream":"ABIAP","Password":"294864@Gonzales","Admin":"false"},{"EmployeeID":"597642","FirstName":"Barbara","LastName":"Riley","Stream":"BigData","Password":"597642@Riley","Admin":"false"},{"EmployeeID":"303428","FirstName":"Kathleen","LastName":"Marshall","Stream":"ABIAP","Password":"303428@Marshall","Admin":"false"},{"EmployeeID":"635267","FirstName":"Pamela","LastName":"Perez","Stream":"BigData","Password":"635267@Perez","Admin":"true"},{"EmployeeID":"511864","FirstName":"Doris","LastName":"Walker","Stream":"ABIAP","Password":"511864@Walker","Admin":"false"},{"EmployeeID":"742202","FirstName":"Marilyn","LastName":"Gomez","Stream":"Mobility","Password":"742202@Gomez","Admin":"true"},{"EmployeeID":"620157","FirstName":"Patricia","LastName":"Peterson","Stream":"BigData","Password":"620157@Peterson","Admin":"false"},{"EmployeeID":"543408","FirstName":"Maria","LastName":"Murray","Stream":"ABIAP","Password":"543408@Murray","Admin":"false"},{"EmployeeID":"352301","FirstName":"Martha","LastName":"Willis","Stream":"BigData","Password":"352301@Willis","Admin":"true"},{"EmployeeID":"948069","FirstName":"Steve","LastName":"White","Stream":"ABIAP","Password":"948069@White","Admin":"false"},{"EmployeeID":"131948","FirstName":"Cynthia","LastName":"Garrett","Stream":"BigData","Password":"131948@Garrett","Admin":"true"},{"EmployeeID":"177666","FirstName":"Scott","LastName":"Perkins","Stream":"ABIAP","Password":"177666@Perkins","Admin":"true"},{"EmployeeID":"794348","FirstName":"Doris","LastName":"Price","Stream":"ABIAP","Password":"794348@Price","Admin":"true"},{"EmployeeID":"852727","FirstName":"Dorothy","LastName":"Gibson","Stream":"Mobility","Password":"852727@Gibson","Admin":"true"},{"EmployeeID":"624074","FirstName":"Kimberly","LastName":"Harrison","Stream":"ABIAP","Password":"624074@Harrison","Admin":"true"},{"EmployeeID":"617578","FirstName":"Jerry","LastName":"Jacobs","Stream":"BigData","Password":"617578@Jacobs","Admin":"true"},{"EmployeeID":"220720","FirstName":"Joan","LastName":"Wallace","Stream":"ABIAP","Password":"220720@Wallace","Admin":"false"},{"EmployeeID":"170137","FirstName":"Michael","LastName":"Campbell","Stream":"ABIAP","Password":"170137@Campbell","Admin":"true"},{"EmployeeID":"386804","FirstName":"Stephanie","LastName":"Wagner","Stream":"Mobility","Password":"386804@Wagner","Admin":"false"},{"EmployeeID":"868842","FirstName":"Thomas","LastName":"Simpson","Stream":"Mobility","Password":"868842@Simpson","Admin":"true"},{"EmployeeID":"543135","FirstName":"Betty","LastName":"Lynch","Stream":"BigData","Password":"543135@Lynch","Admin":"true"},{"EmployeeID":"430971","FirstName":"Lisa","LastName":"Brown","Stream":"BigData","Password":"430971@Brown","Admin":"false"},{"EmployeeID":"272472","FirstName":"Gerald","LastName":"West","Stream":"Mobility","Password":"272472@West","Admin":"true"},{"EmployeeID":"187646","FirstName":"Albert","LastName":"Moore","Stream":"BigData","Password":"187646@Moore","Admin":"false"},{"EmployeeID":"176548","FirstName":"Gerald","LastName":"Marshall","Stream":"BigData","Password":"176548@Marshall","Admin":"true"},{"EmployeeID":"224768","FirstName":"Robert","LastName":"Dixon","Stream":"BigData","Password":"224768@Dixon","Admin":"true"},{"EmployeeID":"396854","FirstName":"Eric","LastName":"Hansen","Stream":"BigData","Password":"396854@Hansen","Admin":"false"},{"EmployeeID":"374647","FirstName":"Emily","LastName":"Palmer","Stream":"Mobility","Password":"374647@Palmer","Admin":"true"},{"EmployeeID":"825899","FirstName":"Dennis","LastName":"Gilbert","Stream":"Mobility","Password":"825899@Gilbert","Admin":"true"},{"EmployeeID":"782077","FirstName":"Cheryl","LastName":"Fowler","Stream":"BigData","Password":"782077@Fowler","Admin":"false"},{"EmployeeID":"914036","FirstName":"Benjamin","LastName":"Carroll","Stream":"ABIAP","Password":"914036@Carroll","Admin":"false"},{"EmployeeID":"800496","FirstName":"Brenda","LastName":"Duncan","Stream":"ABIAP","Password":"800496@Duncan","Admin":"true"}];
var locationData = [{"Location":"Aadibatla"},{"Location":"Deccan Park"},{"Location":"Kohinoor Park"},{"Location":"Synergy Park"},{"Location":"Waverock"},{"Location":"Client Location"}];


function removeDocs(callback1) {
    async.series([
        function(callback2){Accessory.remove({}, function(err){if(err){console.log(err); return;} console.log('Accessory removed');callback2(null, 'Accessory');})},
        function(callback2){AssetType.remove({}, function(err){if(err){console.log(err); return;} console.log('AssetType removed');callback2(null, 'AssetType');})},
        function(callback2){AssetModel.remove({}, function(err){if(err){console.log(err); return;} console.log('AssetModel removed');callback2(null, 'AssetModel');})},
        function(callback2){Processor.remove({}, function(err){if(err){console.log(err); return;} console.log('Processor removed');callback2(null, 'Processor');})},
        function(callback2){RAM.remove({}, function(err){if(err){console.log(err); return;} console.log('RAM removed');callback2(null, 'RAM');})},
        function(callback2){HDD.remove({}, function(err){if(err){console.log(err); return;} console.log('HDD removed');callback2(null, 'HDD');})},
        function(callback2){Desk.remove({}, function(err){if(err){console.log(err); return;} console.log('Desk removed');callback2(null, 'Desk');})},
        function(callback2){OSVersion.remove({}, function(err){if(err){console.log(err); return;} console.log('OSVersion removed');callback2(null, 'OSVersion');})},
        function(callback2){Employee.remove({}, function(err){if(err){console.log(err); return;} console.log('Employee removed');callback2(null, 'Employee');})},
        function(callback2){Location.remove({}, function(err){if(err){console.log(err); return;} console.log('Location removed');callback2(null, 'Location');})},
        
        function(callback2){wings.remove({}, function(err){if(err){console.log(err); return;} console.log('Wing removed');callback2(null, 'wings');})}
       ], function(err, results){if(err){console.log(err); return;} console.log('All removed');console.log(results); callback1(null, 'Removed')});
}

function addData(callback1) {
    async.series([
        function(callback2){
            Accessory.create(accessoryData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Accessory saved');
                callback2(null, 'Accessory');
            });
        },
        function(callback2){
            AssetModel.create(assetModelData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('AssetModel saved');
                callback2(null, 'AssetModel');
            });
        },
        function(callback2) {
            AssetType.create(assetTypeData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('AssetType saved');
                callback2(null, 'AssetType');
            });
        },
        function(callback2) {
            Desk.create(deskData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Desk saved');
                callback2(null, 'Desk');
            });
        },
        function(callback2) {
            HDD.create(hddData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('HDD saved');
                callback2(null, 'HDD');
            });
        },
        function(callback2) {
            Processor.create(processorData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Processor saved');
                callback2(null, 'Processor');
            });
        },
        function(callback2) {
            RAM.create(ramData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('RAM saved');
                callback2(null, 'RAM');
            });
        },
        function(callback2) {
            OSVersion.create(osVersionData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('OSVersion saved');
                callback2(null, 'OSVersion');
            });
        },
        function(callback2) {
            Employee.create(employeeData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Employee saved');
                callback2(null, 'Employee');
            });
        },
        function(callback2) {
            Location.create(locationData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Location saved');
                callback2(null, 'Location');
            });
        },
        function(callback2) {
            wings.create(WingData, function(err) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Location saved');
                callback2(null, 'wings');
            });
        }
        ], function(err, results){if(err){console.log(err); return;} console.log('All added');console.log(results); callback1(null, 'Added')});
}




async.series([removeDocs,addData], function(err, results){if(err){console.log(err); return;} console.log('Done');console.log(results);process.exit();});




function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';

    var head = array[0];

    for (var index in array[0]) {
        var value = index + "";
        line += '"' + value.replace(/"/g, '""') + '",';
    }
   

    line = line.slice(0, -1);
    str += line + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';

        for (var index in array[i]) {
            var value = array[i][index] + "";
            line += '"' + value.replace(/"/g, '""') + '",';
        }
        

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
    
}
