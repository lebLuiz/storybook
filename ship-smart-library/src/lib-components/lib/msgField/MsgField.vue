<template>
  <span class="span-msg" :class="{ '--error': containsError }">{{ msgFieldComputed }}</span>
</template>

<script>

export default {
  name: 'MsgField',
  
  props: {
    //the two need to be together:
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },

    message: {
      type: String,
      required: false,
    }
  },

  computed: {
    msgFieldComputed() {
      if ((this.message != null || this.message != '') && (this.errorMessage == '' || this.errorMessage == null)) {
        return this.message;
      } else if (this.error && (this.errorMessage != '' || this.errorMessage != null)) {
        return this.errorMessage;
      }
    },

    containsError() {
      return (this.error && (this.msgFieldComputed === this.errorMessage)) ? true : false;
    },

  },

}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

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
</style>