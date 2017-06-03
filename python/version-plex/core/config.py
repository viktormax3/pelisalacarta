# -*- coding: utf-8 -*-
#------------------------------------------------------------
# pelisalacarta - XBMC Plugin
# Configuracion
# http://blog.tvalacarta.info/plugin-xbmc/pelisalacarta/
#------------------------------------------------------------
import os, re
import bridge
from types import *

PLATFORM_NAME = "plex"
settings_types = None

def get_platform(full_version=False):
    #full_version solo es util en xbmc/kodi
    ret = {
        'num_version': 1.0 ,
        'name_version': PLATFORM_NAME ,
        'video_db': "",
        'plaform': PLATFORM_NAME
        }

    if full_version:
        return ret
    else:
        return PLATFORM_NAME


def is_xbmc():
    return False


def get_library_support():
    return False


def get_system_platform():
    return ""


def open_settings():
    return

  
def get_setting(name, channel=""):
    if channel:
        from core import channeltools
        return channeltools.get_channel_setting(name, channel)


    # Devolvemos el valor del parametro global 'name'
    if name=="cache.dir":
        value = ""

    if name=="debug" or name=="download.enabled":
        value = False
    
    if name=="cookies.dir":
        value = os.getcwd() #TODO no parece funcionar

    if name=="cache.mode" or name=="thumbnail_type":
        value = 2

    else:
        value = bridge.get_setting(name)

        # hack para devolver el tipo correspondiente
        settings_types = get_settings_types()

        if isinstance(settings_types.get(name),tuple) and settings_types[name][0] == 'enum':
            value = settings_types[name][1].index(value)

        elif settings_types.get(name) == 'bool':
            value = bool(value)

    return value


def set_setting(name,value, channel=""):
    if channel:
        from core import channeltools
        return channeltools.set_channel_setting(name,value, channel)

    else:
        try:
            settings_types = get_settings_types()

            if settings_types.has_key(name):
                # El parametro esta en Preferences: lo abrimos y eliminamos la linea
                sep = os.path.sep
                user_preferences = get_data_path().replace(sep + "Data" + sep, sep + "Preferences" + sep) + ".xml"
                data = open(user_preferences, "rb").readlines()

                for line in data:
                    if re.match("<%s/?>" % name, line.strip()):
                        data.remove(line)

                # Añadir al final del listado el parametro con su nuevo valor
                if value:
                    data.insert(-1, "  <{0}>{1}</{0}>\n".format(name, value))
                else:
                    data.insert(-1, "  <{0}/>\n".format(name))

                # Guardar el archivo de nuevo
                out_file = open(user_preferences, "wb")
                for line in data:
                    out_file.write(line)

            else:
                # El parametro no esta en Preferences: Lo añadimos a dict_global
                bridge.dict_global[name] = value

        except:
            return None

    return value


def get_settings_types():
    """
    Devuelve un diccionario con los parametros (key) de la configuracion global y sus tipos (value)

    :return: dict
    """
    global settings_types

    if not settings_types:
        from core import jsontools

        settings_types = {}
        fname = os.path.abspath( os.path.join( os.path.dirname(__file__) , "..", "..", "..", "DefaultPrefs.json" ) )
        infile = open(fname)
        data = infile.read()
        infile.close()

        for d in jsontools.load_json(data):
            if d["type"] == 'enum':
                settings_types[d["id"]] = (d["type"],d["values"])
            else:
                settings_types[d["id"]] = d["type"]

    return settings_types


def get_localized_string(code):
   import bridge
   return bridge.get_localized_string(code)

def get_library_path():
   return ""

def get_temp_file(filename):
   return ""

def get_runtime_path():
   return os.path.abspath( os.path.join( os.path.dirname(__file__) , ".." ) )

def get_data_path():
   return os.getcwd()

def get_cookie_data():
   import os
   ficherocookies = os.path.join( get_data_path(), 'cookies.lwp' )

   cookiedatafile = open(ficherocookies,'r')
   cookiedata = cookiedatafile.read()
   cookiedatafile.close()

   return cookiedata

def verify_directories_created():
   return
