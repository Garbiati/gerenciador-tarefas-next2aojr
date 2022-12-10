import { NextPage } from "next";

export const Login: NextPage = () => {
    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap"/>
            <div className="form">
                <div>
                    <img src="/mail.svg" alt="Login"/>
                    <input type='text' placeholder="Login" />
                </div>

                <div>
                    <img src="/lock.svg" alt="Senha"/>
                    <input type='password' placeholder="Senha"/>
                </div>

                <button>Login</button>
            </div>
        </div>
    );
}