import { getSiblings } from './selector'
import { toggleClass } from './css'

function createChildren() {
  let children = document.createElement('ul')
  children.className = 'antree-children'
  return children
}

function createTitle() {
  let title = document.createElement('span')
  title.className = 'antree-title'
  return title
}

function createIconArrow() {
  let iconArrow = document.createElement('i')
  iconArrow.className = 'antree-icon-arrow'
  iconArrow.addEventListener('click', () => {
    getSiblings(iconArrow, 'UL').forEach(item => {
      toggleClass(item, 'antree-children-open')
    })
    toggleClass(iconArrow, 'antree-icon-arrow-open')
  })
  return iconArrow
}

function createCheckbox() {
  let checkboxInput = document.createElement('input')
  checkboxInput.type = 'checkbox'
  checkboxInput.className = 'antree-checkbox-input'

  let label = document.createElement('i')
  label.className = 'antree-checkbox-label'
  label.addEventListener('click', () => {
    checkboxInput.click()
    toggleClass(label, 'antree-checkbox-label-checked')
  })

  let checkbox = document.createElement('span')
  checkbox.className = 'antree-checkbox'
  checkbox.appendChild(checkboxInput)
  checkbox.appendChild(label)

  return checkbox
}

export function createTree(data) {
  let children = createChildren()
  if (Array.isArray(data)) {
    data.forEach(item => {
      let sub = createTree(item)
      item.children && sub.appendChild(createTree(item.children))
      children.appendChild(sub)
    })
    return children
  } else {
    let li = document.createElement('li')
    data.children && li.appendChild(createIconArrow())
    li.appendChild(createCheckbox())
    let title = createTitle()
    title.innerHTML = data.title
    li.appendChild(title)
    return li
  }
}