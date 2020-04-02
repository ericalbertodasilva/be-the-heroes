const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('PROFILE', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Must be able to authenticate an ONG and return the list of incidents from the same', async () => {
        const responseOng = await request(app)
        .post('/ongs')
        .send({
            nome: "Ong",
            email: "ong@ong.com",
            whatsapp: "1122223333",
            city: "City",
            uf: "UF"
        });

        const response = await request(app).post('/profile').set({
            'authorization': responseOng.body.id
        });

        expect(response.body).not.toBeUndefined();
    });
});