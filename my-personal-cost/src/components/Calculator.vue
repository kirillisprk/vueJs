<template>
  <div>
    <div class="display">
      <input
        ref="operand1"
        v-model.number="operand1"
        name="operand1"
        @focus="selectOperand = 1"
      >
      <input
        ref="operand2"
        v-model.number="operand2"
        name="operand2"
        @focus="selectOperand = 2"
      >
      = {{ result }}
      <div v-if="error">
        Ошибка! {{ error }}
      </div>
    </div>
    <div class="keyboard">
      <button
        v-for="operand in operands"
        :key="operand"
        :title="operand"
        :disabled="(operand === '/' && operand2 === 0)||(operand1 ==='' || operand2==='')"
        @click="calculator(operand)"
      >
        {{ operand }}
      </button>
    </div>
    <div class="keyboardDisplayed">
      <label>
        <input
          v-model="showKeyboard"
          type="checkbox"
        >
        Отобразить экранную клавиатуру
      </label>
      <br>
      <div
        v-if="showKeyboard"
        class="keyboardButtons"
      >
        <label>
          <input
            v-model="selectOperand"
            name="selectOperand1"
            type="radio"
            :value="1"
            @click="$refs.operand1.focus()"
          >
          Операнд 1
        </label>
        <label>
          <input
            v-model="selectOperand"
            name="selectOperand2"
            type="radio"
            :value="2"
            @click="$refs.operand2.focus()"
          >
          Операнд 2
        </label>
        <br>
        <button
          v-for="button in buttons"
          :key="button"
          :title="button"
          :disabled="selectOperand === ''"
          @click.stop="setOperand(button)"
        >
          <span v-if="button==='del'"> &#8592;</span>
          <span v-else> {{ button }}</span>
        </button>
      </div>
    </div>
    <div class="logs">
      <div
        v-for="(log, id) in logs"
        :key="id"
      >
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data () {
    return {
      operand1: '',
      operand2: '',
      result: 0,
      error: '',
      operands: ['+', '-', '%', '/', '*', '^'],
      buttons: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'del'],
      logs: {},
      showKeyboard: true,
      selectOperand: ''
    }
  },
  methods: {
    calculator (operation) {
      this.error = ''
      this.result = 0
      this.operand1 = +this.operand1
      this.operand2 = +this.operand2
      switch (operation) {
        case '+':
          this.add()
          break
        case '-':
          this.sub()
          break
        case '*':
          this.multi()
          break
        case '%':
          this.div()
          break
        case '^':
          this.pow()
          break
        case '/':
          this.integerDiv()
          break
      }
      const key = Date.now()
      const value = `${this.operand1}${operation}${this.operand2}=${this.result}`
      this.$set(this.logs, key, value)
    },
    add () {
      const { operand1, operand2 } = this
      this.result = operand1 + operand2
    },
    sub () {
      const { operand1, operand2 } = this
      this.result = operand1 - operand2
    },
    multi () {
      const { operand1, operand2 } = this
      this.result = operand1 * operand2
    },
    div () {
      const { operand1, operand2 } = this
      operand2 === 0 ? this.error = 'Делить на 0 нельзя!' : this.result = operand1 / operand2
    },
    pow () {
      const { operand1, operand2 } = this
      this.result = Math.pow(operand1, operand2)
    },
    integerDiv () {
      const { operand1, operand2 } = this
      operand2 === 0 ? this.error = 'Делить на 0 нельзя!' : this.result = (operand1 - operand1 % operand2) / operand2
    },
    setOperand (value) {
      switch (this.selectOperand) {
        case 1:
          if (value === 'del') {
            this.operand1 = this.deleteLastSymbol(this.operand1)
          } else {
            this.operand1 = this.operand1 + value
          }
          this.$refs.operand1.focus()
          break
        case 2:
          if (value === 'del') {
            this.operand2 = this.deleteLastSymbol(this.operand2)
          } else {
            this.operand2 = this.operand2 + value
          }
          this.$refs.operand2.focus()
          break
      }
    },
    deleteLastSymbol (value) {
      value = value.toString()
      return value.slice(0, -1)
    }
  }

}

</script>

<style scoped>

</style>
