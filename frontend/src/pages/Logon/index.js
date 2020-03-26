import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'


import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import heroesImag from '../../assets/heroes.png'

export default function Logon(){
    const [id, idState] = useState();
    const history= useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('session', { id });
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.nome);
            history.push('profile');
        }catch (err){
            alert('Falha no login, tente novamente.');

        }
    }


    return (
        <div className="logon-conteiner">
            <section className="form">
                <img src={logoImg} alt="Be The Heroes"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => idState( e.target.value )}
                    />
                    <button className="button" type="submit">Entrar</button>
                    
                    
                    <Link className='back-link' to="/register"> 
                        <FiLogIn size={16} color="#e02041"/> 
                        Não tenho cadastro
                    </Link>
                </form>

            </section>
            <img src={heroesImag} alt="Heroes"/>
        </div>
    );
}

// instalar - npm install react-icons