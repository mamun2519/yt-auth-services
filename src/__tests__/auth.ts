/* eslint-disable no-undef */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { TestingApp } from '../utils/test'
const authRoute = '/api/v1/auth'
describe('Authentication', () => {
  beforeAll(async () => {
    const mongoDbMemoryServer = await MongoMemoryServer.create()
    const uri = mongoDbMemoryServer.getUri()
    await mongoose.connect(uri)
  })
  afterAll(async () => {
    await mongoose.disconnect()
  })
  describe('User SingUp API Test', () => {
    it('should register a new user', async () => {
      const signupData = {
        name: 'mamun Islam',
        email: 'mamun@gmail.com',
      }
      const { body } = await supertest(TestingApp())
        .post(`${authRoute}/signin`)
        .send(signupData)
        .set('Accept', 'application/json')
        .expect(200)
      expect(body.data.user.email).toEqual(signupData.email)
      expect(body.data.token).toHaveProperty('accessToken')
      expect(body.data.token).toHaveProperty('refreshToken')
      expect(body.data.user.role).toBe('user')
    })
  })
})
