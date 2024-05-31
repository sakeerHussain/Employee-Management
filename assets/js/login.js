// Login -js


const logIn = document.getElementById("logIn");
logIn.addEventListener("click" , async () =>{
    console.log("Login btn clicked");
    let isvalid = logInFormValidation()

    if(!isvalid){
        return;
       
    }else {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try{
            const respone = await fetch("http://localhost:5001/api/users/login" , {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email , password })
            });
            if(respone.ok){
                const result = await respone.json();
                console.log(result);
                // window.location.href = "/logIn";
            } else{
                console.log("Login failed");
            }
        }catch{
            console.error(error);
        }
    }

});

function logInFormValidation(){
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let isValid = true;

    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    if(!emailPattern.test(email)){
        document.getElementById("emailError").textContent = "*invalid email";
        isValid = false;
    }

    if(password === ""){
        document.getElementById("passwordError").textContent = "*password required";
        isValid = false;
    }

    document.getElementById("logInForm").addEventListener("input", (event) =>{
        DataName = event.target.id ;
        let errorId = `${DataName}Error`;
        document.getElementById(errorId).textContent = "" ;
    })
}