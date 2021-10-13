<template>
  <div class="text-h5 text-sm-h3 my-8">
    {{ textHeader }}
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
