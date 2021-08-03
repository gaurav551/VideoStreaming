export  function getLoggedInUserEmail() {
    const user = JSON.parse(localStorage.getItem('login'));
  
    return user[1]
  }