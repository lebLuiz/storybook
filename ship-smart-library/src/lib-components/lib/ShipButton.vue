<template>
  <button
    :type="typeButton"
    class="btn-default"
    :disabled="isDisable"
    :class="{ '--outline': styleOutline, '--block': styleBlock }"
  >
    <span v-if="!loading">{{ label }}</span>
    <span v-if="loading">Loading...</span>
    <span v-if="!loading && icon">:)</span>
  </button>
</template>

<script>
export default {
  name: "shipButton",
  props: {
    label: String,
    isDisable: Boolean,
    typeButton: {
      type: String,
      default: "submite",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    styleOutline: {
      type: Boolean,
      default: false,
    },
    styleBlock: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.btn-default {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 114px;
  padding: 20px 25px;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  border: 2px solid transparent;
  border-radius: 5px;
  background-color: green;
  transition: all 0.1s linear;

  &.--outline {
    color: green;
    background-color: transparent;
    border: 2px solid green;

    &:hover,
    &:active,
    &:focus {
      cursor: pointer;
      background-color: green;
      color: white;
    }

    &:disabled {
      cursor: not-allowed;
      color: white;
      border: 2px solid transparent;
      background-color: grey;
    }
  }

  &.--block {
    display: block;
    width: 100%;
  }

  & span {
    margin: 0px 10px;
  }

  &:hover,
  &:active,
  &:focus {
    cursor: pointer;
    background-color: #013301;
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: grey;
  }
}
</style>
