<template>
  <div class="text-form-field">

    <label class="label">{{ label }}:</label>
    
    <div class="input-field">
      <input
        :type="typeInputMoment"
        :class="{ '--disabled': inputDisabled, '--password-type': type === 'password' }"
        @input="sendValue"
        :disabled="inputDisabled"
      />

      <svg
        v-if="type === 'password'"
        class="icon-field-password"
        :class="{ '--disabled': inputDisabled }"
        @click.prevent="changeType"
      
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
    </div>

    <span class="span-msg" :class="{ '--error': containsError }">{{ msgFieldComputed }}</span>
  </div>
</template>

<script>

export default {
  name: "TextFormField",
  
  props: {
    label: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    // Disables:
    inputDisabled: {
      type: Boolean,
      required: false,
    },

    // MSG´s:
    messageNotification: {
      type: String,
      required: false,
    },

    errorMessage: {
      type: String,
      required: false,
    },
    error: {
      type: Boolean,
      default: false,
    },

    //Functions:
    filterMethod: {
      type: Function,
      required: false,
      default: () => {}
    }
  },

  data() {
    return {
      valueInput: '',
      typeInputMoment: null,
    }
  },

  watch: {
    type(newV, oldV) {
      if (newV != oldV) this.typeInputMoment = newV;
    },
  },

  mounted() {
    this.typeInputMoment = this.type;
  },

  computed: {

    msgFieldComputed() {
      if (this.error && (this.errorMessage != null || this.errorMessage != '')) {
        return this.errorMessage;
      }
      else if (this.messageNotification != null) {
        return this.messageNotification;
      }
    },
    containsError() {
      return (this.error && (this.msgFieldComputed === this.errorMessage)) ? true : false;
    },
  },

  methods: {
    changeType() {
      if (this.typeInputMoment === "password") {
        this.typeInputMoment = "text";
      } else if (this.typeInputMoment === "text") {
        this.typeInputMoment = "password";
      }
    },

    sendValue($e) {
      this.filterMethod($e.target.value);
      this.valueInput = $e.target.value;
      this.$emit("valueInput", $e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

$maxWidthMobile: 425px;

.text-form-field {
  display: flex;
  flex-direction: column;
  margin: 16px 0px;

  label {
    margin-bottom: 8px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    color: #000000;
  }

  .input-field {
    display: flex;
    width: 100%;
    max-width: $maxWidthMobile;
    position: relative;

    input {
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
      font-family: 'Montserrat';
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
        color: white;
        background-color: rgba(184, 184, 184, 0.377);
        border: 0.1px solid rgba(56, 56, 56, 0.11);

        &:hover {
          transform: scale(1.005);
          background-color: rgba(139, 139, 139, 0.089);
          transition: 0.2s;
        }
      }
    }

    .icon-field-password {
      position: absolute;

      top: 50%;
      right: 30px;
      transform: translateY(-50%);

      &.--disabled {
        display: none;
      }
    }
  }

  .span-msg {
    margin-top: 8px;
    max-width: 425px;

    /* BODY */
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;

    color: #757575;
    
    &.--error {
      color: #EB5757;

      margin-top: 10px;
      font-size: 14px;
    }
  }
}

</style>