var mysite = mysite || {}; 

window.onload = function() {
  // margin control - - - - 
  pageInit();
  // - - - - - - - - - - - 

  // set buttons var
  mysite.screen = document.getElementById('background-screen');
  mysite.figureInterval = 80;
  mysite.navHome = document.getElementById('nav-home');
  mysite.navWorks = document.getElementById('nav-works');
  mysite.navAbout = document.getElementById('nav-about');
  mysite.navSystem = document.getElementById('nav-system');
  mysite.divSquare = document.getElementById('square-screen');
  mysite.divCross = document.getElementById('cross-screen');
  mysite.divWhite = document.getElementById('white-screen');
  mysite.divRandomSquare = document.getElementById('random-square');
  mysite.divBlackSquare = document.getElementById('black-square');
  mysite.theme = '';

  mysite.randomSquareRunning = false;
  mysite.randomSquarePrint = document.getElementById('random-square-print');
  mysite.randomSquareId = '';
  mysite.randomSquareNum = 0;
  mysite.randomSquareMaxNum = 2000;

  mysite.terminal = new Terminal(document);
  // - - - - - - - - - - - - - - 

  // div button print - - - - -
  createSquareBack(mysite.divSquare, 40, 4, 'absolute' ,'#dddddd');
  createCrossBack(mysite.divCross, 40, 'absolute' ,'#dddddd');
  for(let i=0;i<100;i++) {
    createRandomSquare(mysite.divRandomSquare, Math.floor(Math.random()*1), Math.floor(Math.random()*25), 'absolute', 'random', false);
  }
  for(let i=0;i<30;i++) {
    createRandomSquare(mysite.divBlackSquare, Math.floor(Math.random()*1), Math.floor(Math.random()*25), 'absolute', 'black', false);
  }
  // - - - - - - - - - - - - - - 

  // header nav button - - - - -
  mysite.navHome.onclick = function() {
    setHomePage();
  };
  mysite.navWorks.onclick = function() {
    setWorksPage();
  };
  mysite.navAbout.onclick = function() {
    setAboutPage();
  };
  mysite.navSystem.onclick = function() {
    setSystemPage();
  };
  // - - - - - - - - - - - - - - 


  // work button
  mysite.divWhite.onclick = function() {
    mainScreenClear();
    mysite.terminal.update('set white');
  };
  mysite.divSquare.onclick = function(){
    createSquareBack(mysite.screen, mysite.figureInterval, 4, 'fixed', '#dddddd');
    mysite.terminal.update('set square');
  };
  mysite.divCross.onclick = function(){
    createCrossBack(mysite.screen, mysite.figureInterval, 'fixed', '#dddddd');
    mysite.terminal.update('set cross');
  };
  mysite.divRandomSquare.onclick = function() {
    // add 1
    createRandomSquare(mysite.divRandomSquare, Math.floor(Math.random()*1), Math.floor(Math.random()*30), 'absolute', 'random', false);
    if(mysite.randomSquareRunning) {
      clearInterval(mysite.randomSquareId);
      mysite.randomSquareRunning = false;
      randomSquarePrintStop();
      mysite.terminal.updateNormal('square_num: ' + mysite.randomSquareNum);
      mysite.terminal.updateNormal('^C');
    } else {
      if(mysite.randomSquareNum > mysite.randomSquareMaxNum-1) {
        mainScreenClear();
      }
      mysite.theme = 'randomSquare';
      mysite.randomSquareRunning = true;
      mysite.randomSquareId = setInterval("createRandomSquare(mysite.screen, Math.floor(Math.random()*1), Math.floor(Math.random()*150), 'fixed', 'random')", 4);
      mysite.terminal.update('start random_square &');
    }

  };

  mysite.divBlackSquare.onclick = function() {
    mainScreenClear();
    mysite.theme = 'blackSquare';
    for( let i=0;i<50;i++) {
      createRandomSquare(mysite.screen, Math.random()*1, Math.random()*150, 'fixed', 'black', terminal=false);
    }
    mysite.terminal.update('set black_square');
  };
  // - - - - - - - - - - - - - - 
  mainScreenClear();
};

// print random square function
function randomSquarePrintStop() {
  mysite.randomSquarePrint.innerHTML = "<p>** create random square **</p>";
  mysite.randomSquarePrint.innerHTML += "<p>square_num: " + mysite.randomSquareNum + "</p>";
  mysite.randomSquarePrint.innerHTML += "<p>- stop</p>";
}
function randomSquarePrintRun() {
  mysite.randomSquarePrint.innerHTML = "<p>** create random square **</p>";
  mysite.randomSquarePrint.innerHTML += "<p>square_num: " + mysite.randomSquareNum + "</p>";
  mysite.randomSquarePrint.innerHTML += "<p>- running...</p>";
}
// - - - - - - - - - - - - - - 

anime({
  targets: '.square',
  translateX: 250
});


// resize window
(function () {
  var timer = 0;
  window.onresize = function () {
    if (timer > 0) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      pageInit();
      switch(mysite.theme) {
        case '':
          mysite.screen.innerHTML = "";
          break;
        case 'square':
          createSquareBack(mysite.screen, mysite.figureInterval, 4, 'fixed', '#dddddd');
          break;
        case 'cross':
          createCrossBack(mysite.screen, mysite.figureInterval, 'fixed', '#dddddd');
          break;
      }
    }, 200);
  };
}());


// print back screen
function createSquareBack(target, interval, size, position, color) {
  mainScreenClear();
  mysite.theme = 'square';
  for( let i=0; i<target.clientWidth / interval; i++) {
    for( let j=0; j<target.clientHeight / interval; j++) {
      let square = new Square(document, interval*i+16, interval*j+16, size, size, position, color);
      target.appendChild(square.getFigure());
    }
  }
}

function createCrossBack(target, interval, position, color) {
  mainScreenClear();
  mysite.theme = 'cross';
  for( let i=0; i<target.clientWidth / interval; i++) {
    for( let j=0; j<target.clientHeight / interval; j++) {
      let cross = new Cross(document, interval*i+16, interval*j+16, 7, 1, position, color);
      target.appendChild(cross.getFigure());
    }
  }
}

function createRandomSquare(target, minSize, maxSize, position, color, terminal=true) {
  if(mysite.randomSquareNum > mysite.randomSquareMaxNum-1) {
    if(terminal) {
      clearInterval(mysite.randomSquareId);
      mysite.randomSquareRunning = false;
      mysite.terminal.updateNormal('square_num: ' + mysite.randomSquareNum);
      mysite.terminal.updateNormal('finished');
      randomSquarePrintStop();
      return;
    }
  }
  mysite.randomSquareNum += 1;
  if(terminal) {
    randomSquarePrintRun();
    mysite.terminal.updateOver('square_num: ' + mysite.randomSquareNum);
  }

  let size = Math.floor(Math.random() * (maxSize-minSize)) + minSize;
  let x = Math.floor(Math.random() * target.clientWidth);
  let y = Math.floor(Math.random() * target.clientHeight);
  let randSquare = new Square(document, x, y, size, size, position, color);

  target.appendChild(randSquare.getFigure());
}

// margin control
function pageInit() {
  document.getElementById('header').style.marginBottom = window.innerHeight/100 * 8 + "px";
  document.getElementById('footer').style.marginTop = window.innerHeight/100 * 8 + "px";
  document.getElementById('main-home').style.marginTop = window.innerHeight/100 * 6 + "px";
  document.getElementById('main-about').style.marginTop = window.innerHeight/100 * 6 + "px";
  document.getElementById('main-works').style.marginTop = window.innerHeight/100 * 6 + "px";
  document.getElementById('main-system').style.marginTop = window.innerHeight/100 * 6 + "px";
}

// main screen init
function mainScreenClear() {
  if(mysite.randomSquareRunning) {
    clearInterval(mysite.randomSquareId);
    mysite.randomSquareRunning = false;
  }
  mysite.screen.innerHTML = "";
  mysite.theme = '';
  mysite.randomSquareNum = 0;
  randomSquarePrintStop();
}


// move page
function setHomePage() {
  document.getElementById('main-home').style.display = 'block';
  document.getElementById('main-works').style.display = 'none';
  document.getElementById('main-about').style.display = 'none';
  document.getElementById('main-system').style.display = 'none';
  mysite.terminal.setDir('home');
}

function setWorksPage() {
  document.getElementById('main-home').style.display = 'none';
  document.getElementById('main-works').style.display = 'block';
  document.getElementById('main-about').style.display = 'none';
  document.getElementById('main-system').style.display = 'none';
  mysite.terminal.setDir('works');
}
function setAboutPage() {
  document.getElementById('main-home').style.display = 'none';
  document.getElementById('main-works').style.display = 'none';
  document.getElementById('main-about').style.display = 'block';
  document.getElementById('main-system').style.display = 'none';
  mysite.terminal.setDir('about');
}
function setSystemPage() {
  document.getElementById('main-home').style.display = 'none';
  document.getElementById('main-works').style.display = 'none';
  document.getElementById('main-about').style.display = 'none';
  document.getElementById('main-system').style.display = 'block';
  mysite.terminal.setDir('system');
}


