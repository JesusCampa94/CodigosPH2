function mostrarEntradas(form)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/CodigosPH2/JS/rest/entrada/',
		section = form.parentNode.parentNode;

	url += '?pagina=' + form.pagina.value + '&longPagina=' + form.longPagina.value;

	xhr.open('GET', url, true);

	xhr.onload = function()
	{
		console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		console.log(obj);

		if (obj.RESULTADO == 'ok')
		{
			let html = '';

			for (let i = 0; i < obj.FILAS.length; i++)
			{
				let e = obj.FILAS[i],
					foto = 'http://localhost/CodigosPH2/JS/fotos/' + e.fichero;

				html += '<article>';
				html += 		'<h3>' + e.nombre + '</h3>';
				html += 			'<div>';
				html += 				'<img src="' + foto + '" alt="' + e.descripcion_foto + '">';
				html += 				'<p>' + e.descripcion + '</p>';
				html +=			'</div>';
				html +=			'<footer>';
				html += 				'<p>' + e.autor + '</p>';
				html +=				'<time datetime="' + e.fecha + '">' + e.fecha + '</time>'; //FORMATEAR FECHA
				html += 				'<p>' + e.nfotos + ' fotos</p>';
				html += 				'<p>' + e.comentarios + ' comentarios</p>';
				html += 			'</footer>';
				html += 	'</article>';
			} //Bucle for

			section.querySelector('section>div').innerHTML = html;
		}
	};

	xhr.send();

	return false;
}