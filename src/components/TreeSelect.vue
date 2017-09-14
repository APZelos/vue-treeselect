<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    /**
     * The name that will be used to reference the inputs that 
     * holds the values and the data after the form submission.
     *
     * @type {String}
     */
    name: {
      type: String,
      default: 'values'
    }
  },
  data() {
    return {
      msg: 'TreeSelect'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
  font-weight: normal;
}
</style>
