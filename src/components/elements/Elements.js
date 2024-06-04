import './ElementsStyles.css'

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

export { TextInput, Button };