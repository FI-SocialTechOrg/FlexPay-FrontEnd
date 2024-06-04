import {TextInput, Button} from "../../elements/Elements";
import loginPicture from '../../assets/login_picture.png';
import logo from '../../assets/flexpay_logo.png';
import './LogIn.css'
function LogIn() {

    const isSmallScreen = window.innerWidth < 800;
    
    return (
        <div className = "login-container">

            <div className = "left-container">
                <img className="logo" src={logo} alt="logo"/>
                <img className="login-picture" src={loginPicture} alt=""/>
            </div>

            <div className = "right-container">

                <form className = "login-form">
                    <div className = "title-container">
                        <h1 className = "login-title">
                            Inicia Sesión
                        </h1>
                        <div className="register-redirect">
                        <p>¿No tienes una cuenta?</p>
                        <a className="link" href="/">Registrate</a>
                    </div>
                    </div>

                    <div className = "login-group">
                        <p className = "textinput-title">
                            Usuario
                        </p>
                        <TextInput
                            type = {'text'}
                            placeholder = {'Ingrese su usuario'}
                        />
                    </div>
                    <div className = "login-group">
                        <p className = "textinput-title">
                            Contraseña
                        </p>
                        <TextInput
                            type = {'text'}
                            placeholder = {'Ingrese su contraseña'}
                        />
                    </div>
                    {isSmallScreen 
                    ? <Button text = {'Iniciar Sesión'} alignment = {'center'}/>
                    : <Button text = {'Iniciar Sesión'} alignment = {'start'}/>
                    }
                </form>
                
            </div>
        </div>
    )
}

export default LogIn;