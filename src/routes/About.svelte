<script>
  import { querystring } from "svelte-spa-router";
  import qs from 'qs'
  import { closeAllModals } from 'svelte-modals'
  closeAllModals()

  $: query = qs.parse($querystring)
  $: name = query.name || '김회준'
  $: email = query.email || 'ghlwns1535@gmail.com'
  $: frontRepo = query.blog || 'https://github.com/gillilo/workout-archive'
  $: backRepo = query.blog || 'https://github.com/gillilo/workout-archive-api'
  $: phone = query.phone || '+82-10-3064-9258'
</script>

<div class="user-profile">
  <div class="photos">
    <div class="photo">
      <img src="/assets/svelte.png" alt="svelte">
    </div>
    <div class="photo">
      <img src="/assets/scss.png" alt="scss">
    </div>
    <div class="photo">
      <img src="/assets/nodejs.png" alt="nodejs">
    </div>
    <div class="photo">
      <img src="/assets/snowpack.png" alt="snowpack">
    </div>
    <div class="photo">
      <img src="/assets/netlify.png" alt="netlify">
    </div>
    <div class="photo">
      <img src="/assets/springboot.png" alt="springboot">
    </div>
    <div class="photo">
      <img src="/assets/jpa.png" alt="jpa">
    </div>
    <div class="photo">
      <img src="/assets/aws.png" alt="aws">
    </div>
  </div>
  <div class="details">
    <div class="name">{name}</div>
    <div class="email">{email}</div>
    <div class="frontRepo">{frontRepo}</div>
    <div class="backRepo">{backRepo}</div>
    <div class="phone">{phone}</div>
  </div>
</div>

<style lang="scss">
  .user-profile {
    padding: 80px 0;
    .photos {
      display: grid;
      grid-template-columns: repeat(5, 200px);
      grid-gap: 10px;
      justify-content: center;
      @media #{$tablet} {
        grid-template-columns: repeat(3, 200px);
        grid-template-rows: repeat(2, 230px);
      }
      @media #{$mobile} {
        grid-template-columns: repeat(3, 150px);
        grid-template-rows: repeat(2, 195px);
      }
      .photo {
        flex-shrink: 0;
        width: 200px;
        height: 230px;
        @media #{$tablet} {
          width: 200px;
          height: 230px;
        }
        @media #{$mobile} {
          width: 150px;
          height: 195px;
        }
        padding: 30px;
        box-sizing: border-box;
        // border: 12px solid $color--primary;
        img {
          width: 100%;
        }
      }
    }
    .details {
      margin-top: 20px;
      text-align: center;
      .name {
        font-size: 40px;
        font-family: 'Noto Sans', sans-serif;
        color: $color--primary;
        font-weight: 600;
        margin-bottom: 20px;
      }
    }
  }
</style>