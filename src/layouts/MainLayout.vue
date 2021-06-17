<template>
  <q-layout>
    <q-header :class="headerColor()">
      <q-toolbar
        v-if="
          ['/learn', `/learn/${$route.params.id}`].find(p => p == $route.path)
        "
      >
        <q-btn
          flat
          round
          icon="arrow_back"
          :to="$route.path == '/learn' ? '/' : '/learn'"
        />
        <q-toolbar-title
          v-if="$route.path == `/learn/${$route.params.id}`"
          class="text-capitalize absolute-center"
          >Learn {{ $route.params.id }}</q-toolbar-title
        >
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
    if (this.onLearnPage()) {
      return 'bg-pink-2';
    } else if (this.$route.path == `/learn/${this.$route.params.id}`) {
      return 'bg-info';
    } else {
      return 'bg-white';
    }
  }

  onLearnPage() {
    return this.$route.path == '/learn';
  }
}
</script>
