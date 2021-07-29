<template>
    <div class="background">
        <div class="container">
            <H1 class="h1-el" text="Faça seu cadastro" />

            <ProgressBarSteps v-show="!$store.state.activeHamburguerOptions"
                :currentActive="stepMoment" :quantity="3"/>
            
            <transition name="slide" appear>
                <BoxContent key="1" v-if="stepMoment === 1" class="box-content">
                    <div class="wrapper">
                        <TextFormField
                            fieldMaxWidthNormal maxLength60
                            type="text"
                            label="Nome completo*"
                            :value="guardMyValuesRegister.name"
                            :errorMessage="msgsError.nameUser.name.errorMessageName"
                            :error="msgsError.nameUser.name.actionErrorMsgName"
                            :filterMethod="handleNameUser" />

                        <!-- <TextFormField
                            fieldMaxWidthNormal
                            type="text"
                            label="Sobrenome*"
                            :value="guardMyValuesRegister.surname"
                            :errorMessage="msgsError.nameUser.surname.errorMessageSurname"
                            :error="msgsError.nameUser.surname.actionErrorMsgSurname"
                            :filterMethod="handleSurnameUser" /> -->

                        <TextFormField
                            fieldMaxWidthNormal filterPhone
                            type="tel"
                            label="Telefone*"
                            :value="guardMyValuesRegister.tel"
                            :filterMethod="handleTel"
                            :errorMessage="msgsError.tel.errorMessageTel"
                            :error="msgsError.tel.actionErrorMsgTel" />

                        <TextFormField
                            fieldMaxWidthNormal
                            type="email" :filterCpf="false"
                            label="E-mail*"
                            :value="guardMyValuesRegister.email"
                            :errorMessage="msgsError.email.errorMessageEmail"
                            :error="msgsError.email.actionErrorMsgEmail"
                            :filterMethod="handleEmail" />

                        <TextFormField
                            fieldMaxWidthNormal
                            type="password"
                            label="Senha*"
                            messageNotification="Digite no mínimo seis caracteres(distinção entre maiúsculo e minúsculo) com pelo menos um número ou caractere especial."
                            :value="guardMyValuesRegister.password"
                            :errorMessage="msgsError.password.password.errorMessagePassword"
                            :error="msgsError.password.password.actionErrorMsgPassword"
                            :filterMethod="handlePassword" />

                        <TextFormField
                            fieldMaxWidthNormal
                            type="password"
                            label="Confirmar Senha*"
                            :value="guardMyValuesRegister.confirmPassword"
                            :errorMessage="msgsError.password.confirmPassword.errorMessageConfirmPassword"
                            :error="msgsError.password.confirmPassword.actionErrorMsgConfirmPassword"
                            :filterMethod="handleConfirmPassword" />

                        <TextFormField
                            fieldMaxWidthNormal filterCep
                            type="text" :verificationInputIcon="!msgsError.cep.actionErrorMsgCep && msgsError.cep.errorMessageCep == ''"
                            label="CEP*"
                            :value="guardMyValuesRegister.cep"
                            :errorMessage="msgsError.cep.errorMessageCep"
                            :error="msgsError.cep.actionErrorMsgCep"
                            :filterMethod="handleCep"
                            @searchIconFilterClick="handleClickIconSearchCEP" />

                        <transition name="fade" type="animation" appear>
                            <div v-if="requestCEP_Ok === true" class="wrapper-two">
                                <TextFormField
                                    fieldMaxWidthNormal maxLength85
                                    type="text"
                                    placeholder="Ex: São Valentin"
                                    label="Endereço*"
                                    :value="guardMyValuesRegister.address"
                                    :filterMethod="handleAddress"
                                    :errorMessage="msgsError.address.errorMessageAddress"
                                    :error="msgsError.address.actionErrorMsgAddress" />

                                
                                <TextFormField
                                    fieldMaxWidthNormal maxLength6 filterNumberAddress
                                    type="text"
                                    label="Número*"
                                    :value="guardMyValuesRegister.number"
                                    :filterMethod="handleNumberAddress"
                                    :errorMessage="msgsError.number.errorMessageNumber"
                                    :error="msgsError.number.actionErrorMsgNumber" />

                                <TextFormField
                                    fieldMaxWidthNormal maxLength20
                                    type="text"
                                    label="Bairro*"
                                    :value="guardMyValuesRegister.district"
                                    :filterMethod="handleDistrict"
                                    :errorMessage="msgsError.district.errorMessageDistrict"
                                    :error="msgsError.district.actionErrorMsgDistrict" />
                                

                                <TextFormField
                                    fieldMaxWidthNormal maxLength15
                                    type="text"
                                    label="Complemento"
                                    :value="guardMyValuesRegister.complement"
                                    :filterMethod="handleComplement" />

                                <TextFormField
                                    fieldMaxWidthNormal filterUf
                                    type="text"
                                    label="Estado (UF)*"
                                    :value="guardMyValuesRegister.state"
                                    :filterMethod="handleState"
                                    :errorMessage="msgsError.state.errorMessageState"
                                    :error="msgsError.state.actionErrorMsgState" />

                                <TextFormField
                                    fieldMaxWidthNormal
                                    type="text"
                                    label="Cidade*"
                                    :value="guardMyValuesRegister.city"
                                    :filterMethod="handleCity"
                                    :errorMessage="msgsError.city.errorMessageCity"
                                    :error="msgsError.city.actionErrorMsgCity" />

                                <TextFormField
                                    fieldMaxWidthNormal
                                    type="text"
                                    label="País*"
                                    :value="guardMyValuesRegister.country"
                                    :filterMethod="handleCountry"
                                    :errorMessage="msgsError.country.errorMessageCountry"
                                    :error="msgsError.country.actionErrorMsgCountry" />

                            </div>
                        </transition>
                        <BoxButtons class="progress-bar-step"
                            :step="stepMoment" :max="3" :advancedDisabled="disableStepOne" :advancedTitle="guardMyStepsActive.advanceTitle"
                            @stepValue="getStep"/>
                    </div>
                </BoxContent>

                <BoxContent key="2" v-else-if="stepMoment === 2" class="box-content">
                    <div class="wrapper">

                        <TextFormField
                            style="justify-self: center;"
                            :key="guardMyValuesRegister.typeAccount.value"
                            type="radio"
                            label="Tipo da conta*"
                            :itemRadio="guardMyValuesRegister.typeAccount"
                            :itemsRadio="valuesOptionsRadioPfOrPj"
                            :errorMessage="msgsError.typeAccount.errorMessageTypeAccount"
                            :error="msgsError.typeAccount.actionErrorMsgTypeAccount"
                            :messageNotification="guardMyValuesRegister.typeAccount.value ? '' : 'Selecione o tipo da conta'"
                            @onSelect="handleSelectValueRadioPfOrPj" />

                        <TextFormField
                            :key="guardMyValuesRegister.codTypeAccount.value"
                            fieldMaxWidthNormal
                            type="select"
                            label="Código conta*"
                            :itemSelect="guardMyValuesRegister.codTypeAccount"
                            :itemsSelect="valuesCodTypeAccount"
                            :filterMethod="handleCodTypeAccount"
                            :errorMessage="msgsError.codTypeAccount.errorMessageCodTypeAccount"
                            :error="msgsError.codTypeAccount.actionErrorMsgCodTypeAccount" />
                        
                        <TextFormField
                            :key="guardMyValuesRegister.associatedUserCode.value"
                            fieldMaxWidthNormal
                            type="select"
                            label="Código usuário associado*"
                            :itemSelect="guardMyValuesRegister.associatedUserCode"
                            :itemsSelect="valuesAssociatedUserCode"
                            :filterMethod="handleAssociatedUserCode"
                            :errorMessage="msgsError.associatedUserCode.errorMessageAssociatedUserCode"
                            :error="msgsError.associatedUserCode.actionErrorMsgAssociatedUserCode" />

                        <TextFormField
                            fieldMaxWidthNormal
                            type="select"
                            label="Sexo"
                            :itemSelect="guardMyValuesRegister.sex"
                            :itemsSelect="valuesSexSelect"
                            :filterMethod="handleSex" />

                        <TextFormField v-if="countryIsBrazil && !msgsError.typeAccount.actionErrorMsgTypeAccount"
                            fieldMaxWidthNormal
                            :filterCpf="countryIsBrazil && guardMyValuesRegister.typeAccount.value == 'PF'"
                            :filterCnpj="countryIsBrazil && guardMyValuesRegister.typeAccount.value == 'PJ'"
                            type="text"
                            :label="
                                guardMyValuesRegister.typeAccount.value == 'PF' ?
                                'Número do CPF*' :
                                'Número do CNPJ*'
                            "
                            :value="guardMyValuesRegister.typeAccount.value == 'PF' ? guardMyValuesRegister.cpf : guardMyValuesRegister.cnpj"
                            :filterMethod="guardMyValuesRegister.typeAccount.value == 'PF' ? handleCpf : handleCnpj"
                            :errorMessage="guardMyValuesRegister.typeAccount.value == 'PF' ? msgsError.cpf.errorMessageCpf : msgsError.cnpj.errorMessageCnpj"
                            :error="guardMyValuesRegister.typeAccount.value == 'PF' ? msgsError.cpf.actionErrorMsgCpf : msgsError.cnpj.actionErrorMsgCnpj" />
                        
                        <TextFormField v-if="countryIsBrazil && guardMyValuesRegister.typeAccount.value == 'PF'"
                            fieldMaxWidthNormal
                            filterRg
                            type="text"
                            label="Número do RG*"
                            :value="guardMyValuesRegister.rg"
                            :filterMethod="handleRg"
                            :errorMessage="msgsError.rg.errorMessageRg"
                            :error="msgsError.rg.actionErrorMsgRg" />
                        
                        <TextFormField
                            fieldMaxWidthNormal
                            type="date"
                            label="Data de Nascimento"
                            :value="guardMyValuesRegister.birthDate"
                            :filterMethod="handleBirthDate"
                            :errorMessage="msgsError.birthDate.errorMessageBirthDate"
                            :error="msgsError.birthDate.actionErrorMsgBirthDate" />
                    
                        <TextFormField
                            fieldMaxWidthNormal filterPhone
                            type="tel"
                            label="Celular"
                            :value="guardMyValuesRegister.cel"
                            :filterMethod="handleCel"
                            :errorMessage="msgsError.cel.errorMessageCel"
                            :error="msgsError.cel.actionErrorMsgCel" />

                        <TextFormField
                            fieldMaxWidthNormal filterPhone
                            type="tel"
                            label="Outro telefone"
                            :value="guardMyValuesRegister.otherCel"
                            :filterMethod="handleOtherCel"
                            :errorMessage="msgsError.otherCel.errorMessageOtherCel"
                            :error="msgsError.otherCel.actionErrorMsgOtherCel" />

                        <BoxButtons class="progress-bar-step"
                            :step="stepMoment" :max="3" :advancedDisabled="disableStepTwo" :advancedTitle="guardMyStepsActive.advanceTitle"
                            @stepValue="getStep" />
                    </div>
                </BoxContent>

                <BoxContent key="3" v-else-if="stepMoment === 3" class="box-content">
                    <div class="wrapper">
                        <TextFormField
                            fieldMaxWidthNormal
                            type="text"
                            label="Ponto de referência" />

                        <TextFormField
                            fieldMaxWidthNormal
                            type="text"
                            label="Promotional code" />

                        <BoxButtons class="progress-bar-step"
                        :step="stepMoment" :max="3" :advancedDisabled="stepMoment < 3" :advancedTitle="guardMyStepsActive.advanceTitle"
                        @stepValue="getStep" />
                    </div>
                </BoxContent>
            </transition>

        </div>

    </div>
</template>

<script>
import BoxButtons from '@/components/progress_bar_step/buttons_back_next/BoxButtons'
import ProgressBarSteps from '@/components/progress_bar_step/progress/ProgressBarSteps'

import TextFormField from '@/components/text_form_field/TextFormField'
import Button from '@/components/button/Button'
import H1 from '@/components/typographies/H1'
import H2 from '@/components/typographies/H2'
import BoxContent from '@/components/box_content/BoxContent'
import Radio from '@/components/radio/Radio'

export default {
    name: 'Register',
    components: {
        BoxButtons,
        ProgressBarSteps,
        TextFormField,
        Button,
        H1, H2,
        BoxContent,
        Radio,
    },

    data() {
        return {
            msgsError: {
                // 1º) StepOne:
                nameUser: {
                    name: {
                        actionErrorMsgName: true,
                        errorMessageName: '',
                    },
                    // surname: {
                    //     actionErrorMsgSurname: true,
                    //     errorMessageSurname: '',
                    // },
                },
                tel: {
                    actionErrorMsgTel: true,
                    errorMessageTel: '',
                },
                email: {
                    actionErrorMsgEmail: true,
                    errorMessageEmail: '',
                },
                password: {
                    password: {
                        actionErrorMsgPassword: true,
                        errorMessagePassword: '',
                    },
                    confirmPassword: {
                        actionErrorMsgConfirmPassword: true,
                        errorMessageConfirmPassword: '',
                    }
                },
                cep: {
                    actionErrorMsgCep: true,
                    errorMessageCep: '',
                },

                // 2º) StepTwo:
                typeAccount: {
                    actionErrorMsgTypeAccount: true,
                    errorMessageTypeAccount: '',
                },
                codTypeAccount: {
                    actionErrorMsgCodTypeAccount: true,
                    errorMessageCodTypeAccount: '',
                },
                associatedUserCode: {
                    actionErrorMsgAssociatedUserCode: true,
                    errorMessageAssociatedUserCod: '',
                },
                rg: {
                    actionErrorMsgRg: true,
                    errorMessageRg: '',
                },
                cpf: {
                    actionErrorMsgCpf: true,
                    errorMessageCpf: '',
                },
                cnpj: {
                    actionErrorMsgCnpj: true,
                    errorMessageCnpj: '',
                },
                sex: {
                    actionErrorMsgSex: true,
                    errorMessageSex: '',
                },
                birthDate: {
                    actionErrorMsgBirthDate: true,
                    errorMessageBirthDate: '',
                },
                cel: {
                    actionErrorMsgCel: true,
                    errorMessageCel: '',
                },
                otherCel: {
                    actionErrorMsgOtherCel: true,
                    errorMessageOtherCel: '',
                },
                country: {
                    actionErrorMsgCountry: false,
                    errorMessageCountry: '',
                },

                // 3º) StepThree:
                address: {
                    actionErrorMsgAddress: true,
                    errorMessageAddress: '',
                },
                number: {
                    actionErrorMsgNumber: true,
                    errorMessageNumber: '',
                },
                district: {
                    actionErrorMsgDistrict: true,
                    errorMessageDistrict: '',
                },
                complement: {
                    actionErrorMsgComplement: true,
                    errorMessageComplement: '',
                },
                state: {
                    actionErrorMsgState: true,
                    errorMessageState: '',
                },
                city: {
                    actionErrorMsgCity: true,
                    errorMessageCity: '',
                },
                referencePoint: {
                    actionErrorMsgReferencePoint: true,
                    errorMessageReferencePoint: '',
                },
                promotionalCode: {
                    actionErrorMsgPromotionalCode: true,
                    errorMessagePromotionalCode: '',
                },
            },

            guardMyStepsActive: {
                advanceTitle: 'Preencha os campos para avançar',
            },

            guardMyValuesRegister: {
                // 1º Step:
                name: '',
                // surname: '',
                tel: '',
                email: '',
                password: '',
                confirmPassword: '',
                cep: '',

                // 2º Step:
                typeAccount: {},
                codTypeAccount: {},
                associatedUserCode: {},
                rg: '',
                cpf: '',
                cnpj: '',
                sex: {},
                birthDate: null,
                cel: '',
                otherCel: '',
                country: 'Brasil',

                // 3º Step:
                address: '',
                number: '',
                district: '',
                complement: '',
                state: '',
                city: '',
                referencePoint: '',
                promotionalCode: '',
            },

            stepMoment: 1,
            valuesCodTypeAccount: [
                {
                    value: 99,
                    label: '1',
                    disabled: false,
                },
            ],
            valuesAssociatedUserCode: [
                {
                    value: 1,
                    label: '1',
                    disabled: false,
                },
            ],
            valuesSexSelect: [
                {
                    value: 'M',
                    label: 'Masculino',
                    disabled: false,
                },
                {
                    value: 'F',
                    label: 'Feminino',
                    disabled: false,
                },
            ],

            valuesOptionsRadioPfOrPj: [
                {
                    label: 'PF',
                    value: 'PF',
                    disabled: false,
                },
                {
                    label: 'PJ',
                    value: 'PJ',
                    disabled: false,
                },
            ],

            requestCEP_Ok: false,
        }
    },

    computed: {
        disableStepOne() {

            let valuesRegister = this.guardMyValuesRegister;

            let validationName = this.msgsError.nameUser;
            let validationPassword = this.msgsError.password;
            
            if (
                ((valuesRegister.name == null || valuesRegister.name == '') || validationName.name.actionErrorMsgName) ||
                // ((valuesRegister.surname == null || valuesRegister.surname == '') || validationName.surname.actionErrorMsgSurname) ||
                ((valuesRegister.tel == null || valuesRegister.tel == '') || this.msgsError.tel.actionErrorMsgTel) ||
                ((valuesRegister.email == null || valuesRegister.email == '') || this.msgsError.email.actionErrorMsgEmail) ||
                
                ((valuesRegister.password == null || valuesRegister.password == '') ||
                validationPassword.password.actionErrorMsgPassword || validationPassword.confirmPassword.actionErrorMsgConfirmPassword) ||
                ((valuesRegister.cep == null || valuesRegister.cep == '') || this.msgsError.cep.actionErrorMsgCep) ||
                ((valuesRegister.address == null || valuesRegister.address == '') || this.msgsError.address.actionErrorMsgAddress) ||
                ((valuesRegister.number == null || valuesRegister.number == '') || this.msgsError.number.actionErrorMsgNumber) ||
                ((valuesRegister.district == null || valuesRegister.district == '') || this.msgsError.district.actionErrorMsgDistrict) ||
                ((valuesRegister.state == null || valuesRegister.state == '') || this.msgsError.state.actionErrorMsgState) ||
                ((valuesRegister.city == null || valuesRegister.city == '') || this.msgsError.city.actionErrorMsgCity) ||
                ((valuesRegister.country == null || valuesRegister.country == '') || this.msgsError.country.actionErrorMsgCountry)
            ) {
                this.guardMyStepsActive.advanceTitle = 'Preencha os campos para avançar';
                return true;
            } else {
                this.guardMyStepsActive.advanceTitle = '';
                return false;
            }
        },

        disableStepTwo() {
            let valuesRegister = this.guardMyValuesRegister;

            let typeAccountIsPf = (valuesRegister.typeAccount && valuesRegister.typeAccount.value) == 'PF' ? true : false;

            console.log('isvalid: ', typeAccountIsPf)
            
            if (
                ((valuesRegister.typeAccount == null || valuesRegister.typeAccount == {}) || this.msgsError.typeAccount.actionErrorMsgTypeAccount) ||
                ((valuesRegister.codTypeAccount == null || valuesRegister.codTypeAccount == {}) || this.msgsError.codTypeAccount.actionErrorMsgCodTypeAccount) ||
                ((valuesRegister.associatedUserCode == null || valuesRegister.associatedUserCode == {}) || this.msgsError.associatedUserCode.actionErrorMsgAssociatedUserCode)
            ) {
                this.guardMyStepsActive.advanceTitle = 'Preencha os campos para avançar';
                return true;
            } else {
                if (typeAccountIsPf && (this.msgsError.cpf.actionErrorMsgCpf) || (this.msgsError.rg.actionErrorMsgRg)) {
                    this.guardMyStepsActive.advanceTitle = 'Preencha os campos para avançar';
                    return true;
                } else if (!typeAccountIsPf && this.msgsError.cnpj.actionErrorMsgCnpj) {
                    this.guardMyStepsActive.advanceTitle = 'Preencha os campos para avançar';
                    return true;
                } else {
                    this.guardMyStepsActive.advanceTitle = '';
                    return false;
                }
            }
        },

        countryIsBrazil() {
            if (
                this.guardMyValuesRegister.country == 'Brasil' ||
                this.guardMyValuesRegister.country == 'brasil' ||
                this.guardMyValuesRegister.country == 'BR' ||
                this.guardMyValuesRegister.country == 'br'
            ) {
                return true;
            } else {
                return false;
            }
        },
    },

    methods: {
        getStep(value) {
            console.log('voltando : ', value)
            if (value === 'back') {
                this.stepMoment--;
            } else if (value === 'advance') {
                this.stepMoment++;
            }
        },

        // FROM STEP 1º:
        handleNameUser(value) {
            if(value.length > 0 && !value.match(/^(\s)+$/)) {
                this.msgsError.nameUser.name.actionErrorMsgName = false;
                this.msgsError.nameUser.name.errorMessageName = '';
            } else {
                this.msgsError.nameUser.name.actionErrorMsgName = true;
                this.msgsError.nameUser.name.errorMessageName = "Não é permitido campo vázio";
            }
            this.guardMyValuesRegister.name = value;
        },
        // handleSurnameUser(value) {
        //     if(value.length > 0 && !value.match(/^(\s)+$/)) {
        //         this.msgsError.nameUser.surname.actionErrorMsgSurname = false;
        //         this.msgsError.nameUser.surname.errorMessageSurname = '';
        //     } else {
        //         this.msgsError.nameUser.surname.actionErrorMsgSurname = true;
        //         this.msgsError.nameUser.surname.errorMessageSurname = "Não é permitido campo vázio";
        //     }
        //     this.guardMyValuesRegister.surname = value;
        // },
        handleTel(value) {
            if ((value != null || value != '') && value.length >= 16) {
                this.msgsError.tel.actionErrorMsgTel = false;
                this.msgsError.tel.errorMessageTel = '';
            } else {
                this.msgsError.tel.actionErrorMsgTel = true;
                this.msgsError.tel.errorMessageTel = 'Insira um número de telefone válido';
            }

            this.guardMyValuesRegister.tel = value;
        },
        handleEmail(value) {
            let regexValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

            if (value == '') {
                this.msgsError.email.actionErrorMsgEmail = true;
                this.msgsError.email.errorMessageEmail = "Campo está vázio";
            } else if(!regexValidation.test(value)) {
                this.msgsError.email.actionErrorMsgEmail = true;
                this.msgsError.email.errorMessageEmail = "Por favor, insira um email válido";
            } else {
                this.msgsError.email.actionErrorMsgEmail = false;
                this.msgsError.email.errorMessageEmail = "";
            }
            this.guardMyValuesRegister.email = value;
        },
        handlePassword(value) {
            let regexValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!%$*&@#])[0-9a-zA-Z?!%$*&@#]{6,}$/;
            
            if (!regexValidation.test(value)) {
                this.msgsError.password.password.actionErrorMsgPassword = true;
                this.msgsError.password.password.errorMessagePassword = 'Digite no mínimo seis caracteres(distinção entre maiúsculo e minúsculo) com pelo menos um número ou caractere especial';
            } else {
                this.msgsError.password.password.actionErrorMsgPassword = false;
                this.msgsError.password.password.errorMessagePassword = '';
            }
            
            this.guardMyValuesRegister.password = value;
            this.handleConfirmPassword(this.guardMyValuesRegister.confirmPassword);
        },
        handleConfirmPassword(value) {
            if (value !== this.guardMyValuesRegister.password) {
                this.msgsError.password.confirmPassword.actionErrorMsgConfirmPassword = true;
                this.msgsError.password.confirmPassword.errorMessageConfirmPassword = 'Senhas não conferem';
            } else {
                this.msgsError.password.confirmPassword.actionErrorMsgConfirmPassword = false;
                this.msgsError.password.confirmPassword.errorMessageConfirmPassword = '';
            }

            this.guardMyValuesRegister.confirmPassword = value;
        },
        handleCep(value) {
            if (value.length >= 9) {
                this.msgsError.cep.actionErrorMsgCep = false;
                this.msgsError.cep.errorMessageCep = '';
            } else {
                this.msgsError.cep.actionErrorMsgCep = true;
                this.msgsError.cep.errorMessageCep = 'Preencha corretamente o CEP';
            }

            this.guardMyValuesRegister.cep = value;
        },
        handleClickIconSearchCEP() {
            console.log('Clicou em pesquisar CEP')
            this.requestCEP_Ok = true;
        },


        handleSelectValueRadioPfOrPj(value) {
            if (value.value != null || value.value != '') {
                this.guardMyValuesRegister.typeAccount = value;
                this.msgsError.typeAccount.actionErrorMsgTypeAccount = false;
                this.msgsError.typeAccount.errorMessageTypeAccount = '';

                if (this.guardMyValuesRegister.typeAccount.value == 'PF') {
                    this.guardMyValuesRegister.cnpj = '';

                    this.msgsError.cnpj.actionErrorMsgCnpj = false;
                    this.msgsError.cnpj.errorMessageCnpj = '';

                    this.guardMyValuesRegister.cpf = '';

                    this.msgsError.cpf.actionErrorMsgCpf = true;
                    this.msgsError.cpf.errorMessageCpf = '';

                    this.guardMyValuesRegister.rg = '';

                    this.msgsError.rg.actionErrorMsgRg = true;
                    this.msgsError.rg.errorMessageRg = '';
                } else {
                    this.guardMyValuesRegister.cnpj = '';

                    this.msgsError.cnpj.actionErrorMsgCnpj = true;
                    this.msgsError.cnpj.errorMessageCnpj = '';

                    this.guardMyValuesRegister.cpf = '';

                    this.msgsError.cpf.actionErrorMsgCpf = false;
                    this.msgsError.cpf.errorMessageCpf = '';

                    this.guardMyValuesRegister.rg = '';

                    this.msgsError.rg.actionErrorMsgRg = false;
                    this.msgsError.rg.errorMessageRg = '';
                }
            }
        },

        
        // FROM STEP 2º:
        handleCodTypeAccount(value) {
            if (value != {}) {
                this.msgsError.codTypeAccount.actionErrorMsgCodTypeAccount = false;
                this.msgsError.codTypeAccount.errorMessageCodTypeAccount = '';
            } else {
                this.msgsError.codTypeAccount.actionErrorMsgCodTypeAccount = true;
                this.msgsError.codTypeAccount.errorMessageCodTypeAccount = 'Selecione um código da conta';
            }
            this.guardMyValuesRegister.codTypeAccount = value; 
        },
        handleAssociatedUserCode(value) {
            if (value != {}) {
                this.msgsError.associatedUserCode.actionErrorMsgAssociatedUserCode = false;
                this.msgsError.associatedUserCode.errorMessageAssociatedUserCod = '';
            } else {
                this.msgsError.associatedUserCode.actionErrorMsgAssociatedUserCode = true;
                this.msgsError.associatedUserCode.errorMessageAssociatedUserCod = 'Selecione um código associado';
            }
            this.guardMyValuesRegister.associatedUserCode = value; 
        },
        handleRg(value) {
            let foundHash = value.indexOf('#') > -1;

            this.msgsError.rg.actionErrorMsgRg = true;
            this.msgsError.rg.errorMessageRg = 'RG está inválido';

            if (!foundHash && (value != '' || value != null)) {
                this.msgsError.rg.actionErrorMsgRg = false;
                this.msgsError.rg.errorMessageRg = '';
            }

            this.guardMyValuesRegister.rg = value;
        },
        handleCpf(value) {
            let foundHash = value.indexOf('#') > -1;

            this.msgsError.cpf.actionErrorMsgCpf = true;
            this.msgsError.cpf.errorMessageCpf = 'CPF está inválido';

            if (!foundHash && (value != '' || value != null)) {
                this.msgsError.cpf.actionErrorMsgCpf = false;
                this.msgsError.cpf.errorMessageCpf = '';
            }

            this.guardMyValuesRegister.cpf = value;
        },
        handleCnpj(value) {
            let foundHash = value.indexOf('#') > -1;

            this.msgsError.cnpj.actionErrorMsgCnpj = true;
            this.msgsError.cnpj.errorMessageCnpj = 'CNPJ está inválido';

            if (!foundHash && (value != '' || value != null)) {
                this.msgsError.cnpj.actionErrorMsgCnpj = false;
                this.msgsError.cnpj.errorMessageCnpj = '';
            }

            this.guardMyValuesRegister.cnpj = value;
        },
        handleSex(value) {
            if (value != {}) {
                this.msgsError.sex.actionErrorMsgSex = false;
                this.msgsError.sex.errorMessageSex = '';
            } else {
                this.msgsError.sex.actionErrorMsgSex = true;
                this.msgsError.sex.errorMessageSex = 'Selecione um sexo';
            }
            this.guardMyValuesRegister.sex = value; 
        },
        handleBirthDate(value) {
            if ((value != null || value != '') && value.length == 10) {
                this.msgsError.birthDate.actionErrorMsgBirthDate = false;
                this.msgsError.birthDate.errorMessageBirthDate = '';
            } else {
                this.msgsError.birthDate.actionErrorMsgBirthDate = true;
                this.msgsError.birthDate.errorMessageBirthDate = 'Insira uma data válida';
            }

            this.guardMyValuesRegister.birthDate = value;
        },
        handleCel(value) {
            this.guardMyValuesRegister.cel = value;
        },
        handleOtherCel(value) {
            this.guardMyValuesRegister.otherCel = value;
        },
        handleCountry(value) {
            if(value.length > 0 && !value.match(/^(\s)+$/)) {
                this.msgsError.country.actionErrorMsgCountry = false;
                this.msgsError.country.errorMessageCountry = '';
            } else {
                this.msgsError.country.actionErrorMsgCountry = true;
                this.msgsError.country.errorMessageCountry = 'Informe a cidade';
            }

            this.guardMyValuesRegister.country = value;
        },


        // FROM STEP 3º:
        handleAddress(value) {
            if(value.length > 0 && !value.match(/^(\s)+$/)) {
                this.msgsError.address.actionErrorMsgAddress = false;
                this.msgsError.address.errorMessageAddress = '';
            } else {
                this.msgsError.address.actionErrorMsgAddress = true;
                this.msgsError.address.errorMessageAddress = 'Preencha o campo';
            }

            this.guardMyValuesRegister.address = value;
        },
        handleNumberAddress(value) {
            if(value.length > 0 && !value.match(/^(\s)+$/)) {
                this.msgsError.number.actionErrorMsgNumber = false;
                this.msgsError.number.errorMessageNumber = '';
            } else {
                this.msgsError.number.actionErrorMsgNumber = true;
                this.msgsError.number.errorMessageNumber = 'Preencha o campo';
            }

            this.guardMyValuesRegister.number = value;
        },
        handleDistrict(value) {
            if(value.length > 0 && !value.match(/^(\s)+$/)) {
                this.msgsError.district.actionErrorMsgDistrict = false;
                this.msgsError.district.errorMessageDistrict = '';
            } else {
                this.msgsError.district.actionErrorMsgDistrict = true;
                this.msgsError.district.errorMessageDistrict = 'Preencha o campo';
            }

            this.guardMyValuesRegister.district = value;
        },
        handleComplement(value) {
            this.guardMyValuesRegister.complement = value;
        },
        handleState(value) {
            if(value.length == 2 && !value.match(/^(\s)+$/)) {
                this.msgsError.state.actionErrorMsgState = false;
                this.msgsError.state.errorMessageState = '';
            } else {
                this.msgsError.state.actionErrorMsgState = true;
                this.msgsError.state.errorMessageState = 'Informe o estado(UF)';
            }

            this.guardMyValuesRegister.state = value;
        },
        handleCity(value) {
            if(value.length > 0 && !value.match(/^(\s)+$/)) {
                this.msgsError.city.actionErrorMsgCity = false;
                this.msgsError.city.errorMessageCity = '';
            } else {
                this.msgsError.city.actionErrorMsgCity = true;
                this.msgsError.city.errorMessageCity = 'Informe a cidade';
            }

            this.guardMyValuesRegister.city = value;
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

    background-image: linear-gradient(0deg, rgba(1, 3, 8, 0.4) 0%, rgba(1, 3, 8, 0) 100%), url("../../assets/login_bg_3.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
    overflow: hidden;

    .h1-el {
        font-family: 'Montserrat';
        color: white;
        font-size: 28px;

        position: absolute;
        top: 5%;
    }

    // SLIDE_ANIMATION:
    @keyframes slide-in {
		from { transform: translateX(40px); }
		to { transform: translateX(0); }
	}

	@keyframes slide-out {
		from { transform: translateX(0); }
		to { transform: translateX(40px); }
	}
	.slide-enter-active {
		animation: slide-in 1s ease;
		transition: opacity 1s;
	}
	.slide-leave-active {
		position: absolute;
		width: 100%;
		animation: slide-out 1s ease;
		transition: opacity 1s;
	}
	.slide-enter, .slide-leave-to {
		opacity: 0;
	}
	.slide-move {
		transition: transform 1s;
	}

    // FADE_ANIMATION:
    .fade-enter-active {
		animation: slide-in 1s ease;
		transition: opacity 1s;
	}

	.fade-leave-active {
		position: absolute;
		width: 100%;
		animation: slide-out 1s ease;
		transition: opacity 1s;
	}
    .fade-enter, .fade-leave-to {
		opacity: 0;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity 2s transform 2s;
	}

    .box-content {
        max-width: 100%;

        .wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            column-gap: 10px;

            .wrapper-two {
                grid-column-start: 1;
                grid-column-end: 3;

                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                column-gap: 10px;
            }

            .progress-bar-step {
                max-width: 100%;
                justify-content: flex-end;
            }
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

@media only screen and (max-width: 1070px) {
    .background {
        .box-content {
            .wrapper {
                padding-top: 0px;
                grid-template-columns: repeat(2, minmax(200px, 1fr));

                .wrapper-two {
                    padding-top: 0px;
                    grid-template-columns: repeat(2, minmax(200px, 1fr));
                }
            }
        }
    }
}

@media only screen and (max-width: 650px) {
    .background {
        .box-content {
            .wrapper {
                padding-top: 0px;
                grid-template-columns: repeat(1, minmax(150px, 1fr));

                .wrapper-two {
                    margin-top: 15px;
                    padding-top: 0px;
                    grid-template-columns: repeat(1, minmax(100px, 1fr));

                    grid-column-start: auto;
                    grid-column-end: auto;
                }
            }
        }
    }
}

@media only screen and (max-width: 550px) {
    .background {
        background: none;
        margin-top: 20px;

        .h1-el {
            font-family: 'Montserrat';
            color: black;
            font-size: 20px;

            position: absolute;
            top: 0%;
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