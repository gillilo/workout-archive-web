<script>
  import { user } from '~/store/user'
  import { scale } from 'svelte/transition'

  export let edit
</script>

<div>
  <h4>Physical</h4>
  {#if !edit}
  <p>
    <span>Bench Press</span>
    <input type="number" bind:value={$user.benchpress}>Kg
  </p>
  <p>
    <span>Deadlift</span>
    <input type="number" bind:value={$user.deadlift}>Kg
  </p>
  <p>
    <span>Squat</span>
    <input type="number" bind:value={$user.squat}>Kg
  </p>
  <p>
    <span>Over Head Press</span>
    <input type="number" bind:value={$user.overheadpress}>Kg
  </p>
  <p>
    <span>Barbell Row</span>
    <input type="number" bind:value={$user.barbellrow}>Kg
  </p>
  {:else}
  <p>
    <span>Bench Press</span>
    <input type="number" bind:value={$user.benchpress} class="edit" in:scale>Kg
  </p>
  <p>
    <span>Deadlift</span>
    <input type="number" bind:value={$user.deadlift} class="edit" in:scale>Kg
  </p>
  <p>
    <span>Squat</span>
    <input type="number" bind:value={$user.squat} class="edit" in:scale>Kg
  </p>
  <p>
    <span>Over Head Press</span>
    <input type="number" bind:value={$user.overheadpress} class="edit" in:scale>Kg
  </p>
  <p>
    <span>Barbell Row</span>
    <input type="number" bind:value={$user.barbellrow} class="edit" in:scale>Kg
  </p>
  {/if}
  <p>
    <span>3 Total</span>
    <span>{$user.benchpress + $user.deadlift + $user.squat}Kg</span>
  </p>
  <p>
    <span>5 Total</span>
    <span>{$user.benchpress + $user.deadlift + $user.squat + $user.overheadpress + $user.barbellrow}Kg</span>
  </p>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    h4 {
      font-size: 1.2em;
      font-weight: 500;
    }
    p {
      width: 100%;
      display: flex;
      justify-content: space-between;
      input {
        flex-grow: 1;
        padding: 1px 0px;
        margin: 0;
        box-sizing: border-box;
        box-shadow: none;
        outline: none;
        width: 30%;
        font-weight: 500;
        font-size: 1.2em;
        background: inherit;
        border: 0;
        color: $color--white;
        transition: .4s;
        text-align: right;
        &:focus {
          flex-grow: 0;
          transform: scale(1.1);
          padding: 5px 20px;
          border-radius: 15px;
          background-color: $color--area;
          color: $color--primary;
        }
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      span {
        display: inline-block;
      }
      .edit {
        background-color: $color--area;
        color: $color--primary;
        margin-left: 10px;
      }
      .inputgroup {
        text-align: right;
      }
    }
  }
</style>