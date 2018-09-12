class Figure {
  constructor(document, x, y, position='fixed', color='random') {
    this.x = x;
    this.y = y;
    this.figure = document.createElement("div");
    this.figure.style.top = y + "px";
    this.figure.style.left = x + "px";
    this.figure.style.position = position;
    if(color == 'random') {
      this.figure.style.backgroundColor = this.createRandomColor();
    }
    else {
      this.color = color;
      this.figure.style.backgroundColor = color;
    }
  }

  createRandomColor() {
    var randomColor = "#";
    for(var i = 0; i < 6; i++) {
      randomColor += (16*Math.random() | 0).toString(16);
    }
    return randomColor;
  }
}

class Square extends Figure {
  constructor(document, x, y, width, height, position, color, border="") {
    super(document, x, y, position, color);
    this.width = width;
    this.height = height;
    this.border = border;
    this.figure.style.width = width + "px";
    this.figure.style.height = height + "px";
    this.figure.style.border = border;
    this.created = false;
  }

  getFigure() {
    return this.figure;
  }

  squareInSquare(){
    const span = 2;
    const border_width = 1;
    let child_width = ((this.width-border_width*2)-span*3)/2;
    let child_height = ((this.height-border_width*2)-span*3)/2;
    this.children = [];
    this.created = true;

    let random = Math.floor( Math.random() * (100 + 1));
    if(random > 30)
      this.children.push(new Square(document,span, span, child_width,child_height,'absolute', this.color, this.border));

    random = Math.floor( Math.random() * (100 + 1));
    if(random > 30)
      this.children.push(new Square(document,child_width + span*2, span, child_width, child_height,'absolute',this.color, this.border));

    random = Math.floor( Math.random() * (100 + 1));
    if(random > 30)
      this.children.push(new Square(document,child_width + span*2, child_height + span*2,child_width, child_height, 'absolute',this.color, this.border));

    random = Math.floor( Math.random() * (100 + 1));
    if(random > 30)
      this.children.push(new Square(document, span, child_height + span*2, child_width,child_height,'absolute',this.color, this.border));

    for(let i in this.children) {
      this.getFigure().appendChild(this.children[i].getFigure());
    }
  }
}

class Cross extends Figure {
  constructor(document, x, y, line_length, line_weight, position, color) {
    super(document, x, y, position,  color);
    this.width = line_weight;
    this.height = line_length;
    this.figure.style.width = this.width + "px";
    this.figure.style.height = this.height + "px";
    this.figure.className = "cross" + this.height + this.width;

    let style = document.getElementById('jsStyle');
    let target = "." + this.figure.className + "::after";
    let str_split = style.innerHTML.split(' ');
    for(let s of str_split) {
      if(s == target) {
        return;
      }
    }
    let pos = (this.height-this.width) / 2;
    let rule = 'background-color:' + this.color + ';content: "";position:absolute;height:' + this.width + 'px;width:' + this.height + 'px;left:-' + pos + 'px;top: ' + pos +'px;';
    style.innerHTML += '<!-- ' + target + " {" + rule + "}" + '-->';
  }

  getFigure(figure) {
    return this.figure;
  }
}

class Terminal {
  constructor(document) {
    this.elem = document.getElementById('terminal');
    this.history = [];
    this.dir = "home";
    this.prompt = "[~/" + this.dir + "]$ ";
    this.updateNormal(" - satokibi.github.io");
    this.theme = 'black';
    this.message_max = 17;

    this.init_flag = false;
    this.init_count = 0;
    this.init_message = ["satokibi.github.io version 2.0.09-12", "set - home", "set - works", "set - about", "set - system",
                         "login: guest", "password: ",];

    this.elem.onclick = function() {
      /* document.getElementById('terminal').style.backgroundColor = 'white';
       document.getElementById('terminal').style.color = 'black'; */
    };
  }

  print_init() {
    this.init_count += 1;
    if(this.init_count == this.init_message.length){
      this.updateNormal("Hello guest.");
      return true;
    }
    this.updateNormal2(this.init_message[this.init_count]);
    return false;
  }

  setDir(dir) {
    this.prompt = "[~/" + dir + "]$ ";
    this.updateNormal("[~/" + this.dir + "]$ " + "cd ~/" + dir);
    this.dir = dir;
  }

  update(str) {
    this.history.push(this.prompt + str);
    if(this.history.length > this.message_max) {
      this.history.shift();
    }

    this.elem.innerHTML = "";
    for(let i=0;i<this.history.length;i++) {
      this.elem.innerHTML += "<p>" + this.history[i] + "</p>";
    }
    this.elem.innerHTML += this.prompt;

  }

  updateNormal(str) {
    this.history.push(str);
    if(this.history.length > this.message_max) {
      this.history.shift();
    }

    this.elem.innerHTML = "";
    for(let i=0;i<this.history.length;i++) {
      this.elem.innerHTML += "<p>" + this.history[i] + "</p>";
    }
    this.elem.innerHTML += this.prompt;
  }

  updateNormal2(str) {
    this.history.push(str);
    if(this.history.length > this.message_max) {
      this.history.shift();
    }

    this.elem.innerHTML = "";
    for(let i=0;i<this.history.length;i++) {
      this.elem.innerHTML += "<p>" + this.history[i] + "</p>";
    }
  }

  updateOver(str) {
    this.history.push(str);
    this.elem.innerHTML = "";
    for(let i=0;i<this.history.length;i++) {
      this.elem.innerHTML += "<p>" + this.history[i] + "</p>";
    }
    this.history.pop();
  }

}
