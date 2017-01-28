//Vars
var Opciones = {};
var focused_item = null;
var keychar ={"keyCode":0,"Time":0, "Char":""};
var websocket="";
var session_id ="";
var loading = {};
var dialog = {};
var html = {"dialog": {"select": {}}, "config": {}, "itemlist": {}};
var domain = window.location.href.split("/").slice(0,3).join("/")
var nav_history = {
  "newRequest"     : function (url) {   
                                          if (this.confirmed){
                                              if (this.states[this.current].url == url){
                                                this.states[this.current].url
                                                this.states[this.current].start
                                              }else {
                                                this.states[this.current].scroll =  document.getElementById("itemlist").scrollTop;
                                                this.states[this.current].focus = Array.prototype.indexOf.call(document.getElementById("itemlist").children, focused_item.parentNode)
                                                this.current += 1;
                                                this.states.splice(this.current,0, {"start": new Date().getTime() , "url": url});
                                                this.confirmed = false
                                              }
                                          }else {
                                              if (this.current == -1){
                                                this.current = 0
                                                this.states.push({"start": new Date().getTime() , "url": url});
                                              }else {
                                                this.states[this.current].start = new Date().getTime();
                                                this.states[this.current].url = url;
                                              }
                                          }    
                                      },
  "newResponse"  : function(data, category)       {   
  
                                          if (!this.confirmed){
                                              this.states[this.current].end = new Date().getTime()
                                              this.states[this.current].data = data
                                              this.states[this.current].category = category
                                              this.confirmed = true
                                              if (this.builtin){
                                                if (this.current > 0){
                                                  history.pushState(this.current.toString(),"","#" + this.states[this.current].url)
                                                }else {
                                                  history.replaceState(this.current.toString(),"","#" + this.states[this.current].url)
                                                }
                                              }
                                          } else {
                                              if (this.states[this.current].focus && this.states[this.current].scroll){
                                                document.getElementById("itemlist").children[this.states[this.current].focus].children[0].focus();
                                                document.getElementById("itemlist").scrollTop = this.states[this.current].scroll;
                                              }
                                              this.states[this.current].end = new Date().getTime()
                                              this.states[this.current].data = data
                                              this.states[this.current].category = category     
                                              this.states = this.states.slice(0,this.current +1);                        
                                          }
                                      },

  "go"            : function(index)  {
                                          if (!this.confirmed){this.current -=1; this.confirmed = true}
                                          
                                          this.states[this.current].scroll = document.getElementById("itemlist").scrollTop
                                          this.states[this.current].focus = Array.prototype.indexOf.call(document.getElementById("itemlist").children, focused_item.parentNode);
                                           
                                          if (this.current + index < 0){
                                            this.current = -1;
                                            this.confirmed = false 
                                            send_request("")
                                            return
                                          }
                                          
                                          else if (this.current + index >= this.states.lenght){this.current = this.states.lenght -1}
                                          else {this.current += index}

                                          if (this.states[this.current].end - this.states[this.current].start > this.cache){
                                            document.getElementById("itemlist").innerHTML = this.states[this.current].data.join("") ;
                                            set_category(this.states[this.current].category)
                                            if (this.states[this.current].focus){
                                              document.getElementById("itemlist").children[this.states[this.current].focus].children[0].focus();
                                            }
                                            if (this.states[this.current].scroll){
                                              document.getElementById("itemlist").scrollTop = this.states[this.current].scroll;
                                            }
                                            this.confirmed = true 
                                          } else{
                                            this.confirmed = false 
                                            send_request(this.states[this.current].url)
                                          }
                                     },
  "current": -1,
  "confirmed": false,
  "states": [],
  "builtin": false, //Activa la posibilidad de usar el historial del navegador
  "cache": 0000 //Tiempo para determinar si se cargará la cache o se volvera a solicitar el item (el tiempo es el que tarda en responder el servidor)
}

function download_file(url){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();
  result = xhttp.responseText
  return result
}



html.vlc_player = download_file("/media/html/player_vlc.html")
html.html_player = download_file("/media/html/player_html.html")
html.flash_player = download_file("/media/html/player_flash.html")

html.itemlist.banner = download_file("/media/html/itemlist_banner.html")
html.itemlist.channel = download_file("/media/html/itemlist_channel.html")
html.itemlist.movie = download_file("/media/html/itemlist_movie.html")
html.itemlist.list = download_file("/media/html/itemlist_list.html")
html.itemlist.menu = download_file("/media/html/itemlist_menu.html")

html.dialog.select.item = download_file("/media/html/select_item.html")

html.config.label = download_file("/media/html/config_label.html")
html.config.sep = download_file("/media/html/config_sep.html")
html.config.text = download_file("/media/html/config_text.html")
html.config.bool = download_file("/media/html/config_bool.html")
html.config.list = download_file("/media/html/config_list.html")

html.config.category = download_file("/media/html/config_category.html")
html.config.container = download_file("/media/html/config_container.html")