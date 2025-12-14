document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const pass = document.querySelectorAll("input")[2].value;
    const confirmPass = document.querySelectorAll("input")[3].value;

    if (pass !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }

    alert("Account Created Successfully!");
});