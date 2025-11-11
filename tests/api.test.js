import request from 'supertest'
import app from '../apicalls.js'

describe('Test GET with the path /users', () => {
    test("Response to the GET", async () => {
        const response = await request(app)
            .get("/users")
        
            expect(response.status).toEqual(200)
            expect(response.headers['content-type']).toMatch(/json/)
    })
})

describe('Test POST with the path /users', () => {
    test("Response to the POST with acceptable data", async () => {
        const newUser = { "forename": "New", "surname": "User" }
        const response = await request(app)
            .post("/users")
            .send(newUser)
            .set('content-type', 'application/json')
            expect(response.status).toEqual(201)
        
        const addedUser = await request(app)
            .get("/users/3")
            expect(addedUser.status).toEqual(200)
            expect(addedUser.headers['content-type']).toMatch(/json/)
            expect(addedUser.body.forename).toEqual(newUser.forename)            
        
    })
})

describe('Test POST with the path /users', () => {
    test("Response to the POST with not acceptable data", async () => {
        const newUser = { "firstname": "New", "surname": "User" }
        const response = await request(app)
            .post("/users")
            .send(newUser)
            .set('content-type', 'application/json')
            expect(response.status).toEqual(422)
    })
})