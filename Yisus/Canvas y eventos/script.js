function dibujarCuadricula()
{
	let cv = document.getElementById('cv01'),
		ctx = cv.getContext('2d'),
		dim = cv.width/3;

	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#009688';

	for (let i = 1; i <= 3; i++)
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


function mouseClick(e)
{
	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY,
		dim 	  = cv.width/3,
		fila    = Math.floor(x/dim),
		columna = Math.floor(y/dim);

	// console.log(`Posicion: (${x}, ${y})`);
	console.log(`Casilla: (${fila}, ${columna})`);

	// Limpiar canvas
	cv.width = cv.width;
	dibujarCuadricula();

	// Destacar
	let ctx = cv.getContext('2d');
	ctx.fillStyle = '#B2DFDB';
	ctx.lineWidth = 3;
	ctx.fillRect(fila * dim, columna * dim, dim, dim);
}