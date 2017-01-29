window.onkeydown =  function(e){
  if (e.keyCode==27){dialog.closeall();}
  try{
    if(e.target.tagName=="BODY"){BodyKeyDown(e)}
    if(e.target.id=="Loading"){LoadingKeyDown(e)}
    
    if(e.target.parentNode.id=="Lista-popup"){ListaKeyDown(e)}
    if(e.target.parentNode.id=="Alert-popup"){AlertKeyDown(e)}  
    if(e.target.parentNode.id=="Keyboard-popup"){KeyboardKeyDown(e)}  
    if(e.target.parentNode.id=="AlertYesNo-popup"){AlertYesNoKeyDown(e)} 
    if(e.target.parentNode.id=="ProgressBar-popup"){ProgressKeyDown(e)} 
    if(e.target.parentNode.id=="Config-popup"){ConfigKeyDown(e)}
    if(e.target.parentNode.id=="Settings-popup"){SettingsKeyDown(e)}
    if(e.target.parentNode.id=="Info-popup"){InfoKeyDown(e)}
    
    if(e.target.parentNode.parentNode.id=="Alert-popup"){AlertKeyDown(e)}
    if(e.target.parentNode.parentNode.id=="AlertYesNo-popup"){AlertYesNoKeyDown(e)}
    if(e.target.parentNode.parentNode.id=="Keyboard-popup"){KeyboardKeyDown(e)}
    if(e.target.parentNode.parentNode.id=="ProgressBar-popup"){ProgressKeyDown(e)}
    if(e.target.parentNode.parentNode.id=="Config-popup"){ConfigKeyDown(e)}
    if(e.target.parentNode.parentNode.id=="Settings-popup"){SettingsKeyDown(e)}
    if(e.target.parentNode.parentNode.id=="Info-popup"){InfoKeyDown(e)}
    
    if(e.target.parentNode.parentNode.parentNode.id=="Contenedor"){ListItemKeyDown(e)}
    if(e.target.parentNode.parentNode.parentNode.id=="Keyboard-popup"){KeyboardKeyDown(e)}
    
    if(e.target.parentNode.parentNode.parentNode.parentNode.id=="Lista-popup"){ListaKeyDown(e)}
    if(e.target.parentNode.parentNode.parentNode.parentNode.id=="Config-popup"){ConfigKeyDown(e)}
    if(e.target.parentNode.parentNode.parentNode.parentNode.id=="Settings-popup"){SettingsKeyDown(e)}
    
    if(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id=="Pie"){BodyKeyDown(e)}
    
    if(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id=="Config-popup"){ConfigKeyDown(e)}
    if(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id=="Settings-popup"){SettingsKeyDown(e)}
  
  }catch(err) {} 
}

function ListItemKeyDown(e){
  switch (e.keyCode) {
    case 96:
    case 97:
    case 98:
    case 99:
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
      Buscar(e.keyCode)
      break;
    case 93: //Menu
      e.preventDefault();
      if (e.target.parentNode.children.length ==2){
        e.target.parentNode.children[1].onclick.apply(e.target.parentNode.children[1]);
        focused_item = e.target;
      }
      break;
    case 8: //Atras
      e.preventDefault();
      if (nav_history.current > 0){send_request("go_back");}
      break;
    
    case 37: //Left
      e.preventDefault();
      index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
      document.activeElement.parentNode.children[index-1].focus();
      break;
    
    case 38: //UP
      e.preventDefault();
      index = Array.prototype.indexOf.call(document.getElementById("itemlist").children, document.activeElement.parentNode);
      if (index ==0){index = document.getElementById("itemlist").children.length}
      document.activeElement.parentNode.parentNode.children[index-1].children[0].focus();
      break;
    
    case 39: //RIGHT
      e.preventDefault();
      index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
      document.activeElement.parentNode.children[index+1].focus();
      break;
      
    case 40: //DOWN
      e.preventDefault();
      index = Array.prototype.indexOf.call(document.getElementById("itemlist").children, document.activeElement.parentNode);
      if (index+1 ==document.getElementById("itemlist").children.length){index = -1}
      document.activeElement.parentNode.parentNode.children[index+1].children[0].focus();
      break;
  }
}

function LoadingKeyDown(e){
  switch (e.keyCode) {
    case 8: //Atras
      loading.close()
      e.preventDefault();
      break;
  }
}

function BodyKeyDown(e){
  switch (e.keyCode) {
    case 8: //Atras
      e.preventDefault();
      break;
      
    case 37: //Left
      e.preventDefault();
      document.getElementById("itemlist").children[0].children[0].focus();
      break;
      
    case 38: //UP
      e.preventDefault(); 
      document.getElementById("itemlist").children[0].children[0].focus();
      break;
      
    case 39: //RIGHT
      e.preventDefault();
      document.getElementById("itemlist").children[0].children[0].focus();
      break;
      
    case 40: //DOWN
      e.preventDefault();
      document.getElementById("itemlist").children[0].children[0].focus();
      break;
  }
}

function InfoKeyDown(e){
  switch (e.keyCode) {
    case 8: //Atras
      e.preventDefault(); 
      dialog.closeall()
      break;
    case 38: //UP
      e.preventDefault(); 
      if (e.target.parentNode.parentNode.id=="Info-popup"){document.activeElement.parentNode.parentNode.children[0].focus()}
      break;
      
    case 37: //Left
      e.preventDefault(); 
      if (e.target.parentNode.parentNode.id=="Info-popup"){
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
        document.activeElement.parentNode.children[index-1].focus()
      }
      break;
      
    case 39: //RIGHT
      e.preventDefault(); 
      if (e.target.parentNode.parentNode.id=="Info-popup"){
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
        document.activeElement.parentNode.children[index+1].focus()
      }
      break;
      
    case 40: //DOWN
      e.preventDefault(); 
      if (e.target.parentNode.id=="Info-popup"){document.activeElement.parentNode.children[3].children[3].focus()}
      break;
  }
}


function ListaKeyDown(e){
  switch (e.keyCode) {
    case 8: //Atras
      e.preventDefault(); 
      dialog.closeall()
      break;

    case 38: //UP
      e.preventDefault(); 
      index = Array.prototype.indexOf.call(document.activeElement.parentNode.parentNode.children, document.activeElement.parentNode);
      if (index !=0){document.activeElement.parentNode.parentNode.children[index-1].children[0].focus()}
      else{ document.activeElement.parentNode.parentNode.parentNode.parentNode.children[0].focus()}
      break;

    case 40: //DOWN
      e.preventDefault();
      if (e.target.parentNode.id=="Lista-popup"){document.activeElement.parentNode.children[2].children[0].children[0].children[0].focus()}
      else{
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.parentNode.children, document.activeElement.parentNode);
        document.activeElement.parentNode.parentNode.children[index+1].children[0].focus();
      }
      break;
  }
}

function ConfigKeyDown(e){
  switch (e.keyCode) {
    case 8: //Atras
      if ((e.target.tagName != "INPUT" || (e.target.type != "text" && e.target.type != "password")) && e.target.tagName != "SELECT"){
        e.preventDefault(); 
        dialog.closeall()
      }
      break;
      
    case 38: //UP
      e.preventDefault(); 
      if (e.target.parentNode.id=="Config-secciones"){
        document.getElementById('Config-popup').children[0].focus()
        return
        
      } else if (e.target.parentNode.id=="Config-botones"){
        index = null
        group = null
        
      }else if (e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id=="Config") {
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode.children, document.activeElement.parentNode.parentNode.parentNode.parentNode) -1;
        group = Array.prototype.indexOf.call(document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children, document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode);
      }
      if (group == null){
        for (group = 0; group < document.getElementById('Config-popup').children[3].children.length; group++) {
            if (document.getElementById('Config-popup').children[3].children[group].style.display !="none"){break;}
        }  
      }
      if (index == null){
        index = document.getElementById('Config').children[group].children.length -1
      }
      while (index >=  0 &&
             (document.getElementById('Config').children[group].children[index].children[0].className =="Separador" || 
              document.getElementById('Config').children[group].children[index].children[0].className =="LabelSeparador" ||
              document.getElementById('Config').children[group].children[index].children[0].children[1].children[0].children[0].disabled ||
              document.getElementById('Config').children[group].children[index].style.display == "none")){
              
        index --
      }
      if (index >= 0){
        document.getElementById('Config').children[group].children[index].children[0].children[1].children[0].children[0].focus()
      }else{
        if (document.getElementById('Config-secciones').style.display == "none"){
          document.getElementById('Config-popup').children[0].focus()
        } else {
         document.getElementById('Config-secciones').children[0].focus()
        }
      }
      break;
      
    case 37: //Left
      if ((e.target.tagName != "INPUT" || (e.target.type != "text" && e.target.type != "password")) && e.target.tagName != "SELECT"){
        e.preventDefault(); 
        if (e.target.parentNode.parentNode.id=="Config-popup"){
          index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
          document.activeElement.parentNode.children[index-1].focus();
        }
      }      
      break;
      
    case 39: //RIGHT
      if ((e.target.tagName != "INPUT" || (e.target.type != "text" && e.target.type != "password")) && e.target.tagName != "SELECT"){
        e.preventDefault(); 
        if (e.target.parentNode.parentNode.id=="Config-popup"){
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
        document.activeElement.parentNode.children[index+1].focus();
        }
      }   
      break;
    
    case 40: //DOWN
      e.preventDefault(); 
      if (e.target.parentNode.id=="Config-popup"){
        if (document.getElementById('Config-secciones').style.display == "none"){
          index = 0
          group = null
        } else {
         document.getElementById('Config-secciones').children[0].focus()
         return
        }
      }else if (e.target.parentNode.id=="Config-secciones"){
        index = 0
        group = null
      }else if (e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id=="Config") {
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode.children, document.activeElement.parentNode.parentNode.parentNode.parentNode) +1;
        group = Array.prototype.indexOf.call(document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children, document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode);
      }
      

      
      if (group == null){
        for (group = 0; group < document.getElementById('Config-popup').children[3].children.length; group++) {
            if (document.getElementById('Config-popup').children[3].children[group].style.display !="none"){break;}
        }  
      }
      while (index <  document.getElementById('Config').children[group].children.length &&
             (document.getElementById('Config').children[group].children[index].children[0].className =="Separador" || 
              document.getElementById('Config').children[group].children[index].children[0].className =="LabelSeparador" ||
              document.getElementById('Config').children[group].children[index].children[0].children[1].children[0].children[0].disabled ||
              document.getElementById('Config').children[group].children[index].style.display == "none")){
              
        index ++
      }
      if (index < document.getElementById('Config').children[group].children.length){
        document.getElementById('Config').children[group].children[index].children[0].children[1].children[0].children[0].focus()
      }else{
        document.getElementById('Config-botones').children[0].focus()
      }
      break;
  }
}

function SettingsKeyDown(e){
  switch (e.keyCode) {
    case 8: //Atras
      if ((e.target.tagName != "INPUT" || (e.target.type != "text" && e.target.type != "password")) && e.target.tagName != "SELECT"){
        e.preventDefault(); 
        dialog.closeall()
      }
      break;
      
    case 38: //UP
      e.preventDefault(); 
      if (e.target.parentNode.id=="Settings-botones"){
        index = null
        
      }else if (e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id=="Settings") {
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode.children, document.activeElement.parentNode.parentNode.parentNode.parentNode) -1;
      }
      if (index == null){
        index = document.getElementById('Settings').children[0].children.length -1
      }
      while (index >=  0 &&
             (document.getElementById('Settings').children[0].children[index].children[0].className =="Separador" || 
              document.getElementById('Settings').children[0].children[index].children[0].className =="LabelSeparador" ||
              document.getElementById('Settings').children[0].children[index].children[0].children[1].children[0].children[0].disabled ||
              document.getElementById('Settings').children[0].children[index].style.display == "none")){
              
        index --
      }

      if (index >= 0){
        document.getElementById('Settings').children[0].children[index].children[0].children[1].children[0].children[0].focus()
      }else{
        document.getElementById('Settings-popup').children[0].focus()
      }
      break;
      
    case 37: //Left
      if ((e.target.tagName != "INPUT" || (e.target.type != "text" && e.target.type != "password")) && e.target.tagName != "SELECT"){
        e.preventDefault(); 
        if (e.target.parentNode.parentNode.id=="Settings-popup"){
          index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
          document.activeElement.parentNode.children[index-1].focus();
        }
      }      
      break;
      
    case 39: //RIGHT
      if ((e.target.tagName != "INPUT" || (e.target.type != "text" && e.target.type != "password")) && e.target.tagName != "SELECT"){
        e.preventDefault(); 
        if (e.target.parentNode.parentNode.id=="Settings-popup"){
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
        document.activeElement.parentNode.children[index+1].focus();
        }
      }   
      break;
    
    case 40: //DOWN
      e.preventDefault(); 
      if (e.target.parentNode.id=="Settings-popup"){
        index = 0
      }else if (e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id=="Settings") {
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode.children, document.activeElement.parentNode.parentNode.parentNode.parentNode) +1;
        group = Array.prototype.indexOf.call(document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children, document.activeElement.parentNode.parentNode.parentNode.parentNode.parentNode);
      }
      
      while (index <  document.getElementById('Settings').children[0].children.length &&
             (document.getElementById('Settings').children[0].children[index].children[0].className =="Separador" || 
              document.getElementById('Settings').children[0].children[index].children[0].className =="LabelSeparador" ||
              document.getElementById('Settings').children[0].children[index].children[0].children[1].children[0].children[0].disabled ||
              document.getElementById('Settings').children[0].children[index].style.display == "none")){
              
        index ++
      }
      
      if (index < document.getElementById('Settings').children[0].children.length){
        document.getElementById('Settings').children[0].children[index].children[0].children[1].children[0].children[0].focus()
      }else{
        document.getElementById('Settings-botones').children[0].focus()
      }
      break;
  }
}

function AlertKeyDown(e){
  switch (e.keyCode) {
    case 8: //Atras
      e.preventDefault(); 
      dialog.closeall()
      break;
      
    case 38: //UP
      e.preventDefault(); 
      if (e.target.parentNode.parentNode.id=="Alert-popup"){document.activeElement.parentNode.parentNode.children[0].focus()}
      break;
      
    case 40: //DOWN
      e.preventDefault();
      if (e.target.parentNode.id=="Alert-popup"){document.activeElement.parentNode.children[3].children[0].focus()}
      break;
  }
}

function ProgressKeyDown(e){
  switch (e.keyCode) {
    case 8: //Atras
      e.preventDefault(); 
      dialog.closeall()
      break;
      
    case 38: //UP
      e.preventDefault(); 
      if (e.target.parentNode.parentNode.id=="ProgressBar-popup"){document.activeElement.parentNode.parentNode.children[0].focus()}
      break;
      
    case 40: //DOWN
      e.preventDefault(); 
      if (e.target.parentNode.id=="ProgressBar-popup"){document.activeElement.parentNode.children[4].children[0].focus()}
      break;
  }
}

function AlertYesNoKeyDown(e){
  switch (e.keyCode) {
    case 8: //Atras
      e.preventDefault(); 
      dialog.closeall()
      break;
    case 38: //UP
      e.preventDefault(); 
      if (e.target.parentNode.parentNode.id=="AlertYesNo-popup"){document.activeElement.parentNode.parentNode.children[0].focus()}
      break;
      
    case 37: //Left
      e.preventDefault(); 
      if (e.target.parentNode.parentNode.id=="AlertYesNo-popup"){
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
        document.activeElement.parentNode.children[index-1].focus()
      }
      break;
      
    case 39: //RIGHT
      e.preventDefault(); 
      if (e.target.parentNode.parentNode.id=="AlertYesNo-popup"){
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
        document.activeElement.parentNode.children[index+1].focus()
      }
      break;
      
    case 40: //DOWN
      e.preventDefault(); 
      if (e.target.parentNode.id=="AlertYesNo-popup"){document.activeElement.parentNode.children[3].children[0].focus()}
      break;
  }
}

function KeyboardKeyDown(e){
  switch (e.keyCode) {
    case 8: //Atras
      if (e.target.id != "Keyboard-Text"){
        e.preventDefault(); 
        dialog.closeall()
      }
      break;
    case 38: //UP
      e.preventDefault(); 
      if (e.target.parentNode.parentNode.id=="Keyboard-popup"){document.activeElement.parentNode.parentNode.children[2].children[0].children[0].focus()}
      if (e.target.parentNode.parentNode.parentNode.id=="Keyboard-popup"){document.activeElement.parentNode.parentNode.parentNode.children[0].focus()}

      break;
      
    case 37: //Left
       
      if (e.target.parentNode.parentNode.id=="Keyboard-popup"){
        e.preventDefault();
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
        document.activeElement.parentNode.children[index-1].focus()
      }
      break;
      
    case 39: //RIGHT
       
      if (e.target.parentNode.parentNode.id=="Keyboard-popup"){
        e.preventDefault();
        index = Array.prototype.indexOf.call(document.activeElement.parentNode.children, document.activeElement);
        document.activeElement.parentNode.children[index+1].focus()
      }
      break;
      
    case 40: //DOWN
      e.preventDefault(); 
      if (e.target.parentNode.id=="Keyboard-popup"){document.activeElement.parentNode.children[2].children[0].children[0].focus()}
      if (e.target.parentNode.parentNode.parentNode.id=="Keyboard-popup"){document.activeElement.parentNode.parentNode.parentNode.children[3].children[0].focus()}
      break;
  }
}

function Buscar(keyCode) {
  switch (keyCode) {
    case 96:
      keychar["keyCode"]=keyCode
      keychar["Char"] = "0"
      break;
      
    case 97:
      keychar["keyCode"]=keyCode
      keychar["Char"] = "1"
      break;
      
    case 98:
      if (keychar["keyCode"]==keyCode){
        switch (keychar["Char"]){
          case "a":
            keychar["Char"] = "b"
            break;
          case "b":
            keychar["Char"] = "c"
            break;
          case "c":
            keychar["Char"] = "2"
            break;
          case "2":
            keychar["Char"] = "a"
            break;
        }
      }else{
        keychar["keyCode"]=keyCode
        keychar["Char"] = "a"
      }       
      break;
      
    case 99:
      if (keychar["keyCode"]==keyCode){
        switch (keychar["Char"]){
          case "d":
            keychar["Char"] = "e"
            break;
          case "e":
            keychar["Char"] = "f"
            break;
          case "f":
            keychar["Char"] = "3"
            break;
          case "3":
            keychar["Char"] = "d"
            break;
        }
      }else{
        keychar["keyCode"]=keyCode
        keychar["Char"] = "d"
      }   
      break;
      
    case 100:
      if (keychar["keyCode"]==keyCode){
        switch (keychar["Char"]){
          case "g":
            keychar["Char"] = "h"
            break;
          case "h":
            keychar["Char"] = "i"
            break;
          case "i":
            keychar["Char"] = "4"
            break;
          case "4":
            keychar["Char"] = "g"
            break;
        }
      }else{
        keychar["keyCode"]=keyCode
        keychar["Char"] = "g"
      }
      break;
      
    case 101:
      if (keychar["keyCode"]==keyCode){
        switch (keychar["Char"]){
          case "j":
            keychar["Char"] = "k"
            break;
          case "k":
            keychar["Char"] = "l"
            break;
          case "l":
            keychar["Char"] = "5"
            break;
          case "5":
            keychar["Char"] = "j"
            break;
        }
      }else{
        keychar["keyCode"]=keyCode
        keychar["Char"] = "j"
      }
      break;
      
    case 102:
      if (keychar["keyCode"]==keyCode){
        switch (keychar["Char"]){
          case "m":
            keychar["Char"] = "n"
            break;
          case "n":
            keychar["Char"] = "o"
            break;
          case "o":
            keychar["Char"] = "6"
            break;
          case "6":
            keychar["Char"] = "m"
            break;
        }
      }else{
        keychar["keyCode"]=keyCode
        keychar["Char"] = "m"
      }
      break;
      
    case 103:
      if (keychar["keyCode"]==keyCode){
        switch (keychar["Char"]){
          case "p":
            keychar["Char"] = "q"
            break;
          case "q":
            keychar["Char"] = "r"
            break;
          case "r":
            keychar["Char"] = "s"
            break;
          case "s":
            keychar["Char"] = "7"
            break;
          case "7":
            keychar["Char"] = "p"
            break;
        }
      }else{
        keychar["keyCode"]=keyCode
        keychar["Char"] = "p"
      }
      break;
      
    case 104:
      if (keychar["keyCode"]==keyCode){
        switch (keychar["Char"]){
          case "t":
            keychar["Char"] = "u"
            break;
          case "u":
            keychar["Char"] = "u"
            break;
          case "v":
            keychar["Char"] = "8"
            break;
          case "8":
            keychar["Char"] = "t"
            break;
        }
      }else{
        keychar["keyCode"]=keyCode
        keychar["Char"] = "t"
      }
      break;
      
    case 105:
      if (keychar["keyCode"]==keyCode){
        switch (keychar["Char"]){
          case "x":
            keychar["Char"] = "y"
            break;
          case "y":
            keychar["Char"] = "z"
            break;
          case "z":
            keychar["Char"] = "w"
            break;
          case "w":
            keychar["Char"] = "9"
            break;
          case "9":
            keychar["Char"] = "x"
            break;
        }
      }else{
        keychar["keyCode"]=keyCode
        keychar["Char"] = "x"
      }
      break;

  }
  for (x = 2; x < document.getElementById("itemlist").children.length; x++) {
  if ( document.getElementById("itemlist").children[x].children[0].children[1].innerHTML.toLowerCase().indexOf(keychar["Char"])===0){
  document.getElementById("itemlist").children[x].children[0].focus()
  break;
  }
  }
  
  
}



document.onkeypress = function(e) {
    if ((e || window.event).keyCode === 32) {
        if(media.paused) media.play(); else media.pause();
    }
};

document.ondblclick = function(){
    if (media.requestFullscreen) {
        media.requestFullscreen();
    }else if(media.mozRequestFullScreen) {
        media.mozRequestFullScreen();
    }else if (media.webkitRequestFullscreen) {
        media.webkitRequestFullscreen();
  }
};