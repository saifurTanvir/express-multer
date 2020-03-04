var express = require("express");
var ejs = require("ejs");
var multer = require("multer");
var fs = require("fs");

var app = express();

app.set("view engine", "ejs");

var storage = multer.diskStorage({
	destination: function(req, file, callback){
		var dir = "./uploads";

		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}

		callback(null, dir);
		
	},

	filename: function(req, file, callback){
		callback(null, file.originalname);
	}
});

var upload = multer({storage: storage}).array("files", 12);

app.post("/upload", function(req, res, next){
	upload(req, res, function(err){
		if(err){
			return res.send("Something gone wrong");
		}
		res.send("Upload complete");
	})
});

app.get("/", function(req, res){
	res.render("index");
});




app.listen("3000", function(){
	console.log("Started at 3000!");
})