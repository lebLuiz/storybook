<template>
    <div class="background">
        <div class="container">
            
            <BoxContent class="box-content">
                <div>
                    <H1
                        text="Recuperar senha"/>

                    <!-- TEXT_FORM_FIELD'S: -->
                    <TextFormField
                        label="E-mail"
                        type="email"
                        :inputDisabled="false"
                        :errorMessage="errorMessageEmail"
                        :error="actionErrorMsgEmail"
                        :messageNotification="msgNotification"
                        :filterMethod="handleEmailSend" />

                    <!-- BUTTON: -->
                    <div style="display: flex; flex-direction: column;">
                        <Button style="margin-bottom: 16px; margin-top: 37px;"
                            @onClick="sendEmail"
                            text="Enviar"
                            :loading="false"
                            :disabled="false" />
                    </div>

                </div>
                

            </BoxContent>

        </div>

    </div>
</template>

<script>
import H1 from '@/components/typographies/H1';
import BoxContent from '@/components/box_content/BoxContent';
import TextFormField from '@/components/text_form_field/TextFormField';
import Button from '@/components/button/Button';

export default {

    name: 'EsqueciSenha',
    
    components: {
        H1,
        BoxContent,
        TextFormField,
        Button,
    },

    data() {
        return {
            msgNotification: 'Assim que clicar em recuperar, você receberá sua nova senha no seu e-mail de cadastro.Caso o e-mail não tenha chegado cheque sua caixa de spam/lixo eletrônico.',
            emailSend: null,

            errorMessageEmail: '',
            actionErrorMsgEmail: true,
        }
    },

    methods: {
        handleEmailSend() {
            console.log('Digitando o email');
        },
        sendEmail(){ 
            console.log('aqui vai enviar o email')
        },
    },

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

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