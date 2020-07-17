<script>
  import format from "date-fns/format";

  export let link;
  export let title;
  export let pubDate;
  export let source;
  export let small = false;
  export let className = "";
  export let commentCount;
</script>

<article class={className}>
  <a href={link} rel="noopener" target="_blank">
    {#if small}
      <h3 class="mt-0">{title}</h3>
    {:else}
      <h2 class="mt-0">{title}</h2>
    {/if}

    <div class="d-flex justify-space-between">
      <small>{format(new Date(pubDate), 'MMM d, h:mm a')}</small>
      <div>
        <small>{source}</small>
        {#if commentCount !== null && commentCount !== undefined}
        <small> - </small>
          <small>{commentCount} comments</small>
        {/if}
      </div>
    </div>
  </a>
  <slot>
  </slot>
</article>
