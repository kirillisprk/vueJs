<template>
  <div>
    <form class="add-form" id="add-item" @submit="checkForm">
      <input :class="{ error: isErrorCategory}" placeholder="Payment description" v-model="category"/>
      <input :class="{ error: isErrorAmount}" placeholder="Payment amount" v-model.number="amount" type="number"
             min="0"/>
      <input ref="date" placeholder="Payment Date" v-model="date" type="date"/>
      <button class="buttonSave" type="submit">Add +</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'AddPaymentForm',
  data () {
    return {
      category: '',
      amount: '',
      date: '',
      isErrorCategory: false,
      isErrorAmount: false
    }
  },

  methods: {
    formattedDate (date) {
      let d = this.formatDayAndMouth((date.getDate()).toString());
      let m = this.formatDayAndMouth((date.getMonth() + 1).toString());
      const y = date.getFullYear();
      return `${d}.${m}.${y}`
    },
    formatDayAndMouth (number) {
      if (number.length < 2) {
        return '0' + number;
      }
      return number
    },
    createDate (date) {
      if (!Date.parse(date)) {
        return this.formattedDate(new Date())
      } else
        return this.formattedDate(new Date(date))
    },
    onSaveClick () {
      const data = {
        category: this.category,
        amount: this.amount,
        date: this.createDate(this.date)
      }

      this.$emit('emitName', data)
    },
    checkForm (e) {
      this.isErrorAmount = false;
      this.isErrorCategory = false;
      if (this.category && this.amount) {
        this.onSaveClick();
      }
      if (!this.category) {
        this.isErrorCategory = true
      }
      if (!this.amount) {
        this.isErrorAmount = true
      }
      e.preventDefault();
    }
  }

}
</script>

<style lang="scss" scoped>
.add-form {
  display: grid;
  max-width: 50%;
  grid-gap: 10px;
}

.error {
  border: 1px solid red;
}

.buttonSave {
  min-width: 50%;
  justify-self: end;
}
</style>
