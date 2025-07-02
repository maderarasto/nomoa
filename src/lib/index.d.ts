/// <reference path="./nomoa.js" />
import { Nomoa } from './nomoa.js';

// Library type definitions
declare global {
  let $app: typeof Nomoa.Application
}

declare namespace Nomoa {
  type AppConfig = {
    rootEl: HTMLDivElement|string
  }
}