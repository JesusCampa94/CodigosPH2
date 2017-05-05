function pintarRect()
{
	let cv = document.getElementById("cv1"),
	ctx = cv.getContext('2d');

	ctx.beginPath();
	ctx.fillStyle = '#00A';
	ctx.strokeStyle = '#A00';
	ctx.lineWidth = 3;

	ctx.fillRect(20, 20, 150, 100);
	ctx.strokeRect(20, 20, 150, 100);	
}

function pintarTexto()
{
	let cv = document.getElementById("cv1"),
	ctx = cv.getContext('2d');

	ctx.beginPath();
	ctx.fillStyle = '#00A';
	ctx.strokeStyle = '#A00';
	ctx.lineWidth = 1;

	ctx.font = 'italic 28px Ubuntu';
	ctx.fillText('Hola', 200, 200);
	ctx.strokeText('Hola', 200, 230);
}

function pintarLinea()
{
	let cv = document.getElementById("cv1"),
	ctx = cv.getContext('2d');

	ctx.beginPath();
	ctx.strokeStyle = '#FAC';
	ctx.lineWidth = 3;
	ctx.moveTo(100, 100);
	ctx.lineTo(120, 175);
	ctx.lineTo(120, 250);
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = '#0A0';
	ctx.moveTo(120, 250);
	ctx.lineTo(80, 250);
	ctx.stroke();
}


function limpiar()
{
	let cv = document.getElementById("cv1"),
	ctx = cv.getContext('2d');

	cv.width = cv.width;
}

function pintarImagen()
{
	let cv = document.getElementById("cv1"),
	ctx = cv.getContext('2d'),
	img = new Image();

	img.onload = function()
	{
		ctx.drawImage(img, 0, 0, cv.width, cv.height);
	};

	img.src = '/ruta/ima.gen';
}