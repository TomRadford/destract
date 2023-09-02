<script lang="ts">
	import { fade } from 'svelte/transition';

	export let data;
	const getMotivation = async () => {
		const res = await fetch('/api/motivation');
		return res.json();
	};
</script>

<div class="flex flex-col items-center h-full gap-96">
	<h1 class="text-4xl font-bold text-center">{data.thoughtContent}</h1>
	{#await getMotivation() then motivation}
		<p transition:fade class=" font-thin flex-1">
			{motivation}
		</p>
	{/await}
</div>
