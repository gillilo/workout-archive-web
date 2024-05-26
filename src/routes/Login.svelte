<script>
  import { link, push } from 'svelte-spa-router'
  import { user, login } from '~/store/user'

  import { Modals, closeModal, openModal } from 'svelte-modals'
	import { fade } from 'svelte/transition'
  import Alert from '../components/Alert.svelte'

  let email;
  let password;

  async function loginSubmit () {
    const res = await login({email, password})
    console.log(res)
    console.log($user)
    if (res.result) {
      window.localStorage.setItem("user", JSON.stringify($user));
      push('/')
    } else {
      openModal(Alert, {
        message: res.message,
        closeFuntion: () => {
          closeModal()
        }
      })
    }
  }

</script>

<Modals>
  <div
    slot="backdrop"
    class="backdrop"
		transition:fade
    on:click={closeModal}
  />
</Modals>

<div class="container">
  <div class="form">
    <div class="warpper">
      <div class="login">
        <h2>Login</h2>
        <div class="inputBx">
          <input type="text" bind:value={email} placeholder="Email Address">
        </div>
        <div class="inputBx">
          <input type="password" bind:value={password} placeholder="Password">
        </div>
        <div class="inputBx">
          <input type="submit" value="Sign in" on:click={loginSubmit}>
        </div>
        <div class="links">
          <a use:link href={"/forgetpassword"}>Forget Password</a>
          <a use:link href={"/signup"}>Signup</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    .warpper {
      position: relative;
      width: 500px;
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      .login {
        position: absolute;
        width: 300px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        h2 {
          font-size: 2em;
          color: $color--black;
          font-weight: 500;
        }
        .inputBx {
          position: relative;
          width: 100%;
          input {
            box-sizing: border-box;
            position: relative;
            width: 100%;
            padding: 12px 20px;
            border-radius: 40px;
            font-size: 1.2em;
            color: $color--black;
            box-shadow: none;
            outline: none;
            transition: .4s;
            border: 2px solid $color--area;
            background: $color--area;
            &:focus {
              background: transparent;
              border: 2px solid $color--primary;
            }
          }
          input[type="submit"] {
            background: $color--primary;
            color: $color--white;
            border: none;
            cursor: pointer;
            transition: .4s;
            &:hover {
              background-color: lighten($color--primary, 10%);
            }
          }
          input::placeholder {
            color: rgba($color--black, 0.7);
          }
        }
        .links {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          a {
            color: $color--black;
            text-decoration: none;
            transition: .4s;
            &:hover {
              color: lighten($color--primary, 10%);
            }
          }
        }
      }
    }
  }
  
  .backdrop {
    z-index: 9;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: $color--white;
  }
</style>