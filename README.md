# ConicalGradient
Adds a `createConicalGradient` API to the `CanvasRenderingContext`. Can have an unlimited number of 'stops'.
```js
var canvas = document.getElementsByTagName('canvas').item(0),
    context = canvas.getContext('2d');

context.save();

context.beginPath();
context.arc(250, 250, 250, 0, Math.PI * 2);
context.clip();

var x     = 0,
    y     = 0,
    x2    = 500,
    y2    = 500,
    stop1 = '#999',
    stop2 = '#FFF',
    stop3 = '#777',
    stop4 = '#FFF';

context.createConicalGradient(x, y, x2, y2, stop1, stop2, stop3, stop4);

context.restore();
```
[See it in action](http://codepen.io/boylett/pen/NWegZpX)
