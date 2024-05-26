<script>
  import _upperFirst from 'lodash/upperFirst'
  import { theWorkout, workoutList } from '~/store/workouts'
  import Footer from "~/components/Footer.svelte"
  import { closeAllModals } from 'svelte-modals'
  import Fa from 'svelte-fa'
  import { 
    faTrashCan,
  } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  onMount(() => {
    closeAllModals()
    workoutList.set(JSON.parse(localStorage.getItem('bookmark')))
    if($workoutList) theWorkout.set($workoutList[0])
  })

  function clickWorkout(i) {
    theWorkout.set($workoutList[i])
  }

  function removeBookmarkItem(i) {
    console.log($workoutList[i])
    const arr = $workoutList
    const newArr = arr.filter(a => a.id != $workoutList[i].id)
    workoutList.set(newArr)
    localStorage.setItem('bookmark', JSON.stringify(newArr))
  }
</script>

{#if $workoutList}
  <div class="bookmark">
    <div class="bookmarks bookmark-list">
        {#each $workoutList as w, i (i) }
          <div class="workout-names" on:click={() => {clickWorkout(i)}}>
            <span>{w.name}</span>
            <span on:click={() => removeBookmarkItem(i)}>
              <Fa icon={faTrashCan} fw />
            </span>
          </div>
        {/each}
    </div>
    <div class="bookmarks bookmark-info">
      <div class="workout-name">
        {$theWorkout.name}
      </div>
      <div class="workout-info">
        <span class="muscle">{_upperFirst($theWorkout.muscle)}</span>
        <span class="dot">▪</span>
        <span class="equipment">{_upperFirst($theWorkout.equipment)}</span>
        <span class="dot">▪</span>
        <span class="difficulty">{_upperFirst($theWorkout.difficulty)}</span>
        <span class="dot">▪</span>
        <span class="type">{_upperFirst($theWorkout.type)}</span>
      </div>
      <div class="imagesSpan">Images</div>
      <div class="workout-images">
        <img src="/assets/a1.jpg" alt=" ">
        <img src="/assets/a2.jpg" alt=" ">
      </div>
      <div class="instructionSpan">instructions</div>
      <div class="workout-instruction">
        {$theWorkout.instructions}
      </div>
    </div>
  </div>
{:else}
<div class="error-page">
  <div class="status">No Data!</div>
  <div class="status-text">Add workouts for bookmarks</div>
</div>
<Footer />
{/if}

<style lang="scss">
  .bookmark {
    font-family: 'Noto Sans', sans-serif;
    display: flex;
    max-height: calc(100vh - 68px);
    @media #{$mobile} {
      max-height: calc(100vh - 56px);
    }
    .bookmark-list {
      min-width: 200px;
      flex-shrink: 0;
      padding: 5px;
      border-radius: 5px;
      overflow-y: scroll;
    }
    .bookmark-info {
      flex: 1;
      overflow-y: scroll;
      padding: 0 20px 0 5px;
    }
    .bookmarks {
      .workout-names {
        font-size: 14px;
        padding: 5px;
        transition: .2s;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
        span {
          cursor: pointer;
          &:hover {
            color: $color--primary;
          }
        }
      }
      .workout-name{
        font-size: 30px;
        font-weight: 600;
      }
      .workout-info{
        font-size: 20px;
        color: $color--primary;
      }
      .imagesSpan {
        font-size: 12px;
        color: $color--black-80;
        margin-top: 20px;
      }
      .workout-images {
        display: flex;
        img {
          flex: 1;
          width: 40%;
        }
      }
      .instructionSpan {
        font-size: 12px;
        color: $color--black-80;
        margin-top: 20px;
      }
      .workout-instruction {
        text-align: justify;
      }
    }
    .bookmarks::-webkit-scrollbar {
      width: 8px;
    }
    .bookmarks::-webkit-scrollbar-thumb {
      height: 30%;
      background: $color--primary;
      border-radius: 10px;
    }
    .bookmarks::-webkit-scrollbar-track {
      background: $color--white;
    }
  }
  
  .error-page {
    line-height: 1.2;
    text-align: center;
    font-family: 'Noto Sans', sans-serif;
    padding: 80px 20px;
    .status {
      font-size: 160px;
      color: $color--primary;
    }
    .status-text {
      font-size: 50px;
    }
  }
</style>
