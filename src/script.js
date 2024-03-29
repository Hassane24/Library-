// Firebase setup
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";

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

const db = getFirestore(app);

const bookTitle = document.getElementById("book-title");
const anAuthor = document.getElementById("author");
const pages_input = document.getElementById("pages");
const openFormbutton = document.querySelector("[data-form-target]");
const closeFormbutton = document.querySelector("[data-close-button]");
const overlay = document.querySelector("#overlay");
const submitButton = document.querySelector(".submit");
const mainContent = document.getElementById("main-content");
const checkBox = document.getElementById("checkbox");
let myLibrary = [];

async function getBooksFromDB() {
  const queryDocs = query(collection(db, "Books"));
  const docs = await getDocs(queryDocs);
  docs.forEach((doc) => {
    myLibrary.push(
      new Book(
        doc.data().title,
        doc.data().author,
        doc.data().pages,
        doc.data().isRead
      )
    );
  });
  addBookToDisplay();
}

getBooksFromDB();

submitButton.addEventListener("click", (e) => {
  const form = document.querySelector(".active");
  if (
    bookTitle.value === "" ||
    anAuthor.value === "" ||
    pages_input.value === ""
  )
    return;
  closeForm(form);

  setDoc(
    doc(db, "Books", bookTitle.value).withConverter(bookConverter),
    new Book(bookTitle.value, anAuthor.value, pages_input.value, readOrNot())
  );
  addBookToLibrary();
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

function readOrNot() {
  if (checkBox.checked) return true;
  else return false;
}

const bookConverter = {
  toFirestore: (book) => {
    return {
      author: book.author,
      title: book.title,
      pages: book.pages,
      isRead: book.isRead,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Book(data.title, data.pages, data.author);
  },
};

class Book {
  constructor(title, author, pages, isRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
  }

  toggle() {
    this.isRead = !this.isRead;
  }
}

function addBookToLibrary() {
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
    pages_input.value,
    readOrNot()
  );
  myLibrary.push(newBook);
  addBookToDisplay();
  // Resetting form's state
  bookTitle.value = "";
  anAuthor.value = "";
  pages_input.value = "";
  checkBox.checked = false;
}

function addBookToDisplay() {
  myLibrary.forEach((Book, index) => {
    Book.id = "book" + index;
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
    deleteButton.textContent = "Delete Book";
    if (Book.isRead) readButton.textContent = "Read";
    else readButton.textContent = "Not read";
    spanTitle.textContent = "Title: " + Book.title;
    spanAuthor.textContent = "Author: " + Book.author;
    spanPages.textContent = "Pages: " + Book.pages;
    deleteButton.addEventListener("click", () => {
      const title = spanTitle.textContent.split(":")[1].trim();
      const docRef = doc(db, "Books", title);
      deleteDoc(docRef);
      bookCard.remove();
      myLibrary = myLibrary.filter((bookCard) => {
        return bookCard.id !== Book.id;
      });
    });
    readButton.addEventListener("click", () => {
      const title = spanTitle.textContent.split(":")[1].trim();
      const docRef = doc(db, "Books", title);
      updateDoc(docRef, { isRead: !Book.isRead });
      if (Book.isRead) {
        Book.toggle();
        return (readButton.textContent = "Not read");
      }
      if (!Book.isRead) {
        Book.toggle();
        return (readButton.textContent = "Read");
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
