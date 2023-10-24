const request = require('supertest')
const app = require("../app.js")
const transactionArr = require("../models/transactionData.js")

describe('GET /transactions', () =>{
 it('should return the transaction array', async() =>{
    const response = await request(app).get('/transactions');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(transactionArr)
 })

});

describe('GET /transactions/:id', () => {
    it('should return the specific transaction by ID', async () => {
        
        const transactionId = transactionArr[0].id;
        const response = await request(app).get(`/transactions/${transactionId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(transactionArr.find(transaction => transaction.id === transactionId));
    });

    it('should return a 404 if the transaction is not found', async () => {
        const nonExistentId = 999999; 
        const response = await request(app).get(`/transactions/${nonExistentId}`);

        expect(response.status).toBe(404);
    });
});

describe('POST /transactions', () => {
    it('should create a new transaction and return it', async () => {
        const newTransaction = {
            id: 12345,
            transaction_name: "sample transaction",
            amount: 500,
            date: '2023-10-25',
            from: "John",
            category: 'sample category'
        };

        const response = await request(app).post('/transactions').send(newTransaction);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newTransaction);
    });
});
describe('PUT /transactions/:id', () => {
    it('should update an existing transaction and return it', async () => {
        const transactionId = transactionArr[0].id;
        const updatedTransaction = {
            ...transactionsArr[0],
            item_name: "updated transaction"
        };

        const response = await request(app).put(`/transactions/${transactionId}`).send(updatedTransaction);

        expect(response.status).toBe(200);
        expect(response.body.item_name).toEqual("updated transaction");
    });
});

describe('DELETE /transactions/:id', () => {
    it('should delete an existing transaction', async () => {
        const transactionId = transactionArr[0].id;

        const response = await request(app).delete(`/transactions/${transactionId}`);

        expect(response.status).toBe(200);
        expect(transactionsArr.some(transaction => transaction.id === transactionId)).toBeFalsy();
    })});