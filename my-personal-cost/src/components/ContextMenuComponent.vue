<template>
  <div class="menu">
    <button class="btn" v-click-outside="hide" @click="toggle">...</button>
    <transition name="fade">
      <div v-show="opened" class="content">
        <button @click="editElement(itemParam)">Редактировать</button>
        <button @click="deleteMenu(itemParam.id)">Удалить</button>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: "ContextMenuComponent",
  props: {
    itemParam: {
      id: Number,
      date: String,
      category: String,
      amount: String
    }
  },
  data () {
    return {
      opened: false,
    }
  },
  methods: {
    toggle () {
      this.opened = true
    },
    hide () {
      this.opened = false
    },

    deleteMenu (id) {
      this.$contextMenu.delete(id)
    },
    editElement (element) {
      this.$contextMenu.edit(element)
    }
  },
  mounted () {
    //this.popupItem = this.$el
  },
  directives: {
    ClickOutside
  }
}
</script>

<style lang="scss" scoped>

.menu {
  position: relative;
}

.content {
  display: grid;
  grid-gap: 10px;
  width: 150px;
  padding: 16px;
  box-shadow: 0 2px 4px -1px #00000033, 0 4px 5px 0 #00000024, 0 1px 10px 0 #0000001f;
  border-radius: 4px;
  position: absolute;
  z-index: 1000;
  background: white;
  right: 70px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
