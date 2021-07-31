<template>
  <q-page class="q-pa-md text-center bg-blue-4">
    <div class="row justify-between">
      <q-btn rounded color="white" text-color="black" icon="arrow_back" to="/about" />
      <q-btn rounded color="white" text-color="pink-4" label="Learn Now?" to="/learn" />
    </div>
    <div class="text-h4 text-white q-py-lg animate__animated animate__fadeInRight">
      Special thanks to
    </div>
    <q-card class="my-card text-grey-9 animate__animated animate__fadeInLeft">
      <q-card-section>
        <div class="text-h5 text-weight-bold text-blue-4">
          MSU CIT <q-icon name="favorite" />
        </div>
        <q-separator class="q-my-sm" inset color="grey-8" />
        <div class="text-body1 q-pt-sm">
          Ma'am Dean: <br />
          <b>Prof. Maimona M. Asum</b>
        </div>
        <div class="text-body1 q-pt-sm">
          Capstone Adviser: <br />
          <b>Prof. Suhaina K. Tamano</b>
        </div>
        <div class="text-body1 q-pt-sm">
          Panelists: <br />
          <b>Prof. Mudzna M. Asakil</b>
          <br />
          <b>Prof. Zacaria Gulam</b>
        </div>
        <div class="text-body1 q-pt-sm">
          Technical Adviser:<br />
          <b>Sir. Lucman M. Abdulrachman</b>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="my-card q-mt-md text-grey-9 animate__animated animate__fadeInRight">
      <q-card-section>
        <div class="text-h5 text-weight-bold text-pink-4">
          ITSMarawi Family <q-icon name="favorite" />
        </div>
        <q-separator class="q-my-sm" inset color="grey-8" />
        <div class="text-body1 q-pt-sm">
          Founders: <br />
          <b>Sir. Azreen M. Marohomsalic</b>
          <br />
          <b>Sir. Lucman M. Abdulrachman</b>
          <br />
          <b>Sir. Mohammad Omair S. Marohom</b>
        </div>
        <div class="text-body1 q-pt-sm">
          Members:
          <div>
            <span class="text-pink-4">*</span>insert <b>Pandi P.</b> | <b>Leonor D.</b> |
            <b>Nurjadin A.</b> | <b>Amer H.S</b> | <b>Amer S.</b> | <b>Felix A.</b>
          </div>
          <q-img src="~assets/bangsamoro.jpg" spinner-color="pink-4" basic />
        </div>
        <div class="text-body1 q-pt-sm">
          Logo design by: <br />
          <b>Abdul Matin M. Maruhon</b>
          <q-img src="~assets/phaganad.png" height="70px" width="150px" />
        </div>
      </q-card-section>
    </q-card>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab-mini icon="keyboard_arrow_up" color="pink" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class Credit extends Vue {}
</script>

<style></style>
