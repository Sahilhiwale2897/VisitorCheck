document.addEventListener("DOMContentLoaded", function () {
    const loginPage = document.getElementById("login-page");
    const dashboard = document.getElementById("dashboard");
    const visitorLog = document.getElementById("visitor-log");

    // ✅ Check if user is already logged in
    if (localStorage.getItem("loggedIn") === "true") {
        loginPage.style.display = "none";
        dashboard.style.display = "block";
    }

    // ✅ Restore visitors from localStorage
    let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    displayVisitors();

    // Login Function
    window.login = function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (username === "security" && password === "Security") {
            localStorage.setItem("loggedIn", "true"); // ✅ Store login state
            loginPage.style.display = "none";
            dashboard.style.display = "block";
        } else {
            alert("Invalid Credentials!");
        }
    };

    // Check-In Visitor
    window.checkInVisitor = function () {
        const name = document.getElementById("Visitor-name").value;
        const address = document.getElementById("Visitor-address").value;
        const phone = document.getElementById("Visitor-phone").value;
        const email = document.getElementById("Visitor-email").value;

        const now = new Date();
        const checkInDate = now.toLocaleDateString();
        const checkInTime = now.toLocaleTimeString();

        if (name && address && phone && email) {
            const visitor = {
                name,
                address,
                phone,
                email,
                checkInDate,
                checkInTime,
                checkOutDate: "-",
                checkOutTime: "-",
            };

            visitors.push(visitor);
            localStorage.setItem("visitors", JSON.stringify(visitors)); // ✅ Save visitors
            displayVisitors();

            // Clear input fields
            document.getElementById("Visitor-name").value = "";
            document.getElementById("Visitor-address").value = "";
            document.getElementById("Visitor-phone").value = "";
            document.getElementById("Visitor-email").value = "";
        } else {
            alert("Please fill all details");
        }
    };

    // Check-Out Visitor
    window.checkOutVisitor = function (phone) {
        visitors = visitors.map(visitor => {
            if (visitor.phone === phone && visitor.checkOutDate === "-") {
                const now = new Date();
                visitor.checkOutDate = now.toLocaleDateString();
                visitor.checkOutTime = now.toLocaleTimeString();
            }
            return visitor;
        });

        localStorage.setItem("visitors", JSON.stringify(visitors)); // ✅ Save check-out info
        displayVisitors();
    };

    // Display Visitors in Table
    function displayVisitors() {
        visitorLog.innerHTML = ""; // Clear table
        visitors.forEach((visitor) => {
            const row = visitorLog.insertRow();
            row.innerHTML = `
                <td>${visitor.name}</td>
                <td>${visitor.address}</td>
                <td>${visitor.phone}</td>
                <td>${visitor.email}</td>
                <td>${visitor.checkInDate}</td>
                <td>${visitor.checkInTime}</td>
                <td>${visitor.checkOutDate}</td>
                <td>${visitor.checkOutTime}</td>
                <td>
                    <button id="checkout-btn-${visitor.phone}" 
                        onclick="checkOutVisitor('${visitor.phone}')" 
                        ${visitor.checkOutDate !== "-" ? "disabled" : ""}>
                        ${visitor.checkOutDate === "-" ? "Check-Out" : "Checked Out"}
                    </button>
                </td>
            `;
        });
    }

    // ✅ Logout Function (Clears login state)
    window.logout = function () {
        localStorage.removeItem("loggedIn");
        loginPage.style.display = "block";
        dashboard.style.display = "none";
    };
});
