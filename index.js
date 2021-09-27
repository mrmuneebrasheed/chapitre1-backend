const express = require("express");
const app = express();
const port = 3000;

const authors = [
    {
        name: "Lawrence Nowell",
        nationality: "UK",
        books: ["Beowulf"],
    },
    {
        name: "William Shakespeare",
        nationality: "UK",
        books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"],
    },
    {
        name: "Charles Dickens",
        nationality: "US",
        books: ["Oliver Twist", "A Christmas Carol"],
    },
    {
        name: "Oscar Wilde",
        nationality: "UK",
        books: [
            "The Picture of Dorian Gray",
            "The Importance of Being Earnest",
        ],
    },
];

app.listen(port, () => {
    console.log(`Server Listening on port: ${port}`);
});

app.get("/", (req, res) => {
    res.send("Authors API");
});

app.get("/authors/:id", (req, res) => {
    const id = +req.params.id;
    const author = authors[id - 1];
    if (author) res.send(`${author.name}, ${author.nationality}`);
    else res.send("Author doesn't exist");
});

app.get("/authors/:id/books", (req, res) => {
    const id = req.params.id;
    const author = authors[id - 1];
    if (author) {
        const authorBooks = authors[id - 1].books;
        const books = authorBooks.join(", ");
        res.send(books);
    } else res.send("Author doesn't exist");
});

app.get("/json/authors/:id", (req, res) => {
    const id = req.params.id;
    const author = authors[id - 1];

    if (author) {
        const response = { name: author.name, nationality: author.nationality };
        res.send(response);
    } else res.send("Author doesn't exist");
});

app.get("/json/authors/:id/books", (req, res) => {
    const id = req.params.id;
    const author = authors[id - 1];

    if (author) {
        const response = { books: author.books };
        res.send(response);
    } else res.send("Author doesn't exist");
});
