<script>
	import { fly } from 'svelte/transition'
	
  export let isOpen
  export let message
  export let closeFuntion
</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:fly={{ y: 0 }}>
    <div class="contents">
      {message}
      <div class="btnGroup">
        <button class='btn' on:click={closeFuntion}>Close</button>
      </div>
    </div>
  </div>
{/if}

<style lang='scss'>
  .modal {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    .contents {
      font-family: 'Noto Sans', sans-serif;
      font-size: 20px;
      color: $color--black;
      font-weight: 500;
      min-width: 240px;
      max-width: 70%;
      border-radius: 6px;
      padding: 16px;
      background: $color--area;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: auto;
      .btnGroup {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        .btn {
          margin: 10px;
          flex: 1;
          padding: auto;
          height: 50px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          background-color: $color--black;
          font-weight: 700;
          color: $color--white;
          outline: none;
          transition: .4s;
          @media #{$mobile} {
            grid-column: 1 / -1;
          }
          &:hover {
            background-color: lighten($color--black, 30%);
          }
          &:first-child {
            background-color: $color--primary;
            &:hover {
              background-color: lighten($color--primary, 10%);
            }
          }
        }
      }
    }
  }
</style>