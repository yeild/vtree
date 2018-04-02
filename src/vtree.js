import { createTree } from './utils/createElement'
import { createVNode } from './utils/vNode'
import  './vtree.scss'


class vTree {
  constructor (opt) {
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
  init (opt){
    return new vTree(opt).init()
  }
}