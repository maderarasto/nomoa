import {createVirtualRoot} from "./dom";

export class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState(state) {
    this.state = state;
    // TODO: request re-render
  }

  shouldUpdate(nextState) {
    return true;
  }

  mounted() {
    // Component was mounted into DOM.
  }

  updated() {
    // Component was updated.
  }

  unmounted() {
    // Component was unmounted from DOM.
  }

  render() {
    return null;
  }
}

export class Application {
  /**
   * Initializes application.
   */
  constructor() {
    /** @type {HTMLElement|null} */
    this._rootEl = null;
    /** @type {() => NomoaJS.JSX|null} */
    this._rootRender = null;
  }

  setRootRender(callback) {
    this._rootRender = callback;
  }

  /**
   * Mount application to element or it's selector.
   * @param {HTMLElement|string} element
   */
  mount(element) {
    if (typeof element === 'string') {
      this._rootEl = document.querySelector(element);
    }

    if (!(this._rootEl instanceof HTMLDivElement)) {
      throw new Error('Root element must be a HTML Element');
    }

    if (this._rootRender) {
      console.log(createVirtualRoot(this._rootRender()));
    }
  }
}

/** @type {NomoaJS.AppConfig} */
const DEFAULT_CONFIG = {
  rootEl: '',
  render: () => null
}

/**
 * Creates a Nomoa application with given configuration.
 *
 * @param {NomoaJS.AppConfig} config
 */
export const createApp = (config= DEFAULT_CONFIG) => {
  if (typeof config !== 'object' || !config) {
    throw new Error('Missing necessary options defined in given config.')
  }

  if (!(config.rootEl instanceof HTMLDivElement) && typeof config.rootEl !== 'string') {
    throw new Error('Missing an HTML root element or it\'s selector');
  }

  globalThis.$app = new Application();
  globalThis.$app.setRootRender(config.render);

  document.addEventListener('DOMContentLoaded', () => {
    globalThis.$app.mount(config.rootEl);
  });
}