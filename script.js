const openFormbutton = document.querySelector("[data-form-target]");
const closeFormbutton = document.querySelector("[data-close-button]");
const overlay = document.querySelector("#overlay");

overlay.addEventListener("click", () => {
  const form = document.querySelector(".form.active");
  closeForm(form);
});

openFormbutton.addEventListener("click", () => {
  const form = document.querySelector(openFormbutton.dataset.formTarget);
  openForm(form);
});

closeFormbutton.addEventListener("click", () => {
  const form = closeFormbutton.closest(".form");
  closeForm(form);
});

function openForm(form) {
  if (form == null) return;
  form.classList.add("active");
  overlay.classList.add("active");
}

function closeForm(form) {
  if (form == null) return;
  form.classList.remove("active");
  overlay.classList.remove("active");
}
