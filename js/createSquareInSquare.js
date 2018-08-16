function createSquareInSquare(parent_div) {
  mysite.screen.innerHTML = "";
  let finish_flag = false;
  if(parent_div.created == false) {
    parent_div.squareInSquare();
  }else {
    if(parent_div.children.length == 0)
      console.log('finish')
    else{
      let flag1 = false;
      let flag4 = false;
      let flag16 = false;

      for(let i in parent_div.children) {
        if(parent_div.children[i].created == false) {
          parent_div.children[i].squareInSquare();
          break;
        }
        if(i == parent_div.children.length-1) {
          flag1 = true;
        }
      }

      if(flag1 == true) {
        for(let i in parent_div.children) {
          let double_break = false;
          for(let j in parent_div.children[i].children) {
            if(parent_div.children[i].children[j].created == false) {
              parent_div.children[i].children[j].squareInSquare();
              double_break = true;
              break;
            }
            if(i == parent_div.children.length-1 && j == parent_div.children[i].children.length-1) {
              flag4 = true;
            }
          }
          if(double_break)
            break;
        }
      }

      if(flag4 == true) {
        for(let i in parent_div.children) {
          let double_break = false;
          for(let j in parent_div.children[i].children) {
            for(let m in parent_div.children[i].children[j].children) {
              if(parent_div.children[i].children[j].children[m].created == false) {
                parent_div.children[i].children[j].children[m].squareInSquare();
                double_break = true;
                break;
              }
              if(i == parent_div.children.length-1 && j == parent_div.children[i].children.length-1 && m == parent_div.children[i].children[j].children.length-1) {
                flag16 = true;
              }
            }
            if(double_break)
              break;
          }
          if(double_break)
            break;
        }
      }


      if(flag16 == true) {
        for(let i in parent_div.children) {
          let double_break = false;
          for(let j in parent_div.children[i].children) {
            for(let m in parent_div.children[i].children[j].children) {
              for(let n in parent_div.children[i].children[j].children[m].children) {
                if(parent_div.children[i].children[j].children[m].children[n].created == false) {
                  parent_div.children[i].children[j].children[m].children[n].squareInSquare();
                  double_break = true;
                  break;
                }
                if(i == parent_div.children.length-1 && j == parent_div.children[i].children.length-1 && m == parent_div.children[i].children[j].children.length-1 && n == parent_div.children[i].children[j].children[m].children.length-1) {
                  finish_flag = true;
                }
              }
              if(double_break)
                break;
            }
            if(double_break)
              break;
          }
          if(double_break)
            break;
        }
      }

    }
  }

  mysite.screen.appendChild(parent_div.getFigure());
  
  if(finish_flag == true) {
    clearInterval(mysite.squareInSquareId);
    mysite.squareInSquareRunning = false;
    console.log('finish')
  }
}
