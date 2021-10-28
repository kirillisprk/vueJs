<template>
  <div>
    <h3 v-if="state==='edit'">Форма редактирования</h3>
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
      <div class="footer">
        <button v-if="state==='edit'" @click="close()">Close</button>
        <button class="buttonSave" type="submit">{{ state }}</button>
      </div>

    </form>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'AddPaymentForm',
  props: {
    state: {
      type: String,
      default: 'Add +'
    },
    editElement: Object
  },
  data () {
    return {
      category: '',
      amount: '',
      date: '',
      editId: '',
      isErrorAmount: false,
      isErrorCategory: false,
      options: '',
      selectedCategory: '',
    }
  },
  computed: {
    ...mapGetters([
      'getCategoriesList',
      'getCurrentPage'
    ]),

  },
  methods: {
    ...mapMutations([
      'addDataToPaymentsList',
      'editCurrentElement'
    ]),
    ...mapActions([
      'fetchCategory'
    ]),
    close () {
      this.$contextMenu.closeEditForm()
    },
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
      this.$router.push({name: 'dashboard', params: {page: this.getCurrentPage.slice(-1)}}).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });

    },
    onEditClick () {
      const data = {
        category: this.selectedCategory,
        amount: this.amount,
        date: this.createDate(this.date),
        id: this.editId
      }
      this.editCurrentElement(data)
    },
    checkForm (e) {
      this.isErrorAmount = false;
      this.isErrorCategory = false;
      if (this.amount && this.selectedCategory) {
        (this.state === 'edit') ? this.onEditClick() : this.onSaveClick()
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
    setForm (element) {
      this.selectedCategory = element.category;
      this.amount = element.amount;
      this.editId = element.id
      const [dd, mm, yyyy] = element.date.split('.')
      this.date = new Date(+yyyy, +mm, +dd).toISOString().slice(0, 10);

    },

  },
  watch: {
    $route (to) {
      if (to.name === 'addPayment') {
        this.selectedCategory = to.params.category
        this.amount = parseInt(to.query.value)
        this.date = new Date().toISOString().slice(0, 10)
      }
    }
  },
  mounted () {
    if (!this.getCategoriesList.length) {
      this.getCategories()
    }
    this.getOptionsCategories()
    if (this.state === 'edit') {
      this.setForm(this.editElement)
      this.$contextMenu.EventBus.$on('editElement', this.setForm)
    }
  },

}

</script>

<style lang="scss" scoped>
.add-form {
  display: grid;
  max-width: 50%;
  grid-gap: 10px;
}

.footer {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.error {
  border: 1px solid red;
}

.buttonSave {
  min-width: 50%;
  justify-self: end;
}
</style>
