const express = require("express");

const app = express();

app.use(express.json());

const books = [];

const generateId = (array) => {
    return array.length + 1;
};

app.post("/", (req, res) => {
    console.log(req.body);
    res.send({
        message: "Welcome to our book store"
    });
});

app.post("/api/create", (req, res) => {
    const { author, isbn, title, pages } = req.body;

    if (!author || !isbn || !title || !pages) {
        return res.status(400).send({
            success: false,
            error: "Field cannot be empty"
        });
    }

    let newBook = {
        id: generateId(books),
        author,
        isbn,
        title,
        pages,
    };

    books.push(newBook);

    return res.status(201).send({
        success: true,
        message: `${title} added successfully`,
        data: newBook
    });
});

app.get("/api/all", (req, res) => {
    return res.status(200).send({
        success: true,
        message: "Successfully retrieved all books",
        data: books
    });
});

app.get("/api/book/:isbn", (req, res) => {
    const { isbn } = req.params;
    const book = books.find(book => book.isbn === isbn);

    if (!book) {
        return res.status(404).send({
            success: false,
            message: "Book not found"
        });
    }

    return res.status(200).send({
        success: true,
        data: book
    });
});

app.listen(3000, () => {
    console.log("Server running on http://127.0.0.1:3000");
});
