import { PrismaClient } from "@prisma/client";
//import { Bcrypt } from "bcryptjs"
//import { Jwt } from "jsonwebtoken"
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');
//const bcrypt = new Bcrypt();
//const jwt = new Jwt);
const jwt = require("jsonwebtoken");

export const signup = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { email, password, name, phone_number } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await prisma.user.findUnique({ 
      where: {
        email: email
      }
     });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    
    const user = await prisma.user.create({
      data:{
        name,
        phone_number,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      }
      
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

export const signin = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await prisma.user.findUnique({ 
      where: {
        email: email
      }
     });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};
