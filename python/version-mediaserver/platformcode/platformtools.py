# -*- coding: utf-8 -*-
#------------------------------------------------------------
# pelisalacarta - XBMC Plugin
# platformtools
# http://blog.tvalacarta.info/plugin-xbmc/pelisalacarta/
#------------------------------------------------------------
# Herramientas responsables de adaptar los diferentes 
# cuadros de dialogo a una plataforma en concreto,
# en este caso Mediserver.
# version 1.3
# ------------------------------------------------------------
import os
import sys
import cliente
from core import config
from core import logger

def dialog_ok(heading, line1, line2="", line3=""):
    text = line1
    if line2: text += "\n" + line2
    if line3: text += "\n" + line3
    cliente.Dialogo().MostrarOK(heading,text)
    
def dialog_notification(heading, message, icon=0, time=5000, sound=True):
    #No disponible por ahora, muestra un dialog_ok
    dialog_ok(heading,message)

def dialog_yesno(heading, line1, line2="", line3="", nolabel="No", yeslabel="Si", autoclose=""):
    text = line1
    if line2: text += "\n" + line2
    if line3: text += "\n" + line3
    return cliente.Dialogo().MostrarSiNo(heading,text)
    
def dialog_select(heading, list): 
    return cliente.Dialogo().Select(heading,list)
    
def dialog_progress(heading, line1, line2="", line3=""):
    class Dialog(object):
        def __init__(self, heading, line1, line2, line3, PObject):
            self.PObject = PObject
            self.closed = False
            self.heading = heading
            text = line1
            if line2: text += "\n" + line2
            if line3: text += "\n" + line3
            self.PObject.ProgresoAbrir(heading, text,0)

        def iscanceled(self):
            return self.PObject.ProgresoIsCanceled() or self.closed

        def update(self, percent, line1, line2="", line3=""):
            text = line1
            if line2: text += "\n" + line2
            if line3: text += "\n" + line3
            self.PObject.ProgresoActualizar(self.heading, text, percent)

        def close(self):
            self.PObject.ProgresoCerrar()
            self.closed = True

    return Dialog(heading, line1, line2, line3, cliente.Dialogo())


def dialog_progress_bg(heading, message=""):
    class Dialog(object):
        def __init__(self, heading, message, PObject):
            self.PObject = PObject
            self.closed = False
            self.heading = heading
            self.PObject.ProgresoBGAbrir(heading, message,0)

        def isFinished(self):
            return not self.closed

        def update(self, percent=0, heading="", message=""):
            self.PObject.ProgresoBGActualizar(heading, message, percent)

        def close(self):
            self.PObject.ProgresoBGCerrar()
            self.closed = True
    return Dialog(heading, message, cliente.Dialogo())

def dialog_input(default="", heading="", hidden=False):
    return cliente.Dialogo().MostrarTeclado(default, heading, hidden) 

def dialog_numeric(type, heading, default=""):
    return cliente.Dialogo().MostrarTeclado("", heading, False) 

def itemlist_refresh():
    cliente.Acciones().Refrescar()

def itemlist_update(item):
    cliente.Acciones().Update(item.tourl())

def render_items(itemlist, parentitem):
    from core.item import Item
        
    if (parentitem.channel=="channelselector" and parentitem.action=="mainlist") or (parentitem.channel=="novedades" and parentitem.action=="mainlist") or (parentitem.channel=="buscador" and parentitem.action=="mainlist") or (parentitem.channel=="channelselector" and parentitem.action=="channeltypes"):
      viewmode = 0
    elif parentitem.channel=="channelselector" and parentitem.action=="listchannels":
      viewmode = 1
    else:
      viewmode = 2
    
    if not (parentitem.channel=="channelselector" and parentitem.action=="mainlist") and not itemlist[0].action=="go_back":
      if viewmode !=2:
        itemlist.insert(0,Item(title="Atrás", action="go_back",thumbnail=os.path.join(config.get_runtime_path(),"resources","images","bannermenu","thumb_atras.png")))
      else:
        itemlist.insert(0,Item(title="Atrás", action="go_back",thumbnail=os.path.join(config.get_runtime_path(),"resources","images","squares","thumb_atras.png")))
           
    for item in itemlist:
        if item.thumbnail == "" and item.action == "search": item.thumbnail = config.get_thumbnail_path() + "thumb_buscar.png"
        if item.thumbnail == "" and item.folder == True: item.thumbnail = config.get_thumbnail_path() + "thumb_folder.png"
        if item.thumbnail == "" and item.folder == False: item.thumbnail = config.get_thumbnail_path() + "thumb_nofolder.png"
        
        if "http://media.tvalacarta.info/" in item.thumbnail:
          if viewmode != 2: 
            item.thumbnail = config.get_thumbnail_path("bannermenu") + os.path.basename(item.thumbnail)
          else:
            item.thumbnail = config.get_thumbnail_path() + os.path.basename(item.thumbnail)
            
        if item.fanart == "":
            channel_fanart = os.path.join(config.get_runtime_path(), 'resources', 'images', 'fanart', item.channel + '.jpg')
            if os.path.exists(channel_fanart):
                item.fanart = channel_fanart
            else:
                item.fanart = os.path.join(config.get_runtime_path(), "fanart.jpg")

        if item.category == "":
            item.category = parentitem.category

        if item.fulltitle == "":
            item.fulltitle = item.title

        AddNewItem(item, totalItems=len(itemlist))
        
    


    cliente.Acciones().EndItems(viewmode)


def AddNewItem(item, totalItems=0):
    item.title = unicode(item.title, "utf8", "ignore").encode("utf8")
    item.fulltitle = unicode(item.fulltitle, "utf8", "ignore").encode("utf8")
    item.plot = unicode(item.plot, "utf8", "ignore").encode("utf8")

    contextCommands = []
    if type(item.context) == list:
      for context in item.context:
        contextitem = item.clone()
        contextitem.action = context["action"]
        contextitem.item_action = item.action
        if "channel" in context and context["channel"]:
          contextitem.channel = context["channel"]
        contextCommands.append([context["title"],contextitem.tourl()])
   

    cliente.Acciones().AddItem(item,contextCommands)


def is_playing():
    return cliente.Acciones().isPlaying()

def play_video(item):
    if item.contentTitle:
      title = item.contentTitle
    elif item.fulltitle:
      title = item.fulltitle
    else:
      title = item.title
    
    if item.contentPlot:
      plot = item.contentPlot
    else:
      plot = item.plot  
    cliente.Acciones().Play(title, plot, item.video_url, item.url)
 
 