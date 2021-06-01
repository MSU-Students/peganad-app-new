import { RouteConfig } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import Index from 'pages/Index.vue';
import Learn from 'pages/Learn.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index },
      { path: 'learn', component: Learn }
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
