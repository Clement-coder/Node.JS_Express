 document.getElementById("postForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const categoryId = document.getElementById("category_id").value;
    const imageFile = document.getElementById("image").files[0];

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", categoryId);

    if (imageFile) {
      formData.append("featured_image", imageFile);
    }

    fetch("https://test.blockfuselabs.com/api/posts", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("✅ Post created:", data);

        // Create new div at bottom
        const newDiv = document.createElement("div");
        newDiv.innerHTML = `
          <h3>New Post Added 🎉</h3>
          <p><strong>Title:</strong> ${data.title}</p>
          <p><strong>Content:</strong> ${data.content}</p>
          <p><strong>Category ID:</strong> ${data.category_id}</p>
        `;

        document.getElementById("postContainer").appendChild(newDiv);
        alert("Post submitted successfully ✅");
      })
      .catch((error) => {
        console.error("❌ Error:", error);
        alert("Something went wrong: " + error.message);
      });
  });