<template>
  <div id="app" :class="{ '--no-overflow': this.$store.state.activeHamburguerOptions }">
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
    <HeaderMenu :openOptionsRedirect="openOptionsRedirect" @resOpenOptionsRedirectHamburguer="getValueOptionsRedirect">
      <li slot="paths" v-for="(linkRedirect) in linksRedirected" :key="linkRedirect.srcOrpath">
        <a :class="{ '--link-selected': $route.path == linkRedirect.srcOrpath }"
          @click="redirectTeste(linkRedirect)">
          {{ linkRedirect.label }}
        </a>
      </li>
    </HeaderMenu>

    <router-view class="content" />

    <Footer :withLink="true"
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
      openOptionsRedirect: false,
      linksRedirected: [
        {
          label: 'Home',
          srcOrpath: '/home',
        },
        {
          label: 'Início',
          srcOrpath: '/inicio',
        },
        {
          label: 'Dúvidas',
          srcOrpath: '/duvidas',
        },
        {
          label: 'Entrar',
          srcOrpath: '/entrar',
        },
        {
          label: 'Contato',
          srcOrpath: 'https://www.google.com/',
        },
      ],

      images: [
        // 'https://devkico.itexto.com.br/wp-content/uploads/2017/08/logotipo.png',
        // 'https://www.comofazerumsite.com/imagens/HTML5.png',
        // 'https://terminalroot.com.br/assets/img/css/css.png',
      ],
    }
  },

  methods: {
    getValueOptionsRedirect(value) {
      this.openOptionsRedirect = value;
    },
    redirectTeste(linkRedirect) {
      // Is path:
      if (linkRedirect.srcOrpath[0] === '/') {
        this.$router.push({ path: linkRedirect.srcOrpath }).catch(() => {});
      } 
      // Is URL Ancora:
      else {
        window.location.href = linkRedirect.srcOrpath;
      }

      this.openOptionsRedirect = false;
    },
  },
}
</script>

<style lang="scss" scoped>

#app {
  max-height: 100%;
  // position: relative;
  // min-height: 580px;

  &.--no-overflow {
    overflow: hidden;
  }

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