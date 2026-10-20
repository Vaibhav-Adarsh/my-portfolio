const messageField = document.getElementById("message");
const characterCount = document.getElementById("charCount");

if (messageField && characterCount) {
    const updateCharacterCount = () => {
        characterCount.textContent = String(messageField.value.length);
    };

    messageField.addEventListener("input", updateCharacterCount);
    updateCharacterCount();
}
