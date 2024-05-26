<script>
  import ProfileTab2 from '../components/profile/ProfileTab2.svelte'
  import ProfileImageBox from '../components/profile/ProfileImageBox.svelte'
  import ProfileBiological from '../components/profile/ProfileBiological.svelte'
  import ProfilePhysical from '../components/profile/ProfilePhysical.svelte'

  import { onMount } from 'svelte'
  onMount(async () => {
    user.set(JSON.parse(window.localStorage.getItem("user")))
	})

  import { user, update } from '~/store/user'

  let edit = false
  function editMode() {
    edit = true
  }
  function save() {
    edit = false
    window.localStorage.setItem("user", JSON.stringify($user))
    console.log($user)
    update($user)
  }
</script>

<div class="inner-container">
  <div class="warpper" >
    <div class="tab1">
      {#if !edit}
      <input class="editBtn" type="button" value="Edit Profile" on:click={editMode}>
      {:else}
      <input class="editBtn" type="button" value="Save Profile" on:click={save}>
      {/if}
      <ProfileImageBox {edit} />
      <div class="contents">
        <ProfileBiological {edit}/>
        <ProfilePhysical {edit}/>
      </div>
    </div>
    <ProfileTab2 />
  </div>
</div>

<style lang="scss">
  .inner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    min-height: 70vh;
    padding-top: 20px;
    transition: .4s;
    .warpper {
      min-height: 70vh;
      display: flex;
      flex-direction: row;
      .tab1 {
        display: flex;
        flex-direction: column;
        background: $color--primary;
        color: $color--white;
        padding: 30px;
        width: 250px;
        gap: 30px;
        position: relative;
        .editBtn, .saveBtn {
          position: absolute;
          top: 0;
          left: 0;
          border: 0px;
          box-sizing: border-box;
          background-color: $color--area;
          color: $color--primary;
          font-weight: 600;
          font-size: 1em;
          padding: 10px;
          border-radius: 0px 0px 15px 0px;
          cursor: pointer;
          transition: .4s;
          &:hover {
            transform: scale(1.1);
          }
        }
        .contents {
          cursor: default;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
      }
    }
  }
</style>