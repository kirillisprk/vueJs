<template>
  <div>
    <div class="display">
      <input v-model.number="operand1" type="number"/>
      <input v-model.number="operand2" type="number"/>
      = {{ result }}
      <div v-if="error">Ошибка! {{ error }}</div>
    </div>
    <div class="keyboard">
      <button @click="calculator('+')">+</button>
      <button @click="calculator('-')">-</button>
      <button @click="calculator('%')" :disabled="operand2===0">%</button>
      <button @click="calculator('*')">*</button>
      <button @click="calculator('^')">^</button>
      <button @click="calculator('/')">/</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      operand1: 0,
      operand2: 0,
      result: 0,
      error: ''
    }
  },
  methods: {
    calculator(operation) {
      this.error = ''
      switch (operation) {
        case '+':
          this.add()
          break;
        case '-':
          this.sub()
          break;
        case '*':
          this.multi()
          break;
        case '%':
          this.div()
          break;
        case '^':
          this.pow()
          break;
        case '/':
          this.integerDiv()
          break;
      }
    },
    add() {
      const {operand1, operand2} = this;
      this.result = operand1 + operand2;
    },
    sub() {
      const {operand1, operand2} = this;
      this.result = operand1 - operand2
    },
    multi() {
      const {operand1, operand2} = this;
      this.result = operand1 * operand2;
    },
    div() {
      const {operand1, operand2} = this;
      this.result = operand1 / operand2;
    },
    pow() {
      const {operand1, operand2} = this;
      this.result = Math.pow(operand1, operand2);
    },
    integerDiv() {
      const {operand1, operand2} = this;
      operand2 === 0 ? this.error = 'Делить на 0 нельзя!' : this.result = (operand1 - operand1 % operand2) / operand2;
    }
  },

}

</script>

<style scoped>

</style>