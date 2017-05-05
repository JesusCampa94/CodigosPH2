function mostrarMensaje()
{
	let capaFondo = document.createElement('div'),
		capaFrente = document.createElement('article'),
		texto = document.querySelector('body>input[name="mensaje"]').value,
		html = '';

		capaFondo.appendChild(capaFrente);

		html += '<h2>Muy buenas</h2>';
		html += '<p>' + texto + '</p>';
		html += '<button onclick="this.parentNode.parentNode.remove();">Cerrar</button>';
		
		capaFrente.innerHTML = html;
		capaFondo.classList.add('capa-fondo');
		capaFrente.classList.add('capa-frente');

		document.body.appendChild(capaFondo);
}