<template>
<transition name="treeselected">
  <div v-show="option.show" 
    :class="{
      treeselected: true,
      'treeselected--has-delete-button': hasDeleteButton
    }">
    <div class="treeselected__label"
      @click="labelClickHandler">{{option.label}}</div>
    <div v-if="hasDeleteButton"
      class="treeselected__delete-button"
      @click="deleteButtonClickHandler">&#10005;</div>
  </div>
</transition>
</template>

<script>
export default {
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
     * Indicates if the option has a dedicated delete button.
     *
     * @type {Boolean}
     */
    hasDeleteButton: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    /**
     * Emits a custom delete event
     * with the option's id and rootId.
     */
    onDelete () {
      this.$emit('delete', this.option.id, this.option.rootId)
    },
    /**
     * Handles the click event of the
     * delete button and fires delete event.
     */
    deleteButtonClickHandler () {
      this.onDelete()
    },
    /**
     * Handles the click event of the
     * label and fires delete event
     *.if the delete button is disabled.
     */
    labelClickHandler () {
      if (!this.hasDeleteButton) this.onDelete()
    }
  }
}
</script>

<style lang="scss">
@import "../assets/variables.scss";

.treeselected {
  border-radius: $space;
  margin-right: $space--s;
  margin-bottom: $space--s;
  max-width: 100%;
  float: left;
  font-size: $font-size--s;
  line-height: $line-height--s;
  color: white;
  background-color: $color-main;
  overflow: hidden;
  white-space: nowrap;

  background-color: $color-main;
  background: -webkit-linear-gradient(to top, #009688, $color-main);
  background: linear-gradient(to top, #009688, $color-main);


  &:hover {
    background: $color-main--dark;
  }

  &__label {
    cursor: pointer;
    display: inline-block;
    padding: $space $space--l;
    white-space: pre;

  }

  &__delete-button {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    border-left: 1px white solid;
    padding: $space--s  #{$space + 1} $space--s $space;

    &:hover {
      background: $color-main--dark;
    }
  }

  &--has-delete-button {

    .treeselected__label {
      cursor: default;
      padding-right: $space--s;
    }
  }

  &-enter {
    max-width: 0;
  }

  &-enter-active {
    transition: max-width 0.3s cubic-bezier(0.95, 0.05, 0.795, 0.035);
  }

  
  &-leave-to {
    max-width: 0;
  }

  &-leave-active {
    transition: max-width 0.2s cubic-bezier(0.95, 0.05, 0.795, 0.035);
  }
}
</style>
