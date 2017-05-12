function iniciarDragNDrop()
{
	//Zona dragabble
	let imagenes = document.querySelectorAll('body>footer>img');

	for (let i = 0; i < imagenes.length; i++)
	{
		imagenes[i].setAttribute('dragabble', 'true');
		imagenes[i].id = 'img' + i;

		imagenes[i].ondragstart = function (e)
		{
			e.dataTransfer.setData('text/plain', imagenes[i].id);
		};
	}

	//Zona droppable
	let cv = document.getElementById('cv01');

	cv.ondragover = function (e)
	{
		e.preventDefault();
		e.stopPropagation();

		let x = e.offsetX,
			y = e.offsetY,
			dim = cv.width/3,
			fila = Math.floor(y/dim),
			columna = Math.floor(x/dim),
			cx = cv.getContext('2d');

		dibujarCuadricula();
		cx.beginPath();
		cx.strokeStyle = '#FAC';
		cx.lineWidth = 2;
		cx.strokeRect(columna*dim, fila*dim, dim, dim);

	};

	cv.ondrop = function (e)
	{
		e.preventDefault();
		e.stopPropagation();

		let x = e.offsetX,
			y = e.offsetY,
			dim = cv.width/3,
			fila = Math.floor(y/dim),
			columna = Math.floor(x/dim),
			id = e.dataTransfer.getData('text/plain'),
			cx = cv.getContext('2d'),
			img = new Image();

		img.onload = function ()
		{
			cx.drawImage(img, columna*dim, fila*dim, dim, dim);

			// Volmenos a dibujar y pintamos las lineas de borde encima de las imagenes
			// De otra forma, las imagenes taparian los bordes
			dibujarCuadricula();
		};

		img.src = document.getElementById(id).src;
	};
}


function iniciarDragNDrop2()
{
	//Zona dragabble
	let imagenes = document.querySelectorAll('body>footer>img');

	for (let i = 0; i < imagenes.length; i++)
	{
		imagenes[i].setAttribute('dragabble', 'true');
		imagenes[i].id = 'img' + i;

		imagenes[i].ondragstart = function (e)
		{
			e.dataTransfer.setData('text/plain', imagenes[i].id);
		};
	}

	//Zona droppable
	let cv = document.getElementById('cv01');

	cv.ondragover = function (e)
	{
		e.preventDefault();
		e.stopPropagation();
	};

	cv.ondrop = function (e)
	{
		e.preventDefault();
		e.stopPropagation();

		let x = e.offsetX,
			y = e.offsetY,
			id = e.dataTransfer.getData('text/plain'),
			cx = cv.getContext('2d'),
			img = new Image();

		img.onload = function ()
		{
			cx.drawImage(img, x, y);
		};

		img.src = document.getElementById(id).src;
	};
}


function dibujarCuadricula()
{
	let cv = document.getElementById('cv01'),
		cx = cv.getContext('2d'),
		dim = cv.width/3;

	cx.beginPath();
	cx.lineWidth = 3;
	cx.strokeStyle = '#009688';

	for (let i = 1; i < 3; i++)
	{
		//Lineas horizontales
		cx.moveTo(0, i*dim);
		cx.lineTo(cv.width, i*dim);

		//Lineas verticales
		cx.moveTo(i*dim, 0);
		cx.lineTo(i*dim, cv.height);
	}

	//Rectangulo exterior
	cx.rect(0, 0, cv.width, cv.height);
	cx.stroke();
}