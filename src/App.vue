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

    <TextFormField
      label="E-mail"
      type="email" 
      
      messageNotification="Digite no mínimo seis caracteres, com pelo menos um número ou caractere especial.*"

      startMessage="Digite o valor"
      errorMessage=""
      :error="true"
      
      :filterMethod="handleEmail" />

    <TextFormField
      label="Password"
      type="password"
      
      messageNotification="Digite no mínimo seis caracteres, com pelo menos um número ou caractere especial.*"

      startMessage="Digite o valor"
      errorMessage=""
      :error="false" />

    <TextFormField
      label="Age"
      type="number"
      
      messageNotification="*Precisa ser +18"

      errorMessage=""
      :error="false"

      :filterMethod="handleNumber" />

  </div>
</template>

<script>
// import shipButton from './components/ShipButton'
import TextFormField from './components/text_form_field/TextFormField'

export default {
  name: 'App',
  components: {
    // shipButton,
    TextFormField,
  },

  methods: {
    // Funções de exemplo:
    handleEmail(value) {
      let regexValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

      if (value == '') {
        return console.log('Email is null')
      } else if(!regexValidation.test(value)) {
        return console.log('Please, enter a valid email')
      } else {
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