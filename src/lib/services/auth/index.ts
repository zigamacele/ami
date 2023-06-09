import { invoke } from '@tauri-apps/api';
import { listen } from '@tauri-apps/api/event';

export const login = () => {
  // Wait for callback from tauri oauth plugin
  listen('oauth://url', (data) => {
    console.log(data);
  });

  // Start tauri oauth plugin. When receive first request
  // When it starts, will return the server port
  // it will kill the server

  invoke('plugin:oauth|start', {
    // config: {
    // Optional config, but use here to more friendly callback page
    // response: callbackTemplate,
    // },
  }).then((port) => {
    // openGoogleSignIn(port as string);
  });
};
