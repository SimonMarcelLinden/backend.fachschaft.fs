import { Options, Vue } from 'vue-class-component'
import LanguageSwitcher from '@/components/languageSwitcher/languageSwitcher.component.vue' // @ is an alias to /src

@Options({
	components: {
		LanguageSwitcher
	}
})
export default class App extends Vue {}
