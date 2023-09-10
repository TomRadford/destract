<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	export let data;
</script>

<div class="flex flex-col items-center">
	<div class="">
		<h1 class="font-bold text-4xl text-center">Shweet! What would you like to remember?</h1>
		<p class="text-right font-extralight">...remember, once you remember, I’ll forget 😌</p>
	</div>
	<ul class="mt-4 flex flex-col w-96 items-center gap-3">
		{#each data.thoughts as thought}
			<Button className="text-opacity-100" type="link" href="/remember/{thought.id}"
				>{thought.hint}</Button
			>
		{/each}
	</ul>
</div>
