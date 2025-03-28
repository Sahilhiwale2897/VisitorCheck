function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "security" && password === "Security") {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        alert("Invalid Credentials!");
    }
}

function checkInVisitor() {
    const name = document.getElementById("Visitor-name").value;
    const address = document.getElementById("Visitor-address").value;
    const phone = document.getElementById("Visitor-phone").value;
    const email = document.getElementById("Visitor-email").value;
    
    const now = new Date();
    const checkInDate = now.toLocaleDateString();
    const checkInTime = now.toLocaleTimeString();

    if (name && address && phone && email) {
        const table = document.getElementById("visitor-log");
        const row = table.insertRow();
        row.innerHTML = `
            <td>${name}</td>
            <td>${address}</td>
            <td>${phone}</td>
            <td>${email}</td>
            <td>${checkInDate}</td>
            <td>${checkInTime}</td>
            <td id="checkout-date-${phone}">-</td>
            <td id="checkout-time-${phone}">-</td>
            <td><button id="checkout-btn-${phone}" onclick="checkOutVisitor('${phone}')">Check-Out</button></td>
        `;

        document.getElementById("Visitor-name").value = "";
        document.getElementById("Visitor-address").value = "";
        document.getElementById("Visitor-phone").value = "";
        document.getElementById("Visitor-email").value = "";
    } else {
        alert("Please fill all details");
    }
}

function checkOutVisitor(phone) {
    const checkoutDateCell = document.getElementById(`checkout-date-${phone}`);
    const checkoutTimeCell = document.getElementById(`checkout-time-${phone}`);
    const checkoutBtn = document.getElementById(`checkout-btn-${phone}`);

    if (checkoutDateCell.innerText === "-") {
        const now = new Date();
        checkoutDateCell.innerText = now.toLocaleDateString();
        checkoutTimeCell.innerText = now.toLocaleTimeString();

        // Disable the checkout button after use
        checkoutBtn.innerText = "Checked Out";
        checkoutBtn.disabled = true;
    } else {
        alert("Visitor has already checked out!");
    }
}
