import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import i18n from '@/i18n';
import store from '@/store';

import RouterLanguageView from "@/components/routerView/router-view.component.vue";
import HomeView from '@/views/home.view.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/:lang',
		component: RouterLanguageView,
		redirect: "/en/home",
		children: [
			{
				path: "home",
				name: "Home",
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: HomeView,
			},
			{
				path: "about",
				name: "about",
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "about" */ '@/views/about.view.vue')
			}
		]
	},
	{
		path: "/:catchAll(.*)",
		redirect: "/en/home"
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to: any, from: any, next: any) => {
	let language = to.params.lang;

	if (!["en", "de", 'fr'].includes(language)) return next("en");

	if (i18n.global.locale !== language) {
		i18n.global.locale = language;
	}

	// console.log(to);
	// console.log(store.getters['language/getLanguage'])
	// console.log(localStorage.getItem('language'));
	return next();
});

export default router
