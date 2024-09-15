import { Component } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import bonecoUser from '../images/boneco-login.png';
import bonecoPassword from '../images/cadeado-login.png';
import { insertUser } from '../services/userAPI';

class FormRegister extends Component {
	state = {
		usuario: '',
		password: '',
		nameReal: '',
		telefone: '',
		email: '',
		unidade: '',
		termos: false,
		buttonDis: true,
	}

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
			nameReal,
			telefone,
			email,
			unidade,
			termos,
      buttonDis,
    } = this.state;
    const MIN_VALUE_CARACTER = 3;

		const validEmail = /\S+@+\w+\.+[c]+[o]+[m]/;

    const conditions = [
      usuario.length <= MIN_VALUE_CARACTER,
      password.length <= MIN_VALUE_CARACTER,
			nameReal.length <= MIN_VALUE_CARACTER,
			validEmail.test(email) === false,
			telefone.length <= MIN_VALUE_CARACTER,
			unidade === 'Selecione',
			termos === false,
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
			nameReal,
			telefone,
			email,
			unidade,
		} = this.state;

    const loginUsuary = {
        name: usuario,
        password,
        nameReal,
        telefone,
        email,
        unidade,
    };
		const { navigate } = this.props;
    // Realize a operação assíncrona antes do redirecionamento
    try {
        // Supondo que createUser é uma operação assíncrona
        await insertUser(loginUsuary);
        // Após a conclusão da operação, redirecione para a próxima página
        navigate('/');
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
	}

	telNumber = () => {
		const { telefone } = this.state;
		const telInScreen = telefone.length >= 1 && telefone !== "(__) ____-_____" ? true : false
		return telInScreen;
	}

  render() {
		const {
			usuario,
			password,
			nameReal,
			telefone,
			email,
			unidade,
			termos,
			buttonDis,
		} = this.state;

		const listOfUnidades = [
			'Centro',
			'Norte',
			'Sul',
			'Leste',
			'Oeste',
		];

    return (
      <div data-testid="page-login" className='form-login'>
        <form>
          <div className='div-logo-ch'>
          </div>
					<div className='text-in-register space-padding-top'>
						<h3>Dados de Acesso</h3>
					</div>
					<div className='group-date-acess'>
						<div className='input-box no-padding-top'>
							<input type="text" name="usuario" value={ usuario } placeholder='Usuário' onChange={ this.onInputChange } />
							<img className='vetor-login' src={ bonecoUser } alt='Imagem Bonequinho'></img>
						</div>
						<div className='input-box'>
							<input type="password" name="password" value={ password } placeholder='Senha' onChange={ this.onInputChange } />
							<img className='vetor-login' src={ bonecoPassword } alt='Imagem Cadeado' ></img>
						</div>
					</div>
					<div className='text-in-register'>
						<h3>Dados Pessoais</h3>
					</div>
					<div className='input-box'>
						<input type="text" name="nameReal" value={ nameReal } placeholder='Nome' onChange={ this.onInputChange } />
					</div>
					<div className='input-box'>
						<InputMask
              mask="(99) 99999-9999"
              maskPlaceholder="Telefone"
              alwaysShowMask={ this.telNumber() }
							value={ telefone }
							onChange={ this.onInputChange }
            >
              {() => (
                <input type="tel" name="telefone" placeholder='Telefone' />
              )}
            </InputMask>
					</div>
					<div className='input-box'>
							<input type='email' name="email" value={ email } placeholder='E-Mail' onChange={ this.onInputChange } />
					</div>
					<div className='input-box'>
						<select className='select-styled' id="selecao" name="unidade" value={ unidade } onChange={ this.onInputChange }>
							<option value="" disabled selected hidden>Selecione a sua unidade</option>
							{listOfUnidades.map((unidade) => (
								<option key={ unidade } value={ unidade }>{ `Unidade: ${unidade}` }</option>
							))}
						</select>
					</div>
          <button
            type="button"
            className={`${buttonDis ? 'disabled-btn' : 'login-btn-register'}`}
            data-testid="login-submit-button"
            disabled={ buttonDis }
            onClick={ this.itsButtonClicked }
          >
            Cadastrar
          </button>
          <br />
          <div className='register-link'>
						<label>
							<input type="checkbox" name="termos" value={ termos } onChange={ this.onInputChange }/>
							{' '}Aceito os termos de uso
						</label>
          </div>
        </form>
      </div>
    );
  }
}

FormRegister.propTypes = {
  navigate: PropTypes.func.isRequired,
  }.isRequired;

export default FormRegister;
