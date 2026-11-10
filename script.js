async function checkComment() {
    const inputElement = document.getElementById('commentInput');
    const text = inputElement.value.trim();
    const resultDiv = document.getElementById('result');

    if (!text) {
        resultDiv.innerText = "Please enter your comment text!";
        resultDiv.style.color = "orange";
        return;
    }

    resultDiv.innerText = "Analyzing the comment...";
    resultDiv.style.color = "black";

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error('Server error');
        }

        const data = await response.json();
        const probability = (data.probability * 100).toFixed(1);

        if (data.label === "Toxic" || data.label === "toxic") {
            resultDiv.innerHTML = `⚠️ <span style="color: red;">Toxic comment</span> (Probability: ${probability}%)`;
        } else {
            resultDiv.innerHTML = `✅ <span style="color: green;">Normal comment</span> (Probability: ${probability}%)`;
        }

    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerText = "❌ Could not connect to the server. Make sure that app.py is running!";
        resultDiv.style.color = "red";
    }
}