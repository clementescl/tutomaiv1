document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");

  // Show the modal when the page loads
  modal.style.display = "block";

  // Close the modal when the 'x' button is clicked
  closeModal.onclick = () => {
    modal.style.display = "none";
  };

  // Close the modal when clicking outside of it
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Move the event listeners inside the DOMContentLoaded event
  document.getElementById("neverButton").addEventListener("click", neverHaveIEver);
  document.getElementById("lyricsButton").addEventListener("click", finishTheLyrics);
  document.getElementById("verdadButton").addEventListener("click", truth);
  document.getElementById("retoButton").addEventListener("click", dare);
});

function displayResult(text) {
  const result = document.getElementById("result");
  result.textContent = text;
}

async function neverHaveIEver() {
  const prompt = "Generate a diferent hot 'Never Have I Ever' statement.";
  const response = await openAIRequest(prompt);
  displayResult(response);
  console.log("Never Have I Ever response:", response);
}

async function finishTheLyrics() {
  const prompt = "Give me a random number between 1 and 6";
  const response = await openAIRequest(prompt);
  displayResult(response);
  console.log("Finish the Lyrics response:", response);
}

async function truth() {
  const prompt = "Give me a truth question for the game Truth or Dare:";
  const response = await openAIRequest(prompt);
  displayResult(response);
  console.log("truth response", response);
}

async function dare() {
  const prompt = "Give me a hot dare that could be consider ofensive for the game Truth or Dare:";
  const response = await openAIRequest(prompt);
  displayResult(response);
  console.log("dare response", response);
}

async function openAIRequest(prompt) {
  const apiKey = "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";
  const url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  try {
    const response = await axios.post(url, {
      prompt: prompt,
      max_tokens: 30,
      n: 1,
      stop: null,
      temperature: 1.0
    }, { headers });

    console.log("API response:", response);

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    }
  } catch (error) {
    console.error("Error in OpenAI request:", error);
  }
  return "";
}
