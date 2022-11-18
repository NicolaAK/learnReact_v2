import React, { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthCotext } from '../context'

function Login() {
    const { isAuth, setIsAuth } = useContext(AuthCotext)
    const login = event => {
        event.prevenDefault();
        setIsAuth(true)
    }
    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder='Введите логин' />
                <MyInput type="text" placeholder='Введите пароль' />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    )
}

export default Login