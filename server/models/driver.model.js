// driver model

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const driverSchema = new mongoose.Schema({
  fullname:{
    firstname:{
      type:String,
      required:true,
      minlength:[3, 'firstname must be atleast 3 characters']
    },
    lastname:{
      type:String,
      required:true,
      minlength:[3, 'lastname must be atleast 3 characters']
    }
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    minlength:[8, 'password must be atleast 8 characters'],
    select: false
  },
  socketId:{
    type:String,
  },
  status:{
    type:String,
    enum:['active', 'inactive'],
    default:'inactive'
  },
  vehicle:{
    color:{
      type:String,
      required:true,
      minlength:[3, 'color must be atleast 3 characters']
    },
    plate:{
      type:String,
      required:true,
      minlength:[3, 'plate must be atleast 3 characters']
    },
    capacity:{
      type:Number,
      required:true,
      min:[1, 'capacity must be atleast 1']
    },
    vehicleType:{
      type: String,
      enum:['car', 'bike', 'auto'],
      required:true
    }
  },
  location:{
    lat:{
      type:Number,
    },
    lng:{
      type:Number,
    }
  }
})

driverSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '24h'});
  return token;
}


driverSchema.methods.comparePassword = async function(password){
   return await bcrypt.compare(password, this.password);
}

driverSchema.statics.hashPassword =  async function(password){
  return await bcrypt.hash(password, 10);
}


const driverModel = mongoose.model('Driver', driverSchema);

module.exports = driverModel;