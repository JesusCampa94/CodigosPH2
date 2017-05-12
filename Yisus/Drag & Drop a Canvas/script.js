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

		// cx.drawImage(document.getElementById(id), x, y);
	};
}