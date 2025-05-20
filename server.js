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

// Update Book (PUT)

app.put("/api/update/:isbn", (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).send({ success: false, message: "Not found" });

  Object.assign(book, req.body); // update fields
  res.send({ success: true, message: "Updated", data: book });
});


//  Delete Book (DELETE)

app.delete("/api/delete/:isbn", (req, res) => {
  const i = books.findIndex(b => b.isbn === req.params.isbn);
  if (i === -1) return res.status(404).send({ success: false, message: "Not found" });

  res.send({ success: true, message: "Deleted", data: books.splice(i, 1)[0] });
});

// Filter by Author (GET)

app.get("/api/author", (req, res) => {
  const result = books.filter(b => b.author?.toLowerCase() === req.query.name?.toLowerCase());
  res.status(result.length ? 200 : 404).send({
    success: !!result.length,
    message: result.length ? "Found" : "Not found",
    data: result
  });
});





app.listen(3000, () => {
    console.log("Server running on http://127.0.0.1:3000");
});
