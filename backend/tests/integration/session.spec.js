const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('SESSION', ()=>{
    beforeEach( async () => {
        await connection.migrate.latest();

    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Must be able to authenticate an ONG present in the database', async () => {
        const responseOng = await request(app)
        .post('/ongs')
        .send({
            nome: "Ong",
            email: "ong@ong.com",
            whatsapp: "1122223333",
            city: "City",
            uf: "UF"
        });

        const response = await request(app).post('/session').send({
            id: responseOng.body.id
        });

        expect(response.body).toHaveProperty('nome');
        expect(response.body.nome).not.toBeUndefined();
    });
});