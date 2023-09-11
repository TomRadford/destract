<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	onMount(() => {
		if ($page.error?.message === 'Naughty! You need to answer the questions first! 🫢') {
			setTimeout(async () => {
				await goto('/remember');
			}, 3000);
		}
	});
</script>

<div class="text-center flex flex-col gap-4">
	<h1 class="font-semibold text-2xl">WOOPS! 💩</h1>
	{#if $page.status === 404}
		<span class="font-extralight">
			<p>Hmmm...</p>
			<p>I can't seem to find that page 🤷‍♂️</p>
		</span>
	{:else}
		<p class="font-extralight">
			{$page.error?.message}
		</p>
	{/if}
</div>
