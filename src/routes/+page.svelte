<script lang="ts">
</script>

<div>
	{#each new Array(24) as _, index}
		<h2 class="text-xl font-bold"><a href="/{index + 1}">Day #{index + 1}</a></h2>
	{/each}
</div>
