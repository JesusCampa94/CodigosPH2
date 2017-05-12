function iniciarDragNDrop()
{
	//Zona dragabble
	let lis = document.querySelectorAll('#s1>ul>li');

	for (let i = 0; i < lis.length; i++)
	{
		lis[i].setAttribute('dragabble', 'true');

		lis[i].ondragstart = function (e)
		{
			e.dataTransfer.setData('text/plain', lis[i].id);
		};
	}

	//Zona droppable
	let section = document.getElementById('s2');

	section.ondragover = function (e)
	{
		e.preventDefault();
		e.stopPropagation();
	};

	section.ondrop = function (e)
	{
		e.preventDefault();
		e.stopPropagation();

		let idLi = e.dataTransfer.getData('text/plain');

		section.querySelector('ul').appendChild(document.getElementById(idLi));
	};
}