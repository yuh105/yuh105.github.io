
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


  if(mysite.div_button_flag == false) {
    createSquareBack(mysite.divSquare, 40, 4, 'absolute' ,'#dddddd');
    createCrossBack(mysite.divCross, 40, 'absolute' ,'#dddddd');
    for(let i=0;i<100;i++) {
      createRandomSquare(mysite.divRandomSquare, Math.floor(Math.random()*1), Math.floor(Math.random()*25), 'absolute', 'random', false);
    }
    for(let i=0;i<30;i++) {
      createRandomSquare(mysite.divBlackSquare, Math.floor(Math.random()*1), Math.floor(Math.random()*25), 'absolute', 'black', false);
    }
    mysite.div_button_flag =true; 
  }


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

