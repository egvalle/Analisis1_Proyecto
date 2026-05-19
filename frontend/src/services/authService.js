const USERS_KEY = "users"

/* GET USERS */
const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY)
  return users
    ? JSON.parse(users)
    : []
}

/* SAVE USERS */
const saveUsers = (users) => {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  )
}

/* REGISTER */
export const registerUser = async (userData) => {
  const users = getUsers()
  /* EMAIL EXISTS */
  const emailExists = users.some(
    user => user.email === userData.email
  )
  if (emailExists) {
    throw {
      detail: "El correo ya está registrado"
    }
  }
  /* NEW USER */
  const newUser = {
    id: Date.now(),
    full_name: userData.full_name,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
    roles: userData.roles
  }
  /* SAVE */
  users.push(newUser)
  saveUsers(users)
  return {
    message: "Usuario registrado correctamente"
  }
}

/* LOGIN */
export const loginUser = async (credentials) => {
  const users = getUsers()
  /* FIND USER */
  const user = users.find(
    u =>
      u.email === credentials.email
      &&
      u.password === credentials.password
  )
  /* INVALID */
  if (!user) {
    throw {
      detail: "Credenciales inválidas"
    }
  }
  /* TOKEN MOCK */
  const fakeToken =
    `token-${user.id}`
  return {
    access_token: fakeToken,
    token_type: "bearer",
    user
  }
}