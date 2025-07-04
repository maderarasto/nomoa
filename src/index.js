import App from "./app/App";
import {createApp} from "./lib/nomoa";

createApp({
  rootEl: '#app',
  render: () => <App />
});