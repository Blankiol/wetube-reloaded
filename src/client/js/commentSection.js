const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addcomment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment"; // Set the class for the new comment
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`; // Set the text content of the span to the comment text
  newComment.appendChild(icon);
  newComment.appendChild(span);
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
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = ""; // Clear the textarea after submission

  if (status === 201) {
    addcomment(text);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
