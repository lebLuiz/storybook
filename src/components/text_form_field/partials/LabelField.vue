<template>
  <label class="label">{{ labelField }}:</label>
</template>

<script>
export default {
  name: 'LabelField',
  props: {
    labelField: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">

@font-face {
  font-family: 'Montserrat', sans-serif;
  src: url(../../../assets/fonts/Montserrat-Regular.ttf);
}

.label {
  margin-bottom: 8px;

  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;

  color: #000000;
}

</style>