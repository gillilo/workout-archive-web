<script>
  import { Modals, openModal } from 'svelte-modals'
  import NewWorkout from './NewWorkout.svelte'

  function newWorkout() {
    openModal(NewWorkout)
  }
</script>

<Modals />

<div class="card new-btn" on:click={newWorkout}>
  +
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
      }
    }
  }
  .new-btn {
    min-width: 35px;
    transition: .4s;
    font-size: 2em;
    cursor: pointer;
    &:hover {
      background-color: $color--primary;
      color: $color--white;
    }
  }
</style>