const openFormbutton = document.querySelector("[data-form-target]");
const closeFormbutton = document.querySelector("[data-close-button]");
const overlay = document.querySelector("#overlay");
const bookTitle = document.getElementById("book-title");
const anAuthor = document.getElementById("author");
const pages_input = document.getElementById("pages");
const submitButton = document.querySelector(".submit");

submitButton.addEventListener("click", () => {
  const form = document.querySelector(".active");
  closeForm(form);
});

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

let myLibrary = [];

function Book() {
  this.title = bookTitle.value;
  this.author = anAuthor.value;
  this.pages = pages_input.value;
  this.isRead = true;
  this.info = function () {
    if (this.isRead) {
      return `${this.title} by ${this.author}, ${this.pages} read`;
    }
    return `${this.title} by ${this.author}, ${this.pages} not read yet`;
  };
}

function addBookToLibrary() {
  submitButton.addEventListener("click", function () {
    myLibrary.push(new Book());
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  });
}
let storedBooks = JSON.parse(localStorage.getItem("myLibrary"));

addBookToLibrary();

console.log(storedBooks);
