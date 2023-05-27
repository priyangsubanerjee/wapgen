const countryCode = document.querySelector("#countryCode");
const phoneInput = document.querySelector("#phone");
const message = document.querySelector("#message");

const form = document.querySelector("#form");
const resultBox = document.querySelector("#result");

const copyBtn = document.querySelector("#copy");
const share = document.querySelector("#share");
const reloadBtn = document.querySelector("#reload");

const openhistoryBtn = document.querySelector("#openhistory");
const closehistoryBtn = document.querySelector("#closehistory");
const historymodal = document.querySelector("#historymodal");
const historyContainer = document.querySelector("#historyContainer");
const copyFromHistoryBtns = document.querySelectorAll("#copyFromHistory");
const shareFromHistoryBtns = document.querySelectorAll("#shareFromHistory");
const removeFromHistoryBtns = document.querySelectorAll("#removeFromHistory");

const generateHistory = (item) => {
  return ` <div class="border-b py-4">
            <a
              class="text-sm text-blue-500"
              href="${item.data}"
            >
                ${item.data}
            </a>
            <div class="flex items-center h-10 mt-5">
              <button
                data-id="${item.id}"
                id="copyFromHistory"
                class="flex items-center h-full px-3 bg-slate-100 font-poppins text-xs rounded text-slate-700 transition-all"
              >
                <iconify-icon
                  height="18"
                  width="18"
                  icon="radix-icons:copy"
                ></iconify-icon>
                <span class="ml-2">Copy</span>
              </button>
              <button
                data-id="${item.id}"
                id="shareFromHistory"
                class="flex ml-3 items-center h-full px-3 bg-slate-100 font-poppins text-xs rounded text-slate-700 transition-all"
              >
                <iconify-icon
                  icon="material-symbols:share"
                  style="font-size: 18px"
                ></iconify-icon>
                <span class="ml-2">Share</span>
              </button>
              <button
                id="removeFromHistory"
                data-id="${item.id}"
                class="removeFromHistory flex ml-auto items-center h-full px-3 bg-red-100 font-poppins text-xs rounded text-slate-900 transition-all"
              >
                <iconify-icon
                  icon="fluent:delete-20-regular"
                  style="font-size: 18px"
                ></iconify-icon>
                <span class="ml-2">Remove</span>
              </button>
            </div>
          </div>`;
};

function save(link) {
  let id = Math.floor(Math.random() * 1000000000);
  let history = JSON.parse(localStorage.getItem("history")) || [];
  if (history.length >= 10) {
    history.shift();
  }
  history.push({
    id,
    data: link,
  });
  localStorage.setItem("history", JSON.stringify(history));
  loadHistory();
}

function loadHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  historyContainer.innerHTML = "";
  history.forEach((item) => {
    historyContainer.innerHTML += generateHistory(item);
  });
}

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

  let link = `https://wa.me/${countryCode.value}${
    phoneInput.value
  }?text=${message.value.replace(/\s/g, "%20")}`;
  resultBox.classList.remove("hidden");
  resultBox.querySelector("#link").setAttribute("href", link);
  save(link);
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

openhistoryBtn.addEventListener("click", () => {
  historymodal.classList.remove("hidden");
  historymodal.classList.add("flex");
});

closehistoryBtn.addEventListener("click", () => {
  historymodal.classList.remove("flex");
  historymodal.classList.add("hidden");
});

window.addEventListener("load", () => {
  loadHistory();
});

historymodal.addEventListener("click", (e) => {
  if (true) {
    // get attribute data-id
    let remove = e.target.closest("#removeFromHistory");
    let copy = e.target.closest("#copyFromHistory");
    let share = e.target.closest("#shareFromHistory");
    if (remove) {
      let id = remove.getAttribute("data-id");
      let history = JSON.parse(localStorage.getItem("history")) || [];
      history = history.filter((item) => item.id != id);
      localStorage.setItem("history", JSON.stringify(history));
      loadHistory();
    }
    if (copy) {
      let id = copy.getAttribute("data-id");
      let history = JSON.parse(localStorage.getItem("history")) || [];
      let item = history.find((item) => item.id == id);
      window.navigator.clipboard.writeText(item.data);
      copy.classList.add("bg-teal-600");
      copy.classList.add("text-white");
      copy.querySelector("span").innerText = "Copied !";
      setTimeout(() => {
        copy.classList.remove("bg-teal-600");
        copy.classList.remove("text-white");
        copy.querySelector("span").innerText = "Copy";
      }, 4000);
    }
    if (share) {
      let id = share.getAttribute("data-id");
      let history = JSON.parse(localStorage.getItem("history")) || [];
      let item = history.find((item) => item.id == id);
      window.navigator.share({
        title: "Whatsapp Link Generator",
        url: item.data,
      });
    }
  }
});
