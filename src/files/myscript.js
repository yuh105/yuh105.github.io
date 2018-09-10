var mysite = mysite || {}; 

window.onload = function() {
  pageInit();
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
  mysite.divSquareInSquare = document.getElementById('square-in-square');

  mysite.rettiwtCard = document.getElementById('rettiwt-card');
  mysite.voxelrunCard = document.getElementById('voxelrun-card');
  mysite.soundCloudCard = document.getElementById('soundcloud-card');


  /*
   works buttons
   */
  mysite.rettiwtCard.onclick = function() {
    window.open('rettiwt/', 'newtab');
  };
  mysite.voxelrunCard.onclick = function() {
    window.open('https://unityroom.com/games/voxelrun', 'newtab');
  };
  mysite.soundCloudCard.onclick = function() {
    window.open('https://soundcloud.com/sugar_gt/chiptume', 'newtab');
  };


  mysite.div_button_flag = false;
  
  mysite.theme = '';

  mysite.randomSquareRunning = false;
  mysite.squareInSquareRunning = false;
  mysite.squareInSquareParent = '';
  mysite.randomSquarePrint = document.getElementById('random-square-print');
  mysite.randomSquareId = '';
  mysite.squareInSquareId = '';
  mysite.randomSquareNum = 0;
  mysite.randomSquareMaxNum = 2000;

  mysite.terminal = new Terminal(document);


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

  mysite.divSquareInSquare.onclick = function() {
    mysite.theme = 'squareInSquare';
    const size = mysite.screen.clientHeight / 1.4; 
    const initial_pos_x = mysite.screen.clientWidth/2 - size/2;
    const initial_pos_y = mysite.screen.clientHeight/2 - size/2;

    if(mysite.squareInSquareRunning) {
      clearInterval(mysite.squareInSquareId);
      mysite.squareInSquareRunning = false;
    } else {
      mysite.theme = 'squareInSquare';
      mysite.squareInSquareRunning = true;
      mysite.squareInSquareParent = new Square(document, initial_pos_x, initial_pos_y, size,size,'fixed','white', border="1px solid #ccc");

      mysite.squareInSquareId = setInterval("createSquareInSquare(mysite.squareInSquareParent)", 30);
    }
  };

  mainScreenClear();
};

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

anime({
  targets: '.square',
  translateX: 250
});


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



function pageInit() {
  document.getElementById('header').style.marginBottom = window.innerHeight/100 * 8 + "px";
  document.getElementById('footer').style.marginTop = window.innerHeight/100 * 8 + "px";
  document.getElementById('main-home').style.marginTop = window.innerHeight/100 * 6 + "px";
  document.getElementById('main-about').style.marginTop = window.innerHeight/100 * 6 + "px";
  document.getElementById('main-works').style.marginTop = window.innerHeight/100 * 6 + "px";
  document.getElementById('main-system').style.marginTop = window.innerHeight/100 * 6 + "px";
}

function mainScreenClear() {
  if(mysite.randomSquareRunning) {
    clearInterval(mysite.squareInSquareId);
    clearInterval(mysite.randomSquareId);
    mysite.randomSquareRunning = false;
    mysite.squareInSquareRunning = false;
  }
  mysite.screen.innerHTML = "";
  mysite.theme = '';
  mysite.randomSquareNum = 0;
  randomSquarePrintStop();
}
