export  function isLoggedIn() {
    const user = localStorage.getItem('login');
  
    if (user) {
      return true;
    } else {
      return false;
    }
  }