export default function handleGerarImagemCircle(pic, foto, nameTrue, title) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = 359; // Ajuste conforme necessário
    canvas.height = 359; // Ajuste conforme necessário
    const context = canvas.getContext('2d');

    context.fillStyle = 'white'; // Cor do fundo
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Carregue a imagem padrão com o círculo branco
    const imagemPadrao = new Image();
    imagemPadrao.src = pic.src; // Substitua pelo caminho da sua imagem padrão

    imagemPadrao.onload = () => {
      // Desenhe a imagem padrão no canvas
      context.drawImage(imagemPadrao, 0, 0, 359, 359);

      // Carregue a foto da pessoa
      const fotoImage = new Image();
      fotoImage.src = URL.createObjectURL(foto);

      fotoImage.onload = () => {
        // Salve o estado atual do contexto
        context.save();

        const centerX = pic.centerX;
        const centerY = pic.centerY;

        // Crie um caminho circular
        context.beginPath();
        context.arc(centerX, centerY, pic.rayArc, 0, pic.endAngle);
        context.closePath();

        // Recorte a área do caminho circular
        context.clip();

        // Desenhe a foto da pessoa na área recortada
        context.drawImage(fotoImage, centerX - pic.rayArc, centerY - pic.rayArc, pic.rayArc * 2, pic.rayArc * 2);

        // Restaure o contexto para que futuros desenhos não sejam afetados
        context.restore();

        console.log('Configurações de Fonte:', pic.textNameFont);
        context.font = pic.textNameFont;
        console.log('Fonte Atual:', context.font);
        context.fillStyle = pic.textNameColor;
        context.textAlign = pic.textNameAlign;
        context.fillText(nameTrue, canvas.width - pic.textNameWidth, canvas.height - pic.textNameHeight);

        context.font = pic.textTitleFont;
        context.fillStyle = pic.textTitleColor;
        context.textAlign = pic.textTitleAlign;
        context.fillText(title, canvas.width - pic.textNameWidth, canvas.height - pic.textTitleHeight);

        // Converta o canvas para um formato de imagem
        const imagemGeradaDataUrl = canvas.toDataURL('image/png');

        // Resolva a promessa com a imagem gerada
        resolve(imagemGeradaDataUrl);
      };

      fotoImage.onerror = (error) => {
        // Rejeite a promessa se houver um erro ao carregar a foto
        reject(error);
      };
    };

    imagemPadrao.onerror = (error) => {
      // Rejeite a promessa se houver um erro ao carregar a imagem padrão
      reject(error);
    };
  });
}

