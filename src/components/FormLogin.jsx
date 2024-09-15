import { Component } from 'react';
import PropTypes from 'prop-types';
import { allConts } from '../services/acconts';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import bonecoUser from '../images/boneco-login.png';
import bonecoPassword from '../images/cadeado-login.png';

class FormLogin extends Component {
  state = {
    usuario: '',
    password: '',
    buttonDis: true,
    loading: false,
  };

  componentDidUpdate() {
    this.itsButtonDisabled();
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  itsButtonDisabled = () => {
    const {
      usuario,
      password,
      buttonDis,
    } = this.state;
    const MIN_VALUE_CARACTER = 3;
    const conditions = [
      usuario.length <= MIN_VALUE_CARACTER,
      password.length <= MIN_VALUE_CARACTER,
    ];

    const verificate = conditions.some((condition) => condition);

    if (buttonDis !== verificate) {
      this.setState({ buttonDis: !buttonDis });
    }
  };

  itsButtonClicked = async () => {
    const {
      usuario,
      password,
    } = this.state;

    const isNameTrue = allConts.some((cont) => cont.name === usuario);
    const loginUsuary = allConts.find((cont) => cont.name === usuario && cont.password === password);

    const { navigate } = this.props;
    this.setState({
      loading: true,
    });
    this.setState({
      loading: false,
    });
    const isPasswordTrue = allConts.some((cont) => cont.password === password);
    if (!isNameTrue || !isPasswordTrue) {
      alert('Usuário não encontrado ou senha incorreta');
    } else {
      await createUser(loginUsuary);
      navigate('/home');
    }
  };

  itsButtonClickedRegister = async () => {
    const { navigate } = this.props;
    return navigate('/register');
  }

  render() {
    const {
      usuario,
      buttonDis,
      loading,
      password,
    } = this.state;
    return loading ? (<Loading />) : (
      <div data-testid="page-login" className='form-login'>
        <form>
          <div className='div-logo-ch'>
          </div>
          <div className='input-box'>
            <input type="text" name="usuario" value={ usuario } placeholder='Usuário' onChange={ this.onInputChange } />
            <img className='vetor-login' src={ bonecoUser } alt='Imagem Bonequinho'></img>
          </div>
          <div className='input-box'>
            <input type="password" name="password" value={ password } placeholder='Senha' onChange={ this.onInputChange } />
            <img className='vetor-login' src={ bonecoPassword } alt='Imagem Cadeado' ></img>
          </div>
          <div className='remember'>
              <label>
                <input type="checkbox"/>
                {' '}Lembrar-me
              </label>
              <a className='link-login' href="/forgot-password">Esqueci a senha</a>
          </div>
          <button
            type="button"
            className='login-btn'
            data-testid="login-submit-button"
            disabled={ buttonDis }
            onClick={ this.itsButtonClicked }
          >
            Acessar
          </button>
          <br />
          <div className='register-link'>
            Não é cadastrado?
            {' '}
            <button>
              <a className='link-login bolt' onClick={ this.itsButtonClickedRegister }>Cadastrar</a>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

FormLogin.propTypes = {
  navigate: PropTypes.func.isRequired,
  }.isRequired;

export default FormLogin;