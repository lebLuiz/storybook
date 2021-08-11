<template>
    <div>
        
        <HeaderMenu :openOptionsRedirect="openOptionsRedirect" @resOpenOptionsRedirectHamburguer="getValueOptionsRedirect">
            <li slot="paths" v-for="(linkRedirect) in linksRedirected" :key="linkRedirect.srcOrpath">
                <a :class="{ '--link-selected': $route.path == linkRedirect.srcOrpath }"
                @click="redirectFunction(linkRedirect)">
                {{ linkRedirect.label }}
                </a>
            </li>
        </HeaderMenu>

        <div class="bg-img">
        
            <div class="container">
                
                <div class="content">
                    <BoxContent>
                        
                        <H1 class="title-login"
                            text="Entrar"/>

                        <TextFormField
                            label="E-mail"
                            type="email"
                            :errorMessage="errorMessage"
                            :error="actionErrorMsg"
                            :value="email"
                            @onInput="handleEmail" />

                        <TextFormField
                            label="Password"
                            type="password"
                            messageNotification="Digite no mínimo seis caracteres(distinção entre maiúsculo e minúsculo) com pelo menos um número ou caractere especial."
                            :value="password"
                            :errorMessage="errorMessagePassword"
                            :error="actionErrorMsgPassword"
                            @onInput="handlePassword" />

                        <LinkText>
                            <a slot="link-redirect"
                                @click="redirectLinkForgotPassword" >
                                Esqueceu sua senha?
                            </a>
                        </LinkText>

                        <InputField mask="##-###-##" v-model="teste" typeField="text" />

                        <div class="box-content-btn">
                            <Button
                                @onClick="login"
                                text="Entrar"
                                typeColor="secondary"
                                :loading="false"
                                :disabled="false" />
                        </div>

                        <Button
                            @onClick="register"
                            text="Cadastrar"
                            typeColor="primary"
                            :loading="false"
                            :disabled="false" />

                    </BoxContent>
                </div>

            </div>

        </div>
        
        <Footer v-show="!activeHamburguerOptions" :withLink="true"
            titleLink="Termos de uso"
            hrefLink="https://www.google.com/" />

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import TextFormField from '@/components/text_form_field/TextFormField'
import Button from '@/components/button/Button'
import HeaderMenu from '@/components/header_menu/HeaderMenu'
import H1 from '@/components/typographies/H1'
import Footer from '@/components/footer/Footer'
import LinkText from '@/components/link_text/LinkText'
import BoxContent from '@/components/box_content/BoxContent'
import InputField from '@/components/text_form_field/partials/InputField'

export default {
    name: 'Entrar',
    components: {
        TextFormField,
        Button,
        HeaderMenu,
        H1,
        Footer,
        LinkText,
        BoxContent,
        InputField,
    },

    data() {
        return {
            actionErrorMsg: false,
            errorMessage: '',

            actionErrorMsgPassword: false,
            errorMessagePassword: '',

            openOptionsRedirect: false,

            teste: '',

            email: '',
            password: '',
            cnpj: '',

            linksRedirected: [
                {
                    label: 'Inicio',
                    srcOrpath: '/init',
                },
                {
                    label: 'Dúvidas',
                    srcOrpath: '/doubts',
                },
                {
                    label: 'Login',
                    srcOrpath: '/login',
                },
                {
                    label: 'Contato',
                    srcOrpath: '/contact',
                },
            ],
        }
    },

    updated() {
        console.log('Teste: ', this.teste)
    },

    watch: {
        openOptionsRedirect(newV) {
            if (newV === true) this.setActiveHamburguerOptions(true);
            else this.setActiveHamburguerOptions(false);
        },
    },

    computed: {
        ...mapState(['activeHamburguerOptions']),
    },

    methods: {
        ...mapMutations(['setActiveHamburguerOptions']),

        getValueOptionsRedirect(value) {
            this.openOptionsRedirect = value;
        },

        redirectFunction(linkRedirect) {
            // Is path:
            if (linkRedirect.srcOrpath[0] === '/') {
                this.$router.push({ path: linkRedirect.srcOrpath }).catch(() => {});
            } 
            // Is URL Ancora:
            else {
                window.location.href = linkRedirect.srcOrpath;
            }

            this.openOptionsRedirect = false;
            this.setActiveHamburguerOptions(false);
        },

        redirectLinkForgotPassword() {
            this.$router.push({ path: '/forgot_password' }).catch(() => {});
        },
        
        handleEmail(value) {
            let regexValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

            console.log('value no entrar: ', value)

            if (value == '') {
                this.actionErrorMsg = true;
                this.errorMessage = "Email is empty";
            } else if(!regexValidation.test(value)) {
                this.actionErrorMsg = true;
                this.errorMessage = "Please, enter a valid email";
            } else {
                this.actionErrorMsg = false;
                this.errorMessage = "";
            }
        },
        handlePassword(value) {
            let regexValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!%$*&@#])[0-9a-zA-Z?!%$*&@#]{6,}$/;
            
            if (!regexValidation.test(value)) {
                this.actionErrorMsgPassword = true;
                this.errorMessagePassword = 'Digite no mínimo seis caracteres(distinção entre maiúsculo e minúsculo) com pelo menos um número ou caractere especial.';
            } else {
                this.actionErrorMsgPassword = false;
                this.errorMessagePassword = '';
            }
            
            this.password = value;
        },
        handleCnpj(value) {
            this.cnpj = value;
        },

        login() {
            this.$router.push({ name: 'home' });
        },
        //Redirect 'Cadastro'
        register() {
            this.$router.push({ path: 'register' }).catch(() => {});
        },
    },

}
</script>

<style lang="scss" scoped>

    .container {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        position: relative;
        padding: 0px 15px;
    }

    .bg-img {
        background-image: linear-gradient(0deg, rgba(1, 3, 8, 0.4) 0%, rgba(1, 3, 8, 0) 100%), url("../assets/login_bg_3.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        display: flex;
        align-items: center;
        min-height: calc(100vh - 161px);

        .content {
            .box-content-btn {
                margin-top: 37px;
                margin-bottom: 16px;
            }
        }
    }

    @media only screen and (max-width: 550px) {
        .bg-img {
            background: none;

            .content {
                display: flex;
                justify-content: center;
            }
        }
    }
</style>