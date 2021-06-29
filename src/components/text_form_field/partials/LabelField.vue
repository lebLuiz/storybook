<template>
  <label class="class-label">{{ labelField }}:</label>
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

.class-label {
  // position: absolute;
  margin-bottom: 8px;

  /* BODY */

  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;

  /* preto */

  color: #000000;
}

</style>