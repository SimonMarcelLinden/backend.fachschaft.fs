<template>
	<nav>
		<router-link :to="'/' + $i18n.locale + '/home'">Home</router-link> |
		<router-link :to="'/' + $i18n.locale + '/about'">About</router-link>
	</nav>

	<languageSwitcher />

	<RouterView />
</template>


<script src="./app.view.ts"></script>
<style src="./app.view.scss" lang="scss"/>
