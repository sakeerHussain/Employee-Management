// const { post } = require("../../routes/employeeRoutes");

const inputs = document.querySelectorAll("input");
const verifyOTP = document.getElementById("verifyOTP");
// iterate overall inputs
inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    //  This code gets the current input element and stores in the currentInput variable
    //  This code gets the next sibiling element of the current input element and stores it in the nextvariable
    //  This code gets the previous element of the current input element and stores it in the prevInput variable
    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;

    // if the value has more than one charecter then clear it
    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }

    // if the next input is disabled and the current value is not empty
    // enable the next input and focus on it
    if (
      nextInput &&
      nextInput.hasAttribute("disabled") &&
      currentInput.value !== ""
    ) {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }

    // if the backspace key is pressed
    // console.log(e)
    if(e.key === "Backspace"){
        // iterate over all inputs again
        inputs.forEach((input, index2) =>{
            // if  the index1 of the current input is less than or equal to the index2 of the input in the the outer loop
            //  and the previous element exists, set the disabled attribute on the input and focus on the previous element
            if(index1 <= index2 && prevInput) {
                input.setAttribute("disabled" , true);
                currentInput.value = "";
                prevInput.focus();
            }
        });
    }
    // if the fourth input(index=3) is not empty and has not disable attribute then
    // add active class if not then remove the active class.
    if(!inputs[3].disabled && !inputs[3].value !== ""){
      verifyOTP.classList.add("active");
        return;
    }
    verifyOTP.classList.remove("active");
  });
});

// focus the first input which index is 0 on window load
window.addEventListener("load", () => inputs[0].focus());



// submitting the OTP from user side__START
verifyOTP.addEventListener("click", async()=>{
  console.log("Verify otp button clicked");
  const otp = Array.from(inputs).map(input => input.value).join("");

  try{
        const response = await fetch("http://localhost:5001/api/users/verifyOTP" , {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({otp})

        });
        if(response.ok){
          const result = await response.json()
          console.log(result);
        } else {
          console.log("Failed to verify OTP");
        }
  }catch(error){
      console.error("Error verifying OTP:" , error);
  }
});
