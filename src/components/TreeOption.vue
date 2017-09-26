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
    },
    /**
     * The name of the property that holds the children array of each option,
     * if the option has any children.
     *
     * @type {String}
     */
    childrenProp: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    /**
     * The option's id value.
     */
    id () {
      return this.option[this.idProp]
    },
    /**
     * The option's label value.
     */
    label () {
      return this.option[this.labelProp]
    },
    /**
     * The option's children array.
     * If no childrenProp is defined in option returns an empty array.
     */
    children () {
      if (!this.option[this.childrenProp]) return []
      return this.option[this.childrenProp]
    },
    /**
     * Indicates if the option is marked as selected.
     */
    isSelected () {
      return this.option.isSelected
    },
    /**
     * Indicates if the option has at least one children marked as selected
     * or at least one of its children contains selected children.
     * But returns false if all of its children are marked as selected.
     */
    hasChildSelected () {
      return this.option.hasChildSelected
    },
    /**
     * Indicates if the option is considered a candidate for a search result.
     */
    isSearchResult () {
      return this.option.isSearchResult
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.treeoption {
  width: 100%;
}
</style>
