<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="max-w-lg">
	<h1 class="mb-8 text-xl font-bold">Day #{$page.route.id!.split("/").slice(-1)}</h1>
	<slot />
</section>
