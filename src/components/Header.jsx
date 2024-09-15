import { useState, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';
import botaoMenu from '../images/botao-aba-lateral.png';
import botaoUser from '../images/botao-user-reader.png';
import { readUser } from '../services/userAPI';
import '../styles/components/Header.css';

function Header({ onToggleSidebar }) {
	const user = readUser().nameReal;
	const firstName = user.split(' ')[0];

	//const handleMenu = () => {
	//	const menu = document.querySelector('.sidebar');
  //	const main = document.querySelector('.images-container');

  //	const currentMarginLeft = window.getComputedStyle(main).marginLeft;
  //	const newMarginLeft = currentMarginLeft === "0px" ? "20%" : "0px";

  //	main.style.marginLeft = newMarginLeft;
  //	menu.style.left = menu.style.left === "0px" ? "-30%" : "0px";
  //	menu.classList.toggle('active');
	
	// Droppdown menu 

	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const toggleMenu = () => {
		console.log(isOpen);
		
    setIsOpen(!isOpen);
  };
	const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

	useEffect(() => {
    if (isOpen) {
      dropdownRef.current.classList.add('show');
    } else {
      dropdownRef.current.classList.remove('show');
    }
  }, [isOpen]);

	// Droppdown menu end

  return (
		<header className="header">
			<div className="header-left">
				<div className='header-button'>
					<button className="button-header" onClick={ onToggleSidebar }>
						<img src={ botaoMenu } alt="logo" className="logo-header" />
					</button>
				</div>
				<div>
					<a href="/home">
					</a>
				</div>
			</div>
			<div className="header-right">
				<img src="https://avatars.githubusercontent.com/u/81826844?v=4" alt="avatar" className="avatar-header" />
				<p className="user-name">{ `Olá, `}<span className="bold-first-name">{ firstName }</span></p>
				<button onClick={ toggleMenu } className='button-user-header'>
					<img src={ botaoUser } alt="logo" className="logo-header" />
				</button>
				<div className="dropdown" style={{ display: isOpen ? 'show' : '' }}>
					<nav ref={ dropdownRef } className="dropdown-content">
						<ul>
							<li><a href="#">Perfil</a></li>
							<li><a href="#">Sair</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
  );
}

Header.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Header;
