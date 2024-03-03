/* eslint-disable no-undef */
import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { TestingApp } from '../utils/test'

const FeedBackRoute = '/api/v1/feedback'
describe('Feedback', () => {
  beforeAll(async () => {
    const mongoDbMemoryServer = await MongoMemoryServer.create()
    const uri = mongoDbMemoryServer.getUri()
    await mongoose.connect(uri)
  })
  afterAll(async () => {
    await mongoose.disconnect()
  })
  describe('Get all feedback', () => {
    it('should return all feedback data', async () => {
      const response = await supertest(TestingApp())
        .get('/api/v1/feedback')
        .expect(200)
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.data.length).toEqual(0)
    })
  })
  describe('Create feedback Data', () => {
    it('Should Create A New FeedBack Data', async () => {
      const data = {
        reason: 'I Need Change My Profile Name',
        email: 'mamun@gmail.com',
        massage: 'Please need name',
      }
      const response = await supertest(TestingApp())
        .post(FeedBackRoute)
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
      expect(response.body.data).toHaveProperty('_id')
      expect(response.status).toBe(200)
      expect(response.body.data.email).toBe(data.email)
    })
  })

  describe('Details FeedBack API', () => {
    it('should return details of a specific data entry', async () => {
      const id = '65d9ad4b64027dd4a3980dff'
      const response = await supertest(TestingApp())
        .get(`${FeedBackRoute}/${id}`)
        .expect(200)
      expect(response.body.success).toBe(true)
    })
  })
  describe('Delete Feedback API Test', () => {
    it('Should delete a specific data entry', async () => {
      const id = '65d9ad4b64027dd4a3980dff'
      const { body } = await supertest(TestingApp())
        .delete(`${FeedBackRoute}/${id}`)
        .expect(204)
      expect(body).toEqual({})
    })
  })
  describe('Update Feedback API', () => {
    it('should update a specific data entry', async () => {
      const id = '65d9ad4b64027dd4a3980dff'
      const data = {
        email: 'mamun234@gmail.com',
      }
      const { body } = await supertest(TestingApp())
        .patch(`${FeedBackRoute}/${id}`)
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
      expect(body.data).toEqual(body.data)
    })
  })
})
