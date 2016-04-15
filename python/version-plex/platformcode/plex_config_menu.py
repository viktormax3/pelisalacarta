# -*- coding: utf-8 -*-
#------------------------------------------------------------
# pelisalacarta - XBMC Plugin
# Lista de vídeos descargados
# http://blog.tvalacarta.info/plugin-xbmc/pelisalacarta/
#------------------------------------------------------------
# venta de configuración por canales para PLEX


import os
import re
from core import logger
from core import config
from core.item import Item
from core import jsontools as json
from core import channeltools
import inspect

__channel__ ="platformcode.plex_config_menu"

params = {}
    
def isGeneric():
    return True 


def show_channel_settings(list_controls=None, dict_values=None, caption="", channelname="", callback=None,item=None):
    logger.info("[plex_config_menu] show_channel_settings")
    global params
    itemlist = []
      
    #Cuando venimos de hacer click en un control de la ventana, channelname ya se pasa como argumento, si no lo tenemos, detectamos de donde venimos
    if not channelname:
      channelpath = inspect.currentframe().f_back.f_back.f_code.co_filename
      channelname = os.path.basename(channelpath).replace(".py", "")
      
    
    #Si no tenemos list_controls, hay que sacarlos del xml del canal
    if not list_controls:      
    
      #Si la ruta del canal esta en la carpeta "channels", obtenemos los controles y valores mediante chaneltools
      if os.path.join(config.get_runtime_path(), "channels") in channelpath:
      
        # La llamada se hace desde un canal
        list_controls, default_values = channeltools.get_channel_controls_settings(channelname)
        
      #En caso contrario salimos
      else:
        return itemlist
    
    #Si no se pasan dict_values, creamos un dict en blanco
    if  dict_values == None:
      dict_values = {}
    
    #Ponemos el titulo
    if caption =="": 
      caption = str(config.get_localized_string("30100")) + " -- " + channelname.capitalize()
    elif caption.startswith('@') and unicode(caption[1:]).isnumeric():
        caption = config.get_localized_string(int(caption[1:]))
    
    
    # Añadir controles
    for c in list_controls:
    
        #Obtenemos el valor
        if not c["id"] in dict_values:
          if not callback:
              dict_values[c["id"]]= config.get_setting(c["id"],channelname)
            else:
              dict_values[c["id"]] = c["default"]

          
        # Translation
        if c['label'].startswith('@') and unicode(c['label'][1:]).isnumeric():
            c['label'] = str(config.get_localized_string(c['label'][1:]))
        if c["label"].endswith (":"): c["label"] = c["label"][:-1]
        
        if c['type'] == 'list':
            lvalues=[]
            for li in c['lvalues']:
                if li.startswith('@') and unicode(li[1:]).isnumeric():
                    lvalues.append(str(config.get_localized_string(li[1:])))
                else:
                    lvalues.append(li)
            c['lvalues'] = lvalues
    
    
        #Tipos de controles
        if c['type'] == 'label':
          titulo = c["label"]
          itemlist.append(Item(channel=__channel__, action="control_label_click", title=titulo, extra=list_controls.index(c)))
          
        if c['type'] == 'bool':
          titulo = c["label"] + ":" + (' ' * 5) + ("[X]" if dict_values[c["id"]] else "[  ]")
          itemlist.append(Item(channel=__channel__, action="control_bool_click", title=titulo, extra=list_controls.index(c)))
          
        elif c['type'] == 'list':
            titulo = c["label"] + ":" + (' ' * 5) + str(c["lvalues"][dict_values[c["id"]]])
            itemlist.append(Item(channel=__channel__, action="control_list_click", title=titulo, extra=list_controls.index(c)))
                
        elif c['type'] == 'text':
            titulo = c["label"] + ":" + (' ' * 5) + str(dict_values[c["id"]])
            item= Item(channel=__channel__, action="control_text_click", title=titulo, extra=list_controls.index(c))
            item.type = "input"
            item.value = dict_values[c["id"]]
            itemlist.append(item)        

            
        
    params = {"list_controls":list_controls, "dict_values":dict_values, "caption":caption, "channelname":channelname, "callback":callback, "item":item}
    if itemlist:
    
        #Creamos un itemlist nuevo añadiendo solo los items que han pasado la evaluacion
        evaluated = []
        for x in range(len(list_controls)):
          #por el momento en PLEX, tanto si quedan disabled, como no visible, los ocultamos (quitandolos del itemlist)
          visible = evaluate(x, list_controls[x]["enabled"]) and evaluate(x, list_controls[x]["visible"])
          if visible:
            evaluated.append(itemlist[x])
        
        # Añadir Titulo
        evaluated.insert(0,Item(channel=__channel__, action="control_label_click", title=caption))    
        # Añadir item aceptar y cancelar
        evaluated.append(Item(channel=__channel__, action="ok_Button_click", title="Aceptar"))
        evaluated.append(Item(channel=channelname, action="mainlist", title="Cancelar"))  
        evaluated.append(Item(channel=__channel__, action="default_Button_click", title="Por defecto")) 
         
    return evaluated

#Funcion encargada de evaluar si un control tiene que estar oculto o no
def evaluate(index,cond):
    global params
    
    list_controls = params["list_controls"]
    dict_values = params["dict_values"]

    #Si la condicion es True o False, no hay mas que evaluar, ese es el valor
    if type(cond)== bool: return cond
    
    #Obtenemos las condiciones
    conditions =  re.compile("(!?eq|!?gt|!?lt)?\(([^,]+),[\"|']?([^)|'|\"]*)['|\"]?\)[ ]*([+||])?").findall(cond)

    for operator, id, value, next in conditions:

      #El id tiene que ser un numero, sino, no es valido y devuelve False
      try:
        id = int(id)
      except:
        return False
        
      #El control sobre el que evaluar, tiene que estar dentro del rango, sino devuelve False  
      if index + id < 0 or index + id >= len(list_controls): 
        return False
        
      else: 
        #Obtenemos el valor del control sobre el que se compara
        c =  list_controls[index + id]
        
        id = c["id"]
        control_value = dict_values[id]


      
      #Operaciones lt "menor que" y gt "mayor que", requieren que las comparaciones sean numeros, sino devuelve False
      if operator in ["lt","!lt","gt","!gt"]:
        try:
          value = int(value)
        except:
          return False
       
      #Operacion eq "igual a" puede comparar cualquier cosa, como el valor lo obtenemos mediante el xml no sabemos su tipo (todos son str) asi que 
      #intentamos detectarlo  
      if operator in ["eq","!eq"]:
      #valor int
       try:
          value = int(value)
       except:
          pass
       
       #valor bool   
       if value.lower() == "true": value = True
       elif value.lower() == "false": value = False
      
      
      #operacion "eq" "igual a"
      if operator =="eq":
        if control_value == value: 
          ok = True
        else:
          ok = False
          
      #operacion "!eq" "no igual a"
      if operator =="!eq":
        if not control_value == value: 
          ok = True
        else:
          ok = False
      
      #operacion "gt" "mayor que"    
      if operator =="gt":
        if control_value > value: 
          ok = True
        else:
          ok = False
      
      #operacion "!gt" "no mayor que"    
      if operator =="!gt":
        if not control_value > value: 
          ok = True
        else:
          ok = False    
      
      #operacion "lt" "menor que"    
      if operator =="lt":
        if control_value < value: 
          ok = True
        else:
          ok = False
      
      #operacion "!lt" "no menor que"
      if operator =="!lt":
        if not control_value < value: 
          ok = True
        else:
          ok = False
      
      #Siguiente operación, si es "|" (or) y el resultado es True, no tiene sentido seguir, es True   
      if next == "|" and ok ==True: break
      #Siguiente operación, si es "+" (and) y el resultado es False, no tiene sentido seguir, es False
      if next == "+" and ok ==False: break
      
      #Siguiente operación, si es "+" (and) y el resultado es True, Seguira, para comprobar el siguiente valor
      #Siguiente operación, si es "|" (or) y el resultado es False, Seguira, para comprobar el siguiente valor
      
    return ok  


#Bool, invierte el valor
def control_bool_click(item):
    itemlist = []
    global params
    
    c = params["list_controls"][item.extra]
    params["dict_values"][c["id"]] = not params["dict_values"][c["id"]]

    return show_channel_settings(**params)


#Opciones del List, cambia el valor por el seleccionado    
def cambiar_valor(item):
    global params
    
    c = params["list_controls"][item.extra]
    params["dict_values"][c["id"]] = item.new_value

    return show_channel_settings(**params)


#Lists, Muestra las opciones disponibles                                
def control_list_click(item):
    itemlist = []
    global params
    
    c = params["list_controls"][item.extra]
    value = params["dict_values"][c["id"]]
    
    for i in c["lvalues"]:
        titulo = (' ' * 5) +str(i) if c["lvalues"].index(i) != value else "[X] " + str(i)
        itemlist.append(Item(channel=__channel__, title=titulo, action="cambiar_valor", extra= item.extra, new_value= c["lvalues"].index(i)))
    return itemlist


#Inputs, guarda el nuevo valor tecleado
def control_text_click(item, new_value=""):
    global params

    c = params["list_controls"][item.extra]
    params["dict_values"][c["id"]] = new_value
    return show_channel_settings(**params)


#Labels, al hacer click, recarga el listado de controles
def control_label_click (item):
    global params
    
    return show_channel_settings(**params)


#Boton Aceptar, guarda los cambios o llama a la funcion callback con el item como primer argumento y dict_values como segundo
def ok_Button_click(item):
    global params
    itemlist = []
    
    list_controls = params["list_controls"]
    dict_values = params["dict_values"]
    channel = params["channelname"]
    callback = params["callback"]
    item = params["item"]
      
    
    if callback is None:
      for v in dict_values:
        config.set_setting(v,dict_values[v], channel)
        exec "from channels import " + channel + " as channelmodule"
        exec "itemlist = channelmodule.mainlist(Item())"
      return itemlist
        
    else:
      exec "from channels import " + channel + " as cb_channel"
      exec "itemlist = cb_channel." + callback + "(item,dict_values)"
      if not type(itemlist)== list:
          exec "from channels import " + channel + " as channelmodule"
          exec "itemlist = channelmodule.mainlist(Item())"
      return itemlist

#Para restablecer los controles al valor por defecto     
def default_Button_click(item):
    global params
    
    list_controls = params["list_controls"]
    dict_values = params["dict_values"]
    
    for c in list_controls:
      dict_values[c["id"]] = c["default"]
      
    return show_channel_settings(**params)
    