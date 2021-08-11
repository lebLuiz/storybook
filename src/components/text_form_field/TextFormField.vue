<template>
  <div id="text-form-field">
    <LabelField 
      :labelField="label" />

    <InputField v-if="type !== 'select' && type !== 'radio'"
      :disabled="inputDisabled"
      :placeholder="placeholder ? placeholder : ''"
      :typeField="type"
      :mask="mask"

      :value="value"
      :inputMaxWidthNormal="fieldMaxWidthNormal"
      @input="sendValueInput($event, true)"
      @onSearchIcon="getResClickIcon" />

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

    value: {
      type: String || Number,
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

    mask: {
      type: [String, Array],
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

    sendValueInput($event, withAlgo) {
      console.log($event)
      this.$emit('onInput', $event);
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