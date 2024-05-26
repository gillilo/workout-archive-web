<script>
  import { link } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'
  import Logo from './Logo.svelte'
  import Icon from './Icon.svelte'
  import { user } from '~/store/user'

  const menus = [
    {
      href: '/',
      name: 'Home'
    },
    {
      href: '/search',
      name: 'Search'
    },
    {
      href: '/bookmark',
      name: 'Bookmark',
    },
    {
      href: '/about',
      name: 'About',
      path: /^\/about/
    },
    // {
    //   href: '/login',
    //   name: 'Login'
    // },
    // {
    //   href: '/profile',
    //   name: 'Profile'
    // },
  ]
</script>

<header>
  <Logo />
  <nav>
    <ul>
      {#each menus as {href, name, path} (name)}
        <li>
          <a 
            use:link
            use:active={path}
            {href}>
            {name}
          </a>
        </li>
      {/each}
      <!-- {#if $user}
        <li>
          <a 
            use:link
            use:active={'/profile'}
            href={'/profile'}>
            Profile
          </a>
        </li>
        <li>
          <a 
            use:link
            use:active={'/routine'}
            href={'/routine'}>
            Routine
          </a>
        </li>
      {:else}
        <li>
          <a 
            use:link
            use:active={'/login'}
            href={'/login'}>
            Login
          </a>
        </li>
      {/if} -->
    </ul>
  </nav>
  <Icon />
</header>

<style lang="scss">
  header {
    padding: 20px 40px;
    background-color: $color--white;
    position: sticky;
    top: 0;
    z-index: 9;
    display: flex;
    align-items: flex-end;
    @media #{$mobile} {
      padding: 14px 20px;
    }
    nav {
      margin-left: 40px;
      @media #{$mobile} {
        display: none;
      }
      ul {
        display: flex;
        li {
          margin-left: 10px;
          &:first-child {
            margin-left: 0;
          }
          a {
            font-size: 14px;
            font-weight: 400;
            color: $color--black;
            text-decoration: none;
            font-family: 'Noto Sans KR', 'Noto Sans', sans-serif;
          }
        }
      }
    }
  }
  header :global(a.active) {
    color: $color--primary !important;
  }
</style>