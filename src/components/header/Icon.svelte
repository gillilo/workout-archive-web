<script>
  import { push } from 'svelte-spa-router'
  import { user } from '~/store/user'

  var toggle = false

  function goTo(href) {
    toggle = false
    const menu = document.querySelector('.icon-menu')
    menu.style.display = 'none'
    push(href)
  }
</script>

<div class="icon-container">
  <div 
    class="user user-icon"
    on:click={e => {
      const menu = document.querySelector('.icon-menu')
      if (toggle) {
        menu.style.display = 'none'
      } else {
        menu.style.display = 'inline'
      }
      toggle = !toggle
      // push('/about')
    }}>
    <img src="/favicon.png" alt="User">
  </div>
  <!-- svelte-ignore a11y-missing-attribute -->
  <div class="icon-menu">
    <a on:click={() => {goTo("/")}}>Home</a>
    <a on:click={() => {goTo("/search")}}>Search</a>
    <a on:click={() => {goTo("/bookmark")}}>Bookmark</a>
    <a on:click={() => {goTo("/about")}}>About</a>
    {#if $user}
      <a on:click={() => {goTo("/profile")}}>Profile</a>
    {:else}
      <a on:click={() => {goTo("/login")}}>Login</a>
    {/if}
  </div>
</div>

<style lang="scss">
  .icon-container {
    overflow: hidden;
    .user {
      width: 40px;
      height: 40px;
      padding: 6px;
      box-sizing: border-box;
      border-radius: 50%;
      background-color: $color--area;
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      margin: auto;
      @media #{$mobile} {
        right: 20px;
      }
      &:hover {
        background-color: darken($color--area, 20%);
        transition: .4s;
      }
      img {
        width: calc(40px - 6px - 6px);
      }
      z-index: 9999;
    }
    .icon-menu {
      z-index: 9998;
      width: 250px;
      height: 250px;
      box-sizing: border-box;
      border-radius: 0 0 0 100%;
      position: absolute;
      right: 60px;
      top: 40px;
      @media #{$mobile} {
        right: 40px;
      }
      margin: auto;
      display: none;
      background-color: $color--primary;
      transition: .4s;
      animation: ani .15s linear;
      text-align: right;
      padding: 10px 40px 0 0;
      a {
        display: block;
        color: $color--white;
        height: calc(200px / 4 - 10px);
        cursor: pointer;
        font-family: 'Noto Sans', sans-serif;
        text-decoration: none;
        &:hover {
          font-weight: 900;
          font-size: 20px;
          transition: .4s;
        }
      }
    }
  }
  
  @keyframes ani {
    0% {
      width: 0;
      height: 0;
    }
    100% {
      width: 200px;
      height: 200px;
    }
  }
</style>