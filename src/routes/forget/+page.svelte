<script>
	import { enhance } from '$app/forms';
	import TextInput from '$lib/components/TextInput.svelte';
	let loading = false;
</script>

<form
	method="POST"
	class="flex flex-col gap-24 w-full items-center"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update({ reset: false });
			loading = false;
		};
	}}
>
	<div class=" text-center font-bold text-4xl">What do you want to remember later?</div>
	<TextInput
		name="thought"
		id=""
		placeholder={`A thing that's drawing me away from the now 🕳️`}
		isPrompt
		{loading}
		autocomplete="off"
	/>
</form>
