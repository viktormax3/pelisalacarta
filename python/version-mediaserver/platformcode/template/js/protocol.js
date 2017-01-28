var default_settings = {}
var controls = []
function get_response(data) {
    response = JSON.parse(data)
    data = response.data;

    switch (response.action) {
        case "connect":
            document.getElementById("Version").innerHTML = data.version
            document.getElementById("Date").innerHTML = data.date
            ID = response.id
            break;
            
        case "EndItems":
           
            item_list = []
            
            for (var item in data.itemlist){
              context_items = [];
              item = data.itemlist[item]
              if (item.thumbnail.indexOf("http") != 0){item.thumbnail = data.host +"/local/"+encodeURIComponent(btoa(item.thumbnail))}
              if (item.action == "go_back"){item.url = "go_back"}
              
              if (item.context.length){
                for (var x in item.context) {
                  html_item = replace_list(html.dialog.select.item,{"item_action": "send_request('"+item.context[x].url+"')", "item_title":item.context[x].title})
                  context_items.push(html_item)                
                }
                menu_button = replace_list(html.itemlist.menu,{"menu_items": btoa(context_items.join(""))})
                menu_class = "ListItemMenu"
              } else{
                menu_button = "";
                menu_class = "";
              }
              
              replace_dict = {"item_class": menu_class, 
                              "item_url": item.url, 
                              "item_thumbnail":item.thumbnail, 
                              "item_fanart":item.fanart, 
                              "item_title": item.title, 
                              "item_plot": item.plot,
                              "item_menu": menu_button,
                              "menu_items": btoa(context_items.join(""))
                             }
              
              
              if (html.itemlist[data.viewmode]){
                html_item = replace_list(html.itemlist[data.viewmode], replace_dict)
              }else {
                html_item = replace_list(html.itemlist.movie, replace_dict)
              }
              item_list.push(html_item)
              
            }

            document.getElementById("itemlist").innerHTML = item_list.join("") ;
            set_category(data.category)
            document.getElementById("itemlist").children[0].children[0].focus();
            document.getElementById("itemlist").scrollTop = 0;
 
            nav_history.newResponse(item_list, data.category)

            
            //console.debug(nav_history)
            send_data({"id":response.id, "result":true });
            loading.close()     
            break;

        case "Refresh":
            send_request(nav_history.states[nav_history.current].url);
            send_data({"id":response.id, "result":true });
            break;
            
        case "Alert":
            loading.close()
            dialog.ok(response.id,data)
            break;
            
        case "AlertYesNo":
            loading.close()
            dialog.yesno(response.id,data)
            break;
            
        case "ProgressBG":
            dialog.progress_bg(response.id,data)
            send_data({"id":response.id, "result":true });
            break;
            
        case "ProgressBGUpdate":
            dialog.progress_bg(response.id,data)
            break;
            
        case "ProgressBGClose":
            dialog.progress_bg_close();
            send_data({"id":response.id, "result":true });
            break;
            
        case "Progress":
            loading.close()
            dialog.progress(response.id,data)
            send_data({"id":response.id, "result":true });
            break;
            
        case "ProgressUpdate":
            dialog.progress_update(response.id,data)
            break;
            
        case "ProgressClose":
            dialog.progress_close();
            send_data({"id":response.id, "result":true });
            loading.close()
            break;
            
        case "ProgressIsCanceled":
            send_data({"id":response.id, "result":document.getElementById("ProgressBar-Cancelled").checked !="" });
            break;
            
        case "isPlaying":
            send_data({"id":response.id, "result": document.getElementById("Player-popup").style.display=="block" || document.getElementById("Lista-popup").style.display=="block"});
            break;
            
        case "Keyboard":
            loading.close()
            dialog.keyboard(response.id,data);
            break;
            
        case "List":
            loading.close() 
            dialog.select(response.id,data)
            break;
            
        case "Play":
            send_data({"id":response.id, "result":true });
            loading.close()
            
            if(!new RegExp("^(.+://)").test(data.video_url)){
             data.video_url = data.host + "/local/" + encodeURIComponent(btoa(Utf8.encode(data.video_url))) + "/video.mp4"}
             
            else if(new RegExp("^(?:http\://.*?\.vkcache\.com)").test(data.video_url)){
             data.video_url = data.host + "/netutv-" + encodeURIComponent(btoa(Utf8.encode(data.video_url))) + ".mp4"} 
            
            ProxyUrl = data.host + "/proxy/" + encodeURIComponent(btoa(Utf8.encode(data.video_url))) + "/video.mp4"
            lista = []
            lista.push(replace_list(html.dialog.select.item, {"item_title": "Abrir Enlace", "item_action":"play('"+data.video_url+"','"+btoa(data.title)+"')"}))
            lista.push(replace_list(html.dialog.select.item, {"item_title": "Plugin VLC", "item_action":"vlc_play('"+data.video_url+"','"+btoa(data.title)+"')"}))
            
            lista.push(replace_list(html.dialog.select.item, {"item_title": "Reroductor flash", "item_action":"flash_play('"+data.video_url+"','"+btoa(data.title)+"')"}))           
            lista.push(replace_list(html.dialog.select.item, {"item_title": "Reroductor Flash (Indirecto)", "item_action":"flash_play('"+ProxyUrl+"','"+btoa(data.title)+"')"}))
            
            lista.push(replace_list(html.dialog.select.item, {"item_title": "Video HTML", "item_action":"html_play('"+data.video_url+"','"+btoa(data.title)+"')"}))
            lista.push(replace_list(html.dialog.select.item, {"item_title": "Video HTML (Indirecto)", "item_action":"html_play('"+ProxyUrl+"','"+btoa(data.title)+"')"}))
            
            dialog.menu("Elige el Reproductor", btoa(lista.join("")))

            break;
        case "Update":
            send_request(data.url);
            loading.close()
            break;
        case "HideLoading":
            loading.close()
            break;
        case "OpenInfo":
            loading.close()
            dialog.info(response.id, data)
            break;

        case "OpenConfig":
            loading.close()
            itemlist = {};
            default_settings = {}
            controls = []
            
            for (var x in data.items) {
                
                if (!itemlist[data.items[x].category]) {
                    itemlist[data.items[x].category] = [];
                }
                if (data.items[x].id){
                  default_settings[data.items[x].id] = data.items[x]["default"]
                }
                
                controls.push(data.items[x])
                
                switch (data.items[x].type) {
                    case "sep":
                        itemlist[data.items[x].category].push(replace_list(html.config.sep,{}))
                        break;
                        
                    case "lsep" :
                    case "label":
                        itemlist[data.items[x].category].push(replace_list(html.config.label,{"item_color": data.items[x].color, "item_label": data.items[x].label}))
                        break;
                        
                    case "number":
                    case "text":
                        if (data.items[x].hidden){
                          type = "password"
                        }else {
                          type = "text"
                        }
                        itemlist[data.items[x].category].push(replace_list(html.config.text,{"item_color": data.items[x].color, "item_label": data.items[x].label, "item_id": data.items[x].id, "item_value": data.items[x].value, "item_type": type}))
                        break;
                        
                    case "bool":
                        if (data.items[x].value == "true" || data.items[x].value == true){
                          value = "checked='checked'"
                        }else{
                          value = ""
                        }
                        itemlist[data.items[x].category].push(replace_list(html.config.bool,{"item_color": data.items[x].color, "item_label": data.items[x].label, "item_id": data.items[x].id, "item_value": value}))
                        break;
                        
                    case "labelenum":
                        if (!data.items[x].values) {
                            values = data.items[x].lvalues.split("|");
                        } else {
                            values = data.items[x].values.split("|");
                        }
                        
                        options = [];
                        for (var y in values) {
                            if (data.items[x].value == values[y]) {
                              options.push("<option selected=selected>" + values[y] +"</option>")                                   
                            } else {
                              options.push("<option>" + values[y] +"</option>") 
                            }
                        }
                        itemlist[data.items[x].category].push(replace_list(html.config.list,{"item_type": "labelenum","item_color": data.items[x].color, "item_label": data.items[x].label, "item_id": data.items[x].id, "item_values": options}))
                        break;
                        
                    case "list":
                        options = [];
                        for (var y in data.items[x].lvalues) {
                            if (data.items[x].value == y) {
                              options.push("<option selected=selected>" + data.items[x].lvalues[y] +"</option>")                                   
                            } else {
                              options.push("<option>" + data.items[x].lvalues[y] +"</option>") 
                            }
                        }

                        itemlist[data.items[x].category].push(replace_list(html.config.list,{"item_type": "enum","item_color": data.items[x].color, "item_label": data.items[x].label, "item_id": data.items[x].id, "item_values": options}))
                        break;

                    case "enum":
                        if (!data.items[x].values) {
                            values = data.items[x].lvalues.split("|");
                        } else {
                            values = data.items[x].values.split("|");
                        }
                        
                        options = [];
                        for (var y in values) {
                            if (data.items[x].value == y) {
                              options.push("<option selected=selected>" + values[y] +"</option>")                                   
                            } else {
                              options.push("<option>" + values[y] +"</option>") 
                            }
                        }

                        itemlist[data.items[x].category].push(replace_list(html.config.list,{"item_type": "enum","item_color": data.items[x].color, "item_label": data.items[x].label, "item_id": data.items[x].id, "item_values": options}))
                        break;
                    default:
                        break;
                }

            }
            categories = [];
            category_list = [];

            for (var category in itemlist) {
            
                    if (Object.keys(itemlist).length > 1 || category !="undefined"){
                      categories.push(replace_list(html.config.category,{"item_label": category, "item_category": category}))
                    }
                    category_list.push(replace_list(html.config.container,{"item_id": "Config-" + category, "item_value": itemlist[category].join("")}))

            }
            dialog.config(response.id,data, categories.join(""), category_list.join(""))
            evaluate_controls()
            break;

        default:
            break;
    }
}

function custom_button(data) {
        if (data == null){
            Objetos = document.getElementById("Config-popup").getElementsByTagName("input")
            
            for(x=0;x<Objetos.length;x++){
              switch (Objetos[x].type) {
                    case "text":
                        Objetos[x].value = default_settings[Objetos[x].id]
                        break;
                    case "password":
                        Objetos[x].value = default_settings[Objetos[x].id]
                        break;
                    case "checkbox":
                        value = default_settings[Objetos[x].id]
                        if (value == true) {
                          value = "checked"
                        } else{
                          value = ""
                        }
                        Objetos[x].checked = value
                        break;
                }
            }
            Objetos = document.getElementById("Config-popup").getElementsByTagName("select")
            for(x=0;x<Objetos.length;x++){
              switch (Objetos[x].type) {
                    case "select-one":
                        if (Objetos[x].name == "enum"){
                          Objetos[x].selectedIndex = default_settings[Objetos[x].id]
                        } else if (Objetos[x].name == "labelenum"){
                          Objetos[x].value = default_settings[Objetos[x].id]
                        }
                        break;
                }
            }
          evaluate_controls()
        } else{
        
        send_data({"id":document.getElementById("Config-popup").RequestID, "result":"custom_button" });
        if (data["close"] == true){dialog.closeall();};
        }

}
function InfoWindow(Comando) {
    send_data({"id":document.getElementById("Info-popup").RequestID, "result":Comando });
}

function GuardarConfig(Guardar) {
    var Ajustes = {};
    if (Guardar === true) {
        JsonAjustes = {};
        Objetos = document.getElementById("Config-popup").getElementsByTagName("input")
        
        for(x=0;x<Objetos.length;x++){
          switch (Objetos[x].type) {
                case "text":
                    JsonAjustes[Objetos[x].id] = Objetos[x].value;
                    break;
                case "password":
                    JsonAjustes[Objetos[x].id] = Objetos[x].value;
                    break;
                case "checkbox":
                    JsonAjustes[Objetos[x].id] = Objetos[x].checked.toString();
                    break;
            }
        }
        Objetos = document.getElementById("Config-popup").getElementsByTagName("select")
        for(x=0;x<Objetos.length;x++){
          switch (Objetos[x].type) {
                case "select-one":
                    if (Objetos[x].name == "enum"){
                      JsonAjustes[Objetos[x].id] = Objetos[x].selectedIndex.toString();
                    } else if (Objetos[x].name == "labelenum"){
                      JsonAjustes[Objetos[x].id] = Objetos[x].value;
                    }
                    break;
            }
        }
        send_data({"id":document.getElementById("Config-popup").RequestID, "result":JsonAjustes });
    } else {
        send_data({"id":document.getElementById("Config-popup").RequestID, "result":false });
    }
    
    loading.show()
}



function evaluate_controls(control_changed) {
  if (typeof control_changed != "undefined"){
    for (var x in controls){
      if (controls[x].id == control_changed.id) {
        switch (control_changed.type) {
          case "text":
              controls[x].value = control_changed.value;
              break;
          case "password":
              controls[x].value = control_changed.value;
              break;
          case "checkbox":
              controls[x].value = control_changed.checked
              break;
          case "select-one":
              if (control_changed.name == "enum"){
                controls[x].value = control_changed.selectedIndex
              } else if (control_changed.name == "labelenum"){
                controls[x].value = control_changed.value;
              }
              break;
        }
        break;
      }
    }
  }
  
  for (var index in controls){
    control = get_control_group(index)
    set_visible(document.getElementById("Config").children[control[0]].children[control[1]], evaluate(index, controls[index].visible))
    set_enabled(document.getElementById("Config").children[control[0]].children[control[1]], evaluate(index, controls[index].enabled))
  }
}

function set_visible(element, visible){
    if (visible){
      element.style.display = "block"    
    } else {
      element.style.display = "none"    
    }
}

function set_enabled(element, enabled){
  if (["Separador", "LabelSeparador"].indexOf(element.children[0].className) == -1){
    element.children[0].children[1].children[0].children[0].disabled = !enabled
  }
}


function get_control_group(index){
  var group = 0;
  var pos = 0;
  var children = document.getElementById("Config").children;
  for(child in children){
    if (pos + children[child].children.length <= index){
    group ++
    pos += children[child].children.length
    } else {
      break;
    }

  }
  return [group, index - pos]
}


function evaluate(index, condition){
  index = parseInt(index)
  
  if (typeof condition == "undefined"){return true}
  if (typeof condition == "boolean"){return condition}

  if (condition.toLocaleLowerCase() == "true") { return true}
  else if (condition.toLocaleLowerCase() == "false") {return false}   

  const regex = /(!?eq|!?gt|!?lt)?\(([^,]+),[\"|']?([^)|'|\"]*)['|\"]?\)[ ]*([+||])?/g;

  while ((m = regex.exec(condition)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    
    var operator = m[1]
    var id = parseInt(m[2])
    var value = m[3]
    var next = m[4]

    if (isNaN(id)){return false}

    if (index + id < 0 || index + id >= controls.length){
      return false
    }else{
      if (controls[index + id].type == "list" || controls[index + id].type == "enum"){
        control_value = controls[index + id].lvalues[controls[index + id].value]
      }else{
        control_value = controls[index + id].value
      }
    } 

    if (["lt", "!lt", "gt", "!gt"].indexOf(operator) > -1){
      value = parseInt(value) 
      if (isNaN(value)){return false}
    }
    
    if (["eq", "!eq"].indexOf(operator) > -1){

      if (!isNaN(parseInt(value))){value = parseInt(value)}
      if (value.toLocaleLowerCase() == "true") { value = true}
      else if (value.toLocaleLowerCase() == "false") {value = false}  
    }
    
    if (operator == "eq") {
      ok = (control_value == value)
    }
    if (operator == "!eq") {
      ok = !(control_value == value)
    }
    if (operator == "gt") {
      ok = (control_value > value)
    }
    if (operator == "!gt") {
      ok = !(control_value > value)
    }
    if (operator == "lt") {
      ok = (control_value < value)
    }
    if (operator == "!lt") {
      ok = !(control_value < value)
    }

    if (next == "|" && ok == true) {break}
    if (next == "+" && ok == false) {break}
  }
  return ok
}
