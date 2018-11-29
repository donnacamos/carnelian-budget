const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', function(){
  console.log('FCC Glitch conected to DB');
});

mongoose.connection.on('error', function(err){
  console.log('Error connecting to DB ', err);
});
var Schema = mongoose.Schema;
var personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
  var person = new Person({name: 'Stephen', age: 31, favoriteFoods: ['Lasagna', 'Rueben']})
  person.save((err, data)=>{ if(err) { done(err);} return done(null, data);
                           });
  };
const Model = mongoose.model

var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, (err, data) => {
    if(err){
    done(err);
    }
      done(null, data);
    })
  };
var Person = mongoose.model('Person', personSchema)

var findPeopleByName = function(personName, done) {
  Person.find({"name":personName}, (err, data) =>{
  if(err){done(err)};
    done(null, data);
  })
  

};
var findOneByFood = function(food, done) {
Person.findOne({"favoriteFoods": food}, (err, data) => {
if(err){done(err)};
  done(null, data);
})
  };
  var findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => err ? done(err) : done(null, data));
  
  
};
var findEditThenSave = function(personId, done) {
  var foodToAdd = "hamburger";
  Person.findById(personId, function(err, data) {
    if (err) {
      done(err);
    }

    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => (err ? done(err) : done(null, data)));
  });
};
var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName},
    {$set: {age: ageToSet}},
    {new: true},
    (err, data) => {
    if(err) return done(err, data);
      return done(null, data);
    }
  );
  
};
var removeById = function(personId, done) {
  Person.findByIdAndRemove(personId,(err, data) => err ? done(err): done(null, data));
  
};
var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
Person.deleteMany({name: nameToRemove}, (err, data) => {
err ? done(err) : done(null, data)}
            )};
            var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name: "asc"}).limit(2).select("-age").exec((err, data) => {
  if(err)
    done(err);
    done(null, data);
  })
  
};
