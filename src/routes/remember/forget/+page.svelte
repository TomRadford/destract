<script>
	import { fade, fly } from 'svelte/transition';
</script>

<div class="text-center flex flex-col gap-4">
	<h1 class="font-bold text-4xl">Got it! Let's refocus then.</h1>
	<h3 in:fade={{ delay: 1200 }} class="relative text-2xl font-semibold">
		Remember, your goals are important ⚡️
	</h3>
	<p in:fade={{ delay: 2000 }} class=" font-light text-xl">
		Stay on track and conquer those tasks! 💪
	</p>
</div>
