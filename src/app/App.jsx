import Nomoa from "../lib/nomoa";
import Header from "../components/Header";

export default class App extends Nomoa.Component {
  render () {
    return (
      <div>
        <Header />
        <p>App</p>
      </div>
    )
  }
}