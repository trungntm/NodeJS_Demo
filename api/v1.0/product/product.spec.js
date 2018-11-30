const app = require('../../../app')
const request = require('supertest')
const product = require('./product')
const mongoose = require('mongoose');



const mockFn = jest.mock('')

beforeAll(() => {
    if(mongoose.connection.readyState === 0) {
        mongoose.connect(uri, { useNewUrlParser: true })
        .then(() => {
             console.log("connect db success ...");
        })
        .catch(err => {
            console.log(err);
        })
    }
})

describe("Test products api", () =>{
    test("GET /products/:id", async () => {
        let _id = '5c00dd56229f24b0dc01f2b8'
        let response = await request(app)
                                .get(`/products/${_id}`);
        console.log(response.text);
        expect(response.statusCode).toBe(200)
    })

    test("POST /products/", async () => {
        const newProduct = {
            "name":"demo3",
            "price":"1000"
        }

        let response = await request(app)
                                .post(`/products`)
                                .send(newProduct);
        console.log(response.text);
        expect(response.statusCode).toBe(201)
    })
})

afterEach(async () => {
    return await request(app).delete(`/products/5c010c7661dedcce0c1ccd4c`)
})

afterAll(async () => {
    return await mongoose.disconnect()
})
