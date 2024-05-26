<script>
  import { link, push } from 'svelte-spa-router'
  import { signup } from '~/store/user'

  import { Modals, closeModal, openModal } from 'svelte-modals'
	import { fade } from 'svelte/transition'
  import Alert from '../components/Alert.svelte'
  import Fa from 'svelte-fa'
  import { 
    faEyeSlash,
    faEye
  } from '@fortawesome/free-solid-svg-icons'

  let email;
  let password;
  let name;
  let phone = "";
  let age = "0";
  let gender = "MALE";
  let weight = "0";

  async function signupSubmit () {
    const res = await signup({name, email, password, phone, age, gender, weight})
    responseHandler(res)
  }

  let flag = true
  function responseHandler(res) {
    console.log(res.data)
    if (res.data.result) {
      flag = true
      openModal(Alert, {
        message: 'Welcome to the Workout Archive!',
        closeFuntion: () => {
          closeModal()
          push('/login')
        }
      })
    } else {
      flag = false
      openModal(Alert, {
        message: res.data.message,
        closeFuntion: () => {
          closeModal()
        }
      })
    }
  }

  function afterSubmit() {
    if (flag) {
      closeModal()
      push('/login')
    } else {
      closeModal()
    }
  }

  let passwordCondition = true
  function passwordToggle() {
    passwordCondition = !passwordCondition
  }
</script>

<Modals>
  <div
    slot="backdrop"
    class="backdrop"
		transition:fade
    on:click={afterSubmit}
  />
</Modals>

<div class="container">
  <div class="form">
    <div class="warpper">
      <div class="login">
        <h2>Create Account</h2>
        <div class="inputBx">
          <div class="required">Required</div>
          <input type="text" bind:value={email} placeholder="Email Address">
        </div>
        <div class="inputBx">
          <div class="required">Required</div>
          {#if passwordCondition}
          <input type="password" bind:value={password} placeholder="Password">
          <span on:click={passwordToggle}><Fa icon={faEyeSlash} fw /></span>
          {:else}
          <input type="text" bind:value={password} placeholder="Password">
          <span on:click={passwordToggle}><Fa icon={faEye} fw /></span>
          {/if}
        </div>
        <div class="inputBx">
          <div class="notRequired"></div>
          <input type="text" bind:value={name} placeholder="Name">
        </div>
        <div class="inputBx">
          <input type="submit" value="Sign Up" on:click={signupSubmit}>
        </div>
        <div class="links">
          <a use:link href={"/forgetpassword"}>Forget Password</a>
          <a use:link href={"/login"}>Return to Login</a>
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
          margin-bottom: 10px;
        }
        .inputBx {
          position: relative;
          width: 100%;
          .required {
            position: absolute;
            top: -20px;
            color: $color--primary;
            font-size: .8em;
          }
          span {
            position: absolute;
            top: 15px;
            right: 15px;
            color: $color--black;
            font-size: .8em;
            cursor: pointer;
          }
          .notRequired {
            position: absolute;
            color: $color--white;
            font-size: .9em;
          }
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