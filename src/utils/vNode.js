/**
 * return leaf nodes array from a node.
 * @param data
 * @returns {Array}
 */
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
  // when child changed, emit event to parent
  data.emitChange = function (status) {
    let num = 1 // how many nodes changed
    if (data.leafNum) {
      num = status ? data.leafNum - data.checkedChildrenNum : data.checkedChildrenNum
    }
    data.parent.handleEmit(status, num)
  }

  if (data.children) {
    data.leafNum = getLeaf(data).length
    data.checkedChildrenNum = 0
    // when parent changed, dispatch event to children
    data.dispatchChange = function (status) {
      let num = status ? data.leafNum : 0
      let fn = status ? 'checkThis' : 'cancelThis'
      data.checkedChildrenNum = num
      data.children.forEach(i => {
        i.children && i.dispatchChange(status)
        !i.disabled &&i[fn]()
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
    data.children.forEach((child, index) => {
      child.parent = data // link data & parent
      if (data.disabled) child.disabled = true
      child.rawData = data.rawData.children[index]
      link(child)
    })
  }
}

export function createVNode(data) {
  let vNode = JSON.parse(JSON.stringify(data)) // clone raw data
  vNode.rawData = data
  vNode.forEach((data, index) => {
    data.rawData = vNode.rawData[index]
    link(data)
  })
  return vNode
}