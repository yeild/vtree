import { getSiblings } from './selector'
import { addClass, removeClass, toggleClass } from './css'

function createChildren() {
  let children = document.createElement('ul')
  children.className = 'vTree-children'
  return children
}

function createTitle() {
  let title = document.createElement('span')
  title.className = 'vTree-title'
  return title
}

function createIconArrow(data) {
  let iconArrow = document.createElement('i')
  iconArrow.className = 'vTree-icon-arrow'
  iconArrow.addEventListener('click', () => {
    getSiblings(iconArrow, 'UL').forEach(item => {
      toggleClass(item, 'vTree-children-collapse')
    })
    toggleClass(iconArrow, 'vTree-icon-arrow-collapse')
  })
  if (data.open === false) {
    setTimeout(() => {
      getSiblings(iconArrow, 'UL').forEach(item => {
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
    if (!data.children) ctx.checkedNodes.set(data.rawData, null)
    checkboxInput.checked = true
    setLabelClass('checked')
  }
  data.halfCheck = function () {
    checkboxInput.checked = false
    setLabelClass('half')
  }
  data.cancelThis = function () {
    checkboxInput.checked = false
    ctx.checkedNodes.delete(data.rawData)
    setLabelClass()
  }
  let r = true
  checkboxInput.addEventListener('change', (e) => {
    if (r && data.disabled) return false
    const status = e.target.checked
    data.parent && data.emitChange(status)
    data.children && data.dispatchChange(status)
    status ? data.checkThis() : data.cancelThis()
    r = true
  })
  if (data.checked) {
    setTimeout(() => {
      r = false
      checkboxInput.click()
    })
  }
  return checkbox
}

export function createTree(data, ctx) {
  let children = createChildren()
  if (Array.isArray(data)) {
    data.forEach(item => {
      let sub = createTree(item, ctx)
      item.children && sub.appendChild(createTree(item.children, ctx))
      children.appendChild(sub)
    })
    return children
  } else {
    let li = document.createElement('li')
    data.children && li.appendChild(createIconArrow(data))
    ctx.checkbox && li.appendChild(createCheckbox(data, ctx))
    let title = createTitle()
    title.innerHTML = data.title
    li.appendChild(title)
    return li
  }
}