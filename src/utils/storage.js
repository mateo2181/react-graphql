export function checkToken() {
    let user = localStorage.getItem('token');
    if (user !== null) {
      return user;
    } else {
      return false;
    }
  }