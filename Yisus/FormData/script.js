function hacerLogin(form)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/CodigosPH2/FormData/rest/login/',
		fd = new FormData(form);

	xhr.open('POST', url, true);

	xhr.onload = function()
	{
		console.log(xhr.responseText);

		//Mostrar responseText en un p. Usando textConent, no interpreta HTML, lo muestra tal cual
		form.parentNode.querySelector('p').textContent = xhr.responseText;

		let obj = JSON.parse(xhr.responseText);

		if (obj.RESULTADO == 'ok')
		{
			sessionStorage['dU'] = xhr.responseText;
			
		}
	};

	xhr.send(fd);

	return false;
}


function mostrarFoto(input)
{
	let fr = new FileReader();

	fr.onload = function()
	{
		input.parentNode.querySelector('img').src = fr.result;
		input.parentNode.querySelector('img').alt = input.files[0].name;
	};

	fr.readAsDataURL(input.files[0]);
}

function enviarFoto(btn)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/CodigosPH2/FormData/rest/foto/',
		dU = JSON.parse(sessionStorage['dU']),
		fd = new FormData();

	fd.append('login', dU.login);
	fd.append('id_entrada', 1);
	fd.append('texto', btn.parentNode.querySelector('textarea').value);
	fd.append('foto', btn.parentNode.querySelector('[type=file]').files[0]);

	xhr.open('POST', url, true);

	xhr.onload = function()
	{
		console.log(xhr.responseText);
	};

	xhr.setRequestHeader('Authorization', dU.clave);
	xhr.send(fd);
}