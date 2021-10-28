<template>
  <div>
    <form class="add-form" id="add-item" @submit="checkForm">
      <select v-model="selectedCategory" :class="{ error: isErrorCategory}">
        <option disabled value="">Выберите категорию</option>
        <option v-for="option in options" :value="option" :key="option">
          {{ option }}
        </option>
      </select>
      <input :class="{ error: isErrorAmount}" placeholder="Payment amount" v-model.number="amount" type="number"
             min="0"/>
      <input ref="date" placeholder="Payment Date" v-model="date" type="date"/>
      <button class="buttonSave" type="submit">Add +</button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'AddPaymentForm',
  data () {
    return {
      category: '',
      amount: '',
      date: '',
      isErrorAmount: false,
      isErrorCategory: false,
      options: '',
      selectedCategory: '',
    }
  },
  computed: {
    ...mapGetters([
      'getCategoriesList'
    ]),

  },
  methods: {
    ...mapMutations([
      'addDataToPaymentsList'
    ]),
    ...mapActions([
      'fetchCategory'
    ]),
    getOptionsCategories () {
      this.options = this.getCategoriesList
    },
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
        category: this.selectedCategory,
        amount: this.amount,
        date: this.createDate(this.date)
      }
      this.addDataToPaymentsList(data)

    },
    checkForm (e) {
      this.isErrorAmount = false;
      this.isErrorCategory = false;
      if (this.amount && this.selectedCategory) {
        this.onSaveClick();
      }
      if (!this.amount) {
        this.isErrorAmount = true
      }
      if (!this.selectedCategory) {
        this.isErrorCategory = true
      }
      e.preventDefault();
    },
    getCategories () {
      this.fetchCategory()
    },
  },
  mounted () {
    if (!this.getCategoriesList.length) {
      this.getCategories()
    }
    this.getOptionsCategories()
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
