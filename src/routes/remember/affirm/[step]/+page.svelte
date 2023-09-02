<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	export let data;

	let loading = false;

	$: affirm = $page.params.step === '2';

	$: console.log(affirm);
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
	<TextInput name="response" id="" placeholder={`Yes sir!`} isPrompt {loading} autocomplete="off" />
	<input type="number" name="index" value={data.check.index} hidden />
	{#if !loading}
		<div transition:fade={{ duration: 150 }}>
			<Button type="submit">Go!</Button>
		</div>
	{/if}
</form>
