function getLeaf(data) {
  let leaf = []
  function traverse(data) {
    data.children.forEach(i => {
      if (i.children) {
        traverse(i)
      } else leaf.push(i)
    })
  }
  traverse(data)
  return leaf
}

function link(data) {
  data.emitChange = function (status) {
    let num = 1
    if (data.leafNum) {
      num = status ? data.leafNum - data.checkedChildrenNum : data.checkedChildrenNum
    }
    data.parent.handleEmit(status, num)
  }
  if (data.children) {
    data.leafNum = getLeaf(data).length
    data.checkedChildrenNum = 0
    data.dispatchChange = function (status) {
      let num = status ? data.leafNum : 0
      let fn = status ? 'checkThis' : 'cancelThis'
      data.checkedChildrenNum = num
      data.children.forEach(i => {
        i.children && i.dispatchChange(status)
        i[fn]()
      })
    }
    data.handleEmit = function (status, num) {
      data.checkedChildrenNum += (status ? num : -num)
      if (data.checkedChildrenNum === data.leafNum) {
        data.checkThis()
      } else if (data.checkedChildrenNum === 0) {
        data.cancelThis()
      } else {
        data.halfCheck()
      }
      data.parent && data.parent.handleEmit(status, num)
    }
    data.children.forEach(child => {
      child.parent = data
      link(child)
    })
  }
}

export function createVNode(data) {
  let vNode = JSON.parse(JSON.stringify(data))
  vNode.rawData = data
  vNode.forEach(data => {
    link(data)
  })
  return vNode
}