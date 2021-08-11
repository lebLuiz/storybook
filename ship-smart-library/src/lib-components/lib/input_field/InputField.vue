<template>
  <div class="input-field" :class="{ '--max-width-normal': inputMaxWidthNormal }">

    <the-mask v-if="mask"
      class="input"
      :type="typeClone"
      :placeholder="placeholder ? placeholder : ''"
      :class="{ '--disabled': disabled, '--password-type': typeField === 'password' }"
      :mask="mask"
      :value="value"
      @input="$emit('input', $event)"
      :disabled="disabled" />

    <input
      v-else
      class="input"
      :type="typeClone"
      :placeholder="placeholder ? placeholder : ''"
      :class="{ '--disabled': disabled, '--password-type': typeField === 'password' }"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled"
      :maxlength="maxLength"
    />

    <svg
      v-if="typeField === 'password'"
      class="icon-field"
      :class="{ '--disabled': disabled }"
      @click="changeType"
	  
      width="24"
      height="14"
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3C9.79403 3 8 4.79403 8 7.00005C8 9.20607 9.79403 11.0001 12 11.0001C14.2061 11.0001 16.0001 9.20607 16.0001 7.00005C16.0001 4.79403 14.2061 3 12 3ZM12 10.0001C10.346 10.0001 9 8.65411 9 7.0001C9 5.34609 10.346 4.00005 12 4.00005C13.6541 4.00005 15.0001 5.34609 15.0001 7.0001C15.0001 8.65411 13.6541 10.0001 12 10.0001Z"
        fill="black"
      />
      <path
        d="M23.9111 6.71612C23.7221 6.4411 19.18 0 11.9999 0C5.83883 0 0.348744 6.40411 0.11774 6.67712C-0.0392467 6.86312 -0.0392467 7.13613 0.11774 7.32311C0.348744 7.59612 5.83883 14.0002 11.9999 14.0002C18.1611 14.0002 23.6511 7.59612 23.8821 7.32311C24.0271 7.15113 24.0401 6.90212 23.9111 6.71612ZM11.9999 13.0002C7.06088 13.0002 2.36478 8.29016 1.17179 7.00014C2.36281 5.70914 7.05389 1.00005 11.9999 1.00005C17.779 1.00005 21.8581 5.70314 22.8541 6.97314C21.7041 8.22214 16.981 13.0002 11.9999 13.0002Z"
        fill="black"
      />
    </svg>

    <svg 
      v-if="withCheckSearch"
      class="icon-field"
      :class="{ '--search': !disabled, '--disabled': disabled }"
      @click.prevent="$emit('onSearchIcon')"

      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      viewBox="0 0 24 24"
      width="18px"
      fill="#000000">
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>

  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask';

export default {
  name: "InputField",

  data() {
    return {
      typeClone: this.typeField,
    };
  },

  components: {
    TheMask,
  },

  watch: {
    typeField(newV, oldV) {
      if (newV != oldV) this.typeClone = newV;
    },
  },

  mounted() {
    this.typeClone = this.typeField;
  },

  props: {
    typeField: {
      type: String,
      default: "text",
    },

    value: {
      type: [String, Number],
      required: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
      required: false,
    },

    mask: {
      type: [String, Array],
      required: false,
    },

    withCheckSearch: { type: Boolean },
    maxLength: { 
      type: Number,
      default: Infinity,
    },

    inputMaxWidthNormal: { type: Boolean },
  },

  methods: {
    changeType() {
      if (this.typeClone == "password") {
        this.typeClone = "text";
      } else if (this.typeClone == "text") {
        this.typeClone = "password";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

$maxWidthMobile: 425px;

.input-field {
  display: flex;
  width: 100%;
  max-width: $maxWidthMobile;
  position: relative;
  
  &.--max-width-normal {
    max-width: none;
  }

  .icon-field {
    position: absolute;

    top: 50%;
    right: 30px;
    transform: translateY(-50%);

    &.--search {
      cursor: pointer;

      &:hover {
        transition: 1s;
        border-radius: 8px;
        background: rgb(184 184 184 / 38%);
      }
    }

    &.--disabled {
      display: none;
    }
  }
}

.input {
  position: relative;
  outline: none;

  width: 100%;
  min-height: 44px;

  padding: 0 24px;

  background: #ffffff;
  box-shadow: 0px 1px 24px rgba(35, 34, 39, 0.1);
  border-radius: 40px;
  border: none;

  // FONT:
  font-family: "Montserrat";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;

  align-items: center;
  display: flex;
  justify-content: center;

  color: #000000;

  &.--password-type {
	  padding: 0 70px 0 24px;
  }

  &.--disabled {
    cursor: not-allowed;
    color: black;
    background-color: rgba(139, 139, 139, 0.089);
    border: 0.1px solid rgba(56, 56, 56, 0.11);
  }
}
</style>