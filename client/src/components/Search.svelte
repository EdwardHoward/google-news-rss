<script>
  import { createEventDispatcher } from "svelte";
  export let value = "";

  const dispatch = createEventDispatcher();

  const search = () => dispatch("search");

  function handleEnter(e) {
    if (e.which === 13) {
      search();
    }
  }
</script>

<div class="text-right">
  <input bind:value on:keydown={handleEnter} placeholder="Search..." />
  <button on:click={search}>Search</button>
</div>
