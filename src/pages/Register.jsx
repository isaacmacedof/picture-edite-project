import FormRegister from "../components/FormRegister";
import { useNavigate } from "react-router-dom";
import '../styles/pages/Register.css';

function Register() {
  const navigate = useNavigate();
  return (
    <div className="register">
      <FormRegister navigate={navigate}/>
    </div>
  );
}

export default Register;