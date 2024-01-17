async function subscribe(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;

    try {
        const response = await fetch("https://wriil2sbhk.execute-api.us-east-1.amazonaws.com/dev/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });

        if (response.status === 409) {
            alert("Email already subscribed");
        } else if (response.status === 200) {
            alert("Subscribed successfully");
        } else {
            alert("This email is not verified");
        }
    } catch (error) {
        alert("Error in fetching data");
    }
}
