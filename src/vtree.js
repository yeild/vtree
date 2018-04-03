import { createTree } from './utils/createElement'
import { createVNode } from './utils/vNode'
import  './vtree.scss'

class vTree {
  constructor (opt) {
    this.showCheckbox = true
    Object.assign(this, opt)
    this.vNode = createVNode(this.data)
    this.checkedNodes = new Map()
  }
  init () {
    const tree = createTree(this.vNode, this)
    this.el.innerHTML = ''
    this.el.appendChild(tree)
    return this
  }

  getCheckedNodes () {
    return [...this.checkedNodes.keys()]
  }
}
window.vTree = {
  /**
   * @param opt { element, data, showCheckbox }
   * @returns vTree instance
   */
  init (opt){
    return new vTree(opt).init()
  }
}