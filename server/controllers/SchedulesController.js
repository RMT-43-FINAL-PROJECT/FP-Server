const { db } = require("../configs/mongodb")
const { ObjectId } = require('mongodb')

class SchedulesController {
  static async getAllschedules(req, res, next) {
    try {
      const data = await db.collection("schedules").find().toArray()
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async findStore(storeId) {
    let findStoreByID = await db.collection("stores").findOne(
      { _id: new ObjectId(storeId) }
    )
    return findStoreByID
  }

  static async findUser(userId) {
    let findUserByID = await db.collection("users").findOne(
      { _id: new ObjectId(userId) }
    )
    return findUserByID
  }

  static async findExistingSchedule(storeId, userId, time) {
    let existingSchedule = await db.collection("schedules").findOne({
      storeId: new ObjectId(storeId),
      userId: new ObjectId(userId),
      time: new Date(time)
    })
    return existingSchedule
  }

  static async createSchedules(req, res, next) {
    try {
      let { storeId, userId, time } = req.body
      if (!storeId) {
        throw { name: "Store ID is required" }
      }
      if (!userId) {
        throw { name: "User/Sales ID is required" }
      }
      if (!time) {
        throw { name: "Schedule time is required" }
      }
      let storeExist = await SchedulesController.findStore(storeId)
      if (!storeExist) {
        throw { name: 'No store found with this ID' }
      }
      let userExist = await SchedulesController.findUser(userId)
      if (!userExist) {
        throw { name: 'No user found with this ID' }
      }
      let existingSchedule = await SchedulesController.findExistingSchedule(storeId, userId, time)
      if (existingSchedule) {
        throw { name: "Schedule already exists" }
      }
      let rawData = {
        storeId: new ObjectId(storeId),
        userId: new ObjectId(userId),
        time: new Date(time),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await db.collection("schedules").insertOne(rawData)
      res.status(201).json(rawData)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  // static async template(req, res, next) {
  //   try {
  //     const data = `template`
  //     res.status(200).json(data)
  //   } catch (error) {
  //     console.log(error)
  //     next(error)
  //   }
  // }
}

module.exports = SchedulesController
