var mongoose = require('mongoose');  
require('mongoose-double')(mongoose);
require('mongoose-long')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  salary : SchemaTypes.Double,
  empID:  { type: SchemaTypes.Long},
  joiningDate: { type: Date, default: Date.now }
});


mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');