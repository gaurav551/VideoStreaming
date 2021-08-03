export  function getLoggedInUserToken() {
    const user = JSON.parse(localStorage.getItem('login'));
   
    if (user) {
        return user[0];
    }
  
   
  }