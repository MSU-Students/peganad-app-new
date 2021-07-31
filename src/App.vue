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
    console.log(App, StatusBar);
    App.addListener('backButton', () => {});
    await StatusBar.setOverlaysWebView({overlay: true});
  }
}
</script>
