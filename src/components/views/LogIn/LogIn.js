import TextInput from "../../elements/Elements";
import './LogIn.css'
function LogIn() {
    return (
        <div className = "login-container">

            <div className = "left-container">

                
            </div>

            <div className = "right-container">
                <div className = "title-container"></div>

                <form className = "login-form">
                    <p className = "textinput-title">
                        Usuario
                    </p>
                    <TextInput
                        type = {'text'}
                        placeholder = {'Ingrese su usuario'}
                    ></TextInput>
                    <p className = "textinput-title">
                        Contraseña
                    </p>
                    <TextInput
                        type = {'text'}
                        placeholder = {'Ingrese su contraseña'}
                    ></TextInput>
                </form>
                
            </div>
        </div>
    )
}

export default LogIn;