<script lang="ts">
	export let up = true;
</script>

<button
	on:click
	class={`transition-[transform] duration-200 ease-in-out ${up ? `` : `rotate-180`}`}
>
	<svg width="28" height="13" viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M25.924 10.6546L13.7764 3.25592L1.94016 9.76783"
			stroke="white"
			stroke-opacity="0.65"
			stroke-width="5"
		/>
	</svg>
</button>
