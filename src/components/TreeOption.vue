<template>
  <div v-show="!isSearching || isVisibleAtSearch" class="treeoption">
    <!-- LABEL START -->
    <div :class="{
      'treeoption__label': true,
      'treeoption__label--disabled': isSearching && !isEnabledAtSearch
      }">
      <!-- INDICATOR START -->
      <div
       :class="{
        'treeoption__indicator': true, 
        'treeoption__indicator--fill': isSelected,
        'treeoption__indicator--animated': playAnimations
        }"
        @click="(!isSearching || (isSearching && isEnabledAtSearch)) && toggleHandler(id, !isSelected)">
        <!-- INDICATOR ICON START -->
        <div :class="{
          indicator: true,
          'indicator--child-selected' : hasChildSelected,
          'indicator--is-selected' : isSelected
          }">
        </div>
        <!-- INDICATOR ICON END -->
      </div>
      <!-- INDICATOR END -->
      <!-- TEXT START -->
      <div class="treeoption__text"
        @click="textClickHandler">
        {{label}} 
        <!-- OPEN / CLOSE INDICATOR START -->
        <div v-if="hasChildren" 
          v-show="!isSearching || isEnabledAtSearch"
          :class="{
            indicator: true,
            'indicator--open': isOpen
          }">
        <!-- OPEN / CLOSE INDICATOR END -->
        </div>
      </div>
      <!-- TEXT END -->
    </div>
    <!-- LABEL END -->
    <!-- CHILDREN START -->
    <div v-if="hasChildren" 
      v-show="isOpen || (isSearching && isVisibleAtSearch)"
      class="treeoption__children">
      <template v-for="child in children">
        <TreeOption 
          :key="child[idProp]"
          :option="child"
          :idProp="idProp"
          :labelProp="labelProp"
          :childrenProp="childrenProp" 
          :isParentOpen="isOpen"
          :isSearching="isSearching"
          :isParentSearchResult="isParentSearchResult || isSearchResult"
          :areAnimationsEnabled="areAnimationsEnabled"
          @toggle="toggleHandler">
          </TreeOption>
      </template>
    </div>
    <!-- CHILDREN END -->
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
    },
    /**
     * Indicates if the dropdown of the option that contains the current option is open.
     *
     * @type {Boolean}
     * @default false
     */
    isParentOpen: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates if the parent option is a candidate for a search result.
     *
     * @type {Boolean}
     * @default false
     */
    isParentSearchResult: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates if a search query is provided.
     * (a search happening right now)
     */
    isSearching: {
      type: Boolean,
      required: true
    },
    /**
     * Indicates if the animations are enabled.
     * This helps to prevent animations to be played
     * every time the dropdown opens.
     *
     * @type {Boolean}
     */
    areAnimationsEnabled: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      /**
       *  Indicates if the drop-down that holds the children is open.
       *
       * @type {Boolean}
       * @default false
       */
      isOpen: false,
      /**
       * Indicates if the animations should be played.
       *
       * @type {Boolean}
       * @default false
       */
      playAnimations: false
    }
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
     * Indicates if the option contains any children.
     */
    hasChildren () {
      return this.children.length > 0
    },
    /**
     * Indicates if the option is marked as selected.
     */
    isSelected () {
      return this.option.isSelected
    },
    /**
     * Indicates if the option has at least one child marked as selected
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
    },
    /**
     * Indicates if the option has at least one child that
     * is considered a candidate for a search result.
     */
    hasChildSearchResult () {
      return this.option.hasChildSearchResult
    },
    /**
     * Indicates if this option should be shown during search.
     * An option is visible:
     *  * if no searching is currently happening
     *  * if is considered a candidate for a search result
     *  * if it has at least one child that is considered a candidate for a search result
     *  * if the parent option is a candidate for a search result and the parent's dropdown is open
     */
    isVisibleAtSearch () {
      return this.isSearchResult || this.hasChildSearchResult || (this.isParentOpen && this.isParentSearchResult)
    },
    /**
     * Indicates if this option is enabled during search.
     * An option is enabled during search:
     *  * if is considered a candidate for a search result
     *  * if the parent option is a candidate for a search result
     */
    isEnabledAtSearch () {
      return this.isSearchResult || this.isParentSearchResult
    }
  },
  methods: {
    /**
     * Handles the click event of the text element.
     * If the a search is happening and the option is not marked as enabled at search doesn't allow method to run.
     * If the option has children toggles the isOpen data (opens / close the dropdown that holds the option's children).
     * If the option has no children fires toggle event.
     */
    textClickHandler () {
      if (this.isSearching && !this.isEnabledAtSearch) return void 0
      if (this.hasChildren) {
        this.isOpen = !this.isOpen
        return void 0
      }
      this.toggleHandler(this.id, !this.isSelected)
    },
    /**
     * Handles the toggle event.
     *
     * @param {Number} id The id of the option that was toggled.
     * @param {Boolean} newIsSelectedValue The new value of isSelected property of the toggled option.
     */
    toggleHandler (id, newIsSelectedValue) {
      this.$emit('toggle', id, newIsSelectedValue)
    }
  },
  watch: {
    /**
     * Watches the isParentOpen value.
     * When the dropdown of the parent option that contains
     * this option closes this option's dropdown must also close.
     */
    isParentOpen (value) {
      if (!value) this.isOpen = false
    },
    /**
     * Watches the isSelected value and enables the animation when is changed.
     */
    isSelected (value) {
      this.playAnimations = true
    },
    /**
     * Watches the hasChildSelected value and enables the animation when is changed.
     */
    hasChildSelected (value) {
      this.playAnimations = true
    },
    /**
     * Watches the areAnimationsEnabled and disabled the animations if its value is false.
     */
    areAnimationsEnabled (value) {
      if (!value) this.playAnimations = false
    }
  }
}
</script>

<style lang="scss">
@import "../assets/variables.scss";

.treeoption {
  width: 100%;
  padding-top: $space;

  &__label {
    position: relative;

    &.treeoption__label--disabled {

      .treeoption__indicator {
        &--fill {
        background-color: $color-lightGrey;
        }
      }

      .indicator {
        &--is-selected {
          border-right: 3px solid $color-grey;
          border-bottom: 3px solid $color-grey;
        }

        &--child-selected {
          background-color: $color-grey;
        }
      }

      .treeoption__text,
      .treeoption__indicator {
        cursor: default;
      }
    }
  }

  &__indicator {
    cursor: pointer;
    float: left;
    margin-top: 2px;
    margin-right: $space;
    height: $font-size;
    width: $font-size;
    border: 1px solid $color-grey;
    background-color: $color-lightGrey;

    &--fill {
      border: none;
      background-color: $color-main;
    }

    &--animated {
      .indicator--child-selected {
        animation: indicator--child-selected 0.2s ease-in;
      }
      .indicator--is-selected {
        animation: indicator--is-selected 0.2s ease-in;
      }
    }

    .indicator {

      &--is-selected {
        margin: 2px auto;
        transform: rotate(45deg);
        width: 6px;
        height: 10px;
        border-right: 3px solid white;
        border-bottom: 3px solid white;
      }

      &--child-selected {
        width: #{$font-size - 2};
        height: #{$font-size - 2};
        border: 2px solid $color-lightGrey;
        background-color: $color-main;
      }
    }
  }

  &__text {
    cursor: pointer;
    text-align: left;

    .indicator {
      transition: transform 0.2s;
      display: inline-block;
      margin-bottom: 2px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 7px solid black;

      &--open {
        transform: rotate3d(0, 0, 1, -180deg)
      }
    }
  }

  &__children {
    padding-left: $space--l;
  }
}

@keyframes indicator--child-selected {
  0% {
    border-width: #{($font-size - 2) / 2};
  }
  75% {
    border-width: 0;
  }
  100% {
    border-width: 2px;
  }
}

@keyframes indicator--is-selected {
  0% {
    border-right-width: 0;
    border-bottom-width: 0;
  }
  50% {
    border-right-width: 0;
    border-bottom-width: 3px;
  }
  100% {
    border-right-width: 3px;
  }
}
</style>
