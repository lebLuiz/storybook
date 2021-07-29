<template>
  <div id="text-form-field">
    <LabelField 
      :labelField="label" />

    <InputField v-if="type !== 'select' && type !== 'radio'"
      :disabled="inputDisabled"
      :placeholder="placeholder ? placeholder : ''"
      :typeField="type"

      :maxLength6="maxLength6"
      :maxLength15="maxLength15"
      :maxLength20="maxLength20"
      :maxLength60="maxLength60"
      :maxLength85="maxLength85"

      :filterNumberAddress="filterNumberAddress"
      :filterCpf="filterCpf"
      :filterCnpj="filterCnpj"
      :filterRg="filterRg"
      :filterPhone="filterPhone"
      :filterCep="filterCep"
      :filterUf="filterUf" 
      
      :value="value"
      :inputMaxWidthNormal="fieldMaxWidthNormal"
      :verification="verificationInputIcon"
      @valueInput="getValue"
      @searchIconFilterClick="getResClickIcon" />

    <Select v-if="type === 'select'"
      :selectMaxWidthNormal="fieldMaxWidthNormal"
      :items="itemsSelect" :item="itemSelect"
      @selectedValue="getValue" />

    <Radio v-if="type === 'radio'"
      :options="itemsRadio"
      :value="itemRadio"
      @onSelect="getSelectValueRadio"/>

    <MsgField
      :error="error"
      :errorMessage="errorMessage"
      :message="messageNotification" />
  </div>
</template>

<script>
import LabelField from './partials/LabelField'
import InputField from './partials/InputField'
import Select from '@/components/select/Select'
import Radio from '@/components/radio/Radio'
import MsgField from './partials/MsgField'

export default {
  name: "TextFormField",

  components: {
    LabelField,
    InputField,
    Select,
    Radio,
    MsgField,
  },

  props: {
    label: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    // maxLegnthInput:
    maxLength6: {
      type: Boolean,
      default: false,
    },
    maxLength15: {
      type: Boolean,
      default: false,
    },
    maxLength20: {
      type: Boolean,
      default: false,
    },
    maxLength60: {
      type: Boolean,
      default: false,
    },
    maxLength85: {
      type: Boolean,
      default: false,
    },
    filterNumberAddress: {
      type: Boolean,
      default: false,
    },
    filterCpf: {
      type: Boolean,
      default: false,
    },
    filterCnpj: {
      type: Boolean,
      default: false,
    },
    filterRg: {
      type: Boolean,
      default: false,
    },
    filterPhone: {
      type: Boolean,
      default: false,
    },
    filterCep: {
      type: Boolean,
      default: false,
    },
    filterUf: {
      type: Boolean,
      default: false,
    },

    value: {
      type: String || Number || Boolean || Object || Array || Function,
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

    fieldMaxWidthNormal: {
      type: Boolean,
      required: false,
      default: false,
    },

    // COMPONENTS WITH OPTIONS:
    // [ { value: [Any], label: [String], disabled: [Boolean] } ]
    itemsSelect: {
      type: Array,
      required: false,
    },
    itemSelect: {
      type: Object,
      required: false,
    },

    itemsRadio: {
      type: Array,
      required: false,
    },
    itemRadio: {
      type: Object,
      required: false,
    },

    verificationInputIcon: {
      type: Boolean,
      default: false,
    },
  },


  methods: {
    getValue(value) {
      this.filterMethod(value);
    },
    getResClickIcon() {
      this.$emit('searchIconFilterClick');
    },

    getSelectValueRadio(value) {
      this.$emit('onSelect', value);
    },
  },
};
</script>

<style lang="scss" scoped>

#text-form-field {
  display: flex;
  flex-direction: column;
  margin: 16px 0px;
}

</style>