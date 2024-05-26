<script>
  import _upperFirst from 'lodash/upperFirst'
  import { theWorkout } from '~/store/workouts'
  import { Modals, closeModal, openModal } from 'svelte-modals'
	import { fade } from 'svelte/transition'
	import Workout from './Workout.svelte'
  import Alert from '../Alert.svelte'

  export let workout
  function clickWorkout() {
    theWorkout.set(workout)
    openModal(Workout, { 
			openAlert: () => {
				openModal(Alert, {
          message: 'Already added to bookmarks',
          closeFuntion: closeModal
        })
			}
		})
  }
</script>
<div 
  on:click={clickWorkout}
  class="workout">
  <div class="info">
    <div>
      <div class="name">
        {workout.name}
      </div>
      <div class="discription">
        <span class="muscle">{_upperFirst(workout.muscle)}</span>
        <span class="dot">▪</span>
        <span class="equipment">{_upperFirst(workout.equipment)}</span>
        <span class="dot">▪</span>
        <span class="difficulty">{_upperFirst(workout.difficulty)}</span>
        <span class="dot">▪</span>
        <span class="type">{_upperFirst(workout.type)}</span>
      </div>
    </div>
    <div class="instructions">{workout.instructions}</div>
  </div>
</div>

<Modals>
  <div
    slot="backdrop"
    class="backdrop"
		transition:fade
    on:click={closeModal}
  />
</Modals>

<style lang="scss">
  .workout {
    padding: 10px 20px;
    display: block;
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans', sans-serif;
    color: $color--black;
    margin: 10px;
    border-radius: 6px;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    text-align: justify;
    margin: 10px;
    transition: .1s;
    &:hover {
      background-color: $color--white-90;
    }
    .info {
      div {
        @media #{$tablet} {
          margin-bottom: 5px;
        }
        @media #{$mobile} {
          margin-bottom: 0;
        }
        .name {
          display: inline-block;
          font-size: 1.4rem;
          color: $color--primary;
          font-weight: 600;
        }
        .discription {
          font-size: 1rem;
          color: $color--black;
          @media #{$tablet} {
            display: inline-block;
            margin-left: 15px;
          }
          @media #{$mobile} {
            display: block;
            margin-left: 0;
            margin-bottom: 5px;
          }
          .dot {
            color: $color--primary;
          }
        }
      }
      .instructions {
        font-size: 0.85rem;
      }
    }
  }
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: $color--white;
  }
</style>