document.getElementById("passwordForm").addEventListener("submit", function(e){
    e.preventDefault();

    let code = document.getElementById("code").value;
    let newPass = document.getElementById("newPass").value;
    let rePass = document.getElementById("rePass").value;
    let msg = document.getElementById("message");

    msg.style.color = "red";

    // 1) Check verification code
    if (code !== "123456") {
        msg.innerHTML = "Invalid verification code!";
        return;
    }

    // 2) Password length
    if (newPass.length < 10) {
        msg.innerHTML = "Password must be at least 10 characters!";
        return;
    }

    // 3) Check match
    if (newPass !== rePass) {
        msg.innerHTML = "Passwords do not match!";
        return;
    }

    msg.style.color = "green";
    msg.innerHTML = "Password changed successfully!";
});