const network = document.querySelector("#network");
const amount = document.querySelector("#amount");
const price = document.querySelector("#price");
const phoneNumber = document.querySelector("#pn");
const buyNow = document.querySelector(".buynow");
const buyForm = document.querySelector(".buy-form");
const successMsg = document.querySelector(".success-msg");
const msg = document.querySelector(".msg");
const closeMsg = document.querySelector(".close-msg");

// close msg
closeMsg.addEventListener("click", (e) => {
  console.log("closebtn clicked");
  successMsg.style.display = "none";
  msg.innerHTML = "";
});

// buyform
buyForm.addEventListener("change", (e) => {
  if (network.value == "mtn" && amount.value == "1.5gb") {
    price.value = "1000";
  }
  if (network.value == "mtn" && amount.value == "2gb") {
    price.value = "1200";
  }
  if (network.value == "mtn" && amount.value == "3gb") {
    price.value = "1500";
  }
  if (network.value == "mtn" && amount.value == "4.5gb") {
    price.value = "2000";
  }
  if (network.value == "mtn" && amount.value == "6gb") {
    price.value = "2500";
  }
  if (network.value == "mtn" && amount.value == "12gb") {
    price.value = "3500";
  }
  if (network.value == "mtn" && amount.value == "20gb") {
    price.value = "5000";
  }
});

buyNow.addEventListener("click", (e) => {
  e.preventDefault();

  data = {
    network: network.value,
    amount: amount.value.trim(),
    price: price.value.trim(),
    phoneNumber: phoneNumber.value.trim(),
    email: phoneNumber.value.trim() + "@dataly.app",
  };

  if (
    phoneNumber.value.trim().length == 0 ||
    phoneNumber.value.trim().length < 11 ||
    phoneNumber.value.trim().length > 11
  ) {
    alert("Enter a valid phone number");
  } else {
    const handler = PaystackPop.setup({
      key: config.pkey,
      email: data.email,
      amount: data.price * 100,
      currency: "NGN",
      metadata: data,
      callback: (response) => {
        (async () => {
          const ref = response.reference;
          const res = await fetch("/verify_transaction?ref=" + ref);
          const resp = await res.json();
          if (resp.status == "success") {
            successMsg.style.display = "block";
            msg.innerHTML = `Payment successful. Your data is on its way... Your transaction ref is: <b>${resp.reference}</b>. Keep it for reference purpose.`;
            // setTimeout(() => {
            //   successMsg.style.display = "none";
            // }, 5000);
          }
        })();
      },
      onClose: function () {
        console.log("transaction not completed. popup closed");
      },
    });
    handler.openIframe();
  }
});
