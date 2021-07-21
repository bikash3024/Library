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
let currentIndex = 0;

function Book(title, author, noOfPages, readOrNot) {
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.readOrNot = readOrNot;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.noOfPages}, ${this.readOrNot} yet.`
    }
}



// let book1 = new Book("Atomic Habits", "James Clear", 306, "not read");
// let book2 = new Book("The richest man in Babylon", "George Clason", 144, "Read");
// let book3 = new Book("Atomic Habits", "James Clear", 306, "not read");
// let book4 = new Book("The richest man in Babylon", "George Clason", 144, "Read");
// let book5 = new Book("Atomic Habits", "James Clear", 306, "not read");
// let book6 = new Book("The richest man in Babylon", "George Clason", 144, "Read");
// myLibrary.push(book1);
// myLibrary.push(book2);
// myLibrary.push(book3);
// myLibrary.push(book4);
// myLibrary.push(book5);
// myLibrary.push(book6);

function updateReadOrNotRead(e) {

    let index = e.target.dataset.index;

    if (e.target.checked) {
        myLibrary[index].readOrNot = "Read";
    } else {
        myLibrary[index].readOrNot = "Not Read";
    }
}

function deleteBookFromDatabaseAndFullrefresh(e) {
    let indexToBeDeleted = parseInt(e.target.dataset.index);

    myLibrary.splice(indexToBeDeleted, 1); // Deleting only one book at the index


    const allBooks = Array.from(document.querySelectorAll(".card")); // removing all the books because the library array will be reseted so we are doing full refresh
    allBooks.forEach(book => {
        book.remove();
    });

    currentIndex = 0; // reseting the  current index to 0 so that entire book library is refreshed.
    refreshBooks();

}

function createDeleteBookDiv(currentIndex) {

    let deleteBookDiv = document.createElement("div");
    deleteBookDiv.setAttribute("id", "deleteBookDiv");

    let img = document.createElement("img");
    img.setAttribute("src", "images/deleteImage.svg");
    img.dataset.index = currentIndex;

    img.addEventListener("click", deleteBookFromDatabaseAndFullrefresh);
    deleteBookDiv.appendChild(img);

    return deleteBookDiv;


}


function createReadOrNotContainer(book, currentIndex) {

    let container = document.createElement("div");
    container.classList.add("readOrNotContainer");
    container.dataset.index = currentIndex;
    let notReadSpan = document.createElement("span");
    notReadSpan.textContent = "Not Read";
    let readSpan = document.createElement("span");
    readSpan.textContent = "Read";
    let label = document.createElement("label");
    label.classList.add("switch");
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.dataset.index = currentIndex;
    let roundSlider = document.createElement("div");
    roundSlider.classList.add("slider", "round");

    if (book.readOrNot == "Read") {
        input.checked = true;
    }

    input.addEventListener("change", updateReadOrNotRead);

    label.appendChild(input);
    label.appendChild(roundSlider);

    container.appendChild(notReadSpan);
    container.appendChild(label);
    container.appendChild(readSpan);

    let deleteBookDiv = createDeleteBookDiv(currentIndex);
    container.appendChild(deleteBookDiv);

    return container;

}

function createBookCard(book, currentIndex) {

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
    bookCard.dataset.index = currentIndex;
    let readOrNotContainer = createReadOrNotContainer(book, currentIndex);
    bookCard.appendChild(readOrNotContainer);

    return bookCard;

}



function refreshBooks() {

    for (let i = currentIndex; i < myLibrary.length; i++) {

        let bookCard = createBookCard(myLibrary[i], currentIndex);

        booksContainerDiv.appendChild(bookCard);

        currentIndex++;
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