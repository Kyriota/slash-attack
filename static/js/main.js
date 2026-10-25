// Interactive pieces of the SLASH project page: the clean/scratched comparison slider,
// its day/night toggle, and the BibTeX copy button.

const compare = document.getElementById("compare");
const range = compare.querySelector(".compare-range");

range.addEventListener("input", () => {
  compare.style.setProperty("--pos", `${range.value}%`);
});

document.querySelectorAll(".toggle-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const scene = button.dataset.scene;
    document.querySelectorAll(".toggle-btn").forEach((other) => {
      const isActive = other === button;
      other.classList.toggle("active", isActive);
      other.setAttribute("aria-pressed", String(isActive));
    });
    compare.querySelectorAll("img[data-day]").forEach((image) => {
      image.src = image.dataset[scene];
    });
  });
});

const copyButton = document.getElementById("copy-bib");
copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(document.getElementById("bib-text").textContent);
  copyButton.textContent = "Copied";
  setTimeout(() => { copyButton.textContent = "Copy"; }, 1500);
});
