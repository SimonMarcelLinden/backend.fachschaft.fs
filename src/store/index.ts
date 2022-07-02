import { createStore } from 'vuex'
import { RootState } from '@/store/rootState';

export default createStore<RootState>({
	state: {
		version: '1.0.0',
	},
	modules: {

	},
})
