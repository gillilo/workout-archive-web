import Home from './Home.svelte'
import Search from './Search.svelte'
import About from './About.svelte'
import NotFound from './NotFound.svelte'
import Bookmark from './Bookmark.svelte'
import Admin from './Admin.svelte'
import Login from './Login.svelte'
import Signup from './Signup.svelte'
import Profile from './Profile.svelte'
import Routine from './Routine.svelte'
import ForgetPassword from './ForgetPassword.svelte'

import TestPage from './TestPage.svelte'

export default {
  '/': Home,
  '/search': Search,
  '/about': About,
  '/bookmark': Bookmark,
  '/admin': Admin,
  '/login': Login,
  '/signup': Signup,
  '/forgetpassword': ForgetPassword,
  '/profile': Profile,
  '/routine': Routine,
  '/test': TestPage,
  '*': NotFound,
}