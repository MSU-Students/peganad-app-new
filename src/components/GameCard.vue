<template>
  <div class="q-gutter-y-sm text-h5 text-bold text-center">
    <p>What is the Meranaw meaning of this {{ $route.params.id }}?</p>
    <q-card
      v-for="(content, index) in displayContents"
      :key="index"
      class="my-card bg-blue-2 text-center"
    >
      <q-card-section>
        <div class="text-h6 row text-center">
          <div class="col-4">
            <div class="text-subtitle1">Question</div>
            <div class="text-h5">{{ game.questionCounter }}/10</div>
          </div>
          <div class="col-4">
            <div class="text-subtitle1">Time</div>
            <div class="text-h5">:{{ game.timer }}</div>
          </div>
          <div class="col-4">
            <div class="text-subtitle1">Score</div>
            <div class="text-h5">{{ game.score }}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        {{ content.name }}
      </q-card-section>
      <q-card-section class="text-center">
        <img :src="content.img" height="250" width="250" />
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md q-pa-lg">
        <div class="col-6">
          <q-btn
            class="full-width"
            size="md"
            rounded
            color="grey"
            label="action 1"
          />
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            size="md"
            rounded
            color="grey"
            label="action 1"
          />
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            size="md"
            rounded
            color="grey"
            label="action 1"
          />
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            size="md"
            rounded
            color="grey"
            label="action 1"
          />
        </div>
      </q-card-actions>
    </q-card>
    <q-btn
      class="full-width q-mt-md"
      size="lg"
      rounded
      color="cyan-10"
      label="Continue"
      @click="continueAnswering()"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import firestore from 'src/services/firestore';

interface IContent {
  name: string;
  translatedName: string;
  img: string;
  audio: string;
}

interface Igame {
  timer: number;
}

@Component({})
export default class GameCard extends Vue {
  storeContents: IContent[] = [];
  displayContents: IContent[] = [];
  game: Igame = {
    currentTime: 0,
    timer: 10,
    questionCounter: 1,
    score: 0
  };
  contentPosition = 1;

  async created() {
    await this.fetchContent();
  }

  async fetchContent(): Promise<void> {
    const animals = await firestore.getAnimals();
    const colors = await firestore.getColors();
    const numbers = await firestore.getNumbers();
    const words = await firestore.getWords();
    if (animals.length != 0 && this.$route.params.id == 'animals') {
      this.storeContents.push(...animals);
    } else if (colors.length != 0 && this.$route.params.id == 'colors') {
      this.storeContents.push(...colors);
    } else if (numbers.length != 0 && this.$route.params.id == 'numbers') {
      this.storeContents.push(...numbers);
    } else if (words.length != 0 && this.$route.params.id == 'words') {
      this.storeContents.push(...words);
    }
    this.displayContentOneByOne();
  }

  displayContentOneByOne() {
    let extractContent = this.storeContents;

    const paginate = (array: [], index: number, size: number) => {
      // transform values
      index = typeof index == 'string' ? Math.abs(parseInt(index)) : index;
      index = index > 0 ? index - 1 : index;
      size = typeof size == 'string' ? parseInt(size) : size;
      size = size < 1 ? 1 : size;

      // filter
      return [
        ...extractContent.filter((value, n) => {
          return n >= index * size && n < (index + 1) * size;
        })
      ];
    };

    if (this.contentPosition <= extractContent.length) {
      let transform = paginate(extractContent, this.contentPosition, 1);
      this.displayContents = transform;
    }

    this.startTimer();
  }

  startTimer() {
    this.countDownTimer();
  }

  countDownTimer() {
    this.game.currentTime = setTimeout(() => {
      this.game.timer -= 1;
      if (this.game.timer == 0) {
        this.game.timer = 10;
      }
      this.countDownTimer();
    }, 1000);
  }

  continueAnswering() {
    let score = 0;
    this.displayContentOneByOne();
    score = this.game.timer * 10;
    this.game.score += score;
    this.game.timer = 10;
    this.game.questionCounter += 1;
    this.contentPosition += 1;
    clearTimeout(this.game.currentTime);
  }
}
</script>

<style></style>
