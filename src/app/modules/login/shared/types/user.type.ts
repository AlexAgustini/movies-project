export interface UserForm {
  email: string
  name: string;
  password: string;
}

export interface UserData {
  firebaseCredentials: firebase.default.User;
  name: string
}
