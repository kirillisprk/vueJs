<template>
  <div>
    <button @click="addTest('Food', 200)">Food с ценой 200</button>
    <button @click="addTest('Transport', 50)">Transport с ценой 50</button>
    <button @click="addTest('Entertainment',2000)">Entertainment с ценой 2000</button>
    <button @click="addTest('Entertainment','')">Entertainment без стоимости</button>
  </div>
</template>

<script>
export default {
  name: "FastAddList",
  methods: {
    addTest (category, amount) {
      this.$router.push({name: 'addPayment', params: {category: category}, query: {value: amount}}).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
    },
  },
  created () {

  }
}

</script>

<style scoped>

</style>
