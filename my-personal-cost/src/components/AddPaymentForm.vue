<template>
  <div>
    <template>
      <v-dialog v-model="dialog" persistent width="500">
        <v-card>
          <v-container>
            <v-card-title>
              <span v-if="state==='edit'" class="text-h5">Форма редактирования</span>
              <span v-else class="text-h5">Форма добавления</span>
            </v-card-title>
            <v-col>
              <!--календарь-->
              <v-row>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      ref="date"
                      label="Payment Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    color="teal"
                    :first-day-of-week="1"
                    locale-first-day-of-year="4"
                    locale="ru"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="teal" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="teal" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-row>
              <!--категория-->
              <v-row>
                <v-autocomplete hint="Выберите категорию"
                                required
                                v-model="selectedCategory"
                                label="Category*"
                                :items="options"
                ></v-autocomplete>
              </v-row>
              <!--стоимость-->
              <v-row>
                <v-text-field required
                              v-model.number="amount"
                              type="number"
                              min="0"
                              label="Payment amount*"
                              hint="Ведите стоимость"
                >
                </v-text-field>
              </v-row>
            </v-col>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1"
                   text
                   @click="closeWindow">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="checkForm">
              {{ state }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
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
    editElement: Object,
    dialog: Boolean,
  },
  data () {
    return {
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      valid: false,
      category: '',
      amount: '',
      date: '',
      editId: '',
      isErrorAmount: false,
      isErrorCategory: false,
      options: [],
      selectedCategory: ''
    }
  },
  computed: {
    ...mapGetters([
      'getCategoriesList',
      'getCurrentPage'
    ])

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
      const d = this.formatDayAndMouth((date.getDate()).toString())
      const m = this.formatDayAndMouth((date.getMonth() + 1).toString())
      const y = date.getFullYear()
      return `${d}.${m}.${y}`
    },
    formatDayAndMouth (number) {
      if (number.length < 2) {
        return '0' + number
      }
      return number
    },
    createDate (date) {
      if (!Date.parse(date)) {
        return this.formattedDate(new Date())
      } else {
        return this.formattedDate(new Date(date))
      }
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
          throw err
        }
      })
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
      this.isErrorAmount = false
      this.isErrorCategory = false
      if (this.amount && this.selectedCategory) {
        (this.state === 'edit') ? this.onEditClick() : this.onSaveClick()
      }
      if (!this.amount) {
        this.isErrorAmount = true
      }
      if (!this.selectedCategory) {
        this.isErrorCategory = true
      }
      this.closeWindow()
      e.preventDefault()
    },
    getCategories () {
      this.fetchCategory()
    },
    setForm (element) {
      this.selectedCategory = element.category
      this.amount = element.amount
      this.editId = element.id
      const [dd, mm, yyyy] = element.date.split('.')
      this.date = new Date(+yyyy, +mm, +dd).toISOString().slice(0, 10)
    },
    closeWindow () {
      this.selectedCategory = ''
      this.amount = ''
      this.editId = ''
      this.date = ''
      this.$emit('hideAdd');
    }

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
    }
    this.$contextMenu.EventBus.$on('editElement', this.setForm)
  }

}

</script>

<style lang="scss" scoped>

</style>
