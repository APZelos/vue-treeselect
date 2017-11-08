export default {
  props: {
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
  methods: {
    /**
     * Gets an option and returns its label value.
     *
     * @param {any} option The option which label we want to get.
     * @returns The value of the property with the name of labelProp.
     */
    getLabel (option) {
      return option[this.labelProp]
    },
    /**
     * Gets an option and changes its
     * label value with the given value.
     *
     * @param {any} option The option which label we want to set.
     * @param {any} value The new label value.
     */
    setLabel (option, value) {
      option[this.labelProp] = value
    }
  }
}
