<template>
  <div class="treeselect">
    <div class="treeselect__select clearfix">
      <!-- SEARCH INPUT / PLACEHOLDER START -->
      <input v-if="searchable || !isAnyOptionSelected" 
        class="treeselect__placeholder"
        v-model="searchQuery"
        :placeholder="searchable ? searchPlaceholder : placeholder"
        :readonly="!searchable"
        @focus="openDropdown"
        @click="openDropdown"
        @keyup.esc="closeDropdown" />
      <!-- SEARCH INPUT / PLACEHOLDER END -->
    </div>
    <!-- DROPDOWN START -->
    <div v-show="isOpen" class="treeselect__dropdown">
      
    </div>
    <!-- DROPDOWN END -->
  </div>
</template>

<script>
import TreeOption from './TreeOption'

export default {
  name: 'TreeSelect',
  components: {
    TreeOption
  },
  props: {
    /**
     * The name that will be used to reference the inputs that
     * holds the values and the data after the form submission.
     *
     * @type {String}
     * @default 'values'
     */
    name: {
      type: String,
      default: 'values'
    },
    /**
     * A short hint that will be displayed when no value is selected.
     *
     * @type {String}
     * @default 'Please select an option.'
     */
    placeholder: {
      type: String,
      default: 'Please select an option'
    },
    /**
     * Indicates if the dropdown element will be disabled.
     *
     * @type {Boolean}
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates if there will be a search capability.
     *
     * @type {Boolean}
     * @default true
     */
    searchable: {
      type: Boolean,
      default: true
    },
    /**
     * A short hint that will be displayed before a search query is given.
     *
     * @type {String}
     * @default 'Type to search'
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
     * @default 'id'
     */
    idProp: {
      type: String,
      default: 'id'
    },
    /**
     * The name of the property that holds the label value of each option.
     *
     * @type {String}
     * @default 'label'
     */
    labelProp: {
      type: String,
      default: 'label'
    },
    /**
     * The name of the property that holds the children array of each option,
     * if the option has any children.
     *
     * @type {String}
     * @default 'children'
     */
    childrenProp: {
      type: String,
      default: 'children'
    },
    /**
     * Holds the selected value,
     * an array, object or string that contains the value of the idProp of the selected options.
     *
     * @type {null} Accepts any type of value.
     * @default null
     */
    value: {
      type: null,
      default: null
    }
  },
  data () {
    return {
      /**
       * An array of all the selected options objects.
       *
       * @type {Array}
       * @default []
       */
      selectedOptions: [],
      /**
       * Indicates if the drop-down is open.
       *
       * @type {Boolean}
       * @default false
       */
      isOpen: false,
      /**
       * The query given by the user to filter the options.
       *
       * @type {String}
       * @default ''
       */
      searchQuery: ''
    }
  },
  computed: {
    /**
     * Indicates if a search query is provided.
     * (a search happening right now)
     */
    isSearching () {
      return !!this.searchQuery && this.searchQuery.length > 0
    },
    /**
     * An array that contains the value of the idProp of the selected options,
     * produced from the given value.
     */
    values () {
      if (typeof this.value === 'string') return String.prototype.split.call(this.value, ',').map(Number)
      if (Array.isArray(this.value)) return this.value
      return []
    },
    /**
     * Indicates if any option is selected
     *
     * @returns {Boolean} True if any option is selected.
     */
    isAnyOptionSelected () {
      return this.selectedOptions && this.selectedOptions.length > 0
    },
    /**
     * A list created by the original list of options given to component as a property
     * and configured with a series of additional properties.
     */
    optionList () {
      /**
       * Creates a configured option and defines a series of properties
       * that are required for the component to handle it.
       *
       * @param {Object} option The original option.
       * @param {Boolean} [isParentSelected=false] A flag that indicates if the parent that contains the given option is marked as selected.
       * @returns A configured option.
       */
      const configureOption = (option, isParentSelected = false) => {
        // Creates a copy of the option
        // that is going to be configured.
        const optionObj = {}
        optionObj[this.idProp] = option[this.idProp]
        optionObj[this.labelProp] = option[this.labelProp]
        optionObj[this.childrenProp] = []
        optionObj.hasChildSelected = false
        optionObj.hasChildSearchResult = false
        // An option is considered selected when its id value is included in the values array
        // or its parent is marked as selected.
        // (because the selection of an option that has children indicates the selection of all of its children)
        optionObj.isSelected = isParentSelected || Array.prototype.includes.call(this.values, optionObj[this.idProp])
        // An option is considered a candidate for a search result if its label value contains the given search query.
        optionObj.isSearchResult = this.isSearching && !!~String.prototype.indexOf.call(optionObj[this.labelProp], this.searchQuery)
        // If the option doesn't contain any children
        // no further configuration needs to be made.
        const childrenCount = Object.prototype.hasOwnProperty.call(option, this.childrenProp) && option[this.childrenProp].length
        if (!childrenCount) return optionObj
        const { selectedChildrenCount, isAnyChildrenSearchResult } = configureChildren(option[this.childrenProp], optionObj[this.childrenProp], optionObj.isSelected)
        optionObj.hasChildSearchResult = this.isSearching && isAnyChildrenSearchResult
        // An option can be marked that has selected children:
        //  * if at least one of its children is selected
        //  * if at least one of its children contains selected children
        // but not if all of them are selected.
        optionObj.hasChildSelected = selectedChildrenCount && (selectedChildrenCount < childrenCount)
        // If the option isn't already marked as selected but all of its children are selected
        // then the option must also be marked selected.
        optionObj.isSelected = optionObj.isSelected || (selectedChildrenCount && selectedChildrenCount === childrenCount)
        return optionObj
      }

      /**
       * Fills an array with configured children and returns a series of values to help the configuration of the parent.
       *
       * @param {Array} children The children of the original option.
       * @param {Array} childrenList The list of the configured option that is going to hold the configured children.
       * @param {Boolean} [isParentSelected=false] A flag that indicates if the option that contains the given children is marked as selected.
       * @returns The count of selected children and if any children is considered a candidate for a search result.
       */
      const configureChildren = (children, childrenList, isParentSelected = false) => {
        let selectedChildrenCount = 0
        let isAnyChildrenSearchResult = false
        for (let i = 0; i < children.length; i++) {
          const child = configureOption(children[i], isParentSelected)
          // If the configured child is marked as selected
          // then the count of selected children must be increased by 1
          if (child.isSelected) selectedChildrenCount++
          // If the configured child contains children that are marked as selected
          // then the selected children must be increased by 0.5,
          // so the total count will always be smaller than the length of the children.
          else if (child.hasChildSelected) selectedChildrenCount += 0.5
          // If the child, or any of its children, is considered a candidate for a search result
          // then the returned flag must be true.
          isAnyChildrenSearchResult = isAnyChildrenSearchResult || child.isSearchResult || child.hasChildSearchResult
          childrenList.push(child)
        }
        return { selectedChildrenCount, isAnyChildrenSearchResult }
      }

      const list = []
      for (let i = 0; i < this.options.length; i++) {
        list.push(configureOption(this.options[i]))
      }
      return list
    }
  },
  methods: {
    /**
     * Sets isOpen data to true, which opens the drop-down.
     */
    openDropdown () {
      this.isOpen = true
    },
    /**
     * Sets isOpen data to false, which closes the drop-down.
     */
    closeDropdown () {
      this.isOpen = false
    },
    /**
     * Get the id value of a given option.
     *
     * @param {Object} option The option that we want to get its id value.
     * @returns The id value of the given option.
     */
    getId (option) {
      return option[this.idProp]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
$font-size: 16px;
$space: 5px;
$space--l: 10px;

.treeselect {
  position: relative;
  font-size: $font-size;

  * {
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;
  }

  .clearfix,
  &.clearfix {
    content: "";
    display: table;
    clear: both;
  }

  &__select {
    border-bottom: 1px solid gray;
    width: 100%;
    height: 100%;
    padding: $space $space--l;
    font-size: inherit;

    input.treeselect__placeholder {
      border: none;
      height: 100%;
      max-width: 100%;
      padding-top: $space;
      padding-bottom: $space;
      float: left;
      font-size: inherit;

      &:disabled {
        cursor: pointer;
      }
    }
  }

  &__dropdown {
    z-index: 999;
    position: absolute;
    width: 100%;
    min-height: $space--l;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
}
</style>