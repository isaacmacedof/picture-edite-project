import FormLogin from "../components/FormLogin";
import { useNavigate } from "react-router-dom";
import '../styles/pages/Login.css';

function Login() {
  const navigate = useNavigate();
  return (
    <div className="login">
      <FormLogin navigate={navigate}/>
    </div>
  );
}

export default Login;