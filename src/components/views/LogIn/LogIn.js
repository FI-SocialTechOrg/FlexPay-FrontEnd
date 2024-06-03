import TextInput from "../../elements/Elements";
import loginPicture from '../../assets/login_picture.png';
import './LogIn.css'
function LogIn() {
    return (
        <div className = "login-container">

            <div className = "left-container">
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
                    
                </form>
                
            </div>
        </div>
    )
}

export default LogIn;