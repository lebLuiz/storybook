<template>
  <span class="span-msg" :class="{ '--error': containsError }">{{ msgFieldComputed }}</span>
</template>

<script>

export default {
  name: 'MsgField',
  
  props: {
    valuesProps: {
      type: Object,
      required: false,
    },
  },

  computed: {
    msgFieldComputed() {

      if (this.valuesProps.error && (this.valuesProps.errorMessage != null || this.valuesProps.errorMessage != '')) {
        return this.valuesProps.errorMessage;
      }
      else if (this.valuesProps.messageNotification != null) {
        return this.valuesProps.messageNotification;
      }

    },

    containsError() {
      return (this.valuesProps.error && (this.msgFieldComputed === this.valuesProps.errorMessage)) ? true : false;
    },

  },

}

</script>

<style lang="scss">
@font-face {
  font-family: 'Montserrat', sans-serif;
  src: url(../../../assets/fonts/Montserrat-Regular.ttf);
}

.span-msg {
  margin-top: 8px;
  max-width: 425px;

  /* BODY */
  font-family: 'Montserrat', sans-serif;
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