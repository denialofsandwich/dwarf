import React from 'react';

function useWebSocket(data) {
  const [refresh, setRefresh] = React.useState(false);
  const init = React.useRef(false);
  if(init.current === false) {
    init.current = new WebSocket(`${window.location.protocol==='http:'?'ws:':'wss:'}//${window.location.host}${data.url}`);
  }

  init.current.onopen = data.onOpen;
  init.current.onmessage = data.onMessage;
  init.current.onclose = () => {
    if(data.autoReconnect === true) {
      setTimeout(() => {
        init.current = false
        setRefresh(!refresh);
      }, 5000)
    }
    
    data.onClose();
  };

  React.useEffect(() => () => init.current.close(), []);

  return init.current;
}

export default useWebSocket;
