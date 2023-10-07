<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import { fade } from 'svelte/transition';
	let loading = false;
	export let form: FormData;

	const duration = 600;

	$: console.log(loading);
</script>

<form
	method="POST"
	class="flex flex-col gap-24 w-full items-center"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<div class="items-center text-center">
		<h1 class="font-semibold text-3xl mb-4">
			Get ready to forget! <span class=" animate-[fadein_1s_ease-in-out]">✨</span>
		</h1>
		<p class=" text-xl">
			Use the power of ai magic to <strong>destract</strong> yourself with ai-powered emojis 🤓
		</p>
	</div>
	<div class=" flex flex-wrap justify-center gap-4">
		<Button type="link" href="/login/return">Login</Button>
		<Button type="submit" {loading}>Join</Button>
	</div>
	<div class="text-center bg-white/20 px-10 py-4 rounded-2xl">
		<p class="font-semibold">Confused?</p>
		<p>Click join, get a cool username (don't loose it!) and start forgetting!</p>
	</div>
</form>
