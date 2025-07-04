/// <reference path="./nomoa/nomoa.js" />
import {Application, Component} from './nomoa/nomoa';

// Library type definitions
declare global {
  let $app: typeof Application
}

declare namespace NomoaJS {
  type JSX = {
    elementName: Component|string
    attributes: Record<string, any>
    children: JSX[]
  }

  type AppConfig = {
    rootEl: HTMLDivElement|string
    render: () => Object
  }

  type NodeType = (
    | 'root'
    | 'component'
    | 'element'
    | 'text'
  )
}