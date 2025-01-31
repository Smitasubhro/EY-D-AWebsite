const dboperations = require('./dboperations')
const express =require("express");
var config = require('./dbconfig');
const sql = require('mssql');
const multer = require('multer');
const path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
const app=express();
var router = express.Router();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use('/api', router);
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/upload')
    },
    filename:(req,file,cb)=>{
         console.log("21",file)
        cb(null,file.originalname.split(".")[0] + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})
const db=sql.connect(config,function(err){
    if(err) throw err
    console.log("Database Connected")
})
router.use((request,response,next)=>{
    console.log('middleware');
    next();
 })
 

router.route('/getUseCaseList').get(async(req,res)=>{
    let request=db.request();
    try {
    const result = await request.query('SELECT * from Usecase_Info');
    console.log("18",result.recordsets)
    res.json({msg:"Fetch User successfully",data:result.recordsets})
    }catch (err) {
        console.error("Error fetching data:", err.message);
        res.status(500).json({ message: "Error fetching data", error: err.message });
      }
    
})

router.route('/getAssetList').get(async(req,res)=>{
    let request=db.request();
    try {
    const result = await request.query('SELECT * from Asset_Info');
    console.log("18",result.recordsets)
    res.json({msg:"Assets fetched successfully",data:result.recordsets})
    }catch (err) {
        console.error("Error fetching data:", err.message);
        res.status(500).json({ message: "Error fetching data", error: err.message });
      }
    
    
})


router.route('/addUseCase').post(async(req,res)=>{
    const reqbody=req.body
    console.log("46",reqbody)
    try{
        let request=db.request();
    request.input("Tag_Name",sql.VarChar(255),req.body.Tag_Name)
    request.input("Title",sql.VarChar(255),req.body.Title)
    request.input("YEAR",sql.Int,req.body.YEAR)
    request.input("Client_Name",sql.VarChar(255),req.body.Client_Name)
    request.input("Industry",sql.VarChar(255),req.body.Industry)
    request.input("Function_Used",sql.VarChar(255),req.body.Function_Used)
    request.input("Technology_Used",sql.VarChar(255),req.body.Technology_Used)
    request.input("Region",sql.VarChar(255),req.body.Region)
    request.input("Complexcity",sql.VarChar(255),req.body.Complexcity)
    request.input("Image_Link",sql.VarChar(255),req.body.Image_Link)
    request.input("UsecaseID",sql.VarChar(255),req.body.UsecaseID)
    request.input("Startdate",sql.VarChar(255),req.body.Startdate)
    request.input("Enddate",sql.VarChar(255),req.body.Enddate)
    request.input("Effortdays",sql.Int,req.body.Effortdays)
    request.input("Developed_By",sql.VarChar(255),req.body.Developed_By)
    request.input("Pillars",sql.VarChar(255),req.body.Pillars)
    request.input("Sub_Pillar",sql.VarChar(255),req.body.Sub_Pillar)
    request.input("Problem_Statement",req.body.Problem)
    request.input("Solution",req.body.Solution)
    request.input("Benefit",req.body.Business)
    const q = "insert into Usecase_Info(Tag_Name,Title,YEAR,Client_Name,Industry,Function_Used,Technology_Used,Region,Complexcity,Image_Link,UsecaseID,Startdate,Enddate,Effortdays,Developed_By,Pillars,Sub_Pillar,Problem_Statement,Solution,Benefit)values (@Tag_Name,@Title,@YEAR,@Client_Name,@Industry,@Function_Used,@Technology_Used,@Region,@Complexcity,@Image_Link,@UsecaseID,@Startdate,@Enddate,@Effortdays,@Developed_By,@Pillars,@Sub_Pillar,@Problem_Statement,@Solution,@Benefit)"
    const result = await request.query(q);
    console.log("18",result.recordsets)
    res.json({status:"success",msg:"Use Case data added successfully"})

    }catch(err)
    {
        res.json({status:"error",msg:"Use Case data cant be added"})
    }
    
})
router.route('/addAsset').post(async(req,res)=>{
    const reqbody=req.body
    console.log("46",reqbody)
    try{
    let request=db.request();
    request.input("Tag_Name",sql.VarChar(255),req.body.Tag_Name)
    request.input("Title",sql.VarChar(255),req.body.Title)
    request.input("YEAR",sql.Int,req.body.YEAR)
    request.input("Client_Name",sql.VarChar(255),req.body.Client_Name)
    request.input("Industry",sql.VarChar(255),req.body.Industry)
    request.input("Function_Used",sql.VarChar(255),req.body.Function_Used)
    request.input("Technology_Used",sql.VarChar(255),req.body.Technology_Used)
    request.input("Region",sql.VarChar(255),req.body.Region)
    request.input("Complexcity",sql.VarChar(255),req.body.Complexcity)
    request.input("Image_Link",sql.VarChar(255),req.body.Image_Link)
    request.input("AssetID",sql.VarChar(255),req.body.AssetID)
    request.input("Startdate",sql.VarChar(255),req.body.Startdate)
    request.input("Enddate",sql.VarChar(255),req.body.Enddate)
    request.input("Effortdays",sql.Int,req.body.Effortdays)
    request.input("Developed_By",sql.VarChar(255),req.body.Developed_By)
    request.input("Pillars",sql.VarChar(255),req.body.Pillars)
    request.input("Sub_Pillar",sql.VarChar(255),req.body.Sub_Pillar)
    request.input("Problem_Statement",req.body.Problem)
    request.input("Solution",req.body.Solution)
    request.input("Benefit",req.body.Business)
    const q = "insert into Asset_Info(Tag_Name,Title,YEAR,Client_Name,Industry,Function_Used,Technology_Used,Region,Complexcity,Image_Link,AssetID,Startdate,Enddate,Effortdays,Developed_By,Pillars,Sub_Pillar,Problem_Statement,Solution,Benefit)values (@Tag_Name,@Title,@YEAR,@Client_Name,@Industry,@Function_Used,@Technology_Used,@Region,@Complexcity,@Image_Link,@AssetID,@Startdate,@Enddate,@Effortdays,@Developed_By,@Pillars,@Sub_Pillar,@Problem_Statement,@Solution,@Benefit)"
    const result = await request.query(q);
    console.log("18",result.recordsets)
    res.json({status:"success",msg:"Asset data added successfully"})

    }catch(err)
    {
        res.json({status:"error",msg:"Asset data cant be added"})
    }
    
})
router.route('/uploadImage').post(upload.single('imageLink'),(req,res)=>{
    console.log('72',req.file)
    res.json({status:"Success",msg:"Image added successfully",data:req.file.filename})
})

let port = process.env.PORT || 8090;
app.listen(port);
console.log('Usecase API is runnning at ' + port);