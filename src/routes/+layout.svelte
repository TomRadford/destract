<script lang="ts">
	import '../app.css';
	import { fade, fly, slide } from 'svelte/transition';
	import Logo from '$lib/components/nav/Logo.svelte';
	import { navigating, page } from '$app/stores';
	import { twMerge } from 'tailwind-merge';
	import { defaultGradient, gradients } from '$lib/constants/routes';
	import { crossfade } from '$lib/transitions/crossfade';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	export let data;
	let container: HTMLDivElement;
	let scrollY = 0;
	const [send, recieve] = crossfade;
	const key = 'bgTransition';
	$: currentBg = gradients[$page.route.id] || defaultGradient;
	const duration = 300;
</script>

<svelte:head>
	<title>destract ✨ {$page.error ? `ERROR ${$page.status}` : ''}</title>
</svelte:head>

<ProgressBar class="text-white" displayThresholdMs={200} />

<div
	class="text-white w-screen h-screen bg-transparent flex flex-col justify-center overflow-x-hidden"
	bind:this={container}
	on:scroll={() => (scrollY = container.scrollTop)}
>
	{#if data.user}
		<nav class="absolute top-0 p-4 flex justify-end w-screen px-10">
			<div class="flex flex-col text-right z-10">
				<span class="font-semibold">{data.user.username}</span>
				<a href="/me" class="text-sm font-light">not you?</a>
			</div>
		</nav>

		{#if scrollY !== 0}
			<div
				transition:fade
				class="fixed top-0 transition-all h-24 w-full bg-gradient-to-t from-transparent via-to-[rgba(0,0,0,5%)] to-[rgba(0,0,0,50%)]"
			/>
		{/if}
	{/if}
	<div class="h-1/2">
		<header class="w-screen flex justify-center mb-32">
			<Logo />
		</header>
		<div class="">
			{#key data.url}
				<main
					class="py-2 px-10 w-full pb-32"
					in:fly={{ x: -200, duration, delay: duration }}
					out:fly={{ x: 200, duration }}
				>
					<slot />
				</main>
			{/key}
		</div>
	</div>
</div>
<div
	class="animate-[grain_8s_steps(10)_infinite] fixed -left-[50%] -top-[110%] w-[300%] h-[300%] -z-[5] bg-[url('/noise-3.svg')] overflow-hidden"
/>
{#key data.url}
	<div
		out:send={{ key }}
		in:recieve={{ key }}
		class={twMerge(`-z-10 fixed inset-0  bg-gradient-to-b overflow-hidden`, currentBg)}
	/>
{/key}

<style lang="postcss">
	:global(html) {
		/* background-color: --background-color; */
	}
</style>
