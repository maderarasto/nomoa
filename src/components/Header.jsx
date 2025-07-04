import Nomoa from "../lib/nomoa";

export default class Header extends Nomoa.Component {
  render() {
    return (
      <div>
        <h1>Header</h1>
        <input type="text" placeholder="text" />
      </div>
    )
  }
}