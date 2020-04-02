const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=>{
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        
    });

    afterAll(async ()=>{
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            nome: "Ong",
            email: "ong@ong.com",
            whatsapp: "1122223333",
            city: "City",
            uf: "UF"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('You should be able to bring a list of all ONGs', async () => {
        
        await request(app)
        .post('/ongs')
        .send({
            nome: "Ong 1",
            email: "ong1@ong1.com",
            whatsapp: "1122223333",
            city: "City",
            uf: "UF"
        });

        const response = await request(app).get('/ongs');
        
        expect(response.body).not.toBeNull();
        expect(response.body.length).not.toBeNull();
    });
});