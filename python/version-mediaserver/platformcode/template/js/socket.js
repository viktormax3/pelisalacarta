function websocket_connect() {
    if (websocket){websocket.close()}
    document.getElementById("Conexion").innerHTML = "Conectando...";
    
    loading.show("Estableciendo conexión...")
    websocket = new WebSocket(websocket_host);
    websocket.onopen = function(evt) {
        loading.show()
        document.getElementById("Conexion").innerHTML = "Conectado";
    };

    websocket.onclose = function(evt) {
        document.getElementById("Conexion").innerHTML = "Desconectado";
    };

    websocket.onmessage = function(evt) {
        get_response(evt.data);
    };

    websocket.onerror = function(evt) {
        websocket.close();
    };
}

function WebSocketSend(data) {
    if (websocket.readyState != 1) {
        websocket_connect()
        setTimeout(WebSocketSend, 500, data);
        return;
    } else {
      data["id"] = ID
      websocket.send(JSON.stringify(data));
    }
}

function send_request(url) {
    if (url == "go_back"){ 
      nav_history.go(-1)
      return
    }
    
    nav_history.newRequest(url)
    
    loading.show()
    Send = {}
    Send["request"] = url
    WebSocketSend(Send);
}

function send_data(dato) {
    Send = {}
    Send["data"] = dato
    WebSocketSend(Send)
}
