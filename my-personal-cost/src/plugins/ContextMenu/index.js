export default {
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true
    Vue.prototype.$contextMenu = {
      EventBus: new Vue(),
      delete (id) {
        this.EventBus.$emit('deleteMenu', id)
      },
      edit (element) {
        this.EventBus.$emit('editElement', element)
      },
      closeEditForm () {
        this.EventBus.$emit('closeEdit')
      }
    }
  }
}
