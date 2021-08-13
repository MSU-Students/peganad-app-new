<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import 'animate.css';
import {Vue, Component} from 'vue-property-decorator';
import {Plugins} from '@capacitor/core';

const {StatusBar, App} = Plugins;

@Component({})
export default class MyApp extends Vue {
  async mounted() {
    App.addListener('backButton', () => {});
    await StatusBar.setOverlaysWebView({overlay: true});
  }
}
</script>
