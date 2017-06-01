function prepararDnD()
{
	let cv = document.getElementById('cv01');

	cv.ondragover = function(e)
	{
		e.preventDefault();
		e.stopPropagation();
	};

	cv.ondrop = function(e)
	{
		e.preventDefault();
		e.stopPropagation();
		
		let ficheros = e.dataTransfer.files
			 fr = new FileReader();

		fr.onload = function()
		{
			let img = new Image();

			img.onload = function()
			{
				cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
			};
			img.src = fr.result;
		};
		fr.readAsDataURL(ficheros[0]);
	};
}

function aColor(color)
{
	let cv = document.getElementById('cv01'),
		 cx = cv.getContext('2d'),
		 imgData,
		 colorWorker = new Worker('worker-web.js');

	if(cvAux == null)
	{
		cvAux = cv.cloneNode();
		cvAux.getContext('2d').putImageData(cx.getImageData(0, 0, cv.width, cv.height));
	}
	imgData = cvAux.getContext('2d').putImageData(cx.getImageData(0, 0, cv.width, cv.height));

	colorWorker.onmessage = function(e)
	{
		let datos = e.data,
			 imData = datos.imgData;

		cx.putImageData(imData, 0, 0);
	};

	colorWorker.postMessage({'imgData':imgData,'color':color});
}