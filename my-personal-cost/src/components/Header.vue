<template>
  <div class="hello">
    <h1>{{ textHeader }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    textHeader: String,
    default () {
      return 'hi'
    }
  }
}
</script>

<style scoped lang="scss">

</style>
