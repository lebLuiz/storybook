<template>
  <div class="div-text-form-field">
    <LabelField 
      :labelField="label" />

    <InputField 
      :disabled="inputDisabled"
      :typeField="type"
      :filterMethod="filterMethod"
      @valueInput="getValue" />

    <MsgField
      :valuesProps="valuesProps" />
  </div>
</template>

<script>
import LabelField from './partials/LabelField'
import InputField from './partials/InputField'
import MsgField from './partials/MsgField'

export default {
  name: "TextFormField",

  components: {
    LabelField,
    InputField,
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

    startMessage: {
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
    }
  },

  data() {
    return {
      valueInput: '',
    }
  },

  computed: {
    valuesProps() {
      return {
        type: this.type,
        valueInput: this.valueInput,

        messageNotification: this.messageNotification,
        startMessage: this.startMessage,
        errorMessage: this.errorMessage,
        error: this.error,

        filterMethod: this.filterMethod,
      };
    },
  },

  methods: {
    getValue(value) {
      this.valueInput = value;
    }
  },
};
</script>

<style lang="scss" scoped>

.div-text-form-field {
  display: flex;
  flex-direction: column;
  margin: 16px 0px;
}

</style>