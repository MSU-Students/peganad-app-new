<template>
  <q-layout>
    <q-header :class="headerColor()">
      <q-toolbar
        v-if="
          ['/learn', `/learn/${$route.params.id}`].find((p) => (p == $route.path))
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: { EssentialLink }
})
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
}
</script>
