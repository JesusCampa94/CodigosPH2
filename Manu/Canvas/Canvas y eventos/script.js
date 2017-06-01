var ficha = {"fila":0, "columna":0};

function dibujarCuadricula()
{
	let cv = document.getElementById('cv01'),
		ctx = cv.getContext('2d'),
		dim = cv.width/18;

	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#4CAF50';

	for (let i = 1; i <= 18; i++)
	{
		// Lineas verticales
		ctx.moveTo(i * dim, 0);
		ctx.lineTo(i * dim, cv.height);

		// Lineas horizontales
		ctx.moveTo(0, i * dim);
		ctx.lineTo(cv.width, i * dim);
	}

	ctx.stroke();
}

function redibujarCanvas()
{
	let cv = document.getElementById('cv01'),
		 ctx = cv.getContext('2d'),
		 dim = cv.width/18,
		 img = new Image();

	cv.width = cv.width;
	dibujarCuadricula();
	img.onload = function()
	{
		ctx.drawImage(img, ficha.columna*dim, ficha.fila*dim, dim, dim);
	};
	img.src = 'circulo.svg';
}

function mouseClick(e)
{
	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY,
		dim 	  = cv.width/18,
		fila    = Math.floor(x/dim),
		columna = Math.floor(y/dim);

	if(x < 1 || x > cv.width-1 || y<1 || y>cv.height-1)
		return;

	// console.log(`Posicion: (${x}, ${y})`);
	console.log(`CLICK=>fila: ${fila} - columna: ${columna}`);

	// Limpiar canvas
	cv.width = cv.width;
	dibujarCuadricula();
	let ctx = cv.getContext('2d'),
		 img = new Image();

	img.onload = function()
	{
		ctx.drawImage(img, ficha.columna*dim, ficha.fila*dim, dim, dim);
	};
	img.src = 'circulo.svg';

	// Destacar
	ctx.fillStyle = '#FAC';
	ctx.lineWidth = 3;
	ctx.fillRect(ficha.columna*dim, ficha.fila*dim, dim, dim);
}

function mouse_move(e)
{
	//devuelve la posicion X e Y del raton delntro del evento
	let cv      = e.target,
		 x       = e.offsetX,
		 y       = e.offsetY
		 dim     = cv.width / 18,
		 fila    = Math.floor(y / dim),
		 columna = Math.floor(x / dim);
	//console.log(`Posición: ${x} - ${y}`);//de este modo podemos interpolar variables y sustituirlas por su valor
	//console.log('Posición' + 'x' + ' - ' + 'y');//ambos son equivalentes
	if(cv.getAttribute('data-down'))
	{//estoy arrastrando la ficha
		console.log(`MOUSEMOVE=>fila: ${fila} - columna: ${columna}`);
		if(ficha.columna != columna || ficha.fila != fila)
		{
			ficha.columna = columna;
			ficha.fila = fila;
			redibujarCanvas();
		}
	}
}

function mouse_down(e)
{
	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY,
		dim 	  = cv.width/3,
		fila    = Math.floor(x/dim),
		columna = Math.floor(y/dim);

	console.log(`DOWN=>fila: ${fila} - columna: ${columna}`);
	if(ficha.columna == columna && ficha.fila == fila)
	{//hay ficha
		cv.setAttribute('data-down', 'true');
	}
}

function mouse_up(e)
{
	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY,
		dim 	  = cv.width/3,
		fila    = Math.floor(x/dim),
		columna = Math.floor(y/dim);

	console.log(`UP=>fila: ${fila} - columna: ${columna}`);
	cv.removeAttribute('data-down');
}