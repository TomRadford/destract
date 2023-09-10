<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="text-center flex flex-col gap-4">
	<h1 class="font-semibold text-2xl">WOOPS! 💩</h1>
	<p class="font-extralight">
		{$page.error?.message}
	</p>
</div>
