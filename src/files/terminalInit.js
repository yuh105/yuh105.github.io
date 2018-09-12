function terminalInit() {
  if(mysite.terminal.print_init() == true) {
    clearInterval(mysite.terminalInitId);
  }
}
