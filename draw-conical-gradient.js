/* Conical Gradient function
 */

function drawConicalGradient(destination, x, y, x2, y2)
{
	var canvas = document.createElement('canvas'),
		context = canvas.getContext('2d'),
		size = (x > x2 ? x - x2 : x2 - x),
		stops = [];
	
	for(var i in arguments)
		if(i > 4)
		{
			if(typeof arguments[i] == 'string' && arguments[i].replace(/\s/g, '').match(/^#?([a-fA-F0-9]{3,6})$/))
				stops.push(hexToRgb(arguments[i]));
			else if(typeof arguments[i] == 'string' && arguments[i].replace(/\s/g, '').match(/^rgba?\(([0-9]+),([0-9]+),([0-9]+)(,([0-9]+))?\)$/i))
				stops.push(arguments[i].replace(/\s/g, '').replace(/^rgba?\((.*)\)$/i, '$1').split(','));
			else if(typeof arguments[i] == 'object')
			{
				if(arguments[i].r && arguments[i].g && arguments[i].b)
					stops.push([arguments[i].r, arguments[i].g, arguments[i].b, arguments[i].a ? arguments[i].a : 1]);
				else
					stops.push(arguments[i]);
			}
		}
	
	canvas.width = size;
	canvas.height = size;
	
	var allstops = [],
		segments = stops.length,
		segmentsize = Math.round(360 / segments);
	
	for(var i = 0; i < segments; i ++)
	{
		var from = stops[i],
			to = stops[i + 1] ? stops[i + 1] : stops[0];
		
		var diffr = (to[0] - from[0]) / segmentsize,
			diffg = (to[1] - from[1]) / segmentsize,
			diffb = (to[2] - from[2]) / segmentsize;
		
		for(j = 0; j < segmentsize; j ++)
			allstops[(i * segmentsize) + j] = 'rgba(' + Math.round(from[0] + (j * diffr)) + ',' + Math.round(from[1] + (j * diffg)) + ',' + Math.round(from[2] + (j * diffb)) + ',1)';
	}
	
	document.body.appendChild(canvas);
	
	context.translate(size / 2, size / 2);
	context.rotate(Math.PI);
	context.lineWidth = Math.ceil(size / 100) + 1.5;
	context.lineCap = 'round';
	
	var first = 'rgba(0,0,0,1)',
		last = 'rgba(0,0,0,1)';
	
	for(var i = 0; i <= 360; i++)
	{
		if(i == 0) first = allstops[i];
		if(allstops[i]) last = allstops[i];
		
		context.save();

		context.rotate(Math.PI * i / 180);
		context.translate(-context.lineWidth / 2, context.lineWidth / 2);

		context.beginPath();
		context.moveTo(0, 0);
		context.strokeStyle = last;

		context.lineTo(0, size);
		context.stroke();
		context.closePath();

		context.restore();
	}
	
	(destination instanceof CanvasRenderingContext2D ? destination : destination.getContext('2d')).drawImage(canvas, 0, 0, size, size, x, y, x2, y2);
	
	document.body.removeChild(canvas);
}

/* Context prototype function
 */

CanvasRenderingContext2D.prototype.createConicalGradient = function(x, y, x2, y2)
{
	var args = [this];
		for(var i in arguments) args.push(arguments[i]);
		
	drawConicalGradient.apply(this, args);
	return this;
};

/* Hex To RGB: http://stackoverflow.com/a/5624139
 */

function hexToRgb(a){var c=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;a=a.replace(c,function(m,r,g,b){return r+r+g+g+b+b});var d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return d?[parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16)]:null}
