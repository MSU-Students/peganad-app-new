<template>
  <div class="q-gutter-y-md">
    <q-card class="my-card " v-for="(content, index) in contents" :key="index">
      <q-card-section class="text-center bg-yellow-2">
        <div class="text-h4">{{ content.name }}</div>
        <img
          :src="
            require(`src/assets/card-content/${$route.params.id}/${content.img}`)
          "
        />
      </q-card-section>
      <q-card-actions class="column q-gutter-y-xs bg-white" align="center">
        <div class="text-h4">{{ content.translatedName }}</div>
        <q-btn
          class="full-width"
          size="lg"
          rounded
          color="cyan-10"
          icon="volume_off"
          :loading="showAudioLoader && index == tappedIndex ? true : false"
          @click="playAudio(content.audio, index)"
        >
          <template v-slot:loading>
            <q-spinner-audio v-if="showAudioLoader" />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import helper from '../services/helper';

@Component({})
export default class LearnCard extends Vue {
  // sample JSON data from DB
  learnContents = [
    {
      animal: [
        {
          name: 'Bird',
          translatedName: 'Papanok',
          img: 'bird.png',
          audio: 'bird.wav'
        },
        {
          name: 'Chicken',
          translatedName: 'Manok',
          img: 'chicken.png',
          audio: 'chicken.wav'
        },
         {
          name: 'Cat',
          translatedName: `B'dung`,
          img: 'cat.png',
          audio: 'cat.wav'
        },
        {
          name: 'FISH',
          translatedName: 'Seda',
          img: 'fish.png',
          audio: 'fish.wav'
        },
        {
          name: 'COW',
          translatedName: 'Sape',
          img: 'cow.png',
          audio: 'cow.wav'
        }
      ]
    },
    {
      color: [
        {
          name: 'BLACK',
          translatedName: 'Maitem',
          img: 'black.png',
          audio: 'black.wav'
        },
        {
          name: 'BROWN',
          translatedName: 'Kalopalopa',
          img: 'brown.png',
          audio: 'brown.wav'
        },
        {
          name: 'ORANGE',
          translatedName: 'Korit',
          img: 'orange.png',
          audio: 'orange.wav'
        },
        {
          name: 'RED',
          translatedName: 'Mariga',
          img: 'red.png',
          audio: 'red.wav'
        },
        {
          name: 'GREEN',
          translatedName: 'Gadong',
          img: 'green.png',
          audio: 'green.wav'
        }
      ]
    },
    {
      number: [
        {
          name: 'ONE',
          translatedName: 'Isa',
          img: 'one.png',
          audio: 'one.wav'
        },
        {
          name: 'TWO',
          translatedName: 'Duwa',
          img: 'two.png',
          audio: 'two.wav'
        },
        {
          name: 'THREE',
          translatedName: 'Telo',
          img: 'three.png',
          audio: 'three.wav'
        },
        {
          name: 'FOUR',
          translatedName: 'Pat',
          img: 'four.png',
          audio: 'four.wav'
        },
        {
          name: 'FIVE',
          translatedName: 'Lima',
          img: 'five.png',
          audio: 'five.wav'
        }
      ]
    },
    {
      word: [
        {
          name: 'CHAIR',
          translatedName: 'Ontoda',
          img: 'chair.png',
          audio: 'chair.wav'
        },
        {
          name: 'BROOM',
          translatedName: 'Paipas',
          img: 'broom.png',
          audio: 'broom.wav'
        },
        {
          name: 'FATHER',
          translatedName: 'Ama',
          img: 'father.png',
          audio: 'father.wav'
        },
        {
          name: 'MOTHER',
          translatedName: 'Ina',
          img: 'mother.png',
          audio: 'mother.wav'
        },
        {
          name: 'TABLE',
          translatedName: 'Lamisaan',
          img: 'table.png',
          audio: 'table.wav'
        }
      ]
    }
  ];

  // Your local data for storing DB datas
  contents = [
    {
      name: '',
      translatedName: '',
      img: '',
      audio: ''
    }
  ];

  showAudioLoader = false;
  tappedIndex = 0;

  created() {
    this.fetchContent();
  }

  fetchContent(): void {
    this.learnContents.forEach((content: any) => {
      if (content[this.$route.params.id]) {
        this.contents = content[this.$route.params.id];
      }
    });
  }

  async playAudio(base64string: string, index: number) {
    const audioBase64 = require(`src/assets/audio/${base64string}`);
    this.showAudioLoader = true;
    this.tappedIndex = index;
    let audio: any = await helper.playAudio(audioBase64);
    this.showAudioLoader = audio.playEnded;
  }
}
</script>

<style></style>
