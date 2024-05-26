<script>
  import { user } from '~/store/user'
  import { scale } from 'svelte/transition'
  
  import Fa from 'svelte-fa'
  import { 
    faCakeCandles,
    faVenusMars,
    faWeight,
  } from '@fortawesome/free-solid-svg-icons'

  export let edit
</script>

<div>
  <h4>Biological</h4>
  {#if !edit}
  <p>
    <Fa icon={faCakeCandles} fw />
    <input type="number" min="0" bind:value={$user.age}>
  </p>
  <p>
    <Fa icon={faVenusMars} fw />
    <select bind:value={$user.gender}>
      <option value="MALE">MALE</option>
      <option value="FEMALE">FEMALE</option>
    </select>
  </p>
  <p>
    <Fa icon={faWeight} fw />
    <input type="number" min="0" bind:value={$user.weight}>Kg
  </p>
  {:else}
  <p>
    <Fa icon={faCakeCandles} fw />
    <input type="number" min="0" bind:value={$user.age} class="edit" in:scale>
  </p>
  <p>
    <Fa icon={faVenusMars} fw />
    <select bind:value={$user.gender} class="edit" in:scale>
      <option value="MALE">MALE</option>
      <option value="FEMALE">FEMALE</option>
    </select>
  </p>
  <p>
    <Fa icon={faWeight} fw />
      <input type="number" min="0" bind:value={$user.weight} class="edit" in:scale>Kg
  </p>
  {/if}
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
    input, select {
      padding: 1px 0px;
      margin: 0;
      box-sizing: border-box;
      box-shadow: none;
      outline: none;
      width: 100%;
      font-weight: 500;
      font-size: 1.2em;
      background: inherit;
      border: 0;
      color: $color--white;
      transition: .4s;
      text-align: right;
      appearance: none;
      &:focus {
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
    select {
    }
    span {
      display: inline-block;
    }
    .edit {
      margin-left: 10px;
      background-color: $color--area;
      color: $color--primary;
    }
    .inputgroup {
      text-align: right;
    }
  }
}
</style>