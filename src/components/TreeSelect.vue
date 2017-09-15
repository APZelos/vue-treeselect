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
    },
    /**
     * A short hint that will be displayed when no value is selected.
     *
     * @type {String}
     */
    placeholder: {
      type: String,
      default: 'Please select an option.'
    },
    /**
     * Indicates if the dropdown element will be disabled.
     *
     * @type {Boolean}
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates if there will be a search capability.
     *
     * @type {Boolean}
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * A short hint that will be displayed before a search query is given.
     *
     * @type {String}
     */
    searchPlaceholder: {
      type: String,
      default: 'Type to search'
    },
    /**
     * The available options. 
     * An array of objects with three properties: 
     *  * an identifier (example: option.id), 
     *  * a label (example option.label) and 
     *  * an array of children (example option.children), if the option has children.
     * 
     * @type {Array}
     */
    options: {
      type: Array,
      required: true
    },
    /**
     * The name of the property that holds the identifier value of each option.
     * 
     * @type {String}
     */
    idProp: {
      type: String,
      default: 'id'
    },
    /**
     * The name of the property that holds the label value of each option.
     * 
     * @type {String}
     */
    labelProp: {
      type: String,
      default: 'label'
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
