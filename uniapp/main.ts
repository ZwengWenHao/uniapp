import { createSSRApp } from 'vue';
import App from './App.vue';
import * as Pinia from 'pinia';
import ceptor from './http/ceptor';
export function createApp() {
	const app = createSSRApp(App);
	app.use(ceptor).use(Pinia.createPinia());
	return {
		app,
		Pinia,
	}
}