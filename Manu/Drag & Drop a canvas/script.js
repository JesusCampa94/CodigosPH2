
/*function iniciarDragNDrop()
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
			cx.drawImage(img, x, y, 120, 120);
		};

		img.src = document.getElementById(id).src;

		// cx.drawImage(document.getElementById(id), x, y);
	};*/

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
			cx = cv.getContext('2d'),
			dim = cv.width/3,
			fila = Math.floor(y/dim),
			columna = Math.floor(x/dim);

		dibujarCuadricula();
		cx.beginPath();
		cx.lineWidth = 2;
		cx.strokeStyle = '#FAC';
		cx.strokeRect(columna*dim, fila*dim, dim, dim);
	};

	cv.ondrop = function (e)
	{
		e.preventDefault();
		e.stopPropagation();

		let x = e.offsetX,
			y = e.offsetY,
			id = e.dataTransfer.getData('text/plain'),
			cx = cv.getContext('2d'),
			dim = cv.width/3,
			fila = Math.floor(y/dim),
			columna = Math.floor(x/dim),
			img = new Image();

		img.onload = function ()
		{
			cx.drawImage(img, columna*dim, fila*dim, dim, dim);
			//volvemos a dibujar la cuadricula otra vez para que las imagenes no queden por encima de las lineas de esta
			dibujarCuadricula();
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
	cx.lineWidth = 2;
	cx.strokeStyle = '#009688';

	for(let i=0; i<3; i++)
	{
		//lineas horizontales
		cx.moveTo(0, i*dim);
		cx.lineTo(cv.width, i*dim);
		//lineas verticales
		cx.moveTo(i*dim, 0);
		cx.lineTo(i*dim, cv.height);
	}
	cx.rect(0, 0, cv.width, cv.height);//pintamos el rectangulo de fuera para que tengan el mismo borde
	cx.stroke();
}