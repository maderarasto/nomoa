/** @type {Nomoa.AppConfig} */
const DEFAULT_CONFIG = {
  rootEl: ''
}

class Application {
  /**
   * Initializes application.
   */
  constructor() {
    this._rootEl = null;
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
  }
}

/**
 * Creates a Nomoa application with given configuration.
 *
 * @param {Nomoa.AppConfig} config
 */
export const createApp = (config= DEFAULT_CONFIG) => {
  if (typeof config !== 'object' || !config) {
    throw new Error('Missing necessary options defined in given config.')
  }

  if (!(config.rootEl instanceof HTMLDivElement) && typeof config.rootEl !== 'string') {
    throw new Error('Missing an HTML root element or it\'s selector');
  }

  globalThis.$app = new Application();

  document.addEventListener('DOMContentLoaded', () => {
    $app.mount(config.rootEl);
  });
}

export const Nomoa = {
  Application
}