const colors = {
    Monday: { background: "#90EE90", border: "#66CDAA" }, 
    Tuesday: { background: "#FFFF99", border: "#FFD700" }, 
    Wednesday: { background: "#D8BFD8", border: "#9370DB" }, 
    Thursday: { background: "#98FB98", border: "#32CD32" }, 
    Friday: { background: "#87CEFA", border: "#4682B4" }, 
    Saturday: { background: "#FF6347", border: "#B22222" }, 
    Sunday: { background: "#AFEEEE", border: "#00CED1" }, 
};

document.querySelectorAll(".day-button").forEach(button => {
    button.addEventListener("click", () => createSlidingBox(button.dataset.day));
});

function createSlidingBox(selectedDay) {
    const parentContainer = document.querySelector(".container");
    
    document.querySelectorAll(".floating-box").forEach(box => {
        box.style.top = "-250px";
        setTimeout(() => box.remove(), 1500);
    });
    
    const boxElement = document.createElement("div");
    boxElement.classList.add("floating-box");
    boxElement.style.position = "absolute";
    boxElement.style.left = "65%"; // Keeps the box visible
    boxElement.style.transform = "translateX(-50%)";
    boxElement.style.top = "-200px";
    boxElement.style.width = "150px"; // Increased size
    boxElement.style.height = "150px"; // Increased size
    boxElement.style.backgroundColor = "transparent";
    boxElement.style.border = `10px solid ${colors[selectedDay].border}`;
    boxElement.dataset.targetColor = colors[selectedDay].background;
    
    // Add text inside the box
    boxElement.textContent = selectedDay;
    boxElement.style.display = "flex";
    boxElement.style.alignItems = "center";
    boxElement.style.justifyContent = "center";
    boxElement.style.fontSize = "18px";
    boxElement.style.fontWeight = "bold";
    boxElement.style.color = "black";
    
    parentContainer.appendChild(boxElement);
    
    setTimeout(() => {
        boxElement.style.transition = "top 1.6s ease-in-out, opacity 1s ease";
        boxElement.style.top = "350px";
        boxElement.style.opacity = "0";
    }, 100);
    
    setTimeout(() => {
        detectCollisions();
    }, 100);
}

function detectCollisions() {
    const boxes = document.querySelectorAll(".floating-box");
    
    boxes.forEach(box1 => {
        let isOverlapping = false;
        
        boxes.forEach(box2 => {
            if (box1 !== box2 && checkOverlap(box1, box2)) {
                isOverlapping = true;
            }
        });
        
        box1.style.backgroundColor = isOverlapping ? box1.dataset.targetColor : "transparent";
        box1.style.opacity = isOverlapping ? "0.9" : "1";
    });
    requestAnimationFrame(detectCollisions);
}

function checkOverlap(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}
