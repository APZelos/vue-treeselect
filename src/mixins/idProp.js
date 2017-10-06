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
    getId (option) {
      return option[this.idProp]
    }
  }
}
