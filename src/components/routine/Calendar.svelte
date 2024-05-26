<script>
  import { onMount } from 'svelte';
  import { 
    year, month, date, 
    nextDate, backDate, 
    getCalendarDate,
    getRoutine,
    initCalendar
  } from '~/store/routine'
  onMount(() => {
    initCalendar()
  })

  async function backDayRoutine() {
    const memberId = JSON.parse(localStorage.getItem('user')).id
    backDate()
    const planDate = getCalendarDate()
    getRoutine({memberId, planDate})
  }

  async function nextDayRoutine() {
    const memberId = JSON.parse(localStorage.getItem('user')).id
    nextDate()
    const planDate = getCalendarDate()
    getRoutine({memberId, planDate})
  }

  async function searchDayRoutine(e) {
    if (e.keyCode === 13) {
      const memberId = JSON.parse(localStorage.getItem('user')).id
      const planDate = getCalendarDate()
      getRoutine({memberId, planDate})
      e.target.blur()
    } else {
      const d = new Date($year,$month,0)
      const maxDate = d.getDate()
      if ($date < 0) {
        date.set(1)
      } else if ($date > maxDate) {
        date.set(maxDate)
      }

      if ($month < 1) {
        month.set(1)
      } else if ($month > 12) {
        month.set(12)
      }
    }
  }
</script>

<div class="calendar">
  <button on:click={backDayRoutine}>Back</button>
  <input type="number" bind:value={$year} min="2023" on:keyup={searchDayRoutine}>
  <input type="number" bind:value={$month} min="1" max="12" on:keyup={searchDayRoutine}>
  <input type="number" bind:value={$date} min="1" max="31" on:keyup={searchDayRoutine}>
  <button on:click={nextDayRoutine}>Next</button>
</div>

<style lang="scss">
  .calendar {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 500px;
    input {
      flex-grow: 1;
      box-sizing: border-box;
      box-shadow: none;
      outline: none;
      width: 10%;
      font-weight: 500;
      font-size: 1em;
      background: inherit;
      transition: .4s;
      text-align: center;
      padding: 5px 20px;
      border-radius: 15px;
      background-color: $color--area;
      border: 2px solid $color--area;
      &:hover {
        background-color: $color--white;
        border: 2px solid $color--primary;
        transform: scale(1.1);
      }
      &:focus {
        background-color: $color--white;
        border: 2px solid $color--primary;
        transform: scale(1.1);
      }
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    button {
      flex-grow: 1;
      width: 10%;
      font-weight: 500;
      font-size: 1em;
      background-color: $color--primary;
      border: none;
      color: $color--white;
      text-align: center;
      padding: 5px 20px;
      border-radius: 15px;
      transition: .4s;
      cursor: pointer;
      &:hover {
        background-color: lighten($color--primary, 10%);
        transform: scale(1.1);
      }
      &:active {
        background-color: $color--primary;
      }
    }
  }
</style>