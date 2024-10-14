const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: { type: String , require : true , default : "none"},
    email:{ type: String , require : true , default : "none"},
    password: { type: String ,require : true , default : "none" },
    phone: { type: String , require : true , default : "none" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Users || mongoose.model("users", userSchema);