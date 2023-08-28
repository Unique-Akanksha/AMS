window.onload = function(){
    

    // check loginData is available or not
    if(localStorage.getItem("loginData") == null){
        document.querySelector("#set-btn").style.display = "block";
        document.querySelector("#access-btn").style.display = "none";
    }
    else{
        document.querySelector("#set-btn").style.display = "none";
        document.querySelector("#access-btn").style.display = "block";
        document.querySelector("#item-username").style.display = 'none';
    }

    // store data  in localStorage

    var set_btn = document.querySelector("#set-btn");

    set_btn.onclick = function(){
        var user_name = document.querySelector("#user-name").value;
        var user_email = document.querySelector("#user-email").value;
        var user_password = document.querySelector("#user-password").value;

        if(user_name == "" && user_email == "" && user_password == ""){
            document.querySelector("#password-empty-notice").style.display = 'block';
        }
        else {
            document.querySelector("#password-empty-notice").style.display = 'none';
            document.querySelector("#user-name").style.display = 'none';


            if(localStorage.getItem("loginData") == null){
                var object = [{
                    name :  user_name,
                    email : user_email,
                    password : user_password
                }];
        
                var data = JSON.stringify(object);
                localStorage.setItem("loginData", data);    
            }
            else{
                var stored_data = localStorage.getItem("loginData");
                var data = JSON.parse(stored_data);
    
                var object = {
                    name :  user_name,
                    email : user_email,
                    password : user_password
                }
    
                data.push(object);
    
                var store = JSON.stringify(data);
    
                localStorage.setItem("loginData",store);
            }

            // localStorage.setItem("password", btoa(user_input));

            window.location = location.href;
        }
    }

    // Login

    var access_btn = document.querySelector("#access-btn");

    access_btn.onclick = function(){
        var storedData = localStorage.getItem("loginData");
        var dataArray = JSON.parse(storedData);

        var user_email =  document.querySelector("#user-email").value;
        var user_password = document.querySelector("#user-password").value;
        
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].email === user_email && dataArray[i].password === user_password) {
              
              document.querySelector("#container").style.display = 'none';
              document.querySelector("#password-wrong").style.display = 'none';
              document.querySelector("#app-page").style.display = 'block';
              break;
            }
            else{
                document.querySelector("#password-wrong").style.display = "block";
            }
          }

          // if( real_password == user_password){
        //     document.querySelector("#container").style.display = 'none';
        //     document.querySelector("#password-wrong").style.display = "none";
        //     document.querySelector("#app-page").style.display = 'block';
        // }
        // else{
        //     document.querySelector("#password-wrong").style.display = "block";
        // }
      
    }



    // show contact form
    var add_btn = document.querySelector("#add-btn");

    add_btn.onclick = function(){
        document.querySelector("#contact-form").style.display = 'block';
        document.querySelector("#save-btn").style.display = 'block';
        document.querySelector("#add-btn").style.display = 'none';
    }

    var save_btn = document.querySelector("#save-btn");
    save_btn.onclick = function(){
        var contact_name = document.querySelector("#contact-name").value;
        var contact_no = document.querySelector("#contact-number").value;

        if(localStorage.getItem("contact") == null){
            var object = [{
                name :  contact_name,
                number : contact_no
            }];
    
            var data = JSON.stringify(object);
            localStorage.setItem("contact", data);    
        }
        else{
            var stored_data = localStorage.getItem("contact");
            var data = JSON.parse(stored_data);

            var object = {
                name : contact_name,
                number : contact_no
            }

            data.push(object);

            var store = JSON.stringify(data);

            localStorage.setItem("contact",store);
        }
        document.querySelector("#save-btn").style.display = 'none';
        document.querySelector("#add-btn").style.display = 'block';
        document.querySelector("#contact-form").style.display = 'none';


        var ion_item = document.createElement("ion-item");
        document.querySelector("#app-page").append(ion_item);

        var ion_button = document.createElement("ion-button");
        ion_button.slot = "end";
        ion_button.color = "success";
        ion_button.style.width = "30px";
        ion_button.style.height = "30px";
        ion_button.shape = "round";
        ion_button.href = "tel:"+contact_no;
        ion_item.append(ion_button);

        var ion_icon = document.createElement("ion-icon");
        ion_icon.name = "call";
        ion_button.append(ion_icon);

        var ion_label = document.createElement("ion-label");    
        ion_item.append(ion_label);

        var h3 = document.createElement("h3");
        h3.innerHTML = contact_name;
        ion_label.append(h3);

        var p = document.createElement("p");
        p.innerHTML = contact_no;
        ion_label.append(p);
    }


    // show contact 
    // var all_contact = localStorage.getItem("contact");
    // var data = JSON.parse(all_contact);
    // var i;
    // for (i = 0; i < data.length; i++){
    //     var name = data[i].name;
    //     var number = data[i].number;

    //     var ion_item = document.createElement("ion-item");
    //     document.querySelector("#app-page").append(ion_item);

    //     var ion_button = document.createElement("ion-button");
    //     ion_button.slot = "end";
    //     ion_button.color = "success";
    //     ion_button.style.width = "30px";
    //     ion_button.style.height = "30px";
    //     ion_button.shape = "round";
    //     ion_button.href = "tel:"+number;
    //     ion_item.append(ion_button);

    //     var ion_icon = document.createElement("ion-icon");
    //     ion_icon.name = "call";
    //     ion_button.append(ion_icon);

    //     var ion_label = document.createElement("ion-label");    
    //     ion_item.append(ion_label);

    //     var h3 = document.createElement("h3");
    //     h3.innerHTML = name;
    //     ion_label.append(h3);

    //     var p = document.createElement("p");
    //     p.innerHTML = number;
    //     ion_label.append(p);

    // }

    document.addEventListener("backbutton",function(){
        navigator.app.exitApp();
    });
}