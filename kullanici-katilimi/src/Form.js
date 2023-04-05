import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().min(10).required(),
                termsAccepted: Yup.boolean().oneOf([true], "Kullanıcı sözleşmesini kabul etmeniz gerekmektedir")
            });

            await schema.validate({
                name,
                email,
                password,
                termsAccepted,
            });

            console.log('Form Basariyla Gonderildi');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                İsim:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <br />
            <label>
                Şifre:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <br />
            <label>
                Kullanım Şartları:
                <input type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} />
            </label>
            <br />
            <button type="submit">Gönder</button>
        </form>
    );
};

export default Form;
