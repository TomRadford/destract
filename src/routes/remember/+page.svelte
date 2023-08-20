<script lang="ts">
	import { enhance } from '$app/forms';
	import TextInput from '$lib/components/TextInput.svelte';
	export let data
	let loading = false

</script>

<form method="POST" class="flex flex-col gap-24 w-full items-center" use:enhance={() => {
	loading = true
	return async ({update}) => {
		await update({reset: false})
		loading = false
	}}}>
	<div class=" text-center font-bold text-4xl">{data.check.message}</div>
	<TextInput name="response" id="" placeholder={`Yes sir!`} isPrompt {loading} autocomplete="off" />
	=Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nesciunt tempore commodi eius labore voluptatum mollitia, laboriosam temporibus vero cum ad facere eum beatae est voluptatibus maiores at numquam ipsa?
</form>