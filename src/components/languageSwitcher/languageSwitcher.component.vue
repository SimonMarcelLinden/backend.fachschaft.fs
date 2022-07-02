<template>
	<div class="locale-changer">
		<h1>{{$i18n.locale}}</h1>
		<!-- <select v-model="$i18n.locale" > -->
		<select id="switch-langauge" v-model="selectedLang" @change="switchSelect">
			<template v-for="(lang, i) in languages" :key="`Lang${i}`">
				<option :value="lang.value" selected>
					{{ $t(lang.title) }}
				</option>
			</template>
		</select>
	</div>
</template>

<script src="./languageSwitcher.component.ts"></script>
