<template>
  <q-layout view="lHh lpr lFf">
    <q-header :class="headerColor()">
      <q-toolbar
        v-if="['/learn', `/learn/${$route.params.id}`].find((p) => p == $route.path)"
      >
        <q-btn
          flat
          round
          :icon="$route.name == 'learn-content' ? 'close' : 'arrow_back'"
          :to="$route.path == '/learn' ? '/' : '/learn'"
        />
        <q-toolbar-title
          v-if="$route.path == `/learn/${$route.params.id}`"
          class="text-h5 text-weight-bold text-uppercase absolute-center"
          >Learn {{ $route.params.id }}</q-toolbar-title
        >
      </q-toolbar>
      <q-toolbar
        v-else-if="['/game', `/game/${$route.params.id}`].find((p) => p == $route.path)"
      >
        <q-btn
          v-if="gamePreference.score == 0"
          flat
          round
          :icon="$route.name == 'game-content' ? 'close' : 'arrow_back'"
          :to="$route.path == '/game' ? '/' : '/game'"
        />

        <q-btn
          v-if="gamePreference.score != 0"
          flat
          round
          :icon="$route.name == 'game-content' ? 'close' : 'arrow_back'"
          @click="closeGame()"
        />

        <q-toolbar-title
          v-if="$route.path == `/game/${$route.params.id}`"
          class="text-h5 text-weight-bold text-uppercase absolute-center"
          >Play {{ $route.params.id }}</q-toolbar-title
        >
        <q-space></q-space>
        <q-btn flat round to="/board" v-if="$route.path == '/game'" icon="emoji_events" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {IGame} from 'src/interfaces/game-interface';
import {Vue, Component} from 'vue-property-decorator';
import {mapState} from 'vuex';

@Component({
  computed: {
    ...mapState('game', ['gamePreference']),
  },
})
export default class MainLayout extends Vue {
  gamePreference!: IGame;
  headerColor() {
    if (this.onLearnPage()) {
      return 'bg-pink-2';
    } else if (this.$route.path == `/learn/${this.$route.params.id}`) {
      return 'bg-info';
    } else if (this.onGamePage()) {
      return 'bg-green-3';
    } else if (this.$route.path == `/game/${this.$route.params.id}`) {
      return 'bg-info';
    } else if (this.$route.path == '/') {
      return 'bg-yellow-1';
    } else if (this.$route.path == '/board') {
      return 'bg-info';
    } else if (this.$route.path == '/about') {
      return 'bg-pink-4';
    } else if (this.$route.path == `/score/${this.$route.params.id}`) {
      return 'bg-blue-2';
    }
  }

  onLearnPage() {
    return this.$route.path == '/learn';
  }

  onGamePage() {
    return this.$route.path == '/game';
  }

  closeGame() {
    clearTimeout(this.gamePreference.currentTime);
    this.$q
      .dialog({
        title: 'Quit Game',
        message: 'Are you sure?',
        ok: {
          push: true,
          color: 'positive',
        },
        cancel: {
          push: true,
          color: 'negative',
        },
        persistent: true,
      })
      .onOk(async () => {
        await this.$router.replace('/game');
      })
      .onCancel(() => {
        // console.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }
}
</script>
