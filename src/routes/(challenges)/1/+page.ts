import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const result = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
	const children: Promise<Array<{ name: string; tally: number }>> = result.json();

	return { children };
}) satisfies PageLoad;
