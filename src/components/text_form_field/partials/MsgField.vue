<template>
  <span class="class-span-msg" :class="{ '--error': containsError }">{{ msgFieldComputed }}</span>
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

  data() {
    return {
      genericStringsTypes: [
        'text', 'email', 'password'
      ],
    }
  },

  computed: {
    msgFieldComputed() {
      
      if (this.validateStringsTypes(this.valuesProps.type)) {
        
        if (this.valuesProps.startMessage !== null && this.valuesProps.valueInput === '') {
          return this.valuesProps.startMessage;
        }
        else if (this.valuesProps.error && this.valuesProps.errorMessage != null) {
          return this.valuesProps.errorMessage;
        }
        else if (this.valuesProps.messageNotification !== null) {
          return this.valuesProps.messageNotification;
        }
      } else {
        if (this.valuesProps.startMessage !== null && (this.valuesProps.valueInput <= 0 || this.valuesProps.valueInput == null)) {
          return this.valuesProps.startMessage;
        } 
        else if (this.valuesProps.error && this.valuesProps.errorMessage != null) {
          return this.valuesProps.errorMessage;
        }
        else if (this.valuesProps.messageNotification !== null) {
          return this.valuesProps.messageNotification;
        }
      }

    },

    containsError() {
      return (this.valuesProps.error && (this.msgFieldComputed === this.valuesProps.errorMessage)) ? true : false;
    },

  },

  methods: {
    validateStringsTypes(value) {
      const validate = this.genericStringsTypes.find(element => element === value);

      return validate != undefined ? true : false;
    },
  },

}

</script>

<style lang="scss">
@font-face {
  font-family: 'Montserrat', sans-serif;
  src: url(../../../assets/fonts/Montserrat-Regular.ttf);
}

.class-span-msg {
  // position: absolute;

  margin-top: 8px;

  /* BODY */
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;

  /* vermelho */

  color: #757575;
  
  &.--error {
    color: #EB5757;

    margin-left: 29px;
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>