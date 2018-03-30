import { createTree } from './utils/createElement'
import { createVNode } from './utils/vNode'
import  './antree.scss'


class Antree {
  constructor (opt) {
    Object.assign(this, opt)
    this.vNode = createVNode(this.data)
  }
  init () {
    this.initDOM()
  }
  initDOM () {
    const container = document.createElement('div')
    container.className = 'antree-container'
    const tree = createTree(this.vNode)
    container.appendChild(tree)
    this.el.appendChild(container)
  }

}
window.antree = {
  init (opt){
    return new Antree(opt).init()
  }
}