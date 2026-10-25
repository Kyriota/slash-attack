// Interactive pieces of the SLASH project page: the linked clean/scratched comparison sliders,
// their day/night toggle, and the BibTeX copy button.

const compare = document.getElementById("compare");
const ranges = compare.querySelectorAll(".compare-range");

// Every slider drives one shared position, so the image and depth panels move together.
ranges.forEach((range) => {
  range.addEventListener("input", () => {
    compare.style.setProperty("--pos", `${range.value}%`);
    ranges.forEach((other) => { other.value = range.value; });
  });
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
