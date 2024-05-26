<script>
  import Fa from 'svelte-fa'
  import { 
    faTrashCan,
    faPencil,
    faHeart,
    faHeartBroken,
    faSave,
    faQuestion,
  } from '@fortawesome/free-solid-svg-icons'
  import { delRoutine, getRoutine, getCalendarDate, updateWorkout } from '~/store/routine'
  import { Modals, openModal } from 'svelte-modals'
  import EditWorkout from './EditWorkout.svelte'
  import _cloneDeep from 'lodash/cloneDeep'
  import { onDestroy, onMount } from 'svelte'
  let oncontextmenu
  onMount(() =>{
    oncontextmenu = window.oncontextmenu
    window.oncontextmenu = () => {
      return false
    }
  })
  onDestroy(() => {
    window.oncontextmenu = oncontextmenu
  })

  export let routine
  export let idx

  async function deleteWorkout(id) {
    await delRoutine({id})
    const memberId = JSON.parse(localStorage.getItem('user')).id
    const planDate = getCalendarDate()
    getRoutine({memberId, planDate})
  }

  function updateModal() {
    openModal(EditWorkout, { routine })
  }

  function increaseActualCount(j) {
    if (routine.routineDtls[j].actualCount != routine.routineDtls[j].targetCount) {
      routine.routineDtls[j].actualCount = routine.routineDtls[j].actualCount+1
    }
  }

  function decreaseActualCount(j) {
    if (routine.routineDtls[j].actualCount-1 != -1) {
      routine.routineDtls[j].actualCount = routine.routineDtls[j].actualCount-1
    }
  }

  const routineOrigin = _cloneDeep(routine)
  let changeFlag = false
  async function saveChange() {
    for (let i = 0 ; i < routine.routineDtls.length ; i++) {
      const o = routineOrigin.routineDtls[i]
      const c = routine.routineDtls[i]
      const oa = o.actualCount
      const ca = c.actualCount
      if (oa != ca) {
        changeFlag = true
        break;
      }
    }
    if (changeFlag) {
      changeFlag = !changeFlag
      const id = routine.id
      const memberId = JSON.parse(localStorage.getItem('user')).id
      const planDate = getCalendarDate()
      const workoutName = routine.name
      const mstSeq = routine.mstSeq
      const dtls = routine.routineDtls
      const payload = {
        id,
        memberId,
        planDate,
        workoutName,
        mstSeq,
        dtls
      }
      await updateWorkout(payload)
      await getRoutine({memberId, planDate})
    }
  }
</script>

<Modals />

<div class="card">
  <button class="update" on:click={updateModal}>
    <Fa icon={faPencil} fw />
  </button>
  <button class="delete" on:click={() => deleteWorkout(routine.id)}>
    <Fa icon={faTrashCan} fw />
  </button>
  <button class="like">
    <Fa icon={faHeart} fw />
  </button>
  <!-- <button class="hate">
    <Fa icon={faHeartBroken} fw />
  </button>
  <button class="like">
    <Fa icon={faQuestion} fw />
  </button> -->
  <button class="hate" on:click={saveChange}>
    <Fa icon={faSave} fw />
  </button>
  <div class="card-title">
    {idx+1}. {routine.name}
  </div>
  <div class="card-body">
    {#each routine.routineDtls as d, j (j)}
    <div class="set" on:click={() => increaseActualCount(j)} on:contextmenu={() => decreaseActualCount(j)}>
      <div class="weight">{d.weight}Kg</div>
      <div class="reps">{d.targetCount} / {d.actualCount}</div>
    </div>
    {/each}
    <!-- <div class="set save" on:click={saveChange}>
      <Fa icon={faSave} fw />
    </div> -->
  </div>
</div>

<style lang="scss">
  .card {
    background: $color--area;
    padding: 15px;
    border-radius: 15px;
    min-width: 200px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    position: relative;
    .delete, .update, .like, .hate {
      position: absolute;
      background-color: $color--white;
      color: $color--black;
      border: 0;
      box-shadow: none;
      padding: 5px;
      border-radius: 50%;
      font-size: 1em;
      cursor: pointer;
      transition: .4s;
      &:hover {
        transform: scale(1.3);
      }
    }
    .update {
      top: 10px;
      left: 10px;
    }
    .delete {
      top: 10px;
      right: 10px;
    }
    .like {
      bottom: 10px;
      left: 10px;
    }
    .hate {
      bottom: 10px;
      right: 10px;
    }
    .card-title {
      font-size: 1.1em;
    }
    .card-body {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      .set {
        text-align: center;
        padding: 5px;
        background-color: $color--primary;
        color: $color--white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        flex-direction: column;
        font-size: .8em;
        width: 50px;
        height: 50px;
        cursor: pointer;
        transition: .4s;
        &:hover {
          transform: scale(1.1);
        }
        &:active {
          transform: scale(.8);
        }
        user-select: none;
      }
      .save {
        border-radius: 5px;
        background-color: $color--white;
        color: $color--primary;
        font-size: 1.5em;
      }
    }
  }
</style>