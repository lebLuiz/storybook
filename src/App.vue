<template>
  <div id="app">
    <Button
      label="my button"
      typeButton="submite"
      :outline="false"
      :block="false"
      :isDisable="false"
      :loading="false"
      :icon="true"
    >
    </Button>
  </div>
</template>

<script>
import Button from './components/ShipButton.vue'

export default {
  name: 'App',
  components: {
    Button
  }
}
</script>