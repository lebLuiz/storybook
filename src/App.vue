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
    <HeaderMenu />


    <H1
      text="Entrar"/>
    <H2
      text="Já sou cliente"/>


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
      label="Senha"
      type="password"
      
      messageNotification="Digite no mínimo seis caracteres, com pelo menos um número ou caractere especial.*"

      errorMessage=""
      :error="false" />

    <LinkText title="Esqueceu sua senha?" :size="14" href="https://www.google.com/" target="_blank" />

    <!-- <TextFormField
      label="Age"
      type="number"
      
      messageNotification="*Precisa ser +18"

      errorMessage=""
      :error="false"

      :filterMethod="handleNumber" /> -->


    <!-- BUTTON: -->
    <div style="display: flex; flex-direction: column;">
      <Button style="margin-bottom: 16px; margin-top: 37px;"
        @onClick="soma(5, 65)"
        text="Entrar"
        typeColor="secondary"
        :loading="false"
        :disabled="false" />

      <Button
        @onClick="soma(5, 65)"
        text="Cadastrar"
        typeColor="primary"
        :loading="false"
        :disabled="false" />
    </div>

    <Footer style="margin: 16px 0"
      :withLink="true"
      titleLink="Termos de Uso"
      hrefLink="https://www.google.com/"
      
      :images="images" />

  </div>
</template>

<script>
// import shipButton from './components/ShipButton'
import TextFormField from './components/text_form_field/TextFormField'
import Button from './components/button/Button'
import HeaderMenu from './components/header_menu/HeaderMenu'
import H1 from './components/typographies/H1'
import H2 from './components/typographies/H2'
import Footer from './components/footer/Footer'
import LinkText from './components/link_text/LinkText'

export default {
  name: 'App',
  components: {
    // shipButton,
    TextFormField,
    Button,
    HeaderMenu,
    H1, H2,
    Footer,
    LinkText,
  },

  data() {
    return {
      inputDisabled: false,
      actionErrorMsg: false,
      errorMessage: '',

      images: [
        'https://devkico.itexto.com.br/wp-content/uploads/2017/08/logotipo.png',
        'https://www.comofazerumsite.com/imagens/HTML5.png',
        'https://terminalroot.com.br/assets/img/css/css.png',
      ],
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