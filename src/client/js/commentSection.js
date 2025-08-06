const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const textarea = form.querySelector("textarea");
  const text = textarea.value; // Get the value from the textarea
  const videoId = videoContainer.dataset.id; // Get the video ID from the data attribute
  if (text === "") {
    return; // If the textarea is empty, do nothing
  }
  await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = ""; // Clear the textarea after submission
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
