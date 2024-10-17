import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
import sveltePreprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	preprocess: vitePreprocess(),
  };