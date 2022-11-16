const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/personDb", {
	useNewUrlParser: true,
});

console.log("Database Connected Successfully !");

const fruitSchema = mongoose.Schema({
	name: String,
	taste: String,
	rating: Number,
});


const personSchema = mongoose.Schema({
	name: {
		type: String,
		//  required: [true,"Please check name is not present ....."]
	},
	age: {
		type: Number,
		min: 18,
		max: 60,
	},
	favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
    name: "Apple",
    taste: "Yummy taste !",
    rating: 9
});

apple.save();

const dhinesh = new Person({
	name: "Dhinesh",
	age: 22,
    favouriteFruit: apple
});

const dk = new Person({
	age: 20,
});

try{
  dhinesh.save();

}catch(err){
    console.log("ERROR : "+err);
}finally{
    console.log("DATA INSERTED !");
}

/* Person.deleteOne({ _id: "636cae80bc4735017ea2385d" }, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Data Deleted Successfully !");
		mongoose.connection.close();
	}
});

 Person.updateOne({_id: "636cc8e2e1acf2579abda4c9"}, {name: "Lokesh"}, function (err) { 
    if(err){
        console.log(err);
    }else{
        console.log("Data Updated Successfully !");
    }
}); */

/* Person.insertMany([vasanth,rollins],function(err){
    if(err){
        console.log("ERROR : "+err);
    }else{
        console.log("Person Object Successfully saved into DB ...");
    }
}); 

Person.find(function (err,persons) { 
    if(err){
        console.log("ERROR : "+err);
    }else{
       // console.log("DATA : "+persons);
       mongoose.connection.close();
        persons.forEach(function (person) {
            console.log("Name : "+person.name);
        })
    }
 }); */
