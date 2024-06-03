import './ElementsStyles.css'
export default function TextInput({ type, placeholder }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="text-input"
      />
    );
  }