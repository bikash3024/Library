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

function createReadOrNotContainer(currentNoBooks) {

    let container = document.createElement("div");
    container.classList.add("readOrNotContainer");
    container.dataset.index = currentNoBooks;
    let notReadSpan = document.createElement("span");
    notReadSpan.textContent = "Not Read";
    let readSpan = document.createElement("span");
    readSpan.textContent = "Read";
    let label = document.createElement("label");
    label.classList.add("switch");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.dataset.index = currentNoBooks;
    let roundSlider = document.createElement("div");
    roundSlider.classList.add("slider", "round");

    label.appendChild(input);
    label.appendChild(roundSlider);

    container.appendChild(notReadSpan);
    container.appendChild(label);
    container.appendChild(readSpan);

    return container;

}

function createBookCard(book, currentNoBooks) {

    let bookCard = document.createElement("div");
    bookCard.classList.add("card");
    let titleBook = document.createElement('h3');
    titleBook.textContent = book.title;
    let authorBook = document.createElement('p');
    authorBook.textContent = `Author: ${book.author}`;
    let pagesBook = document.createElement('p');
    pagesBook.textContent = `No of pages: ${book.noOfPages}`;

    bookCard.appendChild(titleBook);
    bookCard.appendChild(authorBook);
    bookCard.appendChild(pagesBook);
    bookCard.dataset.index = currentNoBooks;
    let readOrNotContainer = createReadOrNotContainer(currentNoBooks);
    bookCard.appendChild(readOrNotContainer);

    return bookCard;

}


function refreshBooks() {

    for (let i = currentNoBooks; i < myLibrary.length; i++) {

        let bookCard = createBookCard(myLibrary[i], currentNoBooks);

        booksContainerDiv.appendChild(bookCard);

        currentNoBooks++;
    }

    // const allBookCards = Array.from(document.querySelectorAll(".card"));
    // allBookCards.forEach((e) => {
    //     e.addEventListener("click", )
    // })

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