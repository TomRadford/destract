<script lang="ts" generics="T extends 'submit' | 'reset' | 'button' | 'link'">
	// import { createEventDispatcher } from 'svelte';
	import TadpoleLoader from '$lib/icons/TadpoleLoader.svelte';
	import { fade } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	export let href: T extends 'link' ? string : undefined;
	export let type: T;
	/**
	 * For loading animation
	 */
	export let loading = false;
	export let className = '';

	//ToDo Revisit
	// const dispatch = createEventDispatcher<{click: T extends 'button' ? () => void : undefined}>()
	// const onClick = (clickHandler: T extends 'button' ? () => void : undefined) :void => {
	// 	dispatch('click', clickHandler)
	// }
	const style = `text-center relative bg-white bg-opacity-30 w-max text-black text-opacity-50 text-2xl font-medium min-w-[16rem] rounded-3xl py-3 hover:bg-opacity-50 transition-all duration-400 h-14`;
</script>

<!-- 
	@component
	Universal button for the application
	
 -->

{#if type !== 'link'}
	<button class={twMerge(style, className)} {type} on:click>
		<div class="px-10">
			<slot />
		</div>
		{#if loading}
			<div transition:fade={{ duration: 400 }}>
				<TadpoleLoader classProp="absolute right-3 top-0 h-full opacity-30" />
			</div>
		{/if}
	</button>
{:else}
	<a {href}>
		<div class={twMerge(style, className)}>
			<div class="px-10">
				<slot />
			</div>
		</div>
	</a>
{/if}
