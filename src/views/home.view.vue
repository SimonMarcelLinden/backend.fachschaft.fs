<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld :msg="$t('wellcome')" />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/helloWorld.component.vue' // @ is an alias to /src

@Options({
	components: {
		HelloWorld
	}
})
export default class HomeView extends Vue { }
</script>
