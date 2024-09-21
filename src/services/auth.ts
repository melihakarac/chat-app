export function login(email: string, password: string): boolean {
  const validEmail = "test@mentortools.com";
  const validPassword = "123456789";

  if (email === validEmail && password === validPassword) {
    localStorage.setItem("user", email);
    return true;
  }
  return false;
}

export function isLoggedIn(): boolean {
  const user = localStorage.getItem("user");
  return !!user;
}

export function logout() {
  localStorage.removeItem("user");
}
