import { NextPage } from "next";
import { useState } from 'react';
import { executeRequest } from "../services/api";

type RegisterProps = {
    setToken(s:string):void
}

export const Register: NextPage<RegisterProps> = ({setToken}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const doRegister = async () => {
        try {
            setErrorMsg('');
            if (!name || !email || !password || !confirm_password) {
                return setErrorMsg('Favor preencher os campos');
            }

            if (password !== confirm_password) {
                return setErrorMsg('Senhas não são iguais');
            }

            setLoading(true);

            const body = {
                name,
                email,
                password
            }

            const result = await executeRequest('register', 'POST', body);
            if(result && result.data){
                const obj = result.data;
                localStorage.setItem('accessToken', obj.token);
                localStorage.setItem('name', obj.name);
                localStorage.setItem('email', obj.email);
                setToken(obj.token);
                window.location.href = "/"
            }
        } catch (e: any) {
            console.log('Ocorreu erro ao efetuar cadastro:', e);
            if(e?.response?.data?.error){
                setErrorMsg(e?.response?.data?.error);
            }else {
                setErrorMsg('Ocorreu erro ao efetuar cadastro');
            }
        }

        setLoading(false);
    }

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <div className="form">
                {errorMsg && <p>{errorMsg}</p>}
                <div>
                    <img src="/person.svg" alt="Nome" />
                    <input type='text' placeholder="Nome"
                        value={name} onChange={event => setName(event.target.value)}
                    />
                </div>
                
                <div>
                    <img src="/mail.svg" alt="Email" />
                    <input type='email' placeholder="Email"
                        value={email} onChange={event => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <img src="/lock.svg" alt="Senha" />
                    <input type='password' placeholder="Senha"
                        value={password} onChange={event => setPassword(event.target.value)}
                    />
                </div>

                <div>
                    <img src="/lock.svg" alt="Confirmar Senha" />
                    <input type='password' placeholder="Confirmar Senha"
                        value={confirm_password} onChange={event => setConfirmPassword(event.target.value)}
                    />
                </div>

                <button onClick={doRegister} disabled={loading}>{loading ? '...Carregando' : 'Cadastrar'}</button>
                <span>Voltar para o <a className="login" href="/">Login!</a></span>
            </div>
        </div>
    );
}