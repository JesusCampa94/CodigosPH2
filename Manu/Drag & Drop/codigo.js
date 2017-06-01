function prepararDnD()
{
	//zona draggable(li)
	let v = document.querySelectorAll('#s1>ul>li');
	for(let i=0; i<v.length; i++){
		v[i].setAttribute('draggable','true');
		v[i].ondragstart = function(e)
		{
			e.dataTransfer.setData('text/plain', v[i].id);
		}
	}
	//zona droppable
	let section = document.querySelectorAll('#s2');
	section.ondragover = function(e)
	{
		e.preventDefault();
		e.stopPropagation();
	}
}