<template>
    <div class="container-radio">

      <div v-for="(item, index) in options" :key="index" @click="sendSelect(item)"
        class="radio">
        <input id="id-radio" name="radio" type="radio"
          :disabled="value.disabled"
          :checked="value.value == item.value"
          :value="value" >
        <label for="radio-1" class="radio-label">{{ item.label }}</label>
      </div>

    </div>
</template>

<script>
export default {
  name: 'Radio',

  props: {
    // [ { label: String, value: String||Number, disabled: Boolean(default: false) } ]
    options: {
      type: Array,
      required: true,
    },

    // { label: String, value: String||Number, disabled: Boolean(default: false) }
    value: {
      type: Object,
      required: true,
    }
  },

  methods: {
    sendSelect(value) {
      this.$emit('onSelect', value);
    },
  },

}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

$color1: #f4f4f4;
$color2: #FBBE2F;

.container-radio {
  font-family: "Montserrat";
  display: flex;

  .radio {
    margin: 0.5rem;
    input[type="radio"] {
      // position: absolute;
      opacity: 0;
      + .radio-label {
        &:before {
          content: '';
          background: $color1;
          border-radius: 100%;
          border: 1px solid darken($color1, 25%);
          display: inline-block;
          width: 1.0em;
          height: 1.0em;
          position: relative;
          
          margin-right: 1em; 
          vertical-align: top;
          cursor: pointer;
          text-align: center;
          transition: all 250ms ease;
        }
      }
      &:checked {
        + .radio-label {
          &:before {
            background-color: $color2;
            box-shadow: inset 0 0 0 4px $color1;
          }
        }
      }
      &:focus {
        + .radio-label {
          &:before {
            outline: none;
            border-color: $color2;
          }
        }
      }
      &:disabled {
        + .radio-label {
          &:before {
            box-shadow: inset 0 0 0 4px $color1;
            border-color: darken($color1, 25%);
            background: darken($color1, 25%);
          }
        }
      }
      + .radio-label {
        &:empty {
          &:before {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>