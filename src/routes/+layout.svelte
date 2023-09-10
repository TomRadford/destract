<script lang="ts">
	import '../app.css';
	import { fade, fly, slide } from 'svelte/transition';
	import Logo from '$lib/components/nav/Logo.svelte';
	import { navigating, page } from '$app/stores';
	import { twMerge } from 'tailwind-merge';
	import { defaultGradient, gradients } from '$lib/constants/routes';
	import { crossfade } from '$lib/transitions/crossfade';
	export let data;
	const [send, recieve] = crossfade;
	const key = 'bgTransition';
	$: currentBg = gradients[$page.route.id] || defaultGradient;
	const duration = 300;
</script>

<svelte:head>
	<title>destract ✨</title>
</svelte:head>

<div class="relative text-white w-screen h-screen bg-transparent flex flex-col justify-center">
	<nav class="absolute top-4 flex justify-end w-screen px-10">
		<div class="flex flex-col text-right">
			<span class="font-semibold">{data.user.username}</span>
			<a href="/me" class="text-sm font-light">not you?</a>
		</div>
	</nav>
	<div class="h-1/2">
		<header class="w-screen flex justify-center mb-32">
			<Logo />
		</header>
		<div class="">
			{#key data.url}
				<main
					class="py-2 px-10 w-full"
					in:fly={{ x: -200, duration, delay: duration }}
					out:fly={{ x: 200, duration }}
				>
					<slot />
				</main>
			{/key}
		</div>
	</div>

	<div class="animate-[grain_8s_steps(10)_infinite] absolute -left-[50%] -top-[110%] w-[300%] h-[300%] overflow-visible -z-[5] bg-[url('noise-3.svg')]"></div>

	{#key data.url}
		<div
			out:send={{ key }}
			in:recieve={{ key }}
			class={twMerge(`-z-10  absolute inset-0  bg-gradient-to-b`, currentBg)}
		/>
	{/key}
</div>

<style lang="postcss">
	:global(html) {
		/* background-color: --background-color; */
	}
</style>
