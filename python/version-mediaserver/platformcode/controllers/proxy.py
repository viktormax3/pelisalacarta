# -*- coding: utf-8 -*-
#------------------------------------------------------------
# pelisalacarta
# Controlador para acceso indirecto a ficheros remotos
# http://blog.tvalacarta.info/plugin-xbmc/pelisalacarta/
#------------------------------------------------------------
from controller import Controller
from core import config
import os
import re
from core import logger
import time 
import urllib2, urllib
import base64

class proxy(Controller):
    pattern = re.compile("^/proxy/")
    
    def run(self, path):
        url= path.replace("/proxy/","").split("/")[0]
        url = base64.b64decode(urllib.unquote_plus(url))
        Headers = self.handler.headers.dict

        req = urllib2.Request(url)
        opener = urllib2.build_opener(urllib2.HTTPHandler(debuglevel=0))
        
        for header in Headers:
          if not header in ["host","referer"]:
            req.add_header(header,Headers[header])
          
        try:
          h = opener.open(req)
        except urllib2.HTTPError, e:
          h = e
        except:
          self.handler.send_response("503")
          self.handler.wfile.close()
          h.close()
          
        self.handler.send_response(h.getcode())
        for header in h.info():
            self.handler.send_header(header, h.info()[header])

        self.handler.end_headers()
        
        blocksize = 1024
        bloqueleido = h.read(blocksize)
        while len(bloqueleido)>0:
          self.handler.wfile.write(bloqueleido)
          bloqueleido = h.read(blocksize)

        self.handler.wfile.close()
        h.close()