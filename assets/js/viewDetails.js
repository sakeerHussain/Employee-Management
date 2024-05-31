

// Close Icon Action
function closeAction() {
   
    let editEmployeeForm = document.getElementById('editEmployeeForm');
    let overlay = document.getElementById('overlay');

    editEmployeeForm.style.display = "none";
    overlay.style.display = "none";
} 




const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get(`id`);
console.log(id);

viewDetails(id);

function viewDetails(){

fetch(`http://localhost:3000/employees/${id}`)
.then (response =>{
    return response.json()
})
.then(data => {

    
     document.getElementById("EmployeeProfilePic").innerHTML = `<img src="http://localhost:3000/employees/${id}/avatar">`;
               
    const fullName = data.salutation + " " + data.firstName + " " + data.lastName;
    document.getElementById('EmployeeName').innerHTML = fullName;
    document.getElementById('EmployeeMail').innerHTML = data.email;
    document.getElementById('Gender').innerHTML = data.gender;
    document.getElementById('Age').innerHTML = data.dob;
    const DOB = changeformatYMD(data.dob);
    const age = calculateAge(DOB);
    document.getElementById('Dob').innerHTML = age;
    document.getElementById('PhoneNumberDetails').innerHTML = data.phone;
    document.getElementById('QualificationsDetails').innerHTML = data.qualifications;
    document.getElementById('AddressDetails').innerHTML = data.address;
    document.getElementById('UsernameDetails').innerHTML =  data.firstName;

})
}

function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();
    const timeDiff = currentDate - dob;
    const age = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));
    return age;
}
function changeformatYMD(DOB) {
    const [date, month, year] = DOB.split("-");
    let formatteddate = year + "-" + month + "-" + date;
    return formatteddate;
}

let action ="success";



function deleteView(id) {
    fetch(`http://localhost:3000/employees/${id}`, {
        method: 'DELETE',
    }
    ).then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
            // deleteshowPopup();
            console.log(action)

        })
        .catch(error => {
            console.error('Error:', error);
        });

}


// Delete Action in View Employee Form**********

// Delete Employee Popup

let deleteViewEmployee = document.getElementById('deleteViewEmployee');       
deleteViewEmployee.addEventListener("click", deletePopup);


let viewEmployeeCloseAction = document.getElementById('closeBtn');
viewEmployeeCloseAction.addEventListener("click", deletePopupClose);
let cancelDeleteEmployeeId = document.getElementById('cancelDeleteEmployeeId');
cancelDeleteEmployeeId.addEventListener("click", deletePopupClose);

function deletePopup(){
    let deleteEmployePopup = document.getElementById('deleteEmployePopup');
    deleteEmployePopup.style.display = "block";
    let overlay = document.getElementById('overlay');
    overlay.style.display = "block";
}
// Delete Employee Popup close
function deletePopupClose(){
    let deleteEmployePopup = document.getElementById('deleteEmployePopup');
    deleteEmployePopup.style.display = "none";
    let overlay = document.getElementById('overlay');
    overlay.style.display = "none";
}
// Delete Employee

const closeBtn = document.getElementById('deleteEmployeeId');
closeBtn.addEventListener("click" , () =>{
    deleteView(id);
    deletePopupClose()
    window.location.href = "EmployeeManagement_pg-1.html";

} );

// END*********


// Edit Action in ViewEmployee Form*******


// Edit Form display
let editViewEmployee = document.getElementById('editViewEmployee');
editViewEmployee.addEventListener("click" , displayEditForm);
 
function displayEditForm (){
    let editEmployeeForm = document.getElementById('editEmployeeForm');
    editEmployeeForm.style.display = "block";

    let overlay = document.getElementById('overlay');
    overlay.style.display = "block";


    // ID passing

    fetch(`http://localhost:3000/employees/${id}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
           

            const edit_img = document.getElementById("edit_EmployeeImage");
            edit_img.src = `http://localhost:3000/employees/${id}/avatar`;
            document.getElementById("editSalutation").value = data.salutation;
            document.getElementById("editFirstName").value = data.firstName;
            document.getElementById("editLastName").value = data.lastName;
            document.getElementById("editEmail").value = data.email;
            document.getElementById("editMobileNumber").value = data.phone;
            const dobValue = data.dob;
            const [day, month, year] = dobValue.split("-");
            const formattedDob = `${year}-${month}-${day}`;
            document.getElementById("editDateOfBirth").value = formattedDob;
            document.querySelector(`input[name="genderEdit"][value ="${data.gender}"]`).checked = true;
            document.getElementById("editQualification").value = data.qualifications;
            document.getElementById("editAddress").value = data.address;
            document.getElementById("editCountry").value = data.country;
            document.getElementById("editState").value = data.state;
            document.getElementById("editCity").value = data.city;
            document.getElementById("editPin").value = data.pincode;
        })

        const saveEditEmployee = document.getElementById('saveEditEmployee');
        saveEditEmployee.addEventListener("click", () => {
            editViewEmployeeForm(id);
            closeAction()
        })
}   



function editViewEmployeeForm(id) {

    const editSalutation = document.getElementById("editSalutation").value;
    const editFirstName = document.getElementById("editFirstName").value;
    console.log(editFirstName);
    const editLastName = document.getElementById("editLastName").value;
    const editEmail = document.getElementById("editEmail").value;
    const editMobileNumber = document.getElementById("editMobileNumber").value;
    const editDateOfBirth = document.getElementById("editDateOfBirth").value;
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
    const editEmployeeDetails = {
        salutation: editSalutation,
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail,
        phone: editMobileNumber,
        dob: editFormattedDate,
        gender: editGender,
        qualifications: editQualification,
        address: editAddress,
        city: editCity,
        state: editState,
        country: editCountry,
        username: editFirstName,
        password: editMobileNumber,
        pincode: editPin,
    };
    console.log(editEmployeeDetails);
    fetch(`http://localhost:3000/employees/${id}`, {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(editEmployeeDetails),
    })
        .then(response => {
            return response.json();
        })
       
        const edit_upload_file = document.getElementById("edit_upload_file").files[0];
        const formData = new FormData();
            formData.append("avatar" , edit_upload_file);
        fetch(`http://localhost:3000/employees/${id}/avatar`, {
            method: "POST",
            body: formData
        })
    
            .then(data => {
                console.log('API Response:', data);

            })
    
        .catch(error => {
            console.error('Error:', error);
        }) 

}

// Edit Employee Upload Image

let selectedImage = document.getElementById("edit_EmployeeImage");
let edit_upload_file = document.getElementById("edit_upload_file");
edit_upload_file.onchange = function(){
    selectedImage.src = URL.createObjectURL(edit_upload_file.files[0]);
   
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



// Edit

