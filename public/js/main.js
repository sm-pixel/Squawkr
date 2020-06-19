$(document).ready(() => {
    //When you click the logo send you to the home page
    $(".home-logo-click").on('click', () => {
        if(location.pathname === '/home' || location.pathname === '/profile') {
            location.replace('/home');
        }
    })
})