function dibujarCuadricula()
{
	let cv = document.getElementById('cv01'),
		 ctx = cv.getContext('2d'),
		 dim = cv.width / 3;

	ctx.beginPath();//hacemos un path para aplicar estilos distintos y no interferir con otros
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#FAC';
	for(let i=1; i < 3; i++)
	{
		//lineas verticales
		ctx.moveTo(i * dim, 0);//ponemos el "lapiz" en el canvas
		ctx.lineTo(i * dim, cv.height);//dibujamos la linea

		//lineas horizontales
		ctx.moveTo(0, i * dim);
		ctx.lineTo(cv.width, i * dim);
	}
	ctx.stroke();
}

function mouse_move(e)
{
	//devuelve la posicion X e Y del raton delntro del evento
	let cv      = e.target,
		 x       = e.offsetX,
		 y       = e.offsetY
		 dim     = cv.width / 3,
		 fila    = Math.floor(y / dim),
		 columna = Math.floor(x / dim);
	//console.log(`Posición: ${x} - ${y}`);//de este modo podemos interpolar variables y sustituirlas por su valor
	//console.log('Posición' + 'x' + ' - ' + 'y');//ambos son equivalentes
	//console.log(`fila: ${fila} - columna: ${columna}`);
}

function mouse_click(e)
{
	//devuelve la posicion X e Y del raton delntro del evento
	let cv      = e.target,
		 x       = e.offsetX,
		 y       = e.offsetY
		 dim     = cv.width / 3,
		 fila    = Math.floor(y / dim),
		 columna = Math.floor(x / dim);

	if(x < 1 || x > cv.width-1 || y<1 || y>cv.height-1)//para solo poder hacer click en el canvas
	{
		return;
		//console.log(`Posición: ${x} - ${y}`);//de este modo podemos interpolar variables y sustituirlas por su valor
		//console.log('Posición' + 'x' + ' - ' + 'y');//ambos son equivalentes
		console.log(`fila: ${fila} - columna: ${columna}`);

		cv.width = cv.width;//al asignarle al canvas su propio tamaño se repinta 
		let ctx = cv.getContext('2d');
		ctx.beginPath();
		ctx.strokeStyle = '#a00';
		ctx.lineWidth = 4;
		ctx.strokeRect(columna * dim, fila * dim, dim, dim);
	}
}