<template>
  <q-page class="__background q-pa-md text-center">
    <div class="text-left">
      <q-btn rounded color="white" text-color="black" icon="arrow_back" to="/game" />
    </div>
    <div class="text-h4 text-grey-9 q-py-lg">Leaderboards</div>

    <div
      class="bg-white shadow-10 q-pa-md"
      v-if="
        animalPlayer.length == 0 &&
        colorPlayer.length == 0 &&
        numberPlayer.length == 0 &&
        wordPlayer.length == 0
      "
    >
      <div class="text-h4 q-pb-md">No Scores Yet!</div>
      <q-btn color="green" label="Play Game?" to="/game" />
    </div>

    <q-card v-if="animalPlayer.length != 0" class="q-ma-md text-grey-9" flat bordered>
      <q-card-section>
        <div class="text-h5 text-weight-bold q-pb-md">Animal Best Score</div>
        <q-separator />
        <template v-for="(player, index) in animalPlayer">
          <div class="row justify-center q-py-sm text-h6" :key="index">
            <div class="col-3">
              <q-icon v-if="index == 0" name="emoji_events" color="yellow-8" size="md" />
              <q-icon v-else-if="index == 1" name="emoji_events" color="grey" size="md" />
              <q-icon
                v-else-if="index == 2"
                name="emoji_events"
                color="brown"
                size="md"
              />
              <q-icon v-else name="military_tech" color="blue" size="md" />
            </div>
            <div class="col-6 ellipsis">{{ player.player }}</div>
            <div class="col-3">
              <q-chip color="green" text-color="white" outline :label="player.score" />
            </div>
          </div>
        </template>
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary" @click="resetAnimal()"> Reset Score </q-btn>
      </q-card-actions>
    </q-card>

    <q-card v-if="colorPlayer.length != 0" class="q-ma-md text-grey-9" flat bordered>
      <q-card-section>
        <div class="text-h5 text-weight-bold q-pb-md">Colors Best Score</div>
        <q-separator />
        <template v-for="(player, index) in colorPlayer">
          <div class="row justify-center q-py-sm text-h6" :key="index">
            <div class="col-3">
              <q-icon v-if="index == 0" name="emoji_events" color="yellow-8" size="md" />
              <q-icon v-else-if="index == 1" name="emoji_events" color="grey" size="md" />
              <q-icon
                v-else-if="index == 2"
                name="emoji_events"
                color="brown"
                size="md"
              />
              <q-icon v-else name="military_tech" color="blue" size="md" />
            </div>
            <div class="col-6 ellipsis">{{ player.player }}</div>
            <div class="col-3">
              <q-chip color="green" text-color="white" outline :label="player.score" />
            </div>
          </div>
        </template>
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary" @click="resetColor()"> Reset Score </q-btn>
      </q-card-actions>
    </q-card>

    <q-card v-if="numberPlayer.length != 0" class="q-ma-md text-grey-9" flat bordered>
      <q-card-section>
        <div class="text-h5 text-weight-bold q-pb-md">Numbers Best Score</div>
        <q-separator />
        <template v-for="(player, index) in numberPlayer">
          <div class="row justify-center q-py-sm text-h6" :key="index">
            <div class="col-3">
              <q-icon v-if="index == 0" name="emoji_events" color="yellow-8" size="md" />
              <q-icon v-else-if="index == 1" name="emoji_events" color="grey" size="md" />
              <q-icon
                v-else-if="index == 2"
                name="emoji_events"
                color="brown"
                size="md"
              />
              <q-icon v-else name="military_tech" color="blue" size="md" />
            </div>
            <div class="col-6 ellipsis">{{ player.player }}</div>
            <div class="col-3">
              <q-chip color="green" text-color="white" outline :label="player.score" />
            </div>
          </div>
        </template>
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary" @click="resetNumber()"> Reset Score </q-btn>
      </q-card-actions>
    </q-card>

    <q-card v-if="wordPlayer.length != 0" class="q-ma-md text-grey-9" flat bordered>
      <q-card-section>
        <div class="text-h5 text-weight-bold q-pb-md">Words Best Score</div>
        <q-separator />
        <template v-for="(player, index) in wordPlayer">
          <div class="row justify-center q-py-sm text-h6" :key="index">
            <div class="col-3">
              <q-icon v-if="index == 0" name="emoji_events" color="yellow-8" size="md" />
              <q-icon v-else-if="index == 1" name="emoji_events" color="grey" size="md" />
              <q-icon
                v-else-if="index == 2"
                name="emoji_events"
                color="brown"
                size="md"
              />
              <q-icon v-else name="military_tech" color="blue" size="md" />
            </div>
            <div class="col-6 ellipsis">{{ player.player }}</div>
            <div class="col-3">
              <q-chip color="green" text-color="white" outline :label="player.score" />
            </div>
          </div>
        </template>
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn flat color="primary" @click="resetWord()"> Reset Score </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import {IPlayer} from 'src/interfaces/player.interface';
import {localbaseService} from 'src/services/localbase.service';
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class Learderboard extends Vue {
  animalPlayer: IPlayer[] = [];
  colorPlayer: IPlayer[] = [];
  numberPlayer: IPlayer[] = [];
  wordPlayer: IPlayer[] = [];
  async created() {
    const animal = await localbaseService.getPlayer('score-animals');
    this.animalPlayer = animal ? animal.sort((a, b) => b.score - a.score) : [];
    const color = await localbaseService.getPlayer('score-colors');
    this.colorPlayer = color ? color.sort((a, b) => b.score - a.score) : [];
    const number = await localbaseService.getPlayer('score-numbers');
    this.numberPlayer = number ? number.sort((a, b) => b.score - a.score) : [];
    const word = await localbaseService.getPlayer('score-words');
    this.wordPlayer = word ? word.sort((a, b) => b.score - a.score) : [];
  }

  async resetAnimal() {
    await localbaseService.deletePlayer('score-animals');
    this.animalPlayer = [];
  }

  async resetColor() {
    await localbaseService.deletePlayer('score-colors');
    this.colorPlayer = [];
  }

  async resetNumber() {
    await localbaseService.deletePlayer('score-numbers');
    this.numberPlayer = [];
  }

  async resetWord() {
    await localbaseService.deletePlayer('score-words');
    this.wordPlayer = [];
  }
}
</script>

<style scoped>
.__background {
  background: url('../../assets/background.jpg');
  background-position: center;
  background-size: cover;
}
</style>
