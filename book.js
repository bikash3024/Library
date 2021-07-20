let myLibrary = [];
const booksContainerDiv = document.querySelector("#books-container");
const totalBooks = document.querySelector("#totalBooks");
const totalReadBooks = document.querySelector("#totalReadBooks");
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const noOfPagesInput = document.querySelector('#book-noOfpages');
const readOrNotInput = document.querySelector('#read-or-not-select');
const addBookButton = document.querySelector("#add-book");
const formSubmitButton = document.querySelector(".submitButton");
const formContainer = document.querySelector(".form-container")
let currentNoBooks = 0;

function Book(title, author, noOfPages, readOrNot) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.read = readOrNot;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.noOfPages}, ${this.read} yet.`
    }
}



let book1 = new Book("Atomic Habits", "James Clear", 306, "not read");
let book2 = new Book("The richest man in Babylon", "George Clason", 144, "Read");
let book3 = new Book("Atomic Habits", "James Clear", 306, "not read");
let book4 = new Book("The richest man in Babylon", "George Clason", 144, "Read");
let book5 = new Book("Atomic Habits", "James Clear", 306, "not read");
let book6 = new Book("The richest man in Babylon", "George Clason", 144, "Read");
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
myLibrary.push(book5);
myLibrary.push(book6);


function refreshBooks() {

    for (let i = currentNoBooks; i < myLibrary.length; i++) {

        let bookdiv = document.createElement("div");
        bookdiv.classList.add("card");
        let titleBook = document.createElement('h3');
        titleBook.textContent = myLibrary[i].title;
        let authorBook = document.createElement('p');
        authorBook.textContent = `Author: ${myLibrary[i].author}`;
        let pagesBook = document.createElement('p');
        pagesBook.textContent = `No of pages: ${myLibrary[i].noOfPages}`;

        bookdiv.appendChild(titleBook);
        bookdiv.appendChild(authorBook);
        bookdiv.appendChild(pagesBook);
        bookdiv.dataset.index = currentNoBooks;

        booksContainerDiv.appendChild(bookdiv);

        currentNoBooks++;
    }

    const allBookCards = Array.from(document.querySelectorAll(".card"));
    allBookCards.forEach((e) => {
        console.log(e);
    })

    totalBooks.textContent = "Total books: " + myLibrary.length;
}




function showForm() { // this function will show the form and also resets the input values

    document.querySelector('#book-title').value = "";
    document.querySelector('#book-author').value = "";
    document.querySelector('#book-noOfpages').value = '';
    document.querySelector('#read-or-not-select').selectedIndex = 0;

    validateForm();

    formContainer.classList.remove("displayNone");
}

function submitForm() {

    let titleValue = titleInput.value;
    let authorValue = authorInput.value;
    let noOfPagesValue = noOfPagesInput.value;
    let readOrNotValue = readOrNotInput.value;

    let newBook = new Book(titleValue, authorValue, noOfPagesValue, readOrNotValue);
    myLibrary.push(newBook);
    refreshBooks();

    formContainer.classList.add("displayNone");
}

addBookButton.addEventListener("click", showForm);


formSubmitButton.addEventListener("click", submitForm);


function validateForm() { // this function enables or disables the submit button based on validations

    if (document.querySelector('#book-title').value == "" || document.querySelector('#book-author').value == "" || document.querySelector('#book-noOfpages').value == "") {
        formSubmitButton.disabled = true;
    } else {
        console.log("enabled")
        formSubmitButton.disabled = false;
    }

}


refreshBooks();
titleInput.addEventListener("keyup", validateForm);
authorInput.addEventListener("keyup", validateForm);
noOfPagesInput.addEventListener("keyup", validateForm);
readOrNotInput.addEventListener("change", validateForm);

const allBookCards = Array.from(document.querySelectorAll(".card"));
allBookCards.forEach((e) => {
    console.log(e);
})