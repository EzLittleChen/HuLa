import type { Ref } from 'vue'

export const useContextMenu = (containerRef: Ref) => {
  const showMenu = ref(false)
  const x = ref(0)
  const y = ref(0)

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    showMenu.value = true
    x.value = e.clientX
    y.value = e.clientY
  }

  function closeMenu() {
    showMenu.value = false
  }

  onMounted(() => {
    const div = containerRef.value
    //这里只监听了div的右键，如果需要监听其他元素的右键，需要在其他元素上监听
    div.addEventListener('contextmenu', handleContextMenu)
    // 这里需要监听window的右键，否则右键会触发div的右键事件，导致menu无法关闭，并且阻止默认右键菜单
    window.addEventListener(
      'contextmenu',
      (e) => {
        e.preventDefault()
        e.stopPropagation()
      },
      false
    )
    window.addEventListener('click', closeMenu, true)
    window.addEventListener('contextmenu', closeMenu, true)
  })

  onUnmounted(() => {
    const div = containerRef.value
    div?.removeEventListener('contextmenu', handleContextMenu)
    window.removeEventListener('click', closeMenu, true)
    window.removeEventListener('contextmenu', closeMenu, true)
  })

  return {
    showMenu,
    x,
    y
  }
}