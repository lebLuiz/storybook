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
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.label {
  margin-bottom: 8px;

  font-family: 'Montserrat';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;

  color: #000000;
}

</style>