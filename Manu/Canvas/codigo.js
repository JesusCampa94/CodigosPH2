function cuadrado()
{
	let cv = document.getElementById('cv01'),
		 ctx = cv.getContext('2d');

	ctx.strokeStyle = '#a00';
	ctx.lineWidth = 4;
	ctx.fillStylr = '#0a0';
	ctx.strokeRect(100, 100, 200, 100);
	ctx.fillRect(100, 100, 200, 100);
}

function rotar()
{
	let cv = document.getElementById('cv01'),
		 ctx = cv.getContext('2d');

	ctx.translate(100, 100);
	ctx.rotate(45 * (Math.PI / 180));	
}

function imagen()
{
	let cv = document.getElementById('cv01'),
		 ctx = cv.getContext('2d'),
		 img = new Image();

		 img.onload = function()
		 {
		 	ctx.drawImage(img, 0,0,cv.width, cv.height);
		 }
		 img.src = "../img/minions.jpg"
}

function copiar()
{
	let cv1 = document.getElementById('cv01'),
		 ctx1 = cv1.getContext('2d');
	let cv2 = document.getElementById('cv02'),
		 ctx2 = cv2.getContext('2d'),
		 imgData;

	imgData = ctx1.getImageData(0,0, cv1.width, cv1.height);
	ctx2.putImageData(imgData, 0, 0);
}

function aColor(color)
{
	let cv1 = document.getElementById('cv01'),
		 ctx1 = cv1.getContext('2d');
	let cv2 = document.getElementById('cv02'),
		 ctx2 = cv2.getContext('2d'),
		 imgData;

	imgData = ctx1.getImageData(0,0, cv1.width, cv1.height);
	for(let i=0; i<imgData.height; i++){
		for(let j=0; j<imgData.width; j++){
			if(color!='r'){
				//punto de inicio del pixel(i,j) y luego *4 porque cada pixel tiene 4 bytes
				imgData.data[(i * imgData.width  + j) * 4 + 0]  = 0;//rojo 
				
			}
			if(color!='g')
				imgData.data[(i * imgData.width  + j) * 4 + 1] = 0;//verde
			if(color!='b')
				imgData.data[(i * imgData.width  + j) * 4 + 2] = 0;//azul
			//imgData.data[(i * imgData.width  + j) * 4 + 3] //alpha
		}
	}
	ctx2.putImageData(imgData, 0 ,0);
}