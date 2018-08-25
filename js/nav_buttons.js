
// move page
function setHomePage() {
  document.getElementById('terminal').style.display = 'block';
  document.getElementById('main-home').style.display = 'block';
  document.getElementById('main-works').style.display = 'none';
  document.getElementById('main-about').style.display = 'none';
  document.getElementById('main-system').style.display = 'none';
  mysite.terminal.setDir('home');
}

function setWorksPage() {
  document.getElementById('terminal').style.display = 'none';
  document.getElementById('main-home').style.display = 'none';
  document.getElementById('main-works').style.display = 'block';
  document.getElementById('main-about').style.display = 'none';
  document.getElementById('main-system').style.display = 'none';
  mysite.terminal.setDir('works');
}
function setAboutPage() {
  document.getElementById('terminal').style.display = 'block';
  document.getElementById('main-home').style.display = 'none';
  document.getElementById('main-works').style.display = 'none';
  document.getElementById('main-about').style.display = 'block';
  document.getElementById('main-system').style.display = 'none';
  mysite.terminal.setDir('about');
}
function setSystemPage() {
  document.getElementById('terminal').style.display = 'block';
  document.getElementById('main-home').style.display = 'none';
  document.getElementById('main-works').style.display = 'none';
  document.getElementById('main-about').style.display = 'none';
  document.getElementById('main-system').style.display = 'block';
  mysite.terminal.setDir('system');
}

