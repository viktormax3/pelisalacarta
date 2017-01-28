window.onload = function() {
    dispose();
    url = window.location.href.split("#")[1]
    if (url){
      send_request(url);
    }else{
      send_request("");
    }
};

window.onpopstate = function(e){
    if(e.state){ 
        nav_history.go(e.state - nav_history.current )
    }
};

window.onresize = function() {
    dispose();
};

load_settings()
