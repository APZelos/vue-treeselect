<template>
  <div class="treeoption">
    <!-- LABEL START -->
    <div class="treeoption__label">
      <!-- INDICATOR START -->
      <div :class="{
        'treeoption__indicator': true, 
        'treeoption__indicator--fill': isSelected
        }">
        <!-- INDICATOR ICON START -->
        <div :class="{
          indicator: true,
          'indicator--child-selected' : hasChildSelected,
          'indicator--is-selected' : isSelected,
          }">
        </div>
        <!-- INDICATOR ICON END -->
      </div>
      <!-- INDICATOR END -->
      <!-- TEXT START -->
      <div class="treeoption__text">
        {{label}} 
        <!-- OPEN / CLOSE INDICATOR START -->
        <div v-if="hasChildren" 
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
    return {
      /**
       *  Indicates if the drop-down that holds the children is open.
       *
       * @type {Boolean}
       * @default false
       */
      isOpen: false
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
    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import "../assets/variables.scss";

.treeoption {
  width: 100%;

  &__label {
    position: relative;
  }

  &__indicator {
    cursor: pointer;
    float: left;
    margin-top: 2px;
    margin-right: $space;
    height: $font-size;
    width: $font-size;
    border: 0.5px solid $color-grey;
    background-color: $color-lightGrey;

    &--fill {
      border: none;
      background-color: $color-main;
    }

    .indicator {

      &--is-selected {
        margin: 1.5px auto;
        transform: rotate(45deg);
        width: 6px;
        height: 10px;
        border-right: 3px solid white;
        border-bottom: 3px solid white;
      }

      &--child-selected {
        width: #{$font-size - 2};
        height: #{$font-size - 2};
        border: 1.5px solid $color-lightGrey;
        background-color: $color-main;
      }
    }
  }

  &__text {
    cursor: pointer;
    text-align: left;

    .indicator {
      transition: transform 0.5s;
      display: inline-block;
      margin-bottom: 2px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid black;

      &--open {
        transform: rotate3d(0, 0, 1, -180deg)
      }
    }
  }
}
</style>
