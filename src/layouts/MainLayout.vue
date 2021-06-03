<template>
  <q-layout>
    <q-header :class="$route.path == '/learn' ? 'bg-cyan' : 'bg-primary'">
      <q-toolbar v-if="$route.path == '/'">
        <q-toolbar-title @click="() => $router.replace('/')">
          Peganad App
        </q-toolbar-title>

        <q-btn dense flat round icon="settings" />
      </q-toolbar>
      <q-toolbar v-else-if="$route.path == '/learn'">
        <q-btn flat round icon="arrow_back" to="/" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
