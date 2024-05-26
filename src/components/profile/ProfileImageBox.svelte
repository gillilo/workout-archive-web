<script>
  import { user } from '~/store/user'
  import { scale } from 'svelte/transition'

  export let edit
</script>
<div class="imageBox">
  <img src="assets/defaultProfile.svg" alt="defaultImage">
  <div>
    <h2>
      {#if !edit}
        <input type="text" bind:value={$user.name}>
      {:else}
        <input class="edit" type="text" bind:value={$user.name} in:scale>
      {/if}
    </h2>
    <h3>
      <input type="text" bind:value={$user.email} readonly>
    </h3>
  </div>
</div>

<style lang="scss">
.imageBox {
  width: 100%;
  justify-content: center;
  align-items: center;
  img {
    padding: 25px;
    width: 200px;
    height: 200px;
    display: block;
  }
  div {
    h2 {
      position: relative;
      input {
        padding: 0;
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
        &:focus {
          transform: scale(1.1);
          padding: 5px 10px;
          border-radius: 15px;
          background-color: $color--area;
          color: $color--primary;
        }
      }
      .edit {
        background-color: $color--area;
        color: $color--primary;
      }
    }
    h3 {
      position: relative;
      input {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        box-shadow: none;
        outline: none;
        width: 100%;
        font-weight: 500;
        font-size: 1em;
        background: inherit;
        border: 0;
        color: $color--white;
        transition: .4s;
        &:focus {
          transform: scale(1.1);
          padding: 5px 10px;
          border-radius: 15px;
          background-color: $color--area;
          color: $color--primary;
        }
      }
    }
  }
}
</style>