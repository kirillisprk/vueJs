<template>
  <div>
    <template>
      <div class="text-center">
        <v-menu
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              color="teal"
              v-bind="attrs"
              v-on="on"
            >
              ...
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title @click="editElement(itemParam)">Редактировать</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="deleteMenu(itemParam.id)">Удалить</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </div>

</template>

<script>

export default {
  name: 'ContextMenuComponent',
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
      items: [
        {title: 'Редактировать'},
        {title: 'Удалить'}
      ],
      opened: false
    }
  },
  methods: {

    deleteMenu (id) {
      this.$contextMenu.delete(id)
    },
    editElement (element) {
      this.$contextMenu.edit(element)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
