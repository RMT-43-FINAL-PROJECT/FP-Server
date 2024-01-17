const { db } = require("../configs/mongodb")
const { hashPassword, comparePassword } = require("../helpers/bcryptjs")
const { signToken } = require("../helpers/jwt")
const { validateRegister, validateEmail } = require("../helpers/validator")

class UsersController {
  static async getAllUser(req, res, next) {
    try {
      const data = await db.collection("users").find({}, {
        projection: { password: 0 }
      }).toArray()
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async checkEmailOnDb(email, res) { // Just for checking email
    let findUser = await db.collection("users").findOne(
      { email }
    )
    return findUser
  }

  static async register(req, res, next) {
    try {
      let { name, email, password, mobilePhone, address } = req.body
      if (name === undefined || email === undefined || password === undefined || mobilePhone === undefined || address === undefined) {
        throw { name: 'Missing required fields' }
      }
      let checkUnique = await UsersController.checkEmailOnDb(email)
      if (checkUnique) {
        throw { name: "This email has already been registered" }
      }
      validateRegister({ name, email, password, mobilePhone, address })
      let hashedpassword = hashPassword(password)
      await db.collection("users").insertOne({
        name,
        photo: 'https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg',
        joinDate: new Date(),
        email,
        password: hashedpassword,
        mobilePhone,
        address,
        role: 'sales',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      res.status(201).json({
        message: 'Register Successfully',
        name,
        email,
        mobilePhone,
        address,
        role: 'sales'
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body
      if (!email) {
        throw { name: 'Email is required' }
      }
      if (!password) {
        throw { name: 'Password is required' }
      }
      let verifyEmail = await UsersController.checkEmailOnDb(email)
      if (!verifyEmail) {
        throw { name: 'Invalid email/password' }
      }
      let verifyPassword = comparePassword(password, verifyEmail.password)
      if (!verifyPassword) {
        throw { name: 'Invalid email/password' }
      }
      let access_token = signToken(verifyEmail)
      res.status(200).json({ access_token })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getUserByEmail(req, res, next) {
    try {
      let { email } = req.body
      if (email === undefined) {
        throw { name: 'Email is required' }
      }
      validateEmail(email)
      let findUser = await db.collection("users").findOne(
        { email },
        { projection: { password: 0 } }
      )
      if (!findUser) {
        throw { name: 'No user found with this email' }
      }
      return res.status(200).json(findUser)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = UsersController
