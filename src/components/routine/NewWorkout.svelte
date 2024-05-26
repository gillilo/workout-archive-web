<script>
  import { closeAllModals } from 'svelte-modals'
  import { fly } from 'svelte/transition'
  import { 
    newDtls, 
    addNewDtls, 
    createWorkout, 
    routines, 
    getCalendarDate,
    getRoutine,
    initNewDtls,
    removeDtl,
    loading
  } from '~/store/routine'
  import { push } from 'svelte-spa-router'
  import { 
    autoCompString,
    getAutoCompString,
    autoCompBookmark,
  } from '~/store/utils'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'
  import { faClose, faTrashCan } from '@fortawesome/free-solid-svg-icons'
  import Loader from '../Loader.svelte'

  function closeModal(e) {
    try {
      if (e.target.className.includes('modal-body')) closeAllModals()
    } catch (error) {
      // console.log(error)
      // closeBtn error...
    }
  }

  // let id // only null
  let mstSeq
  // let workoutName = ''
  // let planDate // default setting
  // let routineDtls // id, setNumber, weight, targetCount
  async function create() {
    const memberId = JSON.parse(localStorage.getItem('user')).id
    let planDate = getCalendarDate()
    let dtls = $newDtls
    mstSeq = $routines.length + 1
    const payload = {
      memberId,
      planDate,
      workoutName: getAutoCompString(),
      mstSeq,
      dtls
    }
    await createWorkout(payload)
    await getRoutine(payload)
    autoCompString.set('')
    closeAllModals()
  }

  function addSet() {
    addNewDtls()
  }

  onMount(() => {
    autoCompBookmark.set(JSON.parse(localStorage.getItem("bookmark")))
    initNewDtls()
    autoCompString.set('')
  })
  function setWorkoutName(e) {
    autoCompString.set(e.target.innerText)
    bookmarkCondition = false
  }

  let bookmarkCondition = false
  function openBookmark() {
    bookmarkCondition = true
  }

  function goSearch() {
    bookmarkCondition = !bookmarkCondition
    closeAllModals()
    push('/search')
  }

  autoCompString.subscribe(() => {
    let arr = JSON.parse(localStorage.getItem("bookmark"))
    let string = getAutoCompString().toLowerCase()
    let newArr = arr.filter(a => a.name.toLowerCase().includes(string))
    autoCompBookmark.set(newArr)
    console.log('test')
  })

  function removeSet(i) {
    removeDtl(i)
  }
</script>

<div class="modal-body" on:click={closeModal} transition:fly={{duration: 100}}>
  <div class="contents">
    {#if !$loading}
      <div class="closeBtn" on:click={closeAllModals}><Fa icon={faClose} fw/></div>
      <div class="modal-title">Create New Workout</div>
      <div class="modal-content">
        <div class="name">
          <input type="text" placeholder="Workout Name" bind:value={$autoCompString} on:click={openBookmark}>
          {#if $autoCompBookmark && bookmarkCondition}
            <div class="bookmark">
            {#each $autoCompBookmark as b }
              <div on:click={setWorkoutName}>{b.name}</div>
            {/each}
            </div>
          {:else}
            {#if bookmarkCondition}
            <div class="bookmark help">
              <div on:click={goSearch}>
                Search for workouts and add them <br/>to your bookmarks for autocomplete.
              </div>
            </div>
            {/if}
          {/if}
        </div>
        <div class="dtls">
          {#each $newDtls as d ,i}
          <div class="set-div">
            <input type="hidden" bind:value={d.setNumber}>
            <input type="number" min="0" placeholder="Weight (Kg)" bind:value={d.weight}>
            <input type="number" min="1" placeholder="Target Reps" bind:value={d.targetCount}>
            <button on:click={() => removeSet(i)}><Fa icon={faTrashCan} fw/></button>
          </div>
          {/each}
        </div>
        <div class="modal-footer">
          <input type="button" value="Add set" on:click={addSet}>
          <input type="button" value="Create workout" on:click={create}>
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
      position: relative;
      .closeBtn {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 1.2em;
        cursor: pointer;
        transition: .4s;
        &:hover {
          transform: scale(1.2);
        }
      }
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
          position: relative;
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
          position: relative;
          div {
            padding: 5px;
            box-sizing: border-box;
            box-shadow: none;
            transition: .4s;
            text-align: center;
            border-radius: 15px;
            background-color: $color--white;
            position: absolute;
            width: 100%;
            div {
              position: relative;
              cursor: pointer;
              border: 2px solid $color--white;
              &:hover {
              border: 2px solid $color--primary;
              }
            }
          }
          .help {
            padding: 10px 0;
            line-height: 2em;
            font-weight: 500;
            opacity: .9;
          }
        }
        .dtls {
          .set-div {
            display: flex;
            gap: 10px;
            input ,button {
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