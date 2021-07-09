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
    <HeaderMenu 
      :linksRedirected="linksRedirected"/>

    <router-view class="content" />

    <Footer class="footer"
      :withLink="true"
      titleLink="Termos de Uso"
      hrefLink="https://www.google.com/"
      
      :images="images" />

  </div>
</template>

<script>
// import shipButton from './components/ShipButton'
import HeaderMenu from '@/components/header_menu/HeaderMenu'
import Footer from '@/components/footer/Footer'

export default {
  name: 'App',
  components: {
    // shipButton,
    HeaderMenu,
    Footer
  },

  data() {
    return {
      linksRedirected: [
        {
          label: 'Início',
          path: '/inicio',
        },
        {
          label: 'Dúvidas',
          path: '/duvidas',
        },
        {
          label: 'Entrar',
          path: '/entrar',
        },
        {
          label: 'Contato',
          path: '/contato',
        },
      ],

      images: [
        // 'https://devkico.itexto.com.br/wp-content/uploads/2017/08/logotipo.png',
        // 'https://www.comofazerumsite.com/imagens/HTML5.png',
        // 'https://terminalroot.com.br/assets/img/css/css.png',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>

#app {
  max-height: 100%;
  // position: relative;
  // min-height: 580px;

  .content {
    height: 100%;
  }

}

@media only screen and (max-height: 100vh) {
  #app {
    max-height: 100%;

    .content {
      height: 100%;
    }
  }
}

</style>