const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addcomment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id; // Set the data-id attribute to the comment ID
  newComment.className = "video__comment"; // Set the class for the new comment
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`; // Set the text content of the span to the comment text
  const span2 = document.createElement("span");
  span2.innerText = "❌"; // Create a delete icon
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment); // Append the new comment to the list
};

const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const textarea = form.querySelector("textarea");
  const text = textarea.value; // Get the value from the textarea
  const videoId = videoContainer.dataset.id; // Get the video ID from the data attribute
  if (text === "") {
    return; // If the textarea is empty, do nothing
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = ""; // Clear the textarea after submission
    const { newCommentID } = await response.json(); // Parse the JSON response
    addcomment(text, newCommentID); // Call the function to add the comment
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
