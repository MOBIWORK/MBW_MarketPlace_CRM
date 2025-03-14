import { defineStore } from 'pinia'
import { createResource } from 'frappe-ui'
import { sessionStore } from './session'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export const usersStore = defineStore('crm-users', () => {
  const session = sessionStore()

  let usersByName = reactive({})
  const router = useRouter()

  const users = createResource({
    url: 'crm.api.session.get_users',
    cache: 'Users',
    initialData: [],
    auto: true,
    transform(users) {
      for (let user of users) {
        user.email_address = user.email;
        if (user.name === 'Administrator') {
          user.email = 'Administrator'
        }
        usersByName[user.name] = user
      }
      return users
    },
    onError(error) {
      if (error && error.exc_type === 'AuthenticationError') {
        router.push('/login')
      }
    },
  })

  function getUser(email) {
    if (!email || email === 'sessionUser' || email === '@me') {
      email = session.user
    }
    if (!usersByName[email]) {
      usersByName[email] = {
        name: email,
        email: email,
        full_name: email.split('@')[0],
        user_image: null,
        role: null,
      }
    }
    return usersByName[email]
  }

  function isManager(email) {
    return getUser(email).is_manager
  }

  return {
    users,
    getUser,
    isManager,
  }
})
