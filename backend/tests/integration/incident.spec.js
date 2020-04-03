const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', () => {
    beforeEach( async () => {
        await connection.migrate.latest();
        
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Must be able to register an authenticated ONG incident', async () => {
        const responseOng = await request(app)
        .post('/ongs')
        .send({
            nome: "Ong",
            email: "ong@ong.com",
            whatsapp: "1122223333",
            city: "City",
            uf: "UF"
        });

        const response = await request(app)
        .post('/incidents')
        .send({
            title: "Incident",
            description: "Description to incident the ONG",
            value: "100"
        }).set({
            'authorization': responseOng.body.id
        });

        expect(response.body.id).not.toBeUndefined();
    });

    it('Must be able to bring a list of certified ONG incidents', async () => {
        const responseOng = await request(app)
        .post('/ongs')
        .send({
            nome: "Ong",
            email: "ong@ong.com",
            whatsapp: "1122223333",
            city: "City",
            uf: "UF"
        });

        await request(app)
        .post('/incidents')
        .send({
            title: "Incident 1",
            description: "Description to incident the ONG",
            value: "100"
        }).set({
            'authorization': responseOng.body.id
        });

        await request(app)
        .post('/incidents')
        .send({
            title: "Incident 2",
            description: "Description to incident the ONG",
            value: "100"
        }).set({
            'authorization': responseOng.body.id
        });

        const response = await request(app)
        .get('/incidents').set({
            'authorization': responseOng.body.id
        });
        
        expect(response.body).not.toBeUndefined();
    });

    it('Must be able to delete an incident from the authenticated ONG', async () => {
        const responseOng = await request(app)
        .post('/ongs')
        .send({
            nome: "Ong",
            email: "ong@ong.com",
            whatsapp: "1122223333",
            city: "City",
            uf: "UF"
        });

        const responseIncident = await request(app)
        .post('/incidents')
        .send({
            title: "Incident 1",
            description: "Description to incident the ONG",
            value: "100"
        }).set({
            'authorization': responseOng.body.id
        });

        const response = await request(app)
        .delete(`/incidents?id=${responseIncident.body.id}`).set({
            'authorization': responseOng.body.id
        });
        
        expect(204);
    });
});