<template>
  <div>
    <v-col>
      <v-row>
        <v-btn color="teal mb-4" dark @click="addTest('Food', 200)">
          Food с ценой 200
        </v-btn>
      </v-row>
      <v-row>
        <v-btn color="teal mb-4" dark @click="addTest('Entertainment',2000)">
          Entertainment с ценой 2000
        </v-btn>
      </v-row>
    </v-col>
    <v-col>
      <v-row>
        <v-btn color="teal mb-4" dark @click="addTest('Transport', 50)">
          Transport с ценой 50
        </v-btn>
      </v-row>
      <v-row>
        <v-btn color="teal mb-4" dark @click="addTest('Entertainment','')">
          Entertainment без стоимости
        </v-btn>
      </v-row>
    </v-col>

  </div>
</template>

<script>
export default {
  name: 'FastAddList',
  created () {

  },
  methods: {
    addTest (category, amount) {
      this.$router.push({name: 'addPayment', params: {category: category}, query: {value: amount}}).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err
        }
      })
      this.$emit('showAdd');
    }
  }
}

</script>

<style scoped>

</style>
