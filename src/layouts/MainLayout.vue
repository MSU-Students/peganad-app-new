<template>
  <q-layout>
    <q-header :class="headerColor()">
      <q-toolbar
        v-if="
          $route.path == '/learn' || $route.path == `/learn/${$route.params.id}`
        "
      >
        <q-btn flat round icon="arrow_back" :to="$route.path == '/learn' ? '/': '/learn'" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class MainLayout extends Vue {
  headerColor() {
    if (this.$route.path == '/learn') {
      return 'bg-pink';
    } else if (this.$route.path == `/learn/${this.$route.params.id}`) {
      return 'bg-purple';
    } else {
      return 'bg-white';
    }
  }
}
</script>
