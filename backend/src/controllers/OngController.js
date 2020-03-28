const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection');

module.exports = {
    async index(request, reponse) { 
    
        const ongs = await connection('ongs').select('*');
    
        return reponse.json(ongs);
    },

    async create(request, reponse) {
        const {nome, email, whatsapp, city, uf} = request.body;
        
        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf,
        });

        return reponse.json({ id });
    },
};