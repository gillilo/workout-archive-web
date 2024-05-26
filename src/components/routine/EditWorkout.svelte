<script>
  import { closeAllModals } from 'svelte-modals'
  import { fly } from 'svelte/transition'
  import { 
    editRoutineDtls,
    addEditRoutineDtls,
    updateWorkout,
    getRoutine,
    removeEditRoutineDtls,
    loading
  } from '~/store/routine'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
  import Loader from '../Loader.svelte'

  export let routine
  let id = routine.id
  let mstSeq = routine.mstSeq
  let workoutName = routine.name
  let planDate = routine.planDate
  let routineDtls = routine.routineDtls

  onMount(async () => {
    editRoutineDtls.set(routineDtls)
	})
  
  async function change() {
    const memberId = JSON.parse(localStorage.getItem("user")).id
    const payload = {
      id,
      memberId,
      planDate,
      workoutName,
      mstSeq,
      dtls: $editRoutineDtls
    }
    await updateWorkout(payload)
    await getRoutine(payload)
    closeAllModals()
  }

  function addSet() {
    addEditRoutineDtls({
      id: null,
      setNumber: routineDtls.length+1,
      weight: 0,
      targetCount: 0,
      actualCount: 0,
      done: false,
    })
  }

  function closeModal(e) {
    try {
      if (e.target.className.includes('modal-body')) closeAllModals()
    } catch (error) {}
  }

  function removeSet(i) {
    removeEditRoutineDtls(i)
  }
</script>

<div class="modal-body" on:click={closeModal} transition:fly={{duration: 100}}>
  <div class="contents">
    {#if !$loading}
    <div class="modal-title">Edit Workout</div>
    <div class="modal-content">
      <div class="name">
        <input type="text" placeholder="Workout Name" bind:value={workoutName}>
      </div>
      <div class="dtls">
        <div class="set-div-head">
          <span>Weight (Kg)</span>
          <span>Target Reps</span>
          <span>Actual Reps</span>
        </div>
        {#each $editRoutineDtls as d, i}
        <div class="set-div">
          <input type="hidden" bind:value={d.setNumber}>
          <input type="number" min="0" placeholder="Weight (Kg)" bind:value={d.weight}>
          <input type="number" min="1" placeholder="Target Reps" bind:value={d.targetCount}>
          <input type="number" min="1" placeholder="Actual Reps" bind:value={d.actualCount}>
          <button on:click={() => removeSet(i)}><Fa icon={faTrashCan} fw/></button>
        </div>
        {/each}
      </div>
      <div class="modal-footer">
        <input type="button" value="Add set" on:click={addSet}>
        <input type="button" value="Edit workout" on:click={change}>
      </div>
    </div>
    {:else}
    <Loader />
    {/if}
  </div>
</div>

<style lang="scss">
  .modal-body {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100vh;
    min-width: 100vw;
    background-color: $color--white;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    .contents {
      z-index: 10;
      background-color: $color--area;
      padding: 50px;
      border-radius: 15px;
      .modal-title {
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
        font-size: 1.2em;
        font-weight: 500;
      }
      .modal-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .name {
          input {
            width: 100%;
            padding: 5px;
            box-sizing: border-box;
            box-shadow: none;
            outline: none;
            transition: .4s;
            text-align: center;
            border-radius: 15px;
            background-color: $color--white;
            border: 2px solid $color--area;
            font-size: 1.1em;
            &:hover {
              background-color: $color--white;
              border: 2px solid $color--primary;
            }
            &:focus {
              background-color: $color--white;
              border: 2px solid $color--primary;
            }
          }
        }
        .dtls {
          .set-div {
            display: flex;
            gap: 10px;
            input, button {
              padding: 5px;
              box-sizing: border-box;
              box-shadow: none;
              outline: none;
              transition: .4s;
              text-align: center;
              border-radius: 15px;
              background-color: $color--white;
              border: 2px solid $color--area;
              font-size: 1.1em;
              &:hover {
                background-color: $color--white;
                border: 2px solid $color--primary;
              }
              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
            }
            input {
              &:focus {
                background-color: $color--white;
                border: 2px solid $color--primary;
              }
            }
            button {
              cursor: pointer;
            }
          }
          .set-div-head {
            display: flex;
            gap: 10px;
            span {
              padding: 5px;
              box-sizing: border-box;
              box-shadow: none;
              outline: none;
              transition: .4s;
              text-align: center;
              border-radius: 15px;
              background-color: $color--area;
              border: 2px solid $color--area;
              font-weight: 500;
              flex-grow: 1;
            }
          }
        }
      }
      .modal-footer {
        display: flex;
        flex-direction: column;
        gap: 10px;
        input {
          width: 100%;
          padding: 5px;
          box-sizing: border-box;
          box-shadow: none;
          outline: none;
          transition: .4s;
          text-align: center;
          border-radius: 15px;
          background-color: $color--primary;
          color: $color--white;
          border: none;
          font-size: 1.1em;
          cursor: pointer;
          &:hover {
            background-color: lighten($color--primary, 10%);
          }
        }
      }
    }
  }
</style>