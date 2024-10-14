const User = require("../schema/users");
const jwt = require("jsonwebtoken");
const helper = require("../helper/helper");
const bcrypt = require("bcrypt");
const { createUser } = require("../models/users");
const { generateToken } = require("../helper");

require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      // Check if user already exists
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.json(
          helper.showValidationErrorResponse("User Alredy exist")
        );
      }
      const addUserData = await createUser(req.body)
      console.log(addUserData)
      return res.json(
        helper.showSuccessResponse("User added successfully.")
      );

    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },

  //   verify user by given otp


  // send otp after login
  login: async (req, res) => {
    try {
      const userRecord = await User.findOne({
        email: req.body.email
      });
      if (!userRecord) {
        return res.json(helper.showValidationErrorResponse("User not found."));
      }
      // Generate token
      const token = generateToken(userRecord);

      // Return success response with token

      return res.json(
        helper.showSuccessResponse("User fetch successfully", token)
      );
    } catch (error) {
      console.error(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },

  view: async (req, res) => {
    try {
      return res.json(
        helper.showSuccessResponse(
          "User details fetch successfully",
          req.user
        )
      );

    } catch (error) {
      console.log(error);
      return res.json(
        helper.showInternalServerErrorResponse("Internal server error")
      );
    }
  },
};
