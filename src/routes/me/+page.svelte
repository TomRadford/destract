<script lang="ts">
	import { enhance } from '$app/forms';
	import TextInput from '$lib/components/TextInput.svelte';
	import Input from '$lib/components/TextInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { ActionData, PageData } from './$types.js';
	import { fade, fly, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { error } from '@sveltejs/kit';

	export let data: PageData;
	export let form: ActionData;

	let value = data.user.username;
	let loading = false;

	const duration = 600;

	$: console.log(form);
	$: console.log(data);
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
	<TextInput
		placeholder="Your username"
		id=""
		name="username"
		{value}
		classProp="text-2xl sm:text-4xl font-semibold text-center"
		required
		disabled={form?.success}
	/>
	<input name="id" value={data.user?.id} hidden />
	{#if form?.error?.message === 'no-user'}
		<span in:slide={{ duration }} out:slide={{ duration }} class="text-center">
			<h3 class="font-semibold text-2xl mb-4">That account does not exist...</h3>
			<p>If you don't have an account, use:</p>
			<p><span class="font-semibold">{data.user.username}</span> as your username!</p>
			<p class="font-italic mt-4">{form?.error?.reminder}</p>
		</span>
	{/if}

	{#if form?.success}
		<div
			class="font-medium text-2xl flex flex-col text-center sm:text-right"
			in:fly={{ duration, delay: duration, x: -100 }}
			out:fly={{ duration, x: 100 }}
		>
			<p class="pr-4">Welcome back {form.username.split(' ')[0]}...</p>
			<p in:fade={{ delay: duration + 700 }} out:fade class="font-light">
				...now go <a href="/" class="font-semibold">forget!</a>
			</p>
		</div>
	{:else}
		<div in:fade={{ delay: duration, duration }} out:fade={{ duration }}>
			<Button type="submit" {loading}>Remember me</Button>
		</div>
	{/if}
</form>
