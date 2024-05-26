<script>
  import { routines, getRoutine, getCalendarDate, loading } from '~/store/routine'
  import { onMount } from 'svelte'
  import Calendar from '../components/routine/Calendar.svelte'
  import RoutineCard from '../components/routine/RoutineCard.svelte'
  import RoutineAddCard from '../components/routine/RoutineAddCard.svelte'
  import Loader from '../components/Loader.svelte'

  onMount(async () => {
    let memberId = JSON.parse(localStorage.getItem('user')).id
    let planDate = getCalendarDate()
    await getRoutine({memberId, planDate})
	})
</script>


<div class="body">
  <Calendar />
  <div class="routine">
    {#if !$loading}
    {#each $routines as routine, idx (idx)}
    <RoutineCard {routine} {idx} />
    {/each}
    <RoutineAddCard />
    {:else}
    <Loader />
    {/if}
  </div>
</div>


<style lang="scss">
  .body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 100vw;
    gap: 20px;
    min-height: calc(100vh - 68px);
    .routine {
      flex-grow: 1;
      max-height: 500px;
      max-width: 50vw;
      overflow-x: scroll;
      display: flex;
      flex-direction: row;
      gap: 20px;

      &::-webkit-scrollbar {
        height: 8px;
        width: 8px;
        /* 스크롤바의 너비 */
      }

      &::-webkit-scrollbar-thumb {
        /* 스크롤바의 길이 */
        background: $color--primary;
        /* 스크롤바의 색상 */

        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        background: $color--area;
        /*스크롤바 뒷 배경 색상*/
      }

      .loader {
        span {
          color: $color--primary;
          font-weight: 5em;
        }
      }
    }
  }
</style>