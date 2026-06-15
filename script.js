const items = [
  {
    title: "Товарные деньги",
    text: "Ракушки каури использовались как деньги в Африке, Азии и на островах Тихого океана. Они не портились, легко считались и были узнаваемы.",
  },
  {
    title: "Пушнина",
    text: "У многих народов, включая народы Сибири и Древней Руси, шкуры зверей служили деньгами. Их меняли на зерно, оружие и ткани.",
  },
  {
    title: "Металлические деньги",
    text: "Слитки золота, серебра и меди стали эталоном ценности. Важен был вес, а не форма: металл можно было переплавить и сделать монету.",
  },
  {
    title: "Первые чеканные монеты",
    text: "Монеты появились в Лидии в VII веке до н. э. Государство гарантировало вес и пробу, а деньги получили узнаваемый знак власти.",
  },
  {
    title: "Сбережения и клады",
    text: "Люди всегда прятали накопленное. Монеты зарывали в землю в кувшинах или сундуках. Так появлялись ранние привычки финансового планирования.",
  },
  {
    title: "Бумажные деньги",
    text: "Бумажные деньги удобны для расчетов: они легкие, компактные и подходят для разных сумм. Главное достоинство - простота для каждого человека.",
  },
  {
    title: "Безналичные деньги",
    text: "Безналичные деньги хранятся на банковских счетах. Их нельзя потрогать, но они существуют как запись о том, сколько средств у человека есть.",
  },
];

const app = document.querySelector("#app");
const modalOverlay = document.querySelector("#modalOverlay");
const modalCount = document.querySelector("#modalCount");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const closeModalButton = document.querySelector("#closeModalButton");
const moneyButtons = document.querySelectorAll(".money-node");

function fitApp() {
  const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  app.style.transform = `scale(${scale})`;
  app.style.marginLeft = `${(window.innerWidth - 1920 * scale) / 2}px`;
  app.style.marginTop = `${(window.innerHeight - 1080 * scale) / 2}px`;
}

function requestFullscreenMode() {
  const target = document.documentElement;
  if (!document.fullscreenElement && target.requestFullscreen) {
    target.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
  }
}

function blockBrowserEvents() {
  ["contextmenu", "selectstart", "dragstart"].forEach((eventName) => {
    document.addEventListener(eventName, (event) => event.preventDefault());
  });

  document.addEventListener(
    "touchmove",
    (event) => {
      event.preventDefault();
    },
    { passive: false },
  );

  document.addEventListener("keydown", (event) => {
    const blockedKeys = ["F5", "F11", "F12"];
    const blockedCombo =
      (event.ctrlKey || event.metaKey) &&
      ["a", "c", "p", "r", "s", "u", "+", "-", "0"].includes(
        event.key.toLowerCase(),
      );

    if (blockedKeys.includes(event.key) || blockedCombo) {
      event.preventDefault();
    }
  });
}

function openModal(index) {
  const item = items[index];
  modalCount.textContent = `${index + 1} / ${items.length}`;
  modalTitle.textContent = item.title;
  modalText.textContent = item.text;
  modalOverlay.hidden = false;
}

function closeModal() {
  modalOverlay.hidden = true;
}

moneyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    requestFullscreenMode();
    openModal(Number(button.dataset.index));
  });
});

closeModalButton.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

window.addEventListener("resize", fitApp);
document.addEventListener("pointerdown", requestFullscreenMode, { once: true });

blockBrowserEvents();
fitApp();
