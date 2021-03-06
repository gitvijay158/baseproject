const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
require('mongoose-long')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' })
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  salary: SchemaTypes.Double,
  empID: { type: SchemaTypes.Long },
  joiningDate: { type: Date, default: Date.now }
});


userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

// instance methods
userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user

  const user = this
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
 // Search for a user by email and password.
  const user = await User.findOne({ email })

 
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' })
  }

  
  return user
}


//mongoose.model('User', userSchema);
//module.exports = mongoose.model('User');

const User = mongoose.model('User', userSchema)

module.exports = User