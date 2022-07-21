// Firebase setup
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA9SbIS7D8NP1faq2gG7m0etzFUU80CDUY",
  authDomain: "library-c938b.firebaseapp.com",
  projectId: "library-c938b",
  storageBucket: "library-c938b.appspot.com",
  messagingSenderId: "744180381562",
  appId: "1:744180381562:web:ce01fada52acd5e75188c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
  if (
    bookTitle.value === "" ||
    anAuthor.value === "" ||
    pages_input.value === ""
  )
    return;
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

class Book {
  constructor(title, author, pages, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = true;
    this.id = id;
  }

  info() {
    if (checkBox.checked) {
      return (this.isRead = true);
    } else return (this.isRead = false);
  }

  toggle() {
    this.isRead = !this.isRead;
  }
}

function addBookToLibrary() {
  submitButton.addEventListener("click", () => {
    if (
      bookTitle.value === "" ||
      anAuthor.value === "" ||
      pages_input.value === ""
    )
      return;
    removeElementsByClass("book");
    const newBook = new Book(
      bookTitle.value,
      anAuthor.value,
      pages_input.value
    );
    newBook.info();
    myLibrary.push(newBook);
    addBookToDisplay();
    bookTitle.value = "";
    anAuthor.value = "";
    pages_input.value = "";
    checkBox.checked = false;
  });
}

addBookToLibrary();

function addBookToDisplay() {
  myLibrary.forEach((Book, index) => {
    Book.id = "book" + [index];
    const bookCard = document.createElement("div");
    const spanTitle = document.createElement("span");
    const spanAuthor = document.createElement("span");
    const spanPages = document.createElement("span");
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    bookCard.classList.add("book");
    readButton.classList.add("read-button");
    deleteButton.classList.add("delete-button");
    mainContent.appendChild(bookCard);
    bookCard.appendChild(spanTitle);
    bookCard.appendChild(spanAuthor);
    bookCard.appendChild(spanPages);
    bookCard.appendChild(readButton);
    bookCard.appendChild(deleteButton);
    deleteButton.innerHTML = "Delete Book";
    if (Book.isRead) readButton.innerHTML = "Read";
    else readButton.innerHTML = "Not read";
    spanTitle.innerHTML = "Title: " + Book.title;
    spanAuthor.innerHTML = "Author: " + Book.author;
    spanPages.innerHTML = "Pages: " + Book.pages;
    deleteButton.addEventListener("click", () => {
      bookCard.remove();
      myLibrary = myLibrary.filter((bookCard) => {
        return bookCard.id !== Book.id;
      });
    });
    readButton.addEventListener("click", () => {
      if (Book.isRead) {
        Book.toggle();
        return (readButton.innerHTML = "Not read");
      }
      if (!Book.isRead) {
        Book.toggle();
        return (readButton.innerHTML = "Read");
      }
    });
  });
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}