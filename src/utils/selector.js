export function getSiblings(el, tagName) {
  let siblings = Array.from(el.parentNode.children)
  siblings = siblings.filter(item => {
    return item.tagName === tagName
  })
  return siblings || []
}