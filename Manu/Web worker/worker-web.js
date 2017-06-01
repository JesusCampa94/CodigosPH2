self.onmessage = function(e)
{
	let datos = e.data,
		 imData = datos.imgData,
		 color = datos.color;

	for(let i=0; i<imData.height; i++)
	{
		for(let j=0; j<imData.width; j++)
		{
			if(color!='r'){
				//punto de inicio del pixel(i,j) y luego *4 porque cada pixel tiene 4 bytes
				imData.data[(i * imData.width  + j) * 4 + 0]  = 0;//rojo 
			}
			if(color!='g')
				imData.data[(i * imData.width  + j) * 4 + 1] = 0;//verde
			if(color!='b')
				imData.data[(i * imData.width  + j) * 4 + 2] = 0;//azul
			//imData.data[(i * imData.width  + j) * 4 + 3] //alpha
		}
	}

	self.postMessage({'imgData':imData});
}