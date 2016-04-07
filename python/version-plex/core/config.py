# -*- coding: utf-8 -*-
#------------------------------------------------------------
# pelisalacarta - XBMC Plugin
# Configuracion
# http://blog.tvalacarta.info/plugin-xbmc/pelisalacarta/
#------------------------------------------------------------
import os,io
from types import *

PLATFORM_NAME = "plex"

def get_platform():
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
    """Retorna el valor de configuracion del parametro solicitado.

    Devuelve el valor del parametro 'name' en la configuracion global o en la configuracion propia del canal 'channel'.
    
    Si se especifica el nombre del canal busca en la ruta \addon_data\plugin.video.pelisalacarta\settings_channels el archivo channel_data.json
    y lee el valor del parametro 'name'. Si el archivo channel_data.json no existe busca en la carpeta channels el archivo 
    channel.xml y crea un archivo channel_data.json antes de retornar el valor solicitado.
    Si el parametro 'name' no existe en channel_data.json lo busca en la configuracion global y si ahi tampoco existe devuelve un str vacio.
    
    Parametros:
    name -- nombre del parametro
    channel [opcional] -- nombre del canal
      
    Retorna:
    value -- El valor del parametro 'name'
    
    """ 
    import logger
    from core import jsontools   
    if channel:
        try:
            File_settings= os.path.join(get_data_path(),"DataItems",channel+"_data.json")
            dict_file = {}
            dict_settings= {}
            list_controls = []
        
            if os.path.exists(File_settings):
                # Obtenemos configuracion guardada de ../settings/channel_data.json
                data = ""
                try:
                    with open(File_settings, "r") as f:
                        data= f.read()
                    dict_file = jsontools.load_json(data)
                    if dict_file.has_key('settings'):
                        dict_settings = dict_file['settings']
                except EnvironmentError:
                    logger.info("ERROR al leer el archivo: {0}".format(File_settings))
            
            if len(dict_settings) == 0:
                # Obtenemos controles del archivo ../channels/channel.xml
                from core import channeltools
                list_controls, dict_settings = channeltools.get_channel_controls_settings(channel)
                                
                if  dict_settings.has_key(name): # Si el parametro existe en el channel.xml creamos el channel_data.json
                    dict_file['settings']= dict_settings 
                    # Creamos el archivo ../settings/channel_data.json
                    json_data = jsontools.dump_json(dict_file)
                    try:
                        with open(File_settings, "w") as f:
                            f.write(json_data)
                    except EnvironmentError:
                        logger.info("[config.py] ERROR al salvar el archivo: {0}".format(File_settings))

            # Devolvemos el valor del parametro local 'name' si existe        
            return dict_settings[name]
        except: pass
        
    # Devolvemos el valor del parametro global 'name'        
    if name=="cache.dir":
        return ""

    if name=="debug" or name=="download.enabled":
        return "false"
    
    if name=="cookies.dir":
        return os.getcwd()

    if name=="cache.mode" or name=="thumbnail_type":
        return "2"
    else:
        import bridge
        try:
            devuelve = bridge.get_setting(name)
        except:
            devuelve = ""
        
        if type(devuelve) == BooleanType:
            if devuelve:
                devuelve = "true"
            else:
                devuelve = "false"
        
        return devuelve

def set_setting(name,value, channel=""):
    """Fija el valor de configuracion del parametro indicado.

    Establece 'value' como el valor del parametro 'name' en la configuracion global o en la configuracion propia del canal 'channel'.
    Devuelve el valor cambiado o None si la asignacion no se ha podido completar.
    
    Si se especifica el nombre del canal busca en la ruta \addon_data\plugin.video.pelisalacarta\settings_channels el archivo channel_data.json
    y establece el parametro 'name' al valor indicado por 'value'. Si el archivo channel_data.json no existe busca en la carpeta channels el archivo 
    channel.xml y crea un archivo channel_data.json antes de modificar el parametro 'name'.
    Si el parametro 'name' no existe lo añade, con su valor, al archivo correspondiente.
    
    
    Parametros:
    name -- nombre del parametro
    value -- valor del parametro
    channel [opcional] -- nombre del canal
    
    Retorna:
    'value' en caso de que se haya podido fijar el valor y None en caso contrario
        
    """ 
    import logger
    from core import jsontools
    if channel:
        try:
            File_settings= os.path.join(get_data_path(),"DataItems",channel+"_data.json")
            dict_settings= {}
            dict_file= {}
            list_controls = []
            
            if os.path.exists(File_settings):
                # Obtenemos configuracion guardada de ../settings/channel_data.json
                data = ""
                try:
                    with open(File_settings, "r") as f:
                        data= f.read()
                    dict_file = jsontools.load_json(data)
                    if dict_file.has_key('settings'):
                        dict_settings = dict_file['settings']
                except EnvironmentError:
                    logger.info("ERROR al leer el archivo: {0}".format(File_settings))
                
            if len(dict_settings) == 0:            
                # Obtenemos controles del archivo ../channels/channel.xml
                from core import channeltools
                list_controls, dict_settings = channeltools.get_channel_controls_settings(channel)
                               
            dict_settings[name] = value
            dict_file['settings']= dict_settings
            # Creamos el archivo ../settings/channel_data.json
            json_data = jsontools.dump_json(dict_file)
            try:
                with open(File_settings, "w") as f:
                    f.write(json_data)
            except EnvironmentError:
                logger.info("[config.py] ERROR al salvar el archivo: {0}".format(File_settings))
                return None
        except: 
            logger.info("[config.py] ERROR al fijar el parametro {0}= {1}".format(name, value))
            return None
        
        return value     
    else:     
        return ""
            
    
    
            
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
    cookiedatafile.close();

    return cookiedata

def verify_directories_created():
    return 
