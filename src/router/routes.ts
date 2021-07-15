import { RouteConfig } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import Index from 'pages/Index.vue';
import Learn from 'src/pages/learn/Learn.vue';
import Game from 'src/pages/game/Game.vue';
import LearnContent from 'src/pages/learn/LearnPageContent.vue';
import GameContent from 'pages/game/GamePageContent.vue';
import ScoreBoard from 'src/pages/ScoreBoard.vue';
import HomePage from 'pages/HomePage.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index },
      { path: 'home', component: HomePage },
      { path: 'learn', component: Learn },
      { path: 'game', component: Game },
      { path: 'learn/:id', name: 'learn-content', component: LearnContent },
      { path: 'game/:id', name: 'game-content', component: GameContent },
      { path: 'score/:id', component: ScoreBoard}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
