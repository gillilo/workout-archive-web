<script>
  import SearchTool from "~/components/search/SearchTool.svelte"
  import WorkoutList from "~/components/search/WorkoutList.svelte"
  import Workout from "~/components/search/Workout.svelte"
  import { initWorkouts, theWorkout } from '~/store/workouts'

  initWorkouts()
</script>

<div class="container">
  <SearchTool />
  {#if $theWorkout.name != undefined}
    <Workout />
  {/if}
  <WorkoutList />
</div>

<style lang="scss"></style>