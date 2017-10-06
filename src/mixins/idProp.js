export default {
  props: {
    /**
     * The name of the property that holds the identifier value of each option.
     *
     * @type {String}
     * @default 'id'
     */
    idProp: {
      type: String,
      default: 'id'
    }
  },
  methods: {
    /**
     * Gets an option and returns its id value.
     *
     * @param {any} option The option which id we want to get.
     * @returns The value of the property with the name of idProp.
     */
    getId (option) {
      return option[this.idProp]
    }
  }
}
