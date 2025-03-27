// Function to Show Food Details
function showDetails(title, description, imageSrc) {
    document.getElementById("foodTitle").textContent = title;
    document.getElementById("foodDescription").textContent = description;
    document.getElementById("foodImage").src = imageSrc;
    document.getElementById("foodImage").alt = title;

    document.getElementById("foodList").classList.add("hidden");
    document.getElementById("foodDetails").classList.remove("hidden");
    document.querySelector(".description").classList.add("hidden");
}

// Function to Return to Main Menu
function goBack() {
    document.getElementById("foodDetails").classList.add("hidden");
    document.getElementById("foodList").classList.remove("hidden");
    document.querySelector(".description").classList.remove("hidden");
}

// Main Menu Button Click
document.getElementById("mainMenuButton").addEventListener("click", goBack);
