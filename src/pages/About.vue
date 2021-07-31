<template>
  <q-page class="q-pa-md text-center bg-pink-4">
    <div class="row justify-between">
      <q-btn rounded color="white" text-color="black" icon="arrow_back" to="/" />
      <q-btn
        rounded
        color="white"
        text-color="pink-4"
        label="Credits"
        icon="favorite"
        icon-right="arrow_forward"
        to="/credit"
      />
    </div>
    <div class="text-h3 text-white q-py-lg animate__animated animate__fadeInRight">
      About
    </div>
    <q-card class="my-card text-grey-9 animate__animated animate__fadeInLeft">
      <q-card-section class="text-h4"> Phaganad App </q-card-section>
      <q-card-section class="text-body1">
        The <b>Phaganad App</b> is from the Meranaw word which means “To learn”.
        <b>Phaganad App is a mobile learning application</b> that teaches basic Meranaw
        vocabulary that will focus on the children as the primary user from ages 4-8. The
        learning application aims to help the children by providing alternative and
        interactive learning materials. It offers 40 words through a series of lesson and
        game with native speaker audio clips.
      </q-card-section>

      <q-card-actions class="q-pb-md" align="center">
        <q-btn rounded color="purple" label="Learn now?" to="/learn" />
        <span class="q-px-md">OR</span>
        <q-btn rounded color="orange" label="Play now?" to="/game" />
      </q-card-actions>
      <q-separator inset color="grey-6" />
      <q-card-section class="q-pb-md">
        <div class="text-subtitle2">Developed By: Danieza Sarip</div>
        <div class="text-center q-pt-sm text-pink-3 text-weight-bold">
          © 2021 Phaganad. All rights reserved.
        </div>
      </q-card-section>
    </q-card>
    <q-btn
      class="q-mt-xl full-width"
      color="white"
      text-color="pink-4"
      label="Give Us Feedback"
      type="a"
      href="mailto:meranaw.app@gmail.com"
      target="_blank"
      icon="feedback"
      no-caps
      rounded
    />
    <div class="q-pt-xs text-white">Help us improve Phaganad App</div>
  </q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class About extends Vue {}
</script>

<style></style>
