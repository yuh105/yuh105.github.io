function terminalInit() {
  if(mysite.terminal.print_init() == true) {
    clearInterval(mysite.terminalInitId);
    mysite.terminalLoginId = setInterval("terminalLogin()", 50);
  } else {
    if(Math.floor(Math.random()) == 0) {
      clearInterval(mysite.terminalInitId);
      mysite.terminalInitId = setInterval("terminalInit()", Math.floor( Math.random() * 300) + 50);
    }
  }
}

function terminalLogin() {
  if(mysite.terminal.test() == true) {
      clearInterval(mysite.terminalLoginId);
  }
}
