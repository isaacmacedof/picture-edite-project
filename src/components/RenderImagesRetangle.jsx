import { useState } from 'react';
import PropTypes from 'prop-types';

import { readUser } from '../services/userAPI';
import { v4 as uuidv4 } from 'uuid';
import handleGerarImagemCircle from '../auxiliar/RenderImageCircle'
import '../styles//components/RenderImages.css';

const RenderImages = ({ images }) => {
	const [imagemGerada, setImagemGerada] = useState([]);
	const [foto, setFoto] = useState(null);

	const nameTrue = readUser('user').nameReal
  let title = 'Corretor(a) Autorizado(a)'

  const handleGerarImagem = (pic) => {
		const canvas = document.createElement('canvas');
		canvas.width = 359; // Ajuste conforme necessário
		canvas.height = 359; // Ajuste conforme necessário
		const context = canvas.getContext('2d');

		if (pic.type === 'circle') {
			if (pic.title === 'phone') title = '(21) 98205-1024'
			return handleGerarImagemCircle(pic, foto, nameTrue, title)
				.then((imagemGeradaDataUrl) => {
					const newImage = {
						src: imagemGeradaDataUrl,
						id: uuidv4(),
					};
		
					console.log(newImage);
		
					// Adiciona a nova imagem ao estado
					setImagemGerada((prevImages) => [...prevImages, newImage]);
				})
				.catch((error) => {
					console.error('Erro:', error);
				});
		}
	
		// Carregue a imagem padrão
		const imagemPadrao = new Image();
		imagemPadrao.src = pic.src; // Substitua pelo caminho da sua imagem padrão
		imagemPadrao.onload = () => {
			// Desenhe a imagem padrão no canvas
			context.drawImage(imagemPadrao, 0, 0, 359, 359);
	
			// Carregue a foto da pessoa
			if (foto) {
				const fotoImage = new Image();
        fotoImage.src = URL.createObjectURL(foto);

        fotoImage.onload = () => {
          // Desenhe a foto da pessoa na área retangular superior
          context.drawImage(fotoImage, 0, 0, fotoImage.width, fotoImage.height / pic.format, 0, 0, pic.width, pic.height);

					if(pic.textName === true) {
						context.font = pic.textNameFont; // Ajuste conforme necessário
						context.fillStyle = pic.textNameColor; // Cor do texto
						context.textAlign = pic.textNameAlign;
						context.fillText(nameTrue, canvas.width / 2, canvas.height - pic.textNameHeight);
					}

					if (pic.textTitle === true) {
						context.font = pic.textTitleFont; // Ajuste conforme necessário
						context.fillStyle = pic.textTitleColor; // Cor do texto
						context.textAlign = pic.textTitleAlign;
						context.fillText(title, canvas.width / 2, canvas.height - pic.textTitleHeight);
					}

					// Converta o canvas para um formato de imagem e exiba
					const imagemGeradaDataUrl = canvas.toDataURL('image/png');
					const newImage = {
						src: imagemGeradaDataUrl,
						id: uuidv4(),
					}
					setImagemGerada((prevImages) => [...prevImages, newImage]);
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

	const baixarImagem = (id) => {
		// Cria um link temporário
		let link = document.createElement('a');

		// Define o atributo 'download' com o nome desejado para o arquivo
		link.download = 'minha_imagem.jpg';
		const imagemDownload = imagemGerada.find((e) => e.id === id)

		// Converte a imagem para o formato base64
		let dataUrl = imagemDownload.src;

		// Define o atributo 'href' com os dados da imagem
		link.href = dataUrl;

		// Simula um clique no link para iniciar o download
		link.click();
	}

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
		return
  };

	const handleIterationImages = () => {
		images.forEach((image) => {
      handleGerarImagem(image)
    });
		return
	}

    return (
    <div className='render-pictures'>
      <label>
        Foto: {' '}
    <input type="file" accept="image/*" onChange={handleFotoChange} />
      </label>
			{' '}
      <button onClick={handleIterationImages}>Gerar Imagem</button>
			<div className='images-container'>
			{imagemGerada && imagemGerada.map((item) => (
				<div key={ item.id } className='images-arts'>
					<img src={ item.src } alt="Imagem Gerada" />
					<button id={ item.id } onClick={() => baixarImagem (item.id)}>Baixar foto</button>
				</div>
			))}
			</div>
    </div>
    );
};

RenderImages.propTypes = {
  images: PropTypes.isRequired,
  };

export default RenderImages;