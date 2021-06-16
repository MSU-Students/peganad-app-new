<template>
  <div class="q-gutter-y-md">
    <q-card
      class="my-card text-center bg-yellow-3 q-pt-xs q-ma-md"
      v-for="(content, index) in contents"
      :key="index"
    >
      <q-card-section>
        <div class="text-h4">{{ content.name }}</div>
        <img
          :src="
            require(`src/assets/card-content/${$route.params.id}/${content.img}`)
          "
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
          @click="playAudio(content.audio)"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class LearnCard extends Vue {
  // sample JSON data from DB
  learnContents = [
    {
      animal: [
        {
          name: 'BIRD',
          translatedName: 'Papanok',
          img: 'bird.png',
          audio: 'broom.wav'
        },
        {
          name: 'CHICKEN',
          translatedName: 'Manok',
          img: 'chicken.png',
          audio: ''
        },
        {
          name: 'CAT',
          translatedName: 'Bedong',
          img: 'cat.png',
          audio: ''
        },
        {
          name: 'FISH',
          translatedName: 'Seda',
          img: 'fish.png',
          audio: ''
        },
        {
          name: 'COW',
          translatedName: 'Sape',
          img: 'cow.png',
          audio: ''
        }
      ]
    },
    {
      color: [
        {
          name: 'BLACK',
          translatedName: 'Maitem',
          img: 'black.png',
          audio: ''
        },
        {
          name: 'BROWN',
          translatedName: 'Kalopalopa',
          img: 'brown.png',
          audio: ''
        },
        {
          name: 'ORANGE',
          translatedName: 'Korit',
          img: 'orange.png',
          audio: ''
        },
        {
          name: 'RED',
          translatedName: 'Mariga',
          img: 'red.png',
          audio: ''
        },
        {
          name: 'GREEN',
          translatedName: 'Gadong',
          img: 'green.png',
          audio: ''
        }
      ]
    },
    {
      number: [
        {
          name: 'ONE',
          translatedName: 'Isa',
          img: 'one.png',
          audio: ''
        },
        {
          name: 'TWO',
          translatedName: 'Duwa',
          img: 'two.png',
          audio: ''
        },
        {
          name: 'THREE',
          translatedName: 'Telo',
          img: 'three.png',
          audio: ''
        },
        {
          name: 'FOUR',
          translatedName: 'Pat',
          img: 'four.png',
          audio: ''
        },
        {
          name: 'FIVE',
          translatedName: 'Lima',
          img: 'five.png',
          audio: ''
        }
      ]
    },
    {
      word: [
        {
          name: 'CHAIR',
          translatedName: 'Ontoda',
          img: 'chair.png',
          audio: ''
        },
        {
          name: 'MIRROR',
          translatedName: 'Pagalongan',
          img: 'mirror.png',
          audio: ''
        },
        {
          name: 'PILLOW',
          translatedName: 'Olona',
          img: 'pillow.png',
          audio: ''
        },
        {
          name: 'PLATE',
          translatedName: 'Lapad',
          img: 'plate.png',
          audio: ''
        },
        {
          name: 'SPOON',
          translatedName: 'Saridot',
          img: 'spoon.png',
          audio: ''
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

  created() {
    this.fetchContent();
    console.log('contents: ', this.contents, this.$route.params.id);
  }

  fetchContent() {
    this.learnContents.forEach((content: any) => {
      console.log(content);
      if (content[this.$route.params.id]) {
        this.contents = content[this.$route.params.id];
      }
    });
  }

  playAudio(base64string) {
    let audioBase64 = require(`src/assets/audio/${base64string}`);
    const audio = new Audio(audioBase64);
    audio.play();
  }
}
</script>

<style></style>
