<template>
  <div class="q-gutter-y-md">
    <q-card
      class="my-card bg-yellow-3 q-pt-xs q-ma-md"
      v-for="(content, index) in contents"
      :key="index"
    >
      <q-card-section class="text-center ">
        <div class="text-h4">{{ content.name }}</div>
        <img
          :src="content.img"
          height="250"
          width="250"
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
import helper from 'src/services/helper';
import firestore from 'src/services/firestore';

interface IContent {
  [key: string]: string;
}

@Component({})
export default class LearnCard extends Vue {
  // sample JSON data from DB
  // learnContents = [
  //   {
  //     animals: [
  //       {
  //         name: 'Bird',
  //         translatedName: 'Papanok',
  //         img: 'bird.png',
  //         audio: 'bird.wav'
  //       },
  //       {
  //         name: 'Chicken',
  //         translatedName: 'Manok',
  //         img: 'chicken.png',
  //         audio: 'chicken.wav'
  //       },
  //       {
  //         name: 'Cat',
  //         translatedName: 'Bdung',
  //         img: 'cat.png',
  //         audio: 'cat.wav'
  //       },
  //       {
  //         name: 'FISH',
  //         translatedName: 'Seda',
  //         img: 'fish.png',
  //         audio: 'fish.wav'
  //       },
  //       {
  //         name: 'COW',
  //         translatedName: 'Sape',
  //         img: 'cow.png',
  //         audio: 'cow.wav'
  //       }
  //     ]
  //   },
  //   {
  //     color: [
  //       {
  //         name: 'BLACK',
  //         translatedName: 'Maitem',
  //         img: 'black.png',
  //         audio: 'black.wav'
  //       },
  //       {
  //         name: 'BROWN',
  //         translatedName: 'Kalopalopa',
  //         img: 'brown.png',
  //         audio: 'brown.wav'
  //       },
  //       {
  //         name: 'ORANGE',
  //         translatedName: 'Korit',
  //         img: 'orange.png',
  //         audio: 'orange.wav'
  //       },
  //       {
  //         name: 'RED',
  //         translatedName: 'Mariga',
  //         img: 'red.png',
  //         audio: 'red.wav'
  //       },
  //       {
  //         name: 'GREEN',
  //         translatedName: 'Gadong',
  //         img: 'green.png',
  //         audio: 'green.wav'
  //       }
  //     ]
  //   },
  //   {
  //     number: [
  //       {
  //         name: 'ONE',
  //         translatedName: 'Isa',
  //         img: 'one.png',
  //         audio: 'one.wav'
  //       },
  //       {
  //         name: 'TWO',
  //         translatedName: 'Duwa',
  //         img: 'two.png',
  //         audio: 'two.wav'
  //       },
  //       {
  //         name: 'THREE',
  //         translatedName: 'Telo',
  //         img: 'three.png',
  //         audio: 'three.wav'
  //       },
  //       {
  //         name: 'FOUR',
  //         translatedName: 'Pat',
  //         img: 'four.png',
  //         audio: 'four.wav'
  //       },
  //       {
  //         name: 'FIVE',
  //         translatedName: 'Lima',
  //         img: 'five.png',
  //         audio: 'five.wav'
  //       }
  //     ]
  //   },
  //   {
  //     word: [
  //       {
  //         name: 'CHAIR',
  //         translatedName: 'Ontoda',
  //         img: 'chair.png',
  //         audio: 'chair.wav'
  //       },
  //       {
  //         name: 'BROOM',
  //         translatedName: 'Paipas',
  //         img: 'broom.png',
  //         audio: 'broom.wav'
  //       },
  //       {
  //         name: 'FATHER',
  //         translatedName: 'Ama',
  //         img: 'father.png',
  //         audio: 'father.wav'
  //       },
  //       {
  //         name: 'MOTHER',
  //         translatedName: 'Ina',
  //         img: 'mother.png',
  //         audio: 'mother.wav'
  //       },
  //       {
  //         name: 'TABLE',
  //         translatedName: 'Lamisaan',
  //         img: 'table.png',
  //         audio: 'table.wav'
  //       }
  //     ]
  //   }
  // ];

  // Your local data for storing DB datas
  contents: IContent[] = [];
  showAudioLoader = false;
  tappedIndex = 0;

  async created() {
    await this.fetchContent();
  }

  async fetchContent(): Promise<void> {
    const animals = await firestore.getAnimals();
    const colors = await firestore.getColors();
    const numbers = await firestore.getNumbers();
    const words = await firestore.getWords();
    if (animals.length != 0 && this.$route.params.id == 'animals') {
      this.contents.push(...animals);
    } else if (colors.length != 0 && this.$route.params.id == 'colors') {
      this.contents.push(...colors);
    } else if (numbers.length != 0 && this.$route.params.id == 'numbers') {
      this.contents.push(...numbers);
    } else if (words.length != 0 && this.$route.params.id == 'words') {
      this.contents.push(...words);
    }
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
