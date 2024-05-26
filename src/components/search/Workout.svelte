<script>
  import { closeModal, closeAllModals, openModal, modals } from 'svelte-modals'
	import { fly } from 'svelte/transition'
  import { theWorkout } from '~/store/workouts'
	
  export let isOpen

  function addBookmark() {
    const bookmark = JSON.parse(localStorage.getItem('bookmark'))
    const newbookmark = []
    if (bookmark) {
      newbookmark.push(...bookmark)

      let dup = false
      bookmark.map(a => {
        if(a.name === $theWorkout.name) dup = true
      })
      console.log(dup)
      if (!dup) {
        newbookmark.push($theWorkout)
        closeAllModals()
        localStorage.setItem('bookmark', JSON.stringify(newbookmark))
      } else {
        openAlert()
      }
    } else {
      newbookmark.push($theWorkout)
      closeAllModals()
      localStorage.setItem('bookmark', JSON.stringify(newbookmark))
    }
  }

	export let openAlert
</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:fly={{ y: 50 }} on:introstart on:outroend>
    <div class="contents">
      <div class="workout-modal">
        <div class="workout-details">
          <div class="image">
            <img src="/assets/a1.jpg" alt=" ">
            <img src="/assets/a2.jpg" alt=" ">
          </div>
          <div class="specs">
            <div class="name">
              {$theWorkout.name}
            </div>
            <div class="labels">
              <span>
                {$theWorkout.muscle}
              </span>
              <span class="dot">▪</span>
              <span>
                {$theWorkout.equipment}
              </span>
              <span class="dot">▪</span>
              <span>
                {$theWorkout.difficulty}
              </span>
              <span class="dot">▪</span>
              <span>
                {$theWorkout.type}
              </span>
            </div>
            <span class="inst">Instructions</span>
            <div class="instructions">
                {$theWorkout.instructions}
            </div>
          </div>
        </div>
      </div>
      <div class="btnGroup">
        <button class='btn' on:click={addBookmark}>Add Bookmark</button>
        <button class='btn' on:click={closeAllModals}>Close</button>
      </div>
    </div>
  </div>
{/if}

<style lang='scss'>
  .modal {
    z-index: 9999;
    position: fixed;
    top: 30px;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    .contents {
      min-width: 240px;
      max-width: 70%;
      border-radius: 6px;
      padding: 16px;
      background: $color--area;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: auto;
      .workout-modal {
        font-family: 'Noto Sans', sans-serif;
        color: $color--black;
        .workout-details {
          display: flex;
          @media #{$mobile} {
            display: block;
          }
        }
        .image {
          flex-shrink: 0;
          width: 300px;
          height: 100%;
          border-radius: 10px;
          margin-right: 30px;
          // background-color: $color--area;
          background-position: center;
          background-size: cover;
          position: relative;
          @media #{$tablet} {
            width: 300px;
            height: 300px * 3/2;
            margin-right: 30px;
          }
          @media #{$mobile} {
            margin-right: 0;
            margin-bottom: 50px;
          }
          img {
            width: 100%;
          }
        }
        .specs {
          border-radius: 10px;
          text-align: left;
          .name {
            font-size: 30px;
            font-weight: 600;
            line-height: 1;
            @media #{$mobile} {
              font-size: 30px;
            }
          }
          .labels {
            font-size: 16px;
            color: $color--primary;
            .dot {
              margin: 0 6px;
            }
          }
          .inst {
            margin-top: 20px;
            display: block;
            font-size: 12px;
            color: $color--black-50;
            font-weight: 600;
          }
          .instructions {
            max-height: 40vh;
            overflow-y: scroll;
            font-size: 14px;
            background-color: $color--white;
            padding: 10px;
          }
          .instructions::-webkit-scrollbar {
            width: 8px;
          }
          .instructions::-webkit-scrollbar-thumb {
            height: 30%;
            background: $color--primary;
            border-radius: 10px;
          }
          .instructions::-webkit-scrollbar-track {
            background: $color--area;
          }
        }
      }
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