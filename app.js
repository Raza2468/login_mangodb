$(document).ready(function () {
    $("#myBtn").click(function () {
        $("#myModal").modal();
    });
});

//  ========>

const sub = () => {
    let namei = document.getElementById("name").value
    let emaili = document.getElementById("email").value
    let passwordi = document.getElementById("password").value

    var user = {
        name: namei,
        email: emaili,
        password: passwordi,
    }

    let request = new XMLHttpRequest();
    let url = "http://localhost:3001/signup";
    request.open("POST", url);

    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(user))

    request.onreadystatechange = () => {
        // let jsonRes = JSON.parse(request.responseText)
        // console.log(request.responseText);
        // alert(jsonRes)    
        // if (request.readyState === 4) { 
            console.log(request.responseText);
        // }
    //     if (request.readyState === 4) { 
    //         if (request.readyState === 200) {

    //             alert(jsonRes.message)

    //         } else {

    //             alert(jsonRes.message)

    //         }
    //     }
    }

    return false;
}

// ============>


function sin() {

    var email = document.getElementById("emailsin").value
    var password = document.getElementById("passwordsin").value
    // console.log(usrname);
    // console.log(pswd);

    obj = {
        email: email,
        password: password,

    }

    let request = new XMLHttpRequest();
    let url = "http://localhost:3001/login";
    request.open("POST", url);
    request.setRequestHeader('Content-Type', 'application/json')

    request.send(JSON.stringify(obj))
    request.onreadystatechange = () => {
        let JSONres = JSON.parse(request.responseText)
        console.log(request.responseText);
        if (request.readyState === 4) {
            // alert(JSONres.message)
            if (request.readyState === 200) {

                alert(JSONres.message)

            } else {

                alert(JSONres.message)

            }
        }
    }
    return false;
}
// function chat() {
 
//     // location.replace("public/index.html")
// }
// ==============>//====================>