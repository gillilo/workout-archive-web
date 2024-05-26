<script>
  import { fade } from 'svelte/transition'
  import Router, { location } from 'svelte-spa-router'
  import routes from '~/routes'
  import Header from "./components/header/Header.svelte"
  import Footer from './components/Footer.svelte'
  import { user } from '~/store/user'

  if (!$user) {
    if (window.localStorage.getItem("user")) {
      user.set(JSON.parse(window.localStorage.getItem("user")))
    }
  }
</script>

<Header />
{#key $location}
  <div in:fade>
    <Router 
      {routes} 
      restoreScrollState={true} />
  </div>
{/key}
{#if 
  $location === '/' || 
  $location === '/search'  || 
  $location === '/about' 
}
  <Footer />
{/if}