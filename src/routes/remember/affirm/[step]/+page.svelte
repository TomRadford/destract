<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { fade, slide } from 'svelte/transition';
	import { navigating, page } from '$app/stores';
	import { getRandom } from '$lib/utils/random.js';
	import { answerHints } from '$lib/constants/answerHints.js';
	export let data;
	export let form;

	let loading = false;

	const duration = 300;
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
	<div class="text-center font-bold text-4xl">{data.check.message}</div>
	<TextInput
		name="response"
		id=""
		placeholder={getRandom(answerHints)}
		isPrompt
		{loading}
		autocomplete="off"
	/>
	<input type="number" name="index" value={data.check.index} hidden />
	{#if form?.error?.message === 'uncertain'}
		<span transition:slide={{ duration }} class="text-center">
			<h3 class="font-semibold text-2xl mb-4">
				I'm not too sure what you said there, please try again 🙏
			</h3>
		</span>
	{/if}
	<div class="h-20">
		{#if !loading && !$navigating}
			<div transition:fade={{ duration: 150, delay: 100 }}>
				<Button type="submit">Go!</Button>
			</div>
		{/if}
	</div>
</form>
