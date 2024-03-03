/* eslint-disable no-undef */
import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { TestingApp } from '../utils/test'

describe('Feedback', () => {
  beforeAll(async () => {
    const mongoDbMemoryServer = await MongoMemoryServer.create()
    const uri = mongoDbMemoryServer.getUri()
    await mongoose.connect(uri)
  })
  afterAll(async () => {
    await mongoose.disconnect()
  })
  describe('get all feedback', () => {
    it('should return all feedback data', async () => {
      const response = await supertest(TestingApp())
        .get('/api/v1/feedback')
        .expect(200)
      expect(Array.isArray(response.body.data)).toBe(true)
      // expect(response.body.data.length).toBe(0)
    })
  })
})
