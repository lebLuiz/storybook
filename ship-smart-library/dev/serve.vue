<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { ShipSmartLibrarySample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  // components: {
  //  ShipSmartLibrarySample,
  // }
});
</script>

<template>
  <div id="app">
    <ship-smart-library-sample />
  </div>
</template>
