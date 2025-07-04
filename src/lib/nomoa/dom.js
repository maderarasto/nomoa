import Nomoa from "./index";
import htmlTags from "html-tags";

export class VirtualNode {
  /**
   * Creates a node structure representing JSX of element.
   *
   * @param {Component|string} element
   * @param {Record<string, any>} props
   * @param {NomoaJS.NodeType} type
   */
  constructor(element, props = {}, type) {
    this._element = element;
    this._props = props;
    this._type = type;

    /** @type {VirtualNode[]} */
    this.children = [];
    /** @type {VirtualNode|null} */
    this.parent = null;
  }

  /**
   * Checks if a node is root.
   *
   * @returns {boolean}
   */
  get isRoot() {
    return this._type === 'root';
  }

  get isComponent() {
    return this._type === 'component';
  }

  get isHTMLElement() {
    return this._type === 'element';
  }

  get isText() {
    return this._type === 'text';
  }

  /**
   * Appends a node to current as its child.
   *
   * @param {VirtualNode} node
   */
  appendChild(node) {
    node.parent = this;
    this.children.push(node);
  }

  /**
   * Replaces an old node with new.
   *
   * @param {VirtualNode} oldNode
   * @param {VirtualNode} newNode
   */
  replaceChild(oldNode, newNode) {
    const foundIndex = this.children.findIndex((childNode) => {
      return childNode === oldNode;
    });

    if (foundIndex >= 0) {
      oldNode.parent = null;
      newNode.parent = this;
      this.children[foundIndex] = newNode;
    }
  }

  /**
   * Removes a node child.
   *
   * @param {VirtualNode} node
   */
  removeChild(node) {
    const foundIndex = this.children.findIndex((childNode) => {
      return childNode === node;
    });

    if (foundIndex < 0) {
      return null
    }

    node.parent = null;
    this.children.splice(foundIndex, 1);

    return node;
  }

  /**
   * Creates virtual DOM structure from given JSX.
   *
   * @param {NomoaJS.JSX|string} jsx
   * @param {VirtualNode|null} parent
   * @returns {VirtualNode}
   */
  static fromJSX(jsx, parent = null) {
    let {
      elementName,
      attributes= {},
      children= []
    } = jsx;

    if (typeof jsx === 'string') {
      elementName = jsx;
    }

    /** @type {VirtualNode} */
    let node;

    if (typeof elementName === 'function') {
      node = new VirtualNode(elementName, attributes, 'component');
    } else if (typeof elementName === 'string' && [...htmlTags].includes(elementName)) {
      node = new VirtualNode(elementName, attributes, 'element');
    } else {
      console.log(jsx);
      node = new VirtualNode(elementName, attributes, 'text');
    }

    if (parent) {
      parent.appendChild(node);
    }

    if (node.isComponent) {
      /** @type {Nomoa.Component} */
      const component = new node._element();
      // TODO: register component
      VirtualNode.fromJSX(component.render(), node);
    }

    if (!children) {
      children = [];
    }

    children.forEach((child) => {
      if (!node) {
        return;
      }

      VirtualNode.fromJSX(child, node);
    });

    return node;
  }
}

/**
 * Creates virtual DOM from JSX root.
 *
 * @param {NomoaJS.JSX} jsx
 */
export const createVirtualRoot = (jsx) => {
  const rootNode = new VirtualNode('root', {}, 'root');
  const childNode = VirtualNode.fromJSX(jsx);

  if (childNode) {
    rootNode.appendChild(childNode);
  }

  return rootNode;
}