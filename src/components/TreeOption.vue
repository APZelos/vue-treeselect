<template>
  <div class="treeoption">
  </div>
</template>

<script>
export default {
  name: 'TreeOption',
  props: {
    /**
     * The object that holds the data of the option.
     *
     * @type {Object}
     */
    option: {
      type: Object,
      required: true
    },
    /**
     * The name of the property that holds the identifier value of each option.
     *
     * @type {String}
     */
    idProp: {
      type: String,
      required: true
    },
    /**
     * The name of the property that holds the label value of each option.
     *
     * @type {String}
     */
    labelProp: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
.treeoption {
  width: 100%;
}
</style>