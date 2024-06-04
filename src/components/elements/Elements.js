import './ElementsStyles.css'
import { Link } from "react-router-dom";

function TextInput({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="text-input"
    />
  );
}

function Button({ text, alignment}) {
  return (
  <button 
    className="colored-button"
    type="submit"
    style={{alignSelf: alignment}}
    > {text} </button>);
}

function RadioButton({ text, name, value, onChange }) {
  return (
    <label className="radio-button">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={value === 'client'}
      />
      {text}  
    </label>
  );
}

function CustomLink({ text, href, alignment }) {
  return (
    
    <Link className="link" 
      to = {href}
      style={{alignSelf: alignment}}
    > {text} 
    </Link>
  );
}

export { TextInput, Button, RadioButton, CustomLink };