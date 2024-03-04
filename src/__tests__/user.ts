/* eslint-disable no-undef */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { TestingApp } from '../utils/test'
const UserRoute = '/api/v1/user'

describe('User', () => {
  beforeAll(async () => {
    const mongoDbMemoryServer = await MongoMemoryServer.create()
    const uri = mongoDbMemoryServer.getUri()
    await mongoose.connect(uri)
  })
  afterAll(async () => {
    await mongoose.disconnect()
  })
  describe('Manage All User API Test', () => {
    it('Should retune all user data', async () => {
      const { body } = await supertest(TestingApp())
        .get(`${UserRoute}/all-user`)
        .expect(200)
      expect(body.statusCode).toEqual(200)
      expect(Array.isArray(body.data)).toBe(Array.isArray([]))
    })
  })
  // describe('Details User API Test', () => {
  //   it('Should Retune of a specific Data Entry', async () => {
  //     const id = '65d4792b7c1dca7ce6e93212'
  //     const { body } = await supertest(TestingApp())
  //       .get(`${UserRoute}/${id}`)
  //       .expect(200)
  //     expect(body.success).toEqual(true)
  //   })
  // })
  // describe('Details User By Email API Test', () => {
  //   it('Should Retune of a specific Data Entry', async () => {
  //     const email = 'saif@gmail.com'
  //     const { body } = await supertest(TestingApp())
  //       .get(`${UserRoute}/${email}`)
  //       .expect(200)
  //     expect(body.success).toEqual(true)
  //   })
  // })
  describe('Delete Feedback API Test', () => {
    it('Should delete a specific data entry', async () => {
      const id = '65d4792b7c1dca7ce6e93212'
      const { body } = await supertest(TestingApp())
        .delete(`${UserRoute}/${id}`)
        .expect(204)
      expect(body).toEqual({})
    })
  })
})
