require('dotenv').config();
require('dotenv').config();
let chai = require('chai');
let chatHttp = require('chai-http');
let should = chai.should();

chai.use(chatHttp);

describe('Sellers', () => {

    it('GET: Check status 404, getById - seller_id not found', (done) => {
        const seller_id = 203;
        chai.request(process.env.DEFAULT_URL_SERVER)
            .get(`/v1/sellers/${seller_id}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });

    });

    it('GET: Check status 200, getById - seller_id success', (done) => {
        const seller_id = 100;
        chai.request(process.env.DEFAULT_URL_SERVER)
            .get('/v1/sellers/' + seller_id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('POST: Check status 400, Insert - Seller params required', (done) => {
        const seller = {
            seller_id: 2,
            name: "",
            cnpj: "90891366000190",
            bankCode: 33,
            bankAccount: 1000,
            notes: ""
        }

        chai.request(process.env.DEFAULT_URL_SERVER)
            .post('/v1/sellers/')
            .send(seller)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    });

    it('POST: Check status 409, Insert - seller_id exists', (done) => {
        const seller = {
            seller_id: 100,
            name: "BK",
            cnpj: "90891366000190",
            bankCode: 33,
            bankAccount: 1000,
            notes: ""
        }

        chai.request(process.env.DEFAULT_URL_SERVER)
            .post('/v1/sellers/')
            .send(seller)
            .end((err, res) => {
                res.should.have.status(409);
                done();
            })
    });

    // it('POST: Check status 201, Insert - seller success', (done) => {
    //     const seller = {
    //         seller_id: 402,
    //         name: "BkDonalds",
    //         cnpj: "90891366000190",
    //         bankCode: 33,
    //         bankAccount: 1000,
    //         notes: ""
    //     }

    //     chai.request(process.env.DEFAULT_URL_SERVER)
    //         .post('/v1/sellers/')
    //         .send(seller)
    //         .end((err, res) => {
    //             res.should.have.status(201);
    //             done();
    //         });
    // });

    it('PATCH: Check status 404, Update - seller_id not found', (done) => {
        const seller = {
            seller_id: 24,
            name: "BkDonalds",
            cnpj: "90891366000190",
            bankCode: 33,
            bankAccount: 1000,
            notes: ""
        }
        chai.request(process.env.DEFAULT_URL_SERVER)
            .patch(`/v1/sellers/${seller.seller_id}`)
            .send(seller)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    
    it('PATCH: Check status 200, update - Seller success', (done) => {
        const seller = {
            seller_id: 100,
            name: "BkDonalds",
            cnpj: "90891366000190",
            bankCode: 33,
            bankAccount: 1000,
            notes: ""
        }
        chai.request(process.env.DEFAULT_URL_SERVER)
            .patch(`/v1/sellers/${seller.seller_id}`)
            .send(seller)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


});