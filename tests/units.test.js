import { objectToCsv } from '../routes/utils.js'
import { isCSV } from './helpers.js'
import { getUsers } from '../routes/db.js'

describe('Unit test - objectToCsv method', () => {
    test("test utils.objectToCsv method", () => {
        let testData = [
            {
                "id": 1,
                "forename": "Roy",
                "surname": "Fielding"
            },{
                "id": 2,
                "forename": "Tim",
                "surname": "Berners-Lee"
            }
        ]

        const csvData = objectToCsv(testData)
        expect(isCSV(csvData)).toBe(true)
    })
})

describe('Unit test - getUsers method', () => {
    let data = getUsers()

    test("test db.getUsers method return value in JSON format", () => {
        expect(Array.isArray(data)).toBe(true)
    })

    test("each element should be an object with the correct keys", () => {
        for( const user of data ) {
            expect(typeof user).toBe('object')
            expect(user).toHaveProperty('id')            
            expect(user).toHaveProperty('forename')            
            expect(user).toHaveProperty('surname')            
        }
    })

    test("users IDs shoul be numbers", () => {
        for( const user of data ) {
            expect(typeof user.id).toBe('number')
        }
    })

})

describe('Unit test - getUsers method togather with objectToCsv method', () => {
    test("Some explanation here", () => {
        let data = getUsers()
        let csvData = objectToCsv(data)
        expect(isCSV(csvData)).toBe(true)
    })
})