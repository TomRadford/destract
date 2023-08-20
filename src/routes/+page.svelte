<script lang="ts">
	import Arrow from '$lib/components/Arrow.svelte';
	import Button from '$lib/components/Button.svelte';
	import { fade, fly } from 'svelte/transition';

	let forget = true;
	const duration = 300;
</script>

<div class=" flex flex-col items-center">
	<div class="flex gap-2 relative">
		<div class="text-4xl flex align-middle">
			I
			<div class="w-24 h-10 overflow-hidden">
				{#key forget}
					<div
						in:fly={{ duration, delay: duration, y: 100 }}
						out:fly={{ duration, y: -100 }}
						class="font-bold w-full text-center"
					>
						{#if forget} have {:else} had {/if}
					</div>
				{/key}
			</div>
			a thought
		</div>
		<Arrow up={forget} on:click={() => (forget = !forget)} />
	</div>

	<div class="mt-24">
		<Button type="link" href={forget ? `/forget` : `/remember`}
			>{#key forget}
				<div in:fade={{ duration, delay: duration }} out:fade={{ duration }}>
					{#if forget}
						forget
					{:else}
						remember
					{/if}
				</div>
			{/key}</Button
		>
	</div>
</div>
