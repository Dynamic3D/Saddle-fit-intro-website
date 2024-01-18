function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

async function subscribe(event) {
  event.preventDefault();
  var subscribeText = document.getElementById("subscribeText");
  var email = document.getElementById("email");

  if (!email.value) {
    toastr.error("Please enter your email address");
    return;
  }

  showLoader();
  subscribeText.style.display = "none";

  try {
    const response = await fetch(
      "https://wriil2sbhk.execute-api.us-east-1.amazonaws.com/dev/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value }),
      }
    );

    hideLoader();
    email.value = "";

    if (response.status === 409) {
      toastr.error("Email already subscribed");
    } else if (response.status === 200) {
      toastr.success("Subscribed successfully");
    } else {
      toastr.error("This email is not verified");
    }
  } catch (error) {
    hideLoader();
    toastr.error("Error in fetching data");
  } finally {
    subscribeText.style.display = "inline-block";
  }
}
