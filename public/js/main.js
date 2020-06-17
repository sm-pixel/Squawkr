$(document).ready(() => {
    $(".home-logo-click").on('click', () => {
        if(location.pathname === '/home' || location.pathname === '/profile') {
            location.replace('/home');
        }
    })
})