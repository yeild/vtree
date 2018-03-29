import { createTree } from './utils/createElement'
import  './antree.scss'

class Antree {
  constructor (opt) {
    Object.assign(this, opt)
  }
  init () {
    this.initDOM()
    this.bindEvent()
  }
  initDOM () {
    const container = document.createElement('div')
    container.className = 'antree-container'
    const tree = createTree(this.data)
    container.appendChild(tree)
    this.el.appendChild(container)
  }
  bindEvent () {

  }

}
window.antree = {
  init (opt){
    return new Antree(opt).init()
  }
}