<script>
  import _upperFirst from 'lodash/upperFirst'
  import { searchWorkouts } from '~/store/workouts'

  const muscles = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps',
  ]
  const types = [
    'cardio',
    'olympic_weightlifting',
    'plyometrics',
    'powerlifting',
    'strength',
    'stretching',
    'strongman',
  ]
  const difficultys = [
    'beginner',
    'intermediate',
    'expert',
  ]

  let name = ''
  let type = ''
  let muscle = ''
  let difficulty = ''
  let offset = 0

  function apply() {
    offset = 0
    searchWorkouts({
      name, type, muscle, difficulty, offset
    })
  }
</script>

<div class="search">
  <div class="text-field">
    <input 
      bind:value={name}
      placeholder="Search for Workout"
      type="text" 
      on:keydown={event => {
        event.key === 'Enter' && apply()
      }}/>
  </div>

  <div class="select">
    <select bind:value={type}>
        <option value="">All Categorys</option>
      {#each types as t (t)}
        <option value={t}>{_upperFirst(t)}</option>
      {/each}
    </select>
  </div>

  <div class="select">
    <select bind:value={muscle}>
      <option value="">All Targets</option>
      {#each muscles as m (m)}
        <option value={m}>{_upperFirst(m)}</option>
      {/each}
    </select>
  </div>

  <div class="select">
    <select bind:value={difficulty}>
      <option value="">All Difficulties</option>
      {#each difficultys as d (d)}
        <option value={d}>{_upperFirst(d)}</option>
      {/each}
    </select>
  </div>

  <button 
    class="btn"
    on:click={apply}>
    Apply
  </button>
</div>

<style lang="scss">
  .search {
    display: grid;
    grid-template-columns: 1fr repeat(4, 200px);
    grid-gap: 10px;
    @media #{$tablet} {
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 50px);
    }
    @media #{$mobile} {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 50px);
    }

  .text-field {
    display: inline-block;
    height: 50px;
    @media #{$tablet} {
      grid-column: 1 / -1;
    }
    input {
      width: 100%;
      height: 100%;
      background: $color--area;
      outline: none;
      border: none;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 14px;
      // color: $black;
      border-radius: 4px;
      &::placeholder {
        // color: $color--white-30;
      }
    }
  }

    .select {
      height: 50px;
      position: relative;
      select {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0 32px 0 20px;
        box-sizing: border-box;
        font-size: 14px;
        // color: $color--white-60;
        border-radius: 4px;
        background: $color--area;
        cursor: pointer;
        appearance: none;
      }
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 15px;
        width: 0;
        height: 0;
        margin-top: -1px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #555;
      }
    }

    .btn {
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

  }
</style>