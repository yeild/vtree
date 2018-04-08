import { getSiblings } from './selector'
import { addClass, removeClass, toggleClass } from './classes'

function createUL() {
  let ul = document.createElement('ul')
  ul.className = 'vTree-children'
  return ul
}

function createTitle() {
  let title = document.createElement('span')
  title.className = 'vTree-title'
  return title
}

function createIconArrow(data) {
  let iconArrow = document.createElement('i')
  iconArrow.className = 'vTree-icon-arrow'

  // expand & collapse list
  iconArrow.addEventListener('click', () => {
    getSiblings(iconArrow.parentNode, 'UL').forEach(item => {
      toggleClass(item, 'vTree-children-collapse')
    })
    toggleClass(iconArrow, 'vTree-icon-arrow-collapse')
  })

  if (data.expand === false) {
    // set initial className when DOM mounted
    setTimeout(() => { 
      getSiblings(iconArrow.parentNode, 'UL').forEach(item => {
        addClass(item, 'vTree-children-collapse')
      })
      addClass(iconArrow, 'vTree-icon-arrow-collapse')
    })
  }
  return iconArrow
}

function createCheckbox(data, ctx) {
  let checkboxInput = document.createElement('input')
  checkboxInput.type = 'checkbox'
  checkboxInput.className = 'vTree-checkbox-input'
  if (data.disabled) addClass(checkboxInput, 'vTree-checkbox-input-disabled')

  let label = document.createElement('i')
  label.className = 'vTree-checkbox-label'
  if (data.disabled) addClass(label, 'vTree-checkbox-label-disabled')

  let checkbox = document.createElement('span')
  checkbox.className = 'vTree-checkbox'
  checkbox.appendChild(checkboxInput)
  checkbox.appendChild(label)

  function setLabelClass(type) {
    removeClass(label, 'vTree-checkbox-label-checked')
    removeClass(label, 'vTree-checkbox-label-half')
    if (type) addClass(label, 'vTree-checkbox-label-' + type)
  }

  data.checkThis = function () {
    // when checked, push the raw data to checkedNodes Map
    if (!data.children) ctx.checkedNodes.set(data.rawData, null)
    checkboxInput.checked = true
    setLabelClass('checked')
  }

  data.halfCheck = function () {
    checkboxInput.checked = false
    setLabelClass('half')
  }

  data.cancelThis = function () {
    ctx.checkedNodes.delete(data.rawData)
    checkboxInput.checked = false
    setLabelClass()
  }

  checkboxInput.addEventListener('change', (e) => {
    if (data.disabled) return false
    const status = e.target.checked
    handleNodeChange(data, status)
    ctx.onCheck && ctx.onCheck(data.rawData, ctx.getCheckedNodes(), e)
  })

  if (data.checked) {
    // set default status when DOM mounted
    setTimeout(() => {
      handleNodeChange(data, true)
    })
  }
  return checkbox
}

export function handleNodeChange(node, status) {
  status ? node.checkThis() : node.cancelThis() // check itself
  node.parent && node.emitChange(status) // emit to parent
  node.children && node.dispatchChange(status) // dispatch to children
}

export function createTree(data, ctx) {
  let ul = createUL()
  if (Array.isArray(data)) { // create tree by recursion
    data.forEach(item => {
      let sub = createTree(item, ctx)
      item.children && sub.appendChild(createTree(item.children, ctx))
      ul.appendChild(sub)
    })
    return ul
  } else { // created actual nodes
    let li = document.createElement('li')

    let header = document.createElement('div')
    header.className = 'vTree-header'

    if (data.children) {
      header.appendChild(createIconArrow(data))
    } else {
      li.className = 'vTree-leaf'
    }

    ctx.showCheckbox && header.appendChild(createCheckbox(data, ctx))
    let title = createTitle()
    title.innerHTML = data.title

    header.appendChild(title)
    li.appendChild(header)
    return li
  }
}