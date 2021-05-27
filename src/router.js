import { createRouter, createWebHistory } from 'vue-router';

import store from './store';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistation from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
// import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';

const CoachDetail = () => {
  import('./pages/coaches/CoachDetail.vue');
};

const CoachRegistation = () => {
  import('./pages/coaches/CoachRegistration.vue');
};
const ContactCoach = () => {
  import('./pages/requests/ContactCoach.vue');
};
const RequestsReceived = () => {
  import('./pages/requests/RequestsReceived.vue');
};
const UserAuth = () => {
  import('./pages/auth/UserAuth.vue');
};
const NotFound = () => {
  import('./pages/NotFound.vue');
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach } // /coaches/c1/contact
      ]
    },
    {
      path: '/register',
      component: CoachRegistation,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
