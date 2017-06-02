class Posicion
{
	constructor(x=4, y=9)
	{
		this.x = x;
		this.y = y;
	}
}
var ficha = {
	"posicion": new Posicion(),
	"seleccionada":false,
	"destinos": new Array()
};
var num = 0;
bienPuesta = true;

//lo unico que hace es llamar a otra funcion
!function crearCampo()
{
	redibujarCanvas();
}();

function dibujarCuadricula()
{
	let cv = document.getElementById('cv01'),
		ctx = cv.getContext('2d'),
		dim = cv.width/20;

	//dibujamos el campo
	ctx.beginPath();

	ctx.strokeStyle = '#4CAF50';
	ctx.lineWidth = 3;
	ctx.fillStyle = '#81C784';
	ctx.fillRect(1 * dim, 0, 18 * dim, 9 * dim);
	ctx.strokeRect(1 * dim, 0, 18 * dim, 9 * dim);

	ctx.stroke();

	//dibujamos las porterias
	ctx.beginPath();

	ctx.strokeStyle = '#4CAF50';
	ctx.fillStyle = '#A5C6A7';
	ctx.lineWidth = 3;
	ctx.fillRect(0, 3 * dim, 1 * dim, 3 * dim);
	ctx.strokeRect(0, 3 * dim, 1 * dim, 3 * dim);
	ctx.fillRect(19 * dim, 3 * dim, 1 * dim, 3 * dim);
	ctx.strokeRect(19 * dim, 3 * dim, 1 * dim, 3 * dim);

	ctx.stroke();

	//dibujamos las lineas
	ctx.beginPath();

	ctx.lineWidth = 2;
	ctx.strokeStyle = '#4CAF50';
	

	for (let i = 1; i <= 8; i++)
	{
		// Lineas horizontales
		if(i == 4 || i == 5)
		{
			ctx.moveTo(0, i * dim);
			ctx.lineTo(cv.width * dim, i * dim);	
		}
		else
		{
			ctx.moveTo(1 * dim, i * dim);
			ctx.lineTo(cv.width - 1* dim, i * dim);
		}

		for (let j = 1; j <= 19; j++)
		{
			// Lineas verticales
			ctx.moveTo(j * dim, 0);
			ctx.lineTo(j * dim, cv.height);	
		}
	}

	ctx.stroke();

	//terminamos de dibujar el resto de elementos
	ctx.beginPath();
	
	//dibujamos los elementos del campo
	ctx.lineWidth = 2.5;
	ctx.strokeStyle = '#FFF';

	//area izquierda
	ctx.strokeRect(1 * dim, 2 * dim, 3 * dim, 5 * dim);
	//dibujamos el circulo del area izquieda
	ctx.moveTo(4 * dim, dim * 4);
	//ctx.arc(centro(x), centro(y), radio, grado en el que empieza el circulo, grado en el que termina, sentido del dibujado)
	//false = sentido de las agujas del reloj
	ctx.arc(4 * dim, 4 * dim + dim/2, dim, -Math.PI/2, Math.PI/2, false);

	//area derecha
	ctx.strokeRect(16 * dim, 2 * dim, 3 * dim, 5 * dim);
	//dibujamos el circulo del area derecha
	ctx.moveTo(16 * dim, dim * 4);
	ctx.arc(16 * dim, 4 * dim + dim/2, dim, -Math.PI/2, Math.PI/2, true);

	//linea central
	ctx.moveTo(10 * dim, 0);
	ctx.lineTo(10 * dim, cv.height);
	//dibujamos el circulo central
	ctx.moveTo(10 * dim, dim * 4);
	ctx.arc(10 * dim, 4 * dim + dim/2, dim, -Math.PI/2, 2*Math.PI, false);

	ctx.stroke();

}

function redibujarCanvas()
{
	let cv = document.getElementById('cv01'),
		 ctx = cv.getContext('2d'),
		 dim = cv.width/20,
		 img = new Image();

	cv.width = cv.width;
	dibujarCuadricula();
	img.onload = function()
	{
		ctx.drawImage(img, ficha.posicion.y*dim, ficha.posicion.x*dim, dim, dim);
	};
	img.src = 'circulo.svg';
}

//devuelve false si intentas acceder a una posicion fuera del campo
function comprobarLimites(x, y, e, dim)
{
	let cv = e.target;

	//si estoy en la fila 3, 4 o 5
	if((y > 3 * dim && y < 4 * dim) || (y > 4 * dim && y < 5 * dim) || (y > 5 * dim && y < 6 * dim))
	{
		//si estoy en la columna 0 o la 19
		if((x > 1 && x < 1 * dim) || (x > 19 * dim && x < cv.width - 1)) 
		{
			//puedo llegar hasta el final del canvas
			if(x < 1 || x > cv.width-1 || y < 1 || y > cv.height-1)
				return false;
		}
	}
	//si no esta en ninguna de los lugares especiales
	else
	{
		//solo puedo llegar hasta el final del campo
		if(x < (1 * dim) || x > cv.width - 1 * dim - 1 || y < 1 || y > cv.height-1)
			return false;
	}
	return true;
}

//obtene un numero aleatorio de 1 a 6 incluidos
function tirarDado()
{
	num = Math.floor(Math.random() * (7 - 1) + 1);
	console.log(`numero: ${num}`);
}

//actualiza el array de posiciones a las que puede ir la ficha seleccionada
function actualizarDestinos(e, fichaClick)
{
	let cv      = e.target,
		 dim     = cv.width / 20,
		 y = fichaClick.posicion.x,
		 x = fichaClick.posicion.y,
		 ctx = cv.getContext('2d');

	//comprobamos que las posiciones validas a las que puede ir la ficha
	//casilla a la derecha
	if(comprobarLimites((x + num) * dim, y * dim + 1, e, dim))
	{
		fichaClick.destinos[0] = new Posicion((x + num), y);
	}
	else
	{
		fichaClick.destinos[0] = new Posicion(-1, -1);
	}
	//casilla a la izquierda
	if(comprobarLimites((x - num) * dim + 2, y * dim + 1, e, dim))
	{
		fichaClick.destinos[1] = new Posicion((x - num), y);
	}
	else
	{
		fichaClick.destinos[1] = new Posicion(-1, -1);
	}
	//casilla arriba
	if(comprobarLimites(x * dim, (y - num)* dim + 2, e, dim))
	{
		fichaClick.destinos[2] = new Posicion(x , (y - num));
	}
	else
	{
		fichaClick.destinos[2] = new Posicion(-1, -1);
	}
	//casilla abajo
	if(comprobarLimites(x * dim, (y + num)* dim, e, dim))
	{
		fichaClick.destinos[3] = new Posicion(x , (y + num));
	}
	else
	{
		fichaClick.destinos[3] = new Posicion(-1, -1);
	}
	//casilla diagonal superior derecha
	if(comprobarLimites((x + num) * dim + 2, (y - num)* dim + 2, e, dim))
	{
		fichaClick.destinos[4] = new Posicion((x + num) , (y - num));
	}
	else
	{
		fichaClick.destinos[4] = new Posicion(-1, -1);
	}
	//casilla diagonal superior izquierda
	if(comprobarLimites((x - num) * dim + 2, (y - num)* dim + 2, e, dim))
	{
		fichaClick.destinos[5] = new Posicion((x - num) , (y - num));
	}
	else
	{
		fichaClick.destinos[5] = new Posicion(-1, -1);
	}
	//casilla diagonal inferior derecha
	if(comprobarLimites((x + num) * dim + 2, (y + num)* dim + 2, e, dim))
	{
		fichaClick.destinos[6] = new Posicion((x + num) , (y + num));
	}
	else
	{
		fichaClick.destinos[6] = new Posicion(-1, -1);
	}
	//casilla diagonal inferior izquierda
	if(comprobarLimites((x - num) * dim + 2, (y + num)* dim + 2, e, dim))
	{
		fichaClick.destinos[7] = new Posicion((x - num) , (y + num));
	}
	else
	{
		fichaClick.destinos[7] = new Posicion(-1, -1);
	}
}

//marca en el campo las casillas a las que puede ir la ficha seleccionada
function dibujarDestinos(e, fichaClick)
{
	let cv   = e.target,
		 dim  = cv.width / 20,
		 y    = -1,
		 x    = -1,
		 ctx  = cv.getContext('2d');

	//recorremos los destinos de la ficha para marcarlos en el campo
	for(let i=0; i < 8; i++)
	{
		//si el destino es una posicion valida
		if(fichaClick.destinos[i].x != -1)
		{
		 	col = fichaClick.destinos[i].x;
			fil = fichaClick.destinos[i].y;

			ctx.fillStyle = '#C8E6C9';
			ctx.lineWidth = 3;
			ctx.fillRect(col * dim, fil * dim, dim, dim);
			ctx.strokeRect(col * dim, fil * dim, dim, dim);
		}
	}
}

//comprueba que lad coordenadas pasadas estan dentro de los posibles destinos de la ficha
function enDestino(fil, col, fichaClick)
{
	for(let i=0; i < 8; i++)
	{
		//si es un destino
		if(fichaClick.destinos[i].x == col && fichaClick.destinos[i].y == fil)
			return true;
	}
	//si no lo ha encontrado dentro de sus destinos
	return false;
}

function mouse_click(e)
{
	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY,
		dim 	  = cv.width/20,
		fila    = Math.floor(y/dim),
		columna = Math.floor(x/dim);

	if(!comprobarLimites(x, y, e, dim))
		return;

	console.log(`CLICK=>fila: ${fila} - columna: ${columna}`);

	// Limpiar canvas
	cv.width = cv.width;
	dibujarCuadricula();

	if(!bienPuesta)
		dibujarDestinos(e, ficha);

	let ctx = cv.getContext('2d'),
		 img = new Image();

	//si al hacer click pinchamos en la ficha
	if(num != 0)
	{
		if(fila == ficha.posicion.x && columna == ficha.posicion.y && ficha.seleccionada == false)
		{
			ficha.seleccionada = true;
		}
		else if(fila == ficha.posicion.x && columna == ficha.posicion.y && ficha.seleccionada == true)
		{
			ficha.seleccionada = false;
		}
	}

	img.onload = function()
	{
		if(ficha.seleccionada)
		{
			//destacar casilla de la ficha
			ctx.fillStyle = '#C8E6C9';
			ctx.lineWidth = 3;
			ctx.fillRect(ficha.posicion.y*dim, ficha.posicion.x*dim, dim, dim);
			ctx.strokeRect(ficha.posicion.y*dim, ficha.posicion.x*dim, dim, dim);
			if(num != 0 && bienPuesta)
			{
				actualizarDestinos(e, ficha);
				if(typeof ficha.destinos[0] !== 'undefined')
				{
					if(enDestino(fila, columna, ficha))
					{
						ficha.posicion.x = fila;
						ficha.posicion.y = columna;
						actualizarDestinos(e, ficha);
						ficha.seleccionada = false;
						redibujarCanvas();
					}
					if(ficha.seleccionada)
						dibujarDestinos(e, ficha);
				}
			}
		}
		ctx.drawImage(img, ficha.posicion.y*dim, ficha.posicion.x*dim, dim, dim);
	};
	img.src = 'circulo.svg';

	console.log(`Ficha=>fila: ${ficha.posicion.x} - columna: ${ficha.posicion.y} - seleccion: ${ficha.seleccionada}`);

	if(!ficha.seleccionada)
	{
		// Destacar casilla con click
		ctx.fillStyle = '#C8E6C9';
		ctx.lineWidth = 3;
		ctx.fillRect(columna*dim, fila*dim, dim, dim);
	}
	else
	{
		// Destacar casilla a la que no puedes ir con click
		ctx.fillStyle = '#FAC';
		ctx.lineWidth = 3;
		ctx.fillRect(columna*dim, fila*dim, dim, dim);
	}
}

function mouse_move(e)
{
	//devuelve la posicion X e Y del raton delntro del evento
	let cv      = e.target,
		 x       = e.offsetX,
		 y       = e.offsetY
		 dim     = cv.width / 20,
		 fila    = Math.floor(y / dim),
		 columna = Math.floor(x / dim),
		 ctx = cv.getContext('2d');

	if(!comprobarLimites(x, y, e, dim))
		return;
	
	if(ficha.seleccionada)
	{
		//console.log(`Posición: ${x} - ${y}`);//de este modo podemos interpolar variables y sustituirlas por su valor
		//console.log('Posición' + 'x' + ' - ' + 'y');//ambos son equivalentes
		if(cv.getAttribute('data-down'))
		{
			bienPuesta = false;
			if(num != 0)
			{
				//estoy arrastrando la ficha
				if(ficha.posicion.y != columna || ficha.posicion.x != fila)
				{
					ficha.posicion.y = columna;
					ficha.posicion.x = fila;
					redibujarCanvas();

					//destacar casilla de la ficha
					ctx.fillStyle = '#C8E6C9';
					ctx.lineWidth = 3;
					ctx.fillRect(ficha.posicion.y*dim, ficha.posicion.x*dim, dim, dim);
					if(typeof ficha.destinos[0] !== 'undefined' && ficha.seleccionada)
					{
						dibujarDestinos(e, ficha);
					}
				}
			}
		}
	}
}

function mouse_down(e)
{
	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY,
		dim 	  = cv.width/20,
		fila    = Math.floor(y/dim),
		columna = Math.floor(x/dim);

	if(ficha.posicion.y == columna && ficha.posicion.x == fila)
	{
		//hay ficha
		cv.setAttribute('data-down', 'true');
	}
}

function mouse_up(e)
{
	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY,
		dim 	  = cv.width/20,
		fila    = Math.floor(y/dim),
		columna = Math.floor(x/dim);

		cv.removeAttribute('data-down');
}