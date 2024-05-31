// Close Icon Action
function closeAction() {
    let addEmployeeForm = document.getElementById('AddForm')
    let editEmployeeForm = document.getElementById('editEmployeeForm');
    let overlay = document.getElementById('overlay');

    addEmployeeForm.style.display = "none";
    editEmployeeForm.style.display = "none";
    overlay.style.display = "none";
    clearForm()
}

//*******Fetch Operation*******

const HOST = "http://localhost:5001/api/employees"

function getEmployee() {
    fetch(HOST)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            let tableData = "";

            console.log(data);

            const employee_number = document.getElementById("employeeNumber");
            employee_number.addEventListener("click", getEmployee);
            const TotalCountOnPage = employee_number.value;

            //    Pagination
            const employeeTotal = document.getElementById("employeeTotal");
            employeeTotal.innerHTML = `of ${data.length}`;

            const totalPages = Math.ceil(data.length / TotalCountOnPage);
            pagination(totalPages)
            const start = TotalCountOnPage * (CurrentPage - 1);
            const end = Math.min(TotalCountOnPage * CurrentPage, data.length);

            for (let i = start; i < end; i++) { //displaying fetched data
               const employee = data[i];

                tableData += `<tr>
                    <td>#0${i + 1}</td>
                    <td class="userDetailsBoxImg">
                        <div class="userBoxImg">
                            <img src="/${employee.image}">
                        </div>
                        ${employee.salutation + "." + employee.firstName + " " + employee.lastName}
                    </td>  
                    <td>${employee.email}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.dob}</td>
                    <td>${employee.gender}</td>
                    <td>${employee.country}</td>
                    <td class="active">
                        <button type="button" class="tableDropdown" onclick="dropDownTOggle('${employee._id}')"><i
                                class="fa-solid fa-ellipsis"></i></button>
                        <div id="dropContentRow1" class="dropContent"  >
                            <ul class="dropItems">
                                
                            <li><a href="#" id="viewButton"><i class="fa-solid fa-eye"></i>View Details</a></li>
                            <li><a href="#" id="editButton"><i class="fa-solid fa-pen"></i> Edit</a></li>
                            <li><a href="#" id="deleteEmployeeButton"><i class="fa-solid fa-trash-can"></i>Delete</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>`
            }

            document.getElementById("tableBody").innerHTML = tableData;
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
getEmployee();



//******pagination*******

var CurrentPage = 1;
function pagination(totalPages) {
    var pgnum = document.getElementById("Page_Num_Btns");
    let temp = '';
    for (let i = 1; i <= totalPages; i++) {
        temp += `<button id="page${i}">${i}</button>`
    }
    pgnum.innerHTML = temp;

    pgnum.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            const pageNumber = parseInt(e.target.textContent);
            if (!isNaN(pageNumber)) {
                CurrentPage = pageNumber;
                getEmployee();
            }
        }
    });
    var pageLeftButton = document.getElementById("pageleft");
    var pageRightButton = document.getElementById("pageright");


    if (CurrentPage === 1) {
        pageLeftButton.classList.add('hidden');
    }
    else {
        pageLeftButton.classList.remove('hidden');
    }

    if (CurrentPage === totalPages) {
        pageRightButton.classList.add('hidden');
    }
    else {
        pageRightButton.classList.remove('hidden');
    }

    pageLeftButton.addEventListener("click", function () {
        if (CurrentPage > 1) {
            CurrentPage--;
            getEmployee();
        }
    });
    pageRightButton.addEventListener("click", function () {
        if (CurrentPage < totalPages) {
            CurrentPage++;
            getEmployee();
        }
    });
    const actionButton = document.getElementById(`page${CurrentPage}`);
    actionButton.classList.add('actives');
}


// Add-Employee---------start

const addEmployee = document.getElementById("addEmployee");
addEmployee.addEventListener("click", async (e) => {
  e.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    return;
  }
  const salutation = document.getElementById("salutation").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const mobileNumber = document.getElementById("mobileNumber").value;
  const dateOfBirth = document.getElementById("date").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const qualification = document.getElementById("qualification").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pin = document.getElementById("pin").value;
  const [year, month, day] = dateOfBirth.split("-");
  const formattedDate = `${day}-${month}-${year}`;
  const Image = document.getElementById("inputimage").files[0];

  const formData = new FormData();

  formData.append("employeeProfilePic", Image);
  formData.append("salutation", salutation);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("mobileNumber", mobileNumber);
//   formData.append("date", formattedDate);
  formData.append("date", dateOfBirth);
  formData.append("gender", gender);
  formData.append("qualification", qualification);
  formData.append("address", address);
  formData.append("country", country);
  formData.append("state", state);
  formData.append("city", city);
  formData.append("pin", pin);
  formData.append("username", firstName);
  formData.append("password", mobileNumber);

  //  POST.....
  const apiUrl = "http://localhost:5001/api/employees";
  fetch( apiUrl , {
    method: "POST",
    body: formData ,
  })
    .then((response) => response.json())
    .then((data) =>{
        console.log("API Response:" , data);
        getEmployee();
        employeeAddedSuccesfull()
    })
    .catch((error) => {
        console.error("Error:" , error);
    });
    //   getEmployee();
        CurrentPage = 1;

});
 

// Delete Employee PopUp

function deleteEmployeePopUp(id) {
    // displaying 
    let deleteEmployee = document.getElementById("deleteEmployePopup");
    let overlay = document.getElementById("overlay");
    deleteEmployee.style.display = "block";
    overlay.style.display = "block";
    // Id passing
    const deleteEmployeeId = document.getElementById("deleteEmployeeId");
    deleteEmployeeId.addEventListener("click", () => {
        deleteEmp(id);
    })
}

// DELETE.......
function deleteEmp(id) {
    fetch(`http://localhost:5001/api/employees/${id}`, {
        method: "DELETE",

    })

    dropDownTOggleClose();
    employeeDeletedSuccesfull()
    getEmployee();
}


// Employee  Deleted Successfully

function employeeDeletedSuccesfull() {
    let employeeDeleted = document.getElementById("employeeDeletedPopup");
    employeeDeleted.style.display = "block";
    setTimeout(() => {
        employeeDeleted.style.display = "none";
    }, 700);
}


// Edit Employee Form data insert

function editEmployee(id) {
    let editEmployee = document.getElementById("editEmployeeForm");
    let overlay = document.getElementById("overlay");
    editEmployee.style.display = "block";
    overlay.style.display = "block";
    console.log(id);

    // ID passing

    fetch(`http://localhost:5001/api/employees/${id}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);


            const edit_EmployeeImage = document.getElementById("edit_EmployeeImage");
            edit_EmployeeImage.src = `http://localhost:5001/api/employees/${id}`;         
            document.getElementById("edit_EmployeeImage").src = data.image;
            document.getElementById("editSalutation").value = data.salutation;
            document.getElementById("editFirstName").value = data.firstName;
            document.getElementById("editLastName").value = data.lastName;
            document.getElementById("editEmail").value = data.email;
            document.getElementById("editMobileNumber").value = data.mobileNumber;
            const dobValue = data.dob;
            const [day, month, year] = dobValue.split("-");
            const formattedDob = `${year}-${month}-${day}`;
            document.getElementById("editdob").value = formattedDob;
            document.querySelector(`input[name="genderEdit"][value ="${data.gender}"]`).checked = true;
            document.getElementById("editQualification").value = data.qualification;
            document.getElementById("editAddress").value = data.address;
            document.getElementById("editCountry").value = data.country;
            document.getElementById("editState").value = data.state;
            document.getElementById("editCity").value = data.city;
            document.getElementById("editPin").value = data.pin;
            
        })
        .catch((error) =>{
            console.error("error:" , error)
        }) 
             // Saving Changes
             const editBtn = document.getElementById("saveEditEmployee");
             editBtn.addEventListener("click", async (e) => {
               e.preventDefault();

               const isValid = validateEditForm();
               if (isValid) {
                 editEmployeeForm(id);
                 getEmployee();
                 closeAction();
               }
                return;
             });
};

// EDIT......
function editEmployeeForm(id) {

    const editSalutation = document.getElementById("editSalutation").value;
    const editFirstName = document.getElementById("editFirstName").value;
    const editLastName = document.getElementById("editLastName").value;
    const editEmail = document.getElementById("editEmail").value;
    const editMobileNumber = document.getElementById("editMobileNumber").value;
    const editDateOfBirth = document.getElementById("editdob").value;
    const editGender = document.querySelector('input[name = "genderEdit"]:checked').value;
    const editQualification = document.getElementById("editQualification").value;
    const editAddress = document.getElementById("editAddress").value;
    const editCountry = document.getElementById("editCountry").value;
    const editState = document.getElementById("editState").value;
    const editCity = document.getElementById("editCity").value;
    const editPin = document.getElementById("editPin").value;
    const editDob = editDateOfBirth;
    const [year, month, day] = editDob.split("-");
    const editFormattedDate = `${day}-${month}-${year}`

    const formData = new FormData();
    const edit_upload_file = document.getElementById("edit_upload_file").file[0];
    if(edit_upload_file) {
        formData.append("image" ,edit_upload_file);
    }
    formData.append("salutation",editSalutation);
    formData.append("firstName",editFirstName);
    formData.append("lastName",editLastName);
    formData.append("email",editEmail);
    formData.append("phone",editMobileNumber);
    formData.append("dob",editFormattedDate);
    formData.append("gender",editGender);
    formData.append("qualifications",editQualification);
    formData.append("address",editAddress);
    formData.append("city",editCity);
    formData.append("state",editState);
    formData.append("country",editCountry);
    formData.append("pincode",editPin);
    formData.append("username",editFirstName);
    formData.append("password",editMobileNumber);
    
    console.log(formData);
    
    
    fetch(`http://localhost:5001/api/employees/${id}`, {
        method: "PUT",
        body: formData,
    })
        .then(response => {
            return response.json();
        })
        .then((data) =>{
            console.log("API Response:" , data);
            getEmployee();
            employeeEditedSuccessfull();
        })
        .catch((error) =>{
            console.error("Error:", error);
        });
}

// Employee Edited Successfully

function employeeEditedSuccessfull() {
    let employeeEdited = document.getElementById("employeeEditedPopup");
    employeeEdited.style.display = "block";
    let overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    setTimeout(() => {
        employeeEdited.style.display = "none";
        overlay.style.display = "none";
    }, 700);
}

// Edit Employee Upload Image

let selectedImage = document.getElementById("edit_EmployeeImage");
let edit_upload_file = document.getElementById("edit_upload_file");
edit_upload_file.onchange = function () {
    selectedImage.src = URL.createObjectURL(edit_upload_file.files[0]);

}

// ... button dropdown
function dropDownTOggle(id) {
    console.log(id);
    let optionsButton = document.getElementById("dropContentRow1");

    if (optionsButton.style.display === "none") {
        optionsButton.style.display = "block";
    } else {
        optionsButton.style.display = "none";
    }

    // ************ DELETE EMPLOYEE ***********

    const deleteEmployeeButton = document.getElementById("deleteEmployeeButton");
    deleteEmployeeButton.addEventListener("click", () => {

        deleteEmployeePopUp(id);
        getEmployee();
    })

    // ************* EDIT EMPLOYEE ***********

    const editEmployeeButton = document.getElementById("editButton");
    editEmployeeButton.addEventListener("click", () => {
        editEmployee(id);
        getEmployee();
    })

    //************* VIEW EMPLOYEE ************

    const viewButton = document.getElementById("viewButton");
    viewButton.addEventListener("click", () => {
        const newPageURL = `EmployeeManagement_pg-2.html?id=${id}`;
        window.location.href = newPageURL;
    })
}

// Add Employee Form Popup

function actionAddEmployee() {
    let addEmployeeForm = document.getElementById('AddForm');
    let overlay = document.getElementById('overlay');

    addEmployeeForm.style.display = "block";
    overlay.style.display = "block";
}

// Employee Added Successfully Popup

function employeeAddedSuccesfull() {
    let employeeAdded = document.getElementById("employeeAddedPopup");
    employeeAdded.style.display = "block";
    setTimeout(() => {
        employeeAdded.style.display = "none";
    }, 700);
}

// DropDown Toggle Close

function dropDownTOggleClose() {
    let optionsButton = document.getElementById("dropContentRow1");
    optionsButton.style.display = "none";
}

//Add employee form user picture upload 

let profilePic = document.getElementById("employeeProfilePic");
let inputFile = document.getElementById("inputimage");
inputFile.onchange = function () {
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
    console.log("file path:", inputFile.files[0]);
}

// Search Employee

function searchInput() {
    let searchValue = document.getElementById("searchInput").value;
    // console.log(searchValue);
    searchValue = searchValue.toLowerCase();
    let rows = document.getElementsByTagName("tr");
    let employeeNotFound = document.getElementById("employeeNotFound")
    let found = false;

    for (let i = 1; i < rows.length; i++) {
        if (!rows[i].innerHTML.toLowerCase().includes(searchValue)) {
            rows[i].style.display = "none";
        }
        else {
            rows[i].style.display = "";
            found = true;
        }
    }
    if (found) {
        employeeNotFound.style.display = "none";
    }
    else {
        employeeNotFound.style.display = "block";
    }
}
// clearform
function clearForm() {
    var form = document.getElementById("AddEmp");
    form.reset();
    const imgView = document.getElementById("employeeProfilePic");
    imgView.src = "/image/profile.png";

}

// close icon display none 

function closeDeletePopup() {
    let closeDeletePopup = document.getElementById("deleteEmployePopup")
    closeDeletePopup.style.display = "none"
    overlay.style.display = "none"
}


// Validation - start*******

function validateForm() {
    const salutation = document.getElementById('salutation').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('mobileNumber').value.trim();
    const dobInput = document.getElementById('date');
    const dobError = document.getElementById('dobError');
    const dobValue = dobInput.value.trim();
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    const genderError = document.getElementById('genderError');
    const qualifications = document.getElementById('qualification').value.trim();
    const address = document.getElementById('address').value.trim();
    const country = document.getElementById('country').value.trim();
    const state = document.getElementById('state').value.trim();
    const city = document.getElementById('city').value.trim();
    const pin = document.getElementById('pin').value.trim();



    // regex validation

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^\d{10}$/;
    const namePattern = /^[A-Za-z]+$/;

    let isValid = true;

    // image_validation-----------------
    const imageInput = document.getElementById('inputimage');
    const imageError = document.getElementById('inputimageError');
    if (imageInput.files.length === 0) {
        imageError.textContent = 'Please select an image.';
        isValid = false;
    } else {
        imageError.textContent = "";
    }

    if (salutation === 'select') {
        document.getElementById('salutationError').textContent = 'Invalid select';
        isValid = false;
    }


    if (!namePattern.test(firstName)) {
        document.getElementById('firstNameError').textContent = 'First Name is required';
        isValid = false;
    }


    if (!namePattern.test(lastName)) {
        document.getElementById('lastNameError').textContent = 'Last Name is required';
        isValid = false;
    }


    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid Email';
        isValid = false;
    }

    if (!phonePattern.test(phone)) {
        document.getElementById('mobileNumberError').textContent = 'Invalid Phone Number';
        isValid = false;
    }

    if (dobValue === '') {
        dateError.textContent = 'Date of Birth is required';
        isValid = false;
    }

    if (selectedGender) {
        genderError.textContent = '';
    } else {
        genderError.textContent = 'Please select a gender';
        isValid = false;
    }

    if (qualifications === '') {
        document.getElementById('qualificationError').textContent = 'Qualifications is required';
        isValid = false;
    }

    if (address === '') {
        document.getElementById('addressError').textContent = 'Address is required';
        isValid = false;
    }

    if (country === 'select country') {
        document.getElementById('countryError').textContent = 'country is required';
        isValid = false;
    }
    if (state === 'select state') {
        document.getElementById('stateError').textContent = 'state is required';
        isValid = false;
    }


    if (city === '') {
        document.getElementById('cityError').textContent = 'city is required';
        isValid = false;
    }

    if (pin === '') {
        document.getElementById('pinError').textContent = 'pin is required';
        isValid = false;
    }


    document.getElementById('AddEmp').addEventListener('input', (event) => {
        DataName = event.target.id;
        let errorId = `${DataName}Error`;

        document.getElementById(errorId).textContent = '';

    });

    return isValid;

}

const maleRadioButton = document.getElementById('male');
const femaleRadioButton = document.getElementById('female');
const genderError = document.getElementById('genderError');

maleRadioButton.addEventListener('click', () => {
    genderError.textContent = '';
});

femaleRadioButton.addEventListener('click', () => {
    genderError.textContent = '';
});



// Edit Employee form Validation


function validateEditForm() {

    const salutation = document.getElementById('editSalutation').value.trim();
    const firstName = document.getElementById('editFirstName').value.trim();
    const lastName = document.getElementById('editLastName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const phone = document.getElementById('editMobileNumber').value.trim();
    const dobInput = document.getElementById('editdob');
    const dobError = document.getElementById('editdobError');
    const dobValue = dobInput.value.trim();

    const selectedGender = document.querySelector('input[name="genderEdit"]:checked');
    const genderError = document.getElementById('genderError');

    const qualifications = document.getElementById('editQualification').value.trim();
    const address = document.getElementById('editAddress').value.trim();
    const country = document.getElementById('editCountry').value.trim();
    const state = document.getElementById('editState').value.trim();
    const city = document.getElementById('editCity').value.trim();
    const pin = document.getElementById('editPin').value.trim();



    // regex validation

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^\d{10}$/;
    const namePattern = /^[A-Za-z]+$/;

    let isValid = true;


    if (salutation === 'select') {
        document.getElementById('editSalutationError').textContent = 'Invalid select';
        isValid = false;
    }


    if (!namePattern.test(firstName)) {
        document.getElementById('editFirstNameError').textContent = 'First Name is required';
        isValid = false;
    }


    if (!namePattern.test(lastName)) {
        document.getElementById('editLastNameError').textContent = 'Last Name is required';
        isValid = false;
    }


    if (!emailPattern.test(email)) {
        document.getElementById('editEmailError').textContent = 'Invalid Email';
        isValid = false;
    }

    if (!phonePattern.test(phone)) {
        document.getElementById('EditMobileNumberError').textContent = 'Invalid Phone Number';
        isValid = false;
    }


    if (dobValue === '') {
        dobError.textContent = 'Date of Birth is required';
        isValid = false;
    }


    if (selectedGender) {
        genderError.textContent = '';
    } else {
        genderError.textContent = 'Please select a gender';
        isValid = false;
    }


    if (qualifications === '') {
        document.getElementById('editQualificationError').textContent = 'Qualifications is required';
        isValid = false;
    }


    if (address === '') {
        document.getElementById('editAddressError').textContent = 'Address is required';
        isValid = false;
    }


    if (country === 'select country') {
        document.getElementById('editCountryError').textContent = 'country is required';
        isValid = false;
    }

    if (state === 'select state') {
        document.getElementById('editStateError').textContent = 'state is required';
        isValid = false;
    }


    if (city === '') {
        document.getElementById('editCityError').textContent = 'city is required';
        isValid = false;
    }

    if (pin === '') {
        document.getElementById('editPinError').textContent = 'pin is required';
        isValid = false;
    }


    document.getElementById('editEmp').addEventListener('input', (event) => {
        DataName = event.target.id;
        let errorId = `${DataName}Error`;
        document.getElementById(errorId).textContent = '';

    });

    return isValid;   

} 