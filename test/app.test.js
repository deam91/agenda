const expect = require('chai').expect;
const nock = require('nock');
const axios = require('axios');
const request = require('http');

describe('First test', () => {
    it('Should assert true to be true', () => {
        expect(true).to.be.true;
    });
});

function getUser() {
    return axios
        .get(`http://localhost:3000/start`)
        .then(res => res.data)
        .catch(error => console.log(error));
}

describe('Get users tests', () => {
    it('Get users', () => {
        request.get(`http://localhost:3000/start`,res => {
            //console.log(res);
            expect(res.statusCode).to.equal(200);
        });
    });
});
