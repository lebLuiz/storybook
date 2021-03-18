<template>
  <div id="app">
    <shipButton
      label="my button"
      typeButton="submite"
      styleOutline="true"
      styleBlock="true"
      :isDisable="false"
      :loading="true"
      :icon="true"
    >
    </shipButton>
  </div>
</template>

<script>
import shipButton from './components/ShipButton'

export default {
  name: 'App',
  components: {
    shipButton
  }
}
</script>