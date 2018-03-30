function getChildrenNum(data) {
  let num = 0

  function getNum(data) {
    if (data.children) {
      data.children.forEach(item => {
        getNum(item)
      })
    }
    return num
  }

  return getNum(data)
}

function link(data) {
  data.emitChange = function (status) {
    data.parent.handleChildrenChange(status)
  }
  if (data.children) {
    data.totalChildrenNum = getChildrenNum(data)
    data.checkedChildrenNum = 0
    data.dispatchChange = function (status) {
      console.log('下发：', status)
    }
    data.handleChildrenChange = function (status) {
      status ? data.checkedChildrenNum++ : data.checkedChildrenNum--
      if (data.checkedChildrenNum === data.totalChildrenNum) {
        data.onCheckedAllChildren && data.onCheckedAllChildren()
      } else if (data.checkedChildrenNum === 0) {
        data.onCanceledAllChildren && data.onCanceledAllChildren()
      } else {
        data.onCheckedHalf && data.onCheckedHalf()
      }
      data.parent && data.emitChange(status)
    }
    data.children.forEach(child => {
      child.parent = data
      link(child)
    })
  }
}

export function createVNode(data) {
  let vNode = Object.assign([], data)
  vNode.forEach(data => {
    link(data)
  })
  return vNode
}