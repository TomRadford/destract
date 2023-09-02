<script>
	import { fade } from 'svelte/transition';
</script>

<div class="flex w-full justify-center">
	<div class="font-bold text-center w-max">
		<h1 class="text-4xl">Looks like you have nothing to remember 🍃</h1>
		<p class="text-sm font-thin text-right mr-4" in:fade={{ duration: 300, delay: 1000 }}>
			bye bye...
		</p>
	</div>
</div>
