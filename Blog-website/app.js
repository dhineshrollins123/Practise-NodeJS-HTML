//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');

const homeStartingContent = "A lake or an easy weekend is what God wants to decorate it with. Always the author, nor the time of life. Let it be a course of action. Viverra lived in this place. Do not use a microwave oven or a dishwasher. Until the basketball players are not members or members of the arc. Mattis the employee was targeted by the students. The mountains will give birth to a great push, and a ridiculous mouse will be born in the ultricia of life. I'm trying to find a way to get rid of the poison bed. The author of the life of Ultrices advocates football as a bed of alcohol to drink. Odio euismod lacinia at quis risus sed vulputate odio ut The course of the real estate agent was aimed at the students.";
const aboutDetail = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactDetail = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let postList = [];

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogPostDb");
console.log("Database Connected Successfully !");

const postSchema = {
  title: String,
  post: String
};

const Post = mongoose.model("Post",postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req, res){

  Post.find({},function(err,results){
    if(!err){
      res.render("home",{homeContent: homeStartingContent,postData: results});
    }
  });

});

app.get("/about",function(req,res){
  res.render("about",{aboutContent: aboutDetail});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent: contactDetail});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:temp",function(req,res){

  // for (var i = 0; i < postList.length; i++) {
  //   var post = postList[i];

  //   var title = lodash.lowerCase(post.postTitle);

  //   var param = lodash.lowerCase(req.params.temp);

  //   if(param === title) {
  //     console.log("Match Found : "+param);
  //     res.render("post",{postObj: post});
  //     break;
  //   }else{
  //     console.log("Match Not Found !");
  //     console.log("title : "+title);
  //     console.log("param : "+param);
  //   }
    
  // }

  const postId = req.params.temp;

  Post.findById({_id: postId},function(err,result){
    if(!err){
        res.render("post",{postObj: result});
    }else{
        console.log("Match Not Found !");
    }
  });


});

app.post("/compose",function(req,res){
  let titleForPost = req.body.postTitle;
  let uploadPost = req.body.postComment;
  
  // const post = {
  //   postTitle: title,
  //   postComment: comment
  // };

  const postObj = new Post({
    title: titleForPost,
    post: uploadPost
  });

  postObj.save(function(err,result){
    if(!err){
      res.redirect("/");
    }
  });

 // postList.push(post);

 
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
