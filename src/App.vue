<template>
  <div id="app">
    <!-- <shipButton
      label="my button"
      typeButton="submite"
      styleOutline="true"
      styleBlock="true"
      :isDisable="false"
      :loading="true"
      :icon="true"
    >
    </shipButton> -->

    <!-- HEADER: -->
    <HeaderMenu 
      
      />


    <!-- TEXT_FORM_FIELD'S: -->
    <TextFormField
      label="E-mail"
      type="email" 

      :inputDisabled="false"
      
      messageNotification="Digite no mínimo seis caracteres, com pelo menos um número ou caractere especial.*"

      :errorMessage="errorMessage"
      :error="actionErrorMsg"
      
      :filterMethod="handleEmail" />

    <TextFormField
      label="Password"
      type="password"
      
      messageNotification="Digite no mínimo seis caracteres, com pelo menos um número ou caractere especial.*"

      errorMessage=""
      :error="false" />

    <TextFormField
      label="Age"
      type="number"
      
      messageNotification="*Precisa ser +18"

      errorMessage=""
      :error="false"

      :filterMethod="handleNumber" />


    <!-- BUTTON: -->

    <Button
      @onClick="soma(5, 65)"
      text="Entrar"
      typeColor="secondary"
      :loading="false"
      :disabled="false" />

  </div>
</template>

<script>
// import shipButton from './components/ShipButton'
import TextFormField from './components/text_form_field/TextFormField'
import Button from './components/button/Button'
import HeaderMenu from './components/header_menu/HeaderMenu'

export default {
  name: 'App',
  components: {
    // shipButton,
    TextFormField,
    Button,
    HeaderMenu,
  },

  data() {
    return {
      inputDisabled: false,
      actionErrorMsg: false,
      errorMessage: '',
    }
  },

  methods: {
    // Funções de exemplo:
    soma(v1, v2) {
      console.log(v1 + v2);
    },
    handleEmail(value) {
      let regexValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

      if (value == '') {
        return console.log('Email is null')
      } else if(!regexValidation.test(value)) {
        this.actionErrorMsg = true;
        this.errorMessage = "Please, enter a valid email";
        return console.log('Please, enter a valid email')
      } else {
        this.inputDisabled = true;
        this.actionErrorMsg = false;
        return console.log('email is valid')
      }
    },

    handleNumber(value) {
      if (value % 2 === 0) {
        console.log('Is PAR!');
      }
    }
  },
}
</script>

<style lang="scss" scoped>
// Inseri o background-color para parecer(dar impressão) como está no figma:
#app {
  background-color: #E5E5E5;
  padding: 20px;
}

</style>