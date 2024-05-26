<script>
  import {link} from 'svelte-spa-router'
</script>

<a 
  use:link
  href="/">
  <span>WorkoutArchive</span>.com
</a>

<style lang='scss'>
  a {
    display: block;
    font-family: "Noto Sans", sans-serif;
    font-size: 20px;
    color: $color--black;
    text-decoration: none;
    font-weight: 400;
    span {
      color: $color--primary;
      font-size: 20px;
    }
  }
</style>