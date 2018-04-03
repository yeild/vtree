export function addClass(el, className) {
  el.classList.add(className)
}

export function removeClass(el, className) {
  el.classList.remove(className)
}

export function hasClass(el, className) {
  return el.classList.contains(className)
}

export function toggleClass(el, className) {
  hasClass(el, className) ? removeClass(el, className) : addClass(el, className)
}
