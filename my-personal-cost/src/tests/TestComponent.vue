<template>
  <div>The massage is: {{ massage }}</div>
</template>

<script>
export default {
  name: "TestComponent",
  props: {
    massage: String
  }
}
</script>

<style scoped>

</style>
