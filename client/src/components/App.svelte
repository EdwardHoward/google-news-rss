<script>
  import config from '../config';
  import { onMount } from "svelte";
  import Story from "./Story.svelte";
  import Search from "./Search.svelte";

  let stories;
  let query = "*";

  function getStories(query) {
    return fetch(`${config.apiUrl}?q=${query}`)
      .then(r => r.json())
      .then(data => {
        return data.sort((a, b) => {
          return (
            new Date(b.pubDate._text).getTime() -
            new Date(a.pubDate._text).getTime()
          );
        });
      });
  }

  async function loadStories() {
    stories = await getStories(query);
  }

  onMount(() => {
    loadStories();
  });
</script>

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  .container {
    padding: 1rem;
  }
</style>

<div class="container">
  <Search bind:value={query} on:search={loadStories} />
  <ul>
    {#if stories}
      {#each stories as story}
        <li>
          <Story
            link={story.link._text}
            title={story.title._text}
            pubDate={story.pubDate._text}
            source={story.source._text}>
            <div class="mt-2">
              {#if story.threads && story.threads.data.children.length > 0}
                {#each story.threads.data.children as thread}
                  {#if thread.data.num_comments > 0}
                    <Story
                      className="substory"
                      small={true}
                      commentCount={thread.data.num_comments}
                      title={thread.data.title}
                      link={`https://reddit.com${thread.data.permalink}`}
                      pubDate={thread.data.created_utc * 1000}
                      source={thread.data.subreddit} />
                  {/if}
                {/each}
              {/if}
            </div>
          </Story>
        </li>
      {/each}
    {/if}
  </ul>
</div>
