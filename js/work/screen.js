var mysite  = mysite || {}; 

mysite.screen = document.getElementById('background-screen');
let randSquare = new Square(document, 100, 100, 199, 199, 'fixed', 'random');

mysite.screen.appendChild(randSquare.getFigure());
