<template>
  <div id="text-form-field">

    <label class="label">{{ label }}:</label>
    
    <!-- INPUT -->
    <div v-if="type !== 'select' && type !== 'radio'"
      id="input-field" :class="{ '--max-width-normal': fieldMaxWidthNormal }">
      <input class="input"
        :class="{ '--disabled': inputDisabled, '--password-type': type === 'password' }"
        :type="typeInputMoment"
        :placeholder="placeholder ? placeholder : ''"
        :disabled="inputDisabled"
        :value="value"
        :maxlength="checkMaximumSize"

        @input="sendValue"
      />

      <svg
        v-if="type === 'password'"
        class="icon-field"
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

      <svg 
        v-if="typeInputMoment === 'text' && filterCep === true && verification === true"
        class="icon-field"
        :class="{ '--search': filterCep, '--disabled': disabled }"
        @click.prevent="searchMethod"

        xmlns="http://www.w3.org/2000/svg"
        height="18px"
        viewBox="0 0 24 24"
        width="18px"
        fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    </div>

    <!-- SELECT -->
    <div v-if="type === 'select'"
      id="dropdown" :class="{ '--select-max-width-normal': fieldMaxWidthNormal }" @click.capture="selectOpenOrClose">
      <div id="dropdown-select">
        <span id="select-label" class="select" @click.prevent.capture="selectOpenOrClose">{{ (item.value && item.label) ? item.label : 'Selecione' }}</span>
        <svg id="svg-icon" width="17" height="8" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.58839 4.51715e-07L0.621093 0.870535L8.51744 8L16.4138 0.870535L15.4465 9.17941e-08L8.51744 6.28571L1.58839 4.51715e-07Z" fill="#FBBE2F"/>
        </svg>
      </div>

      <div id="dropdown-list__element_select">
        <div v-for="(itemMoment, index) in items" :key="index"
          class="dropdown-list__item"
          :class="{ '--selected': itemMoment == item ,'--first': index == 0, '--last': index == items.length - 1 }"
          @click="selectedElementSelect(itemMoment, $event)">{{ itemMoment.label }}</div>
      </div>
    </div>

    <!-- RADIO -->
    <div v-if="type === 'radio'"
      class="container-radio">
      <div v-for="(item, index) in options" :key="index" @click="selectedElementRadio(item)"
        class="radio">
        <input id="id-radio" name="radio" type="radio"
          :disabled="option.disabled"
          :checked="option.value == item.value"
          :value="option" >
        <label for="radio-1" class="radio-label">{{ item.label }}</label>
      </div>
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

    value: {
      type: String || Number || Boolean || Array || Object || Function,
      required: false,
    },

    placeholder: {
      type: String,
      required: false,
    },

    // Disables:
    inputDisabled: {
      type: Boolean,
      required: false,
    },


    //SELECT:
    selectMaxWidthNormal: { type: Boolean },

    // [ { value: [Any], label: [String], disabled: [Boolean] } ]
    items: {
      type: Array,
      required: false,
    },
    item: {
      type: Object,
      required: false,
    },


    //RADIO:
    // [ { label: String, value: String||Number, disabled: Boolean(default: false) } ]
    options: {
      type: Array,
      required: false,
    },

    // { label: String, value: String||Number, disabled: Boolean(default: false) }
    option: {
      type: Object,
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
    },

    // maxLengthInput:
    maxLength6: { type: Boolean },
    maxLength15: { type: Boolean },
    maxLength20: { type: Boolean },
    maxLength60: { type: Boolean },
    maxLength85: { type: Boolean },

    filterNumberAddress: { type: Boolean },
    filterCpf: { type: Boolean },
    filterCnpj: { type: Boolean },
    filterRg: { type: Boolean },
    filterPhone: { type: Boolean },
    filterCep: { type: Boolean },
    filterUf: { type: Boolean },

    fieldMaxWidthNormal: {
      type: Boolean,
      required: false,
      default: false,
    },

    verification: { type: Boolean },
  },

  data() {
    return {
      typeInputMoment: null,
      openSelect: false,
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
      if ((this.messageNotification != null || this.messageNotification != '') && (this.errorMessage == '' || this.errorMessage == null)) {
        return this.messageNotification;
      } else if (this.error && (this.errorMessage != '' || this.errorMessage != null)) {
        return this.errorMessage;
      }
    },
    containsError() {
      return (this.error && (this.msgFieldComputed === this.errorMessage)) ? true : false;
    },

    checkMaximumSize() {
      if (this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 6;
      } else if (this.maxLength15 && !this.maxLength6 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 15;
      } else if (this.maxLength20 && !this.maxLength6 && !this.maxLength15 && !this.maxLength60 && !this.maxLength85 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 20;
      } else if (this.maxLength60 && !this.maxLength85 && !this.maxLength20 && !this.maxLength15 && !this.maxLength6 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 60;
      } else if (this.maxLength85 && !this.maxLength60 && !this.maxLength20 && !this.maxLength15 && !this.maxLength6 && !this.filterCep && !this.filterCpf && !this.filterUf && !this.filterPhone) {
        return 85;
      } else if (this.filterPhone && !this.filterCep && !this.filterCpf && !this.filterUf && !this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85) {
        return 25;
      } else if (this.filterCep && !this.filterPhone && !this.filterPhone && !this.filterUf && !this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85) {
        return 13;
      } else if (this.filterUf && !this.filterCep && !this.filterPhone && !this.filterPhone && !this.maxLength6 && !this.maxLength15 && !this.maxLength20 && !this.maxLength60 && !this.maxLength85) {
        return 2;
      } else{
        return Infinity;
      }
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

    searchMethod() {
      this.$emit('searchIconFilterClick');
    },

    sendValue($e) {

      if (this.filterCpf === true && !this.filterPhone && !this.filterCep && !this.filterUf) {

        const vetMask = '###.###.###-##'.split("");
        const numCpf = $e.target.value.replace(/\D/g, "");
        const cursor = $e.target.selectionStart;
        const tecla = (window.event) ? event.keyCode : event.which;

        for (let i=0; i<numCpf.length; i++) {
          vetMask.splice(vetMask.indexOf("#"), 1, numCpf[i]);
        }

        $e.target.value = vetMask.join("");

        if (tecla != 37 && cursor == 3 || cursor == 7 || cursor == 11) {
          $e.target.setSelectionRange(cursor+1, cursor+1);
        } else {
          $e.target.setSelectionRange(cursor, cursor);
        }

      } else if (this.filterCnpj === true && !this.filterCpf && !this.filterPhone && !this.filterCep && !this.filterUf) {
        const vetMask = '##.###.###/####-##'.split("");
        const numCpf = $e.target.value.replace(/\D/g, "");
        const cursor = $e.target.selectionStart;
        const tecla = (window.event) ? event.keyCode : event.which;
        
        for (let i=0; i<numCpf.length; i++) {
          vetMask.splice(vetMask.indexOf("#"), 1, numCpf[i]);
        }

        $e.target.value = vetMask.join("");

        if (tecla != 37 && cursor == 3 || cursor == 7 || cursor == 11) {
          $e.target.setSelectionRange(cursor+1, cursor+1);
        } else {
          $e.target.setSelectionRange(cursor, cursor);
        }
      } else if (this.filterRg === true && !this.filterCpf && !this.filterPhone && !this.filterCep && !this.filterUf) {
        const vetMask = '##.###.###-#'.split("");
        const numCpf = $e.target.value.replace(/\D/g, "");
        const cursor = $e.target.selectionStart;
        const tecla = (window.event) ? event.keyCode : event.which;

        for (let i=0; i<numCpf.length; i++) {
          vetMask.splice(vetMask.indexOf("#"), 1, numCpf[i]);
        }

        $e.target.value = vetMask.join("");

        if (tecla != 37 && cursor == 3 || cursor == 7 || cursor == 11) {
          $e.target.setSelectionRange(cursor+1, cursor+1);
        } else {
          $e.target.setSelectionRange(cursor, cursor);
        }
      } else if (this.filterPhone === true && !this.filterCpf && !this.filterCep && !this.filterUf) {
        $e.target.value=$e.target.value.replace(/\D/g,"")
        $e.target.value=$e.target.value.replace(/^(\d)/,"+$1")
        $e.target.value=$e.target.value.replace(/(.{3})(\d)/,"$1($2")
        $e.target.value=$e.target.value.replace(/(.{6})(\d)/,"$1)$2")
        if($e.target.value.length == 12) {
          $e.target.value=$e.target.value.replace(/(.{1})$/,"-$1")
        } else if ($e.target.value.length == 13) {
          $e.target.value=$e.target.value.replace(/(.{2})$/,"-$1")
        } else if ($e.target.value.length == 14) {
          $e.target.value=$e.target.value.replace(/(.{3})$/,"-$1")
        } else if ($e.target.value.length == 15) {
          $e.target.value=$e.target.value.replace(/(.{4})$/,"-$1")
        } else if ($e.target.value.length > 15) {
          $e.target.value=$e.target.value.replace(/(.{4})$/,"-$1")
        }
      } else if (this.filterCep === true && !this.filterCpf && !this.filterPhone && !this.filterUf) {
        $e.target.value=$e.target.value.replace(/\D/g,"")
        $e.target.value=$e.target.value.replace(/(.{5})(\d)/,"$1-$2")
      } else if (this.filterUf === true && !this.filterCpf && !this.filterPhone && !this.filterCep) {
        $e.target.value = $e.target.value.toUpperCase()
      } else if (this.filterNumberAddress === true) {
        $e.target.value=$e.target.value.replace(/\D/g,"")
      }

      this.filterMethod($e.target.value);
      this.$emit("valueInput", $e.target.value);
    },


    // FUNCTIONS OF SELECT:
    selectedElementSelect(value, event) {
      this.closeOptionsSelect(event.target.parentElement);
      this.openSelect = false;

      this.filterMethod(value)
      this.$emit('selectedValue', value);
    },
    selectOpenOrClose($event) {
      this.openSelect = !this.openSelect;

      if (this.openSelect) {
        if ($event.target.id === "select-label") {
          this.openOptionsSelect($event.target.parentElement.nextElementSibling);
        }

        if ($event.target.id === "dropdown") {
          this.openOptionsSelect($event.target.lastElementChild);
        }

        if ($event.target.id === "dropdown-select") {
          this.openOptionsSelect($event.target.nextElementSibling);
        }

        if ($event.target.id === "svg-icon") {
          this.openOptionsSelect($event.target.parentElement.nextElementSibling)
        }
      } else {
        if ($event.target.id === "select-label") {
          this.closeOptionsSelect($event.target.parentElement.nextElementSibling);
        }

        if ($event.target.id === "dropdown") {
          this.closeOptionsSelect($event.target.lastElementChild);
        }

        if ($event.target.id === "dropdown-select") {
          this.closeOptionsSelect($event.target.nextElementSibling);
        }

        if ($event.target.id === "svg-icon") {
          this.closeOptionsSelect($event.target.parentElement.nextElementSibling)
        }
      }
    },
    openOptionsSelect(element) {
      element.classList.add("is-active");
    },
    closeOptionsSelect(element) {
      if (element.classList != null) element.classList.remove("is-active");
    },

    // FUNCTIONS OF RADIO:
    selectedElementRadio(value) {
      this.$emit('selectedValue', value);
    },

  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

$maxWidthMobile: 425px;
$colorWhite: #FFFFFF;
$color1: #f4f4f4;
$color2: #FBBE2F;

#text-form-field {
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

  #input-field {
    display: flex;
    width: 100%;
    max-width: $maxWidthMobile;
    position: relative;

    &.--max-width-normal {
      max-width: none;
    }

    .input {
      position: relative;
      outline: none;

      width: 100%;
      min-height: 44px;

      padding: 0 24px;

      background: $colorWhite;
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
        color: black;
        background-color: rgba(139, 139, 139, 0.089);
        border: 0.1px solid rgba(56, 56, 56, 0.11);
      }
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

  #dropdown {
    width: 100%;
    max-width: $maxWidthMobile;
    height: 43px;
    padding: 0 31.5px;
    position: relative;

    outline: none;
    cursor: pointer;
    border-radius: 24px;
    border: 1px solid #000000;

    //Font:
    font-family: 'Montserrat';
    font-size: 14px;

    &.--select-max-width-normal {
      max-width: none;
    }

    #dropdown-select {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        position: absolute;
        right: 31.5px;
      }
    }

    #dropdown-list__element_select {
      position: absolute;
      right: 0px;
      width: 0px;
      background: $colorWhite;
      transition: width 0.3s ease;
      z-index: 1;

      border-top: 30px solid $colorWhite;
      border-bottom: 30px solid $colorWhite;
      border-radius: 40px;
      box-shadow: 0px 1px 24px rgb(35 34 39 / 10%);
      background-color: $colorWhite;
      
      grid-row: auto;
      top: 102%;

      display: none;
      align-items: center;
      
      &.is-active {
        width: 100%;
        display: flex;
        flex-direction: column;
        transition: width 0.3s ease;

        .dropdown-list__item {
          transition: transform 0.3s ease;
        }
      }

      .dropdown-list__item {
        padding: 9px 43px;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid black;

        &.--selected {
          background: #FBBE2F;
        }

        &.--first {
          border-top: 1px solid black;
          border-top-right-radius: 1.8px;
          border-top-left-radius: 1.8px;
        }
        &.--last {
          border-bottom-right-radius: 1.8px;
          border-bottom-left-radius: 1.8px;
        }

        &:hover {
          background: #fbbe2f21;
        }
      }
    }
  }

  .container-radio {
    font-family: "Montserrat";
    display: flex;

    .radio {
      margin: 0.5rem;
      input[type="radio"] {
        // position: absolute;
        opacity: 0;
        + .radio-label {
          &:before {
            content: '';
            background: $color1;
            border-radius: 100%;
            border: 1px solid darken($color1, 25%);
            display: inline-block;
            width: 1.0em;
            height: 1.0em;
            position: relative;
            
            margin-right: 1em; 
            vertical-align: top;
            cursor: pointer;
            text-align: center;
            transition: all 250ms ease;
          }
        }
        &:checked {
          + .radio-label {
            &:before {
              background-color: $color2;
              box-shadow: inset 0 0 0 4px $color1;
            }
          }
        }
        &:focus {
          + .radio-label {
            &:before {
              outline: none;
              border-color: $color2;
            }
          }
        }
        &:disabled {
          + .radio-label {
            &:before {
              box-shadow: inset 0 0 0 4px $color1;
              border-color: darken($color1, 25%);
              background: darken($color1, 25%);
            }
          }
        }
        + .radio-label {
          &:empty {
            &:before {
              margin-right: 0;
            }
          }
        }
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