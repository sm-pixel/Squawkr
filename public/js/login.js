$(document).ready(function() {
    // get references to our forms/inputs
    const loginBuild = $("form.login");
    const usernameInput = $("input#username-input");
    const passwordInput = $("input#password-input");
    
    //confirm there is username and password entered
    loginBuild.on("submit", function(instance) {
        instance.preventDefault();
        const memberData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };
    })
})