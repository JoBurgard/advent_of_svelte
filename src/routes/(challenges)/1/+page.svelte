<script lang="ts">
	import Fuse, { type FuseResult } from 'fuse.js';
	import { flip } from 'svelte/animate';
	import { backOut, linear, quartOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let { data } = $props();
	let results: FuseResult<(typeof data.children)[number]>[] = $state([]);
	let searchTerm = $state('');
	let fuzzySearch = $state(false);

	const fuse = new Fuse(data.children, {
		keys: ['name'],
		includeScore: true,
		shouldSort: true,
		useExtendedSearch: true,
	});

	function filterResults(term: string) {
		let search = term;

		if (!fuzzySearch) {
			search = '^' + search;
		}

		results = fuse.search(search);
	}

	$effect(() => {
		filterResults(searchTerm);
	});
</script>

<div class="flex items-center gap-6">
	<input class="input input-bordered" type="search" bind:value={searchTerm} />
	<div class="form-control">
		<label class="label flex cursor-pointer gap-4">
			<span class="label-text">Fuzzy Search</span>
			<input
				type="checkbox"
				class="toggle toggle-primary"
				bind:checked={fuzzySearch}
				on:change={() => filterResults(searchTerm)}
			/>
		</label>
	</div>
</div>
<div class="divider" />
<div class="flex flex-col gap-2">
	{#each results as result (result.refIndex)}
		{@const nice = result.item.tally >= 0}
		<!-- Flip animations do not seem to work yet in Svelte 5 -->
		<div
			class="flex gap-4 rounded-lg border border-neutral px-4 py-2"
			animate:flip={{ duration: 500, easing: quartOut }}
			in:fly={{ y: -10, easing: backOut, duration: 250 }}
			out:fly={{ y: -10, easing: linear, duration: 250 }}
		>
			<span>{result.item.name}</span>
			<div class="badge badge-outline ml-auto {nice ? 'badge-success' : 'badge-error'}">
				{nice ? 'Nice' : 'Naughty'}
			</div>
		</div>
	{:else}
		<!-- Tried this: {#if} {:else} {/if} -->
		<!-- Doesn't work correctly... -->
		{searchTerm ? 'Nothing found.' : 'Please search for a name.'}
	{/each}
</div>
