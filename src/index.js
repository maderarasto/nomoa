import {createApp} from "./lib/nomoa.js";

const a = (<div>Hello</div>);
console.log(a);

createApp({
  rootEl: '#app',
  render: () => <div>Hello</div>
});