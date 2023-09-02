<script lang="ts">
	import TadpoleLoader from '$lib/icons/TadpoleLoader.svelte';
	import { fade } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	export let name: string | undefined;
	export let value: string = '';
	export let id: string | undefined;
	export let classProp: string = '';
	export let required = false;
	export let placeholder: string | undefined = '';
	export let disabled = false;
	export let isPrompt = false;
	export let autocomplete = 'on';
	export let loading = false;
</script>

<div class={twMerge('w-full flex justify-center relative max-w-3xl')}>
	<input
		{name}
		{disabled}
		class={twMerge(
			classProp,
			'bg-transparent placeholder:text-white placeholder:text-opacity-50 w-full',
			isPrompt &&
				'text-2xl border-solid border-[1px] text-center border-white border-opacity-30 rounded-xl py-1 focus:border-opacity-50 focus:outline-none'
		)}
		type="text"
		{value}
		{id}
		{required}
		{placeholder}
		{autocomplete}
	/>
	{#if loading}
		<div transition:fade={{ duration: 400 }}>
			<TadpoleLoader classProp="absolute right-3 top-0 h-full opacity-30" fill="#ffff" />
		</div>
	{/if}
</div>
