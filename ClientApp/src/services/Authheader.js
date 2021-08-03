export  function authHeader() {
    const user = JSON.parse(localStorage.getItem('login'));
  
    if (user && user[0]) {
      return { Authorization: 'Bearer ' + user[0] };
    } else {
      return {};
    }
  }