const countryCode = document.querySelector("#countryCode");
const phoneInput = document.querySelector("#phone");
const message = document.querySelector("#message");

const form = document.querySelector("#form");
const resultBox = document.querySelector("#result");

const copyBtn = document.querySelector("#copy");
const share = document.querySelector("#share");
const reloadBtn = document.querySelector("#reload");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    countryCode.value === "" ||
    phoneInput.value === "" ||
    message.value === ""
  ) {
    alert("Please fill all the fields");
    return;
  }

  let message = document.querySelector("#message").value;
  message = message.replace(/ /g, "%20");

  let link = `https://wa.me/${countryCode.value}${phoneInput.value}?text=${message}`;
  resultBox.classList.remove("hidden");
  resultBox.querySelector("#link").setAttribute("href", link);
  resultBox.querySelector("#link").textContent = link;
});

copyBtn.addEventListener("click", () => {
  const link = resultBox.querySelector("#link");
  window.navigator.clipboard.writeText(link.innerHTML);
  copyBtn.classList.add("bg-teal-600");
  copyBtn.classList.add("text-white");
  copyBtn.querySelector("span").innerText = "Copied !";
  setTimeout(() => {
    copyBtn.classList.remove("bg-teal-600");
    copyBtn.classList.remove("text-white");
    copyBtn.querySelector("span").innerText = "Copy";
  }, 4000);
});

share.addEventListener("click", () => {
  const link = resultBox.querySelector("#link");
  window.navigator.share({
    title: "Whatsapp Link Generator",
    url: link.innerHTML,
  });
});

reloadBtn.addEventListener("click", () => {
  window.location.reload();
});
