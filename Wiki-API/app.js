const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", ejs);

app.listen(3000,function(){
    console.log("Server Started...");
});

mongoose.connect("mongodb://localhost:27017/wikiDB");
console.log("Database Connected..");

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article",articleSchema);


/* app.get("/articles",function(req, res){
   Article.find(function(err,results){

        if(!err){
            res.send(results);
        }else{
            res.send(err);
        } 
   });
});

app.post("/articles",function(req, res){
    const titleData = req.body.title;
    const contentData = req.body.content;
    
    const article = new Article({
        title: titleData,
        content: contentData
    });

    article.save(function(err){
        if(!err){
            res.send("Article Stored Successfully !")
        }else{
            res.send(err);
        }
    });
});

app.delete("/articles",function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("All articles deleted successfully");
        }else{
            res.send(err);
        }
    });
}); */

app.route("/articles")
.get(function(req, res){
    Article.find(function(err,results){
 
         if(!err){
             res.send(results);
         }else{
             res.send(err);
         } 
    });
 })
 .post(function(req, res){
    const titleData = req.body.title;
    const contentData = req.body.content;
    
    const article = new Article({
        title: titleData,
        content: contentData
    });

    article.save(function(err){
        if(!err){
            res.send("Article Stored Successfully !")
        }else{
            res.send(err);
        }
    });
})
.delete(function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("All articles deleted successfully");
        }else{
            res.send(err);
        }
    });
});

app.route("/articles/:titleName")
.get(function(req,res){
    Article.findOne({title: req.params.titleName},function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
})
.put(function(req,res){
    Article.updateOne(
        {title: req.params.titleName},
        {title: req.body.title,content: req.body.content},
        function(err){
            if(!err){
                res.send("Article Updated sucessfully with put method...");
            }else{
                res.send(err);
                console.log(err);
            }
        });
})
.patch(function(req,res){
    Article.updateOne(
        {title: req.params.titleName},
        {$set: req.body}, 
        function(err){
            if (!err){
                res.send("Article Updated sucessfully with patch method ...");
            }
        });

//req.body = {title: titlename , content: contentdata}; whatever field is given by client that field only updated other fields remains same

})
.delete(function(req,res){
    Article.deleteOne(
        {title: req.params.titleName},
        function(err){
            if(!err){
                res.send("Article Deleted sucessfully...");
            }
        }
    )
});
