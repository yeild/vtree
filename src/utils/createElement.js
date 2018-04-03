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

  // open & collapse list
  iconArrow.addEventListener('click', () => {
    getSiblings(iconArrow, 'UL').forEach(item => {
      toggleClass(item, 'vTree-children-collapse')
    })
    toggleClass(iconArrow, 'vTree-icon-arrow-collapse')
  })

  if (data.open === false) {
    // set initial className when DOM mounted
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

  let realEvent = true
  checkboxInput.addEventListener('change', (e) => {
    // when init default status, don't return
    if (realEvent && data.disabled) return false
    const status = e.target.checked
    data.parent && data.emitChange(status) // emit to parent
    data.children && data.dispatchChange(status) // dispatch to children
    status ? data.checkThis() : data.cancelThis() // check itself
    realEvent = true
  })
  if (data.checked) {
    // set default status when DOM mounted
    setTimeout(() => {
      realEvent = false
      checkboxInput.click()
    })
  }
  return checkbox
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
    data.children && li.appendChild(createIconArrow(data))
    // create checkbox if with opt['showCheckbox']
    ctx.showCheckbox && li.appendChild(createCheckbox(data, ctx))
    let title = createTitle()
    title.innerHTML = data.title
    li.appendChild(title)
    return li
  }
}