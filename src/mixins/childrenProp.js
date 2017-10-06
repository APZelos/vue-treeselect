export default {
  props: {
    /**
     * The name of the property that holds the children value of each option.
     *
     * @type {String}
     */
    childrenProp: {
      type: String,
      default: 'children'
    }
  },
  methods: {
    /**
     * Gets an option and returns its children value.
     *
     * @param {any} option The option which children we want to get.
     * @returns The value of the property with the name of childrenProp.
     */
    getChildren (option) {
      return option[this.childrenProp]
    },
    /**
     * Gets an option and changes its
     * children value with the given value.
     *
     * @param {any} option The option which children we want to set.
     * @param {any} value The new children value.
     */
    setChildren (option, value) {
      option[this.childrenProp] = value
    }
  }
}
