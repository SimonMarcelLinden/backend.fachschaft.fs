import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import i18n from '@/i18n';
import store from '@/store';

import RouterLanguageView from "@/components/routerView/router-view.component.vue";
import HomeView from '@/views/home.view.vue'

const lang = localStorage.getItem('language') || 'en';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/:lang',
		component: RouterLanguageView,
		redirect: `/${lang}/home`,
		children: [
			{
				path: "home",
				name: "Home",
				component: HomeView,
				meta: {
					title: 'Home Page - Example App',
					metaTags: [
						{
							name: 'description',
							content: 'The home page of our example app.'
						},
						{
							property: 'og:description',
							content: 'The home page of our example app.'
						}
					]
				}
			},
			{
				path: "about",
				name: "about",
				component: () => import(/* webpackChunkName: "about" */ '@/views/about.view.vue'),
				meta: {
					title: 'About Page - Example App',
					metaTags: [
						{
							name: 'description',
							content: 'The about page of our example app.'
						},
						{
							property: 'og:description',
							content: 'The about page of our example app.'
						}
					]
				},
			}
		]
	},
	{
		path: "/:catchAll(.*)",
		redirect: `/${lang}/home`,
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	let language = to.params.lang;

	// @ts-ignore-next-line
	if (!["en", "de", 'fr'].includes(language)) return next("en");

	if (i18n.global.locale !== language) {
		// @ts-ignore-next-line
		i18n.global.locale = language;
	}

	const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
	// Find the nearest route element with meta tags.
	const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

	const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

	// If a route with a title was found, set the document (page) title to that value.
	if (nearestWithTitle) {
		// @ts-ignore-next-line
		document.title = nearestWithTitle.meta.title;
		// @ts-ignore-next-line
		// document.title = nearestWithTitle['meta']['title'];

	} else if (previousNearestWithMeta) {
		// @ts-ignore-next-line
		document.title = previousNearestWithMeta.meta.title;
	}

	// Remove any stale meta tags from the document using the key attribute we set below.
	// @ts-ignore-next-line
	Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

	// Skip rendering meta tags if there are none.
	if (!nearestWithMeta) return next();

	// Turn the meta tag definitions into actual elements in the head.
	// @ts-ignore-next-line
	nearestWithMeta.meta.metaTags.map(tagDef => {
		const tag = document.createElement('meta');

		Object.keys(tagDef).forEach(key => {
			tag.setAttribute(key, tagDef[key]);
		});

		// We use this to track which meta tags we create so we don't interfere with other ones.
		// tag.setAttribute('data-vue-router-controlled', '');

		return tag;
	})

	// Add the meta tags to the document head.
	// @ts-ignore-next-line
	.forEach(tag => document.head.appendChild(tag));

	next();
})

export default router
