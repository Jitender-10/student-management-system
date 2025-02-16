document.addEventListener("DOMContentLoaded", function () {
    loadCourses();

    document.getElementById("enrollmentForm").addEventListener("submit", function (event) {
        event.preventDefault();
        validateForm();
    });
});

function loadCourses() {
    fetch("courses.xml")
        .then(response => response.text())
        .then(xmlText => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlText, "application/xml");
            let courses = xmlDoc.getElementsByTagName("course");
            let tableBody = document.querySelector("#courseTable tbody");
            let dropdown = document.getElementById("course");

            for (let course of courses) {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${course.getElementsByTagName("name")[0].textContent}</td>
                    <td>${course.getElementsByTagName("code")[0].textContent}</td>
                    <td>${course.getElementsByTagName("duration")[0].textContent}</td>
                    <td>${course.getElementsByTagName("eligibility")[0].textContent}</td>
                    <td>${course.getElementsByTagName("fees")[0].textContent}</td>
                `;
                tableBody.appendChild(row);

                let option = document.createElement("option");
                option.value = course.getElementsByTagName("code")[0].textContent;
                option.textContent = course.getElementsByTagName("name")[0].textContent;
                dropdown.appendChild(option);
            }
        });
}

function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let course = document.getElementById("course").value;

    if (!name || !email || !mobile || !course) {
        alert("All fields are required!");
        return;
    }

    document.getElementById("confirmationMessage").textContent = "Enrollment Successful!";
}
