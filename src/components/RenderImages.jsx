import { useState } from 'react';
import PropTypes from 'prop-types';

import { readUser } from '../services/userAPI';
import '../styles/RenderImages.css';

const RenderImages = ({ image }) => {
	const [imagemGerada, setImagemGerada] = useState(null);
	const [foto, setFoto] = useState(null);

	const nameTrue = readUser('user').nameReal
  const title = 'Corretor(a) Autorizado(a)'

  const handleGerarImagem = () => {
		const canvas = document.createElement('canvas');
		canvas.width = 359; // Ajuste conforme necessário
		canvas.height = 359; // Ajuste conforme necessário
		const context = canvas.getContext('2d');
	
		// Carregue a imagem padrão com o círculo branco
		const imagemPadrao = new Image();
		imagemPadrao.src = image; // Substitua pelo caminho da sua imagem padrão
		imagemPadrao.onload = () => {
			// Desenhe a imagem padrão no canvas
			context.drawImage(imagemPadrao, 0, 0, 359, 359);
	
			// Carregue a foto da pessoa
			if (foto) {
			const fotoImage = new Image();
      fotoImage.src = URL.createObjectURL(foto);

      fotoImage.onload = () => {
        // Salve o estado atual do contexto
        context.save();

				const centerX = (canvas.width) / 2;
				const centerY = (canvas.height - 123) / 2;

        // Crie um caminho circular
        context.beginPath();
        context.arc(centerX, centerY, 85, 0, Math.PI * 2);
        context.closePath();

        // Recorte a área do caminho circular
        context.clip();

        // Desenhe a foto da pessoa na área recortada
        context.drawImage(fotoImage, centerX - 85, centerY - 85, 170, 170);

        // Restaure o contexto para que futuros desenhos não sejam afetados
        context.restore();

					context.font = '20px Quicksand'; // Ajuste conforme necessário
					context.fillStyle = 'Black'; // Cor do texto
					context.textAlign = 'center';
					context.fillText(nameTrue, canvas.width / 2, canvas.height - 115);

					context.font = '12px Quicksand'; // Ajuste conforme necessário
					context.fillStyle = 'Black'; // Cor do texto
					context.textAlign = 'center';
					context.fillText(title, canvas.width / 2, canvas.height - 100);

					// Converta o canvas para um formato de imagem e exiba
					const imagemGeradaDataUrl = canvas.toDataURL('image/png');
					setImagemGerada(imagemGeradaDataUrl);
				};
	
				fotoImage.onerror = (error) => {
					console.error('Erro ao carregar foto:', error);
				};
			}
		};
	
		imagemPadrao.onerror = (error) => {
			console.error('Erro ao carregar imagem padrão:', error);
		};
	};

	const baixarImagem = () => {
		// Cria um link temporário
		let link = document.createElement('a');

		// Define o atributo 'download' com o nome desejado para o arquivo
		link.download = 'minha_imagem.jpg';

		// Converte a imagem para o formato base64
		let dataUrl = imagemGerada;

		// Define o atributo 'href' com os dados da imagem
		link.href = dataUrl;

		// Simula um clique no link para iniciar o download
		link.click();
	}

	const loopIterations = [
		foto,
		foto,
		foto,
		foto,
		foto,
		foto,
	]

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
  };
    return (
    <div className='render-pictures'>
      <label>
        Foto: {' '}
    <input type="file" accept="image/*" onChange={handleFotoChange} />
      </label>
			{' '}
      <button onClick={handleGerarImagem}>Gerar Imagem</button>
			<div className='images-container'>
			{imagemGerada && loopIterations.map((item) => (
				<div key={item} className='images-arts'>
					<img src={imagemGerada} alt="Imagem Gerada" />
					<button onClick={baixarImagem}>Baixar foto</button>
				</div>
			))}
			</div>
    </div>
    );
};

RenderImages.propTypes = {
  image: PropTypes.string.isRequired,
  };

export default RenderImages;
