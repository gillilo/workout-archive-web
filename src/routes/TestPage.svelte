<script>
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  function gg() {
    condition = !condition
  }

  let condition = false
</script>

<button on:click={gg}>aa</button>

{#if condition}
  <div transition:slide={{ delay: 250, duration: 300, easing: quintOut }}>
    slides in and out horizontally
  </div>
{/if}