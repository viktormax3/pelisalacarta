
loading.close = function() {  
  if (document.getElementById("Loading").style.display == "block"){
    document.getElementById("Loading").style.display="none";
    document.getElementById("Overlay").style.display="none";
    try{ 
      focused_item.focus()
    }catch(e){
      try{ 
        document.getElementById("itemlist").children[0].children[0].focus();
      }catch(e){
      }
    }
  }
}
loading.show = function(message){
  if (!message){message= "Cargando..."}
  document.getElementById("Loading-Text").innerHTML = message;
  document.getElementById("Overlay").style.display="block";
  document.getElementById("Loading").style.display="block";
  document.getElementById("Loading").children[0].focus();
  document.getElementById("Loading").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("Loading").offsetHeight / 2 + "px"
}


dialog.closeall = function() {
  document.getElementById('Overlay').style.display='none';
  document.getElementById("Loading").style.display="none";
  document.getElementById("Lista-popup").style.display="none";
  document.getElementById("Config-popup").style.display="none";
  document.getElementById("Settings-popup").style.display="none";
  document.getElementById("Player-popup").style.display="none";
  document.getElementById("Player").innerHTML=''
  document.getElementById("Alert-popup").style.display="none";
  document.getElementById("AlertYesNo-popup").style.display="none";
  document.getElementById("Keyboard-popup").style.display="none";
  document.getElementById("ProgressBar-popup").style.display="none";
  document.getElementById("Info-popup").style.display="none";
  try{ 
    focused_item.focus()
  }catch(e){
    try{ 
      document.getElementById("itemlist").children[0].children[0].focus();
    }catch(e){
    }
  }
}

dialog.menu = function(title,list) {
  if (list){
    document.getElementById("Overlay").style.display="block"
    document.getElementById("Lista-titulo").innerHTML = title;
    document.getElementById("Lista").innerHTML =atob(list);
    document.getElementById("Lista-popup").style.display="block";
    document.getElementById("Lista").children[0].children[0].focus()
    document.getElementById("Lista-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("Lista-popup").offsetHeight / 2 + "px"  
  }
}

dialog.select = function(id,data) {
  document.getElementById("Overlay").style.display="block"
  document.getElementById("Lista-titulo").innerHTML = data.title;
  document.getElementById("Lista-popup").RequestID = id
  Lista = []
  for(var x in data.list){
    Lista.push(replace_list(html.dialog.select.item, {"item_title": data.list[x], "item_action": "send_data({'id':'"+response["id"]+"', 'result':"+x+"})"}))
  }
  document.getElementById("Lista").innerHTML =Lista.join("");
  document.getElementById("Lista-popup").style.display="block";
  document.getElementById("Lista").children[0].children[0].focus()
  document.getElementById("Lista-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("Lista-popup").offsetHeight / 2 + "px"  
}

dialog.player = function(Title,Player) {
  document.getElementById("Overlay").style.display="block"
  document.getElementById("Player-titulo").innerHTML = atob(Title);
  document.getElementById("Player").innerHTML = Player;
  document.getElementById("Player-popup").style.display="block";
  document.getElementById("Player-popup").children[0].focus()
  document.getElementById("Player-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("Player-popup").offsetHeight / 2 + "px"  
  
  setTimeout(function() {
        document.getElementById("Player-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("Player-popup").offsetHeight / 2 + "px"  
  }, 500);
}

dialog.ok = function(id,data) {

  document.getElementById("Overlay").style.display="block";
  document.getElementById("Alert-popup").style.display="block";
  document.getElementById("Alert-popup").RequestID = id
  document.getElementById("Alert-Text").innerHTML = data["text"].replace(new RegExp("\n", 'g'), "<br/>")
  document.getElementById("Alert-Titulo").innerHTML = data["title"];
  document.getElementById("Alert-popup").children[3].children[0].focus()
  document.getElementById("Alert-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("Alert-popup").offsetHeight / 2 + "px"
}

dialog.yesno = function(id,data){
  document.getElementById("Overlay").style.display="block";
  document.getElementById("AlertYesNo-popup").style.display="block";
  document.getElementById("AlertYesNo-popup").RequestID = id
  document.getElementById("AlertYesNo-Text").innerHTML = data.text.replace(new RegExp("\n", 'g'), "<br/>")
  document.getElementById("AlertYesNo-Titulo").innerHTML = data.title;
  document.getElementById("AlertYesNo-popup").children[3].children[0].focus()
  document.getElementById("AlertYesNo-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("AlertYesNo-popup").offsetHeight / 2 + "px"
}


dialog.keyboard = function(id,data) {
  if (data.title === "") {data.title = "Teclado";}
  if (data.password == true) {document.getElementById("Keyboard-Text").type = "password"}
  else {document.getElementById("Keyboard-Text").type = "text"}
  document.getElementById("Keyboard-popup").RequestID = id
  document.getElementById("Overlay").style.display="block";
  document.getElementById("Keyboard-popup").style.display="block";
  document.getElementById("Keyboard-Text").value = data.text
  document.getElementById("Keyboard-Titulo").innerHTML = data.title
  document.getElementById("Keyboard-popup").children[2].children[0].children[0].focus()
  document.getElementById("Keyboard-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("Keyboard-popup").offsetHeight / 2 + "px"
}

dialog.progress_bg = function(id,data) {
  document.getElementById("ProgressBarBG-popup").style.display="block";
  document.getElementById("ProgressBarBG-popup").RequestID = id
  document.getElementById("ProgressBarBG-Text").innerHTML = data.text.replace(new RegExp("\n", 'g'), "<br/>")
  document.getElementById("ProgressBarBG-Titulo").innerHTML = data.title
  document.getElementById("ProgressBarBG-Abance").style.width = data.percent + "%";
}

dialog.progress_bg_close = function (){
  document.getElementById("ProgressBarBG-popup").style.display="none";
}

dialog.progress = function(id,data) {
  document.getElementById("ProgressBar-popup").RequestID = id
  document.getElementById("Overlay").style.display="block";
  document.getElementById("ProgressBar-popup").style.display="block";
  document.getElementById("ProgressBar-Text").innerHTML = data.text.replace(new RegExp("\n", 'g'), "<br/>")
  document.getElementById("ProgressBar-Titulo").innerHTML = data.title
  document.getElementById("ProgressBar-Cancelled").checked = "";
  document.getElementById("ProgressBar-Abance").style.width = data.percent + "%";
  document.getElementById("ProgressBar-popup").children[4].children[0].focus()
  document.getElementById("ProgressBar-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("ProgressBar-popup").offsetHeight / 2 + "px"
}

dialog.progress_update = function(id,data) {
  document.getElementById("ProgressBar-Text").innerHTML = data.text.replace(new RegExp("\n", 'g'), "<br/>")
  if (document.getElementById("ProgressBar-Cancelled").checked !="") {
    document.getElementById("ProgressBar-Titulo").innerHTML = data.title + " " + data.percent + "% - Cancelando...";
  } else {
  document.getElementById("ProgressBar-Titulo").innerHTML = data.title + " " + data.percent + "%";
  }
  document.getElementById("ProgressBar-Abance").style.width = data.percent + "%";
}

dialog.progress_close = function() {
  document.getElementById("Overlay").style.display="none";
  document.getElementById("ProgressBar-popup").style.display="none";
  focused_item.focus()
}

dialog.config = function(id, data, Secciones,Lista){
  document.getElementById("Config-popup").RequestID = id
  document.getElementById("Config").innerHTML = Lista;
  document.getElementById("Config-Titulo").innerHTML = data.title;
  if (data["custom_button"] != null){
    document.getElementById("custom_button").innerHTML = data.custom_button.label;
    document.getElementById("custom_button").onclick = function(){custom_button(data.custom_button)};
  }else{
    document.getElementById("custom_button").innerHTML = "Por defecto";
    document.getElementById("custom_button").onclick = function(){custom_button(null)};
  }
  if (Secciones != ""){
    document.getElementById("Config-secciones").innerHTML = Secciones
    document.getElementById("Config-secciones").style.display="block";
    document.getElementById("Config-General").style.display="block";
    
  } else {
    document.getElementById("Config-secciones").style.display="none";
    document.getElementById("Config-undefined").style.display="block";
    
  }
  
  document.getElementById("Overlay").style.display="block";
  document.getElementById("Config-popup").style.display="block";
  if (Secciones != ""){
    document.getElementById("Config-popup").children[2].children[0].focus()
    document.getElementById("Config-General").scrollTop = 0;
  } else {
    document.getElementById("Config-popup").children[4].children[0].focus()
    document.getElementById("Config-undefined").scrollTop = 0;
  }
  document.getElementById("Config-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("Config-popup").offsetHeight / 2 + "px"
}

dialog.settings = function(){
  
  document.getElementById("Settings-Titulo").innerHTML = "Ajustes";
  controls = []
  
  controls.push(replace_list(html.config.label,{"item_color": "#FFFFFF", "item_label": "Visualización:"}))
  if (settings.show_fanart){
    value = "checked=checked"
  }else {
    value = ""
  }
  controls.push(replace_list(html.config.bool,{"item_color": "#FFFFFF", "item_label": "Mostrar Fanarts", "item_id": "show_fanart", "item_value": value}))
  
  controls.push(replace_list(html.config.label,{"item_color": "#FFFFFF", "item_label": "Reproducción:"}))
  
  options = ["<option>Preguntar</option>", "<option>Indirecto</option>", "<option>Directo</option>"]
  options[settings.play_mode] = options[settings.play_mode].replace("<option>","<option selected=selected>")
  controls.push(replace_list(html.config.list,{"item_type": "enum","item_color": "#FFFFFF", "item_label": "Método de reproduccion:", "item_id": "play_mode", "item_values": options.join("")}))

  options = ["<option>Preguntar</option>"]
  for (var player in players){
    options.push("<option>" + players[player] + "</option>")
  }
  options[settings.player_mode] = options[settings.player_mode].replace("<option>","<option selected=selected>")
  controls.push(replace_list(html.config.list,{"item_type": "enum","item_color": "#FFFFFF", "item_label": "Reproductor:", "item_id": "player_mode", "item_values": options.join("")}))

  document.getElementById("Settings").innerHTML = replace_list(html.config.container,{"item_id": "Settings-controls", "item_value": controls.join("").replace(/evaluate_controls\(this\)/g, '')});
  document.getElementById("Settings-controls").style.display="block";
  document.getElementById("Overlay").style.display="block";
  document.getElementById("Settings-popup").style.display="block";
  document.getElementById("Settings-popup").children[0].focus()
  document.getElementById("Settings-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("Settings-popup").offsetHeight / 2 + "px"
}

dialog.info = function(id, data){
  document.getElementById("Info-popup").RequestID = id
  document.getElementById("Info-Titulo").innerHTML = data.title;
  document.getElementById("Info-Background").src = data.fanart;
  document.getElementById("Info-Image").src = data.thumbnail;

  if (data.buttons){ //Activar botones
    document.getElementById("Info-Botones").style.display="block";
    document.getElementById("Info-Numero").innerHTML = data.count;
    if (data.previous){
     document.getElementById("Info-BotonAnterior").onclick = function(){InfoWindow('previous')}
     document.getElementById("Info-BotonAnterior").className  = "Boton"    
    }else {
     document.getElementById("Info-BotonAnterior").onclick = ""
     document.getElementById("Info-BotonAnterior").className  = "Boton Disabled"
    }
    if (data.next){
     document.getElementById("Info-BotonSiguiente").onclick = function(){InfoWindow('next')}
     document.getElementById("Info-BotonSiguiente").className  = "Boton"    
    }else {
     document.getElementById("Info-BotonSiguiente").onclick = ""
     document.getElementById("Info-BotonSiguiente").className  = "Boton Disabled"
    }
  }else{
    document.getElementById("Info-Botones").style.display="none";
  }
  
  document.getElementById("Info-Head1").innerHTML = data["lines"][0]["title"];
  document.getElementById("Info-Head2").innerHTML = data["lines"][1]["title"];
  document.getElementById("Info-Head3").innerHTML = data["lines"][2]["title"];
  document.getElementById("Info-Head4").innerHTML = data["lines"][3]["title"];
  document.getElementById("Info-Head5").innerHTML = data["lines"][4]["title"];
  document.getElementById("Info-Head6").innerHTML = data["lines"][5]["title"];
  document.getElementById("Info-Head7").innerHTML = data["lines"][6]["title"];
  document.getElementById("Info-Head8").innerHTML = data["lines"][7]["title"];
  
  
  document.getElementById("Info-Line1").innerHTML = data["lines"][0]["text"];
  document.getElementById("Info-Line2").innerHTML = data["lines"][1]["text"];
  document.getElementById("Info-Line3").innerHTML = data["lines"][2]["text"];
  document.getElementById("Info-Line4").innerHTML = data["lines"][3]["text"];
  document.getElementById("Info-Line5").innerHTML = data["lines"][4]["text"];
  document.getElementById("Info-Line6").innerHTML = data["lines"][5]["text"];
  document.getElementById("Info-Line7").innerHTML = data["lines"][6]["text"];
  document.getElementById("Info-Line8").innerHTML = data["lines"][7]["text"];
  
  if(document.getElementById("Info-popup").style.display == "block"){update=true}else{update = false}
  
  document.getElementById("Overlay").style.display="block";
  document.getElementById("Info-popup").style.display="block";
  
  auto_scroll(document.getElementById("Info-Line1"))
  auto_scroll(document.getElementById("Info-Line2"))
  auto_scroll(document.getElementById("Info-Line3"))
  auto_scroll(document.getElementById("Info-Line4"))
  auto_scroll(document.getElementById("Info-Line5"))
  auto_scroll(document.getElementById("Info-Line6"))
  auto_scroll(document.getElementById("Info-Line7"))
  auto_scroll(document.getElementById("Info-Line8"))


  
  if (data["buttons"]){
    if (!update){document.getElementById("Info-popup").children[3].children[3].focus();}
  }else{
    document.getElementById("Info-popup").children[0].focus();
  }

  document.getElementById("Info-popup").style.top = document.getElementById("Pagina").offsetHeight / 2 - document.getElementById("Info-popup").offsetHeight / 2 + "px"
}