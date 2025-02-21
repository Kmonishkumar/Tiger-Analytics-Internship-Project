document.getElementById('contactform').addEventListener('submit',function(event){event.preventDefault();

    const fname=document.getElementById('fname').value;
    console.log(fname)
    const Ename=document.getElementById('email').value;
    const message=document.getElementById('msg').value;

    if(!fname||!Ename||!message){
        alert("Please Fill all the fields in the Contact Form!!!");
        return;
    }
});
