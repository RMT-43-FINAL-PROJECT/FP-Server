const { db } = require("../configs/mongodb")
const { hashPassword } = require("../helpers/bcryptjs")
const { validateRegister, validateGetUserByEmail } = require("../helpers/validator")

class UsersController {
  static async getAll(req, res, next) {
    try {
      const data = await db.collection("users").find().toArray()
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async checkUniqueEmail(email, res) { // Just for checking email
    try {
      let findUser = await db.collection("users").findOne(
        { email },
        { projection: { password: 0 } }
      )
      return findUser
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  static async register(req, res, next) {
    try {
      let { name, email, password, mobilePhone, address } = req.body
      let checkUnique = await UsersController.checkUniqueEmail(email)
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

  static async getUserByEmail(req, res, next) {
    try {
      let { email } = req.body
      validateGetUserByEmail(email)
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
