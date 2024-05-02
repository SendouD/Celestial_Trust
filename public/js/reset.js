const btn = document.getElementById("btn");
const form = document.getElementById("form");


btn.addEventListener("click", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const res = Object.fromEntries(formData);
    const payload = JSON.stringify(res);
    console.log(payload);
    const response = await fetch("/forgotpassword/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: payload,
    })
    console.log(response);
    if (response.ok) {
        console.log("Success");
        window.location.href = "/login";
    } else {
        if (confirm('New password and Confirm Password is not same ')) {
            window.location.href = "/forgotpassword";

        } else {
            window.location.href = "/";

        }
    }
});