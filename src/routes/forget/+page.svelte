<script>
	import { enhance } from '$app/forms';
	import { navigating } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { fade } from 'svelte/transition';
	let loading = false;
</script>

<form
	method="POST"
	class="flex flex-col gap-24 w-full items-center"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update({ reset: false });
			loading = false;
		};
	}}
>
	<div class=" text-center font-bold text-4xl">What do you want to remember later?</div>
	<TextInput
		name="thought"
		id=""
		placeholder={`A thing that's drawing me away from the now 🕳️`}
		isPrompt
		{loading}
		autocomplete="off"
	/>
	<div class="h-20">
		{#if !loading && !$navigating}
			<div transition:fade={{ duration: 150, delay: 100 }}>
				<Button type="submit">Forget!</Button>
			</div>
		{/if}
	</div>
</form>
