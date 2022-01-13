let bookTitle = document.getElementById("book-title");
let anAuthor = document.getElementById("author");
let pages_input = document.getElementById("pages");
const openFormbutton = document.querySelector("[data-form-target]");
const closeFormbutton = document.querySelector("[data-close-button]");
const overlay = document.querySelector("#overlay");
const submitButton = document.querySelector(".submit");
const mainContent = document.getElementById("main-content");
const checkBox = document.getElementById("checkbox");

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
let allBooks = [];

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
  submitButton.addEventListener("click", () => {
    removeElementsByClass("book");
    myLibrary.push(new Book());
    addBookToDisplay();
    bookTitle.value = "";
    anAuthor.value = "";
    pages_input.value = "";
  });
}

addBookToLibrary();

function addBookToDisplay() {
  for (let index = 0; index < myLibrary.length; index++) {
    const book = document.createElement("div");
    const spanTitle = document.createElement("span");
    const spanAuthor = document.createElement("span");
    const spanPages = document.createElement("span");
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    book.classList.add("book");
    readButton.classList.add("read-button");
    deleteButton.classList.add("delete-button");
    mainContent.appendChild(book);
    deleteButton.innerHTML = "Delete Book";
    readButton.innerHTML = "Read";
    spanTitle.innerHTML = "Title: " + myLibrary[index].title;
    spanAuthor.innerHTML = "Author: " + myLibrary[index].author;
    spanPages.innerHTML = "Pages: " + myLibrary[index].pages;
    book.appendChild(spanTitle);
    book.appendChild(spanAuthor);
    book.appendChild(spanPages);
    book.appendChild(readButton);
    book.appendChild(deleteButton);
  }
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

