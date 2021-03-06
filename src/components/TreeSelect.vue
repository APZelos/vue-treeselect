<template>
  <div class="treeselect"
    v-click-outside="clickOutsideHandler">
    <!-- SELECT START -->
    <div :class="{
      //'clearfix': true,
      'treeselect__select': true,
      'treeselect__select--open': isOpen,
      }"
      @click="openDropdown">
      <div class="treeselect__flexbox">
        <!-- SELECTED OPTIONS START -->
        <TreeSelectedOption
          v-for="option in selectedOptions"
          :option="option"
          :key="option.id"
          :hasDeleteButton="hasDeleteButton"
          @delete="isOpen ? selectedOptionClickHandler(option.id, option.rootId) : null"
        />
        <!-- SELECTED OPTIONS END -->
        <!-- SEARCH INPUT / PLACEHOLDER START -->
        <input v-if="searchable ? (isOpen || !isAnyOptionSelected) : !isAnyOptionSelected" 
          v-focus
          ref="input"
          size="1"
          class="treeselect__placeholder"
          v-model="searchQuery"
          :placeholder="searchable ? searchPlaceholder : placeholder"
          :readonly="!searchable"
          @focus="openDropdown"
          @click="openDropdown"
          @keyup.esc="closeDropdown" />
        <!-- SEARCH INPUT / PLACEHOLDER END -->
      </div>
      <!-- CLEAR BUTTON START -->
      <div v-if="hasClearButton"
        class="treeselect__clear-button"
        @click="clearButtonClick()">&#10006;</div>
      <!-- CLEAR BUTTON END -->
      <!-- OPEN / CLOSE INDICATOR START -->
      <div :class="{
          'treeselect__indicator': true,
          'treeselect__indicator--open': isOpen
        }">
      </div>
      <!-- OPEN / CLOSE INDICATOR END -->
    </div>
    <!-- SELECT END -->
    <!-- DROPDOWN START -->
    <transition name="treeselect__dropdown">
      <div v-show="isOpen" class="treeselect__dropdown">
        <template v-for="option in optionList">
          <TreeOption 
          :key="getId(option)"
          :option="option"
          :idProp="idProp"
          :labelProp="labelProp"
          :childrenProp="childrenProp"
          :isSearching="isSearching"
          :areAnimationsEnabled="areOptionAnimationsEnabled"
          @toggle="toggleHandler">
          </TreeOption>
        </template>
      </div>
    </transition>
    <!-- DROPDOWN END -->
  </div>
</template>

<script>
import TreeOption from './TreeOption'
import TreeSelectedOption from './TreeSelectedOption'
import idProp from '../mixins/idProp'
import labelProp from '../mixins/labelProp'
import childrenProp from '../mixins/childrenProp'

export default {
  name: 'TreeSelect',
  mixins: [idProp, labelProp, childrenProp],
  components: {
    TreeOption,
    TreeSelectedOption
  },
  props: {
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
     * Indicates if the selected options
     * will have a dedicated delete button
     * or if they will be deleted by clicking on them.
     *
     * @type {Boolean}
     * @default false
     */
    hasDeleteButton: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates if there will be a clear all
     * selected options button.
     *
     * @type {Boolean}
     * @default false
     */
    hasClearButton: {
      type: Boolean,
      default: false
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
     * A a function that is called upon every option,
     * with the current examining option and the current search query as arguments,
     * and when returns true marks given option as a candidate for a search result.
     *
     * @type {Function}
     * @default Function Returns true if the label value of the given option contains the given search query.
     */
    search: {
      type: Function,
      default (option, searchQuery) {
        let optionLabelLowerCase = this.getLabel(option).toLowerCase()
        let searchQueryLowerCase = searchQuery.toLowerCase()
        return !!~optionLabelLowerCase.indexOf(searchQueryLowerCase)
      }
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
      searchQuery: '',
      /**
       * Indicates if the animations of the options should be played.
       * This is set to true only after a toggle event is fired
       * and to false every time the dropdown closes
       * to prevent the animations to play every time the dropdown open.
       *
       * @type {Boolean}
       * @default false
       */
      areOptionAnimationsEnabled: false
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
      if (typeof this.value === 'string') return this.value.split(',').map(Number)
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
        this.setId(optionObj, this.getId(option))
        this.setLabel(optionObj, this.getLabel(option))
        this.setChildren(optionObj, [])
        optionObj.hasChildSelected = false
        optionObj.hasChildSearchResult = false
        let index = this.values.indexOf(this.getId(optionObj))
        // An option is considered selected when its id value is included in the values array
        // or its parent is marked as selected.
        // (because the selection of an option that has children indicates the selection of all of its children)
        optionObj.isSelected = isParentSelected || !!~index
        // If the option is selected sets its position as the index
        // of the option's id in the array of the selected values
        if (optionObj.isSelected) optionObj.position = index
        // An option is considered a candidate for a search result if the search function returns true.
        optionObj.isSearchResult = this.isSearching && this.search(optionObj, this.searchQuery)
        // If the option doesn't contain any children
        // no further configuration needs to be made.
        const childrenCount = this.getChildren(option) && this.getChildren(option).length
        if (!childrenCount) return optionObj
        const { selectedChildrenCount, isAnyChildrenSearchResult } = configureChildren(this.getChildren(option), this.getChildren(optionObj), optionObj.isSelected)
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
    },
    /**
     * An array of all the selected options objects.
     *
     * @type {Array}
     */
    selectedOptions () {
      /**
       * Checks and option if it should be added to the list of selected option.
       *  * If the option is marked as selected there is no need to check its children, because when a parent is selected also all of its children are selected.
       *  * If it's not marked selected and the option contains children we check them.
       *
       * @param {Object} option The option we want to check.
       * @param {Boolean} isParentSelected Indicates if the that contains current option is selected.
       * @param {Number} rootId The id of the root option that contains the selected option.
       */
      const checkOption = (option, isParentSelected, rootId) => {
        if (option.isSelected) {
          list.push({
            id: this.getId(option),
            label: this.getLabel(option),
            position: this.values.indexOf(this.getId(option)),
            show: !isParentSelected,
            rootId
          })
        }
        if (this.getChildren(option).length > 0) {
          for (let i = 0; i < this.getChildren(option).length; i++) {
            checkOption(this.getChildren(option)[i], option.isSelected, rootId)
          }
        }
      }

      const list = []
      for (let i = 0; i < this.optionList.length; i++) {
        checkOption(this.optionList[i], false, this.getId(this.optionList[i]))
      }
      list.sort((optionA, optionB) => {
        return optionA.position - optionB.position
      })
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
     * Sets isOpen data to false, which closes the drop-down,
     * and deactivates option animations.
     */
    closeDropdown () {
      this.isOpen = false
      this.searchQuery = ''
      this.areOptionAnimationsEnabled = false
    },
    /**
     * Handles the options toggle event,
     * fires the input event (for v-model),
     * and activates option animations
     *
     * @param {Number} toggledId The id of the option that was toggled.
     * @param {Boolean} newIsSelectedValue The new value of isSelected property of the toggled option.
     * @param {Number} rootId The id of the root option that contains the toggled option.
     */
    toggleHandler (toggledId, newIsSelectedValue, rootId) {
      /**
       * Gets an option and if after the validations can
       * be considered selected adds its id to the new values.
       *
       * @param {Object} option The option that is going to be checked.
       * @param {Boolean} isParentToggled If the parent option is marked as toggled.
       * @param {Boolean} isParentSelected If the parent option after the validations is marked as selected
       * @returns {Boolean} True if the option after the validations is marked as selected.
       */
      const checkOption = (option, isParentToggled, isParentSelected) => {
        let optionId = this.getId(option)
        // An options is considered toggled if:
        //  * its id is the same as the id of the option that fired the event
        //  * its parent is marked as toggled
        let isToggled = optionId === toggledId || isParentToggled
        // Checks if this option was selected before the toggled event was fired.
        let isOptionIdInOldValues = this.values.includes(optionId)
        // An option can be considered selected if:
        //  * it's marked as toggled and the newIsSelectedValue is true
        //  * its parent is marked as selected
        //  * it's not marked as toggled and was selected before the toggle event was fired
        let isSelected = isToggled
          ? newIsSelectedValue
          : isParentSelected || isOptionIdInOldValues
        // If the option has children it can be considered
        // selected only if all of its children are marked
        // as selected after the toggle event.
        if (this.getChildren(option)) isSelected = checkChildren(this.getChildren(option), isToggled, isSelected)
        // Removes the id of the current option from
        // the newValues if is effected by the toggled option.
        if ((isSelected && !isOptionIdInOldValues) ||
          (!isSelected && isOptionIdInOldValues)) {
          let index = newValues.indexOf(optionId)
          if (~index) newValues.splice(index, 1)
        }
        if (isSelected && !isOptionIdInOldValues) newValues.push(optionId)
        return isSelected
      }

      /**
       * Checks all the given children.
       *
       * @param {Array} children The array of children that is going to be checked.
       * @param {Boolean} isParentToggled If the parent option is marked as toggled.
       * @param {Boolean} isParentSelected If the parent option after the validations is marked as selected
       * @returns {Boolean} True if all the children are marked as selected.
       */
      const checkChildren = (children, isParentToggled, isParentSelected) => {
        let selectedChildrenCount = 0
        for (let i = 0; i < children.length; i++) {
          if (checkOption(children[i], isParentToggled, isParentSelected)) selectedChildrenCount++
        }
        return selectedChildrenCount === children.length
      }

      let newValues = [...this.values]
      // Finds the root option that contains the toggled option.
      let rootOption = this.options.find(option => {
        return this.getId(option) === rootId
      })
      checkOption(rootOption, false, false)
      this.$emit('input', newValues.join())
      this.areOptionAnimationsEnabled = true
    },
    /**
     * Handles the click of a selected option.
     * Calls the toggle handler with the id of
     * the clicked selected option and false
     * as the newIsSelectedValue to unselect the option.
     */
    selectedOptionClickHandler (optionId, rootId) {
      this.toggleHandler(optionId, false, rootId)
    },
    /**
     * Handles the click of the clear button.
     * Emits an input event with empty value.
     */
    clearButtonClick () {
      this.$emit('input', '')
    },
    /**
     * Handles the click outside the component to close the dropdown.
     * @param {Object} event The event object.
     */
    clickOutsideHandler (event) {
      this.closeDropdown()
    }
  },
  watch: {
    /**
     * Watches isSearching value and when changes to true
     * opens the dropdown and disables the option animations
     * (because filtering the options triggers their animations).
     */
    isSearching (value) {
      if (value) {
        this.openDropdown()
        this.areOptionAnimationsEnabled = false
      }
    }
  },
  directives: {
    /**
     * When used by an element forces it to get focused after it gets inserted in the DOM
     */
    focus: {
      inserted (el) {
        el.focus()
      }
    },
    'click-outside': {
      bind (el, binding, vNode) {
        // Directive binding must be a function
        if (typeof binding.value !== 'function') {
          let warning = `[Vue-click-outside:] provided expression '${binding.expression}' must be a function.`
          const componentName = vNode.context.name
          if (componentName) warning += ` Component: ${componentName}.`
          console.warn(warning)
        }
        // The event handler propagates
        // the event if the clicked element
        // is not inside the component and is not
        // the component its self.
        const handler = (event) => {
          if (!el.contains(event.target) &&
          el !== event.target &&
          // Checks that the clicked element is on a selected option
          // because when a selected option is clicked is removed from the DOM
          // and the el does not contains the clicked selected option witch
          // leads to the dropdown closing when clicking a selected option.
          !event.target.className.includes('treeselected')) binding.value(event)
        }

        el.__vueClickOutside__ = handler
        document.addEventListener('click', handler)
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/variables.scss";

.treeselect {
  position: relative;
  font-size: $font-size;
  line-height: $line-height;

  * {
    box-sizing: border-box;
  }

  .clearfix,
  &.clearfix {
    content: "";
    display: table;
    clear: both;
  }

  &__select {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding: $space $space--l #{$space - $space--s} $space--l;
    font-size: inherit;
    line-height: inherit;
    border: 1px solid $color-lightGrey;
    border-radius: $space;

    &--open {
      cursor: default;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    input.treeselect__placeholder {
      flex-grow: 1;
      border: none;
      margin-top: 0;
      margin-bottom: $space--s;
      padding-top: $space;
      padding-bottom: $space;
      font-size: $font-size--s;
      line-height: $line-height--s;
      background-color: transparent;
      text-overflow: ellipsis;

      &:focus,
      &:active {
        outline: none;
      }
    }
  }

  &__flexbox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    flex-grow: 1;
  }

  &__clear-button,
  &__indicator { 
    align-self: flex-end;
    margin-left: $space;
  }

  &__clear-button {
    cursor: pointer;
    margin-bottom: $space;
    font-size: $font_size--s;
    line-height: $font_size--s;
    color: $color-grey;
  }

  &__indicator {
    margin-bottom: 7px;
    transition: transform 0.2s;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 9px solid $color-darkGrey;

    &--open {
      transform: rotate3d(0, 0, 1, -180deg);
      border-top-color: $color-main;
    }
  }

  &__dropdown {
    overflow: auto;
    z-index: 999;
    position: absolute;
    width: 100%;
    min-height: $space--l;
    max-height: 200px;
    padding: $space;
    border: 1px solid $color-lightGrey;
    border-top: 0;
    border-bottom-left-radius: $space;
    border-bottom-right-radius: $space;
    background-color: white;
    z-index: 100;

    &-enter {
      max-height: 0;
      opacity: 0;
    }

    &-enter-active {
      transition: max-height 0.5s ease-out;
    }

    
    &-leave-to {
      max-height: 0;
    }

    &-leave-active {
      transition: max-height 0.5s cubic-bezier(0.95, 0.05, 0.795, 0.035);
    }
  }
}
</style>