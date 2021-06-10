<template>
  <div class="q-gutter-y-md">
    <q-card class="my-card " v-for="(content, index) in contents" :key="index">
      <q-card-section>
        <div class="text-h6">{{ content.name }}</div>
        <img :src="require(`src/assets/card-content/animals/${content.img}`)" />
        <div class="text-subtitle2">{{ content.translatedName }}</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn rounded color="primary" label="Play Audio" icon="speaker" />
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
          name: 'Bird',
          translatedName: 'Papanok',
          img: 'bird.png',
          audio: ''
        },
        {
          name: 'Chicken',
          translatedName: 'Manok',
          img: 'chicken.png',
          audio: ''
        },
         {
          name: 'Cat',
          translatedName: `B'dung`,
          img: 'cat.png',
          audio: ''
        },
        {
         name: 'Fish',
         translatedName: `S'da`,
         img: 'fish.png',
         audio: ''
         }
      ]
    },
    {
      color: [
        {
          name: 'White',
          translatedName: 'Maputi',
          img: '~assets/card-content/animals/bird.png',
          audio: ''
        },
        {
          name: 'Chicken',
          translatedName: 'Manok',
          img: '',
          audio: ''
        },
         {
          name: 'Chicken',
          translatedName: 'Manok',
          img: '',
          audio: ''
        },
        {
         name: 'Horse',
         translatedName: 'Koda',
         img: '',
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
  }

  fetchContent(): void {
    this.learnContents.forEach((content: any) => {
      if (content[this.$route.params.id]) {
        this.contents = content[this.$route.params.id];
      }
    });
  }
}
</script>

<style></style>
