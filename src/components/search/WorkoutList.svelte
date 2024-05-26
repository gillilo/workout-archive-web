<script>
  import { workouts, loading, message, searchParams, moreWorkouts } from '~/store/workouts'
  import WorkoutCard from './WorkoutCard.svelte'
  import Loader from '../Loader.svelte'

  function loadhMore() {
    const params = $searchParams
    params.offset = params.offset += 10
    console.log(params)
    moreWorkouts(params)
  }
</script>

<div class="workout-list">
  <div class="movies">
    {#each $workouts as workout, i (i)}
      <WorkoutCard {workout} />
    {/each}
  </div>
  {#if $loading}
    <Loader />
  {/if}
  <div class="message">
    {$message}
  </div>
</div>
{#if $workouts != ''}
  <button 
    class="loadmore"
    on:click={loadhMore}>
    Load More
  </button>
{/if}
<style lang="scss">
  .workout-list {
    margin-top: 30px;
    padding: 10px;
    background-color: $color--area;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
    .message {
      color: $color--primary;
      font-size: 20px;
      text-align: center;
    }
    .movies {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  .loadmore {
    margin-top: 20px;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    background-color: $color--primary;
    font-weight: 700;
    color: $color--white;
    outline: none;
    transition: .4s;
    @media #{$mobile} {
      grid-column: 1 / -1;
    }
    &:hover {
      background-color: lighten($color--primary, 10%);
    }
  }
</style>