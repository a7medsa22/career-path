let editBtn = document.getElementById("edit");
let fields = document.querySelectorAll("input");
let mode = false;

editBtn.onclick = function () {
    mode = !mode;

    if (mode) {
        editBtn.innerText = "Save";
        fields.forEach(f => {
            f.removeAttribute("readonly");
            f.style.border = "1px solid #ccc";
            f.style.background = "#fff";
        });
    } else {
        editBtn.innerText = "Edit Profile";
        fields.forEach(f => {
            f.setAttribute("readonly", true);
            f.style.border = "none";
            f.style.background = "none";
        });
        alert("Saved!");
    }
}