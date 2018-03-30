import { createTree } from './utils/createElement'
import  './antree.scss'

function loop(data) {
  if(data.children) {
    data.checkedNum = 0
    data.total = data.children.length
    data.handleChildrenChecked = function (status) {
      if (status) {
        this.checkedNum++
        if(this.checkedNum === this.total) {
          console.log('全选')
        }
      } else {
        this.checkedNum--
        if(this.checkedNum === 0) {
          console.log('全不选')
        }
      }
    }
    data.children.forEach(item=>{
      item.parent = data
      item.emitChecked = function (status) {
        item.parent.handleChildrenChecked(status)
      }
      loop(item)
    })
  }

  return data
}
class Antree {
  constructor (opt) {
    Object.assign(this, opt)
    this.data.forEach(data=>{
      data = loop(data)
    })
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