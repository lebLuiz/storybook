<template>
    <div class="background">
        
        <div class="container">
            <!-- HEADER: -->
            <!-- <HeaderMenu :linksRedirected="linksRedirected"/> -->
            <BoxContent class="box-content">
                <div>
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

                    <Button class="btn-rounded-help"
                        :roundedBall="true"
                        text="?"
                        typeColor="secondary" />
                </div>
                

            </BoxContent>

        </div>

    </div>
</template>

<script>
import TextFormField from '@/components/text_form_field/TextFormField'
import Button from '@/components/button/Button'
import HeaderMenu from '@/components/header_menu/HeaderMenu'
import H1 from '@/components/typographies/H1'
import H2 from '@/components/typographies/H2'
import Footer from '@/components/footer/Footer'
import LinkText from '@/components/link_text/LinkText'
import BoxContent from '@/components/box_content/BoxContent'

export default {
    name: 'Entrar',
    components: {
        TextFormField,
        Button,
        HeaderMenu,
        H1, H2,
        Footer,
        LinkText,
        BoxContent,
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

    //   linksRedirected: [
    //     {
    //       label: 'Início',
    //       path: 'inicioo',
    //     },
    //     {
    //       label: 'Dúvidas',
    //       path: 'duvidass',
    //     },
    //     {
    //       label: 'Entrar',
    //       path: 'entrarr',
    //     },
    //     {
    //       label: 'Contato',
    //       path: 'contatoo',
    //     },
    //   ],
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
        },
    },

}
</script>

<style lang="scss" scoped>

    .container {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        padding: 127px 20px 113px 20px;
        position: relative;
    }

    .background {
        background-image: linear-gradient(0deg, rgba(1, 3, 8, 0.4) 0%, rgba(1, 3, 8, 0) 100%), url("../assets/login_bg_3.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position-x: center;

        .box-content {
            div:nth-child(1) {
                padding-top: 47px;
            }
        }
        
        .btn-rounded-help {
            position: absolute;
            bottom: 0px;
            right: 20px;
            transform: translateY(-50%);

            font-size: 36px;
        }
    }

    @media only screen and (max-width: 550px) {
        .background {
            background: none;

            .box-content {
                div:nth-child(1) {
                    padding-top: 0px;
                }
            }

            .btn-rounded-help {
                top: 35px;

                font-size: 14px;
                transform: translateY(0);
                line-height: 17px;
            }

            .container {
                padding: 32px 20px;
            }
        }
    }
</style>