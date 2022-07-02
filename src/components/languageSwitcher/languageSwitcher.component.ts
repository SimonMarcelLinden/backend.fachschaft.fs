import { Vue } from 'vue-class-component'
import store from '@/store';
import router from '@/router';

export default class LanguageSwitcher extends Vue {
	private selectedLang: string = 'en';

	private languages: {} =  [
		{
			title: 'languages.english.singular',
			value: 'en',
		},
		{
			title: 'languages.german.singular',
			value: 'de',
		},
		{
			title: 'languages.france.singular',
			value: 'fr',
		},
	];

	public mounted(): void {
		this.selectedLang = localStorage.getItem('language') || 'en';
	}

	private switchSelect(event: Event) {
		localStorage.setItem('language', this.selectedLang);
		this.$router.push(`/${this.selectedLang}/home`);
	}
}
