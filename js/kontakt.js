// Muutujad
var validate = function(e) {
    var fields = document.querySelectorAll('.form-container textarea, .form-container input[type="text"]');
    var regEx;
    var removeSpan;
    var par;
    var check = false;
    var val;
    var errArr = [];

    for (var i = 0; i < fields.length; i++) {
        if (fields[i].value === "") {
          // Kontrollib, kas vajalikud lahtrid on tühjaks jäetud, ja annab errori, kui on
            if (fields[i].nextElementSibling.classList.contains('error')) {
              removeSpan = fields[i].nextElementSibling;
              par = fields[i].parentNode;
              par.removeChild(removeSpan);
              fields[i].nextElementSibling.innerHTML = fields[i].placeholder + " on vajalik";
              fields[i].style.boxShadow = "0 0 2px 1px #cc0001";
              check = false;
              errArr.push(fields[i]);
            }
            fields[i].nextElementSibling.innerHTML = fields[i].placeholder + " on vajalik";
            fields[i].style.boxShadow = "0 0 2px 1px #cc0001";
            check = false;
            errArr.push(fields[i]);
        } else {

            // Kontrollib, kas sisestatud nimi on sobilik (ei kasuta kahtlaseid/mitte-sobilikke sümboleid)
            if (fields[i].id !== 'email' && fields[i].id !== 'phone') {
                val = isValidChar(fields[i]);
                if(val === false) {
                  fields[i].nextElementSibling.innerHTML = "Teie nimi pole sobilik";
                  fields[i].style.boxShadow = "0 0 2px 1px #cc0001";
                  check = false;
                  errArr.push(fields[i]);
                } else {
                  fields[i].nextElementSibling.innerHTML = "";
                  fields[i].style.boxShadow = "none";
                  check = true;
                }
            }
            // Kontrollib, kas sisestatud telefoni number on sobilik (ei kasuta kahtlaseid/mitte-sobilikke sümboleid)
            if(fields[i].id === 'phone') {
              val = isValidPhone(fields[i]);
              if(val === false) {
                fields[i].nextElementSibling.innerHTML = "Teie telefoni number pole sobilik";
                fields[i].style.boxShadow = "0 0 2px 1px #cc0001";
                check = false;
                errArr.push(fields[i]);
              } else {
                fields[i].nextElementSibling.innerHTML = "";
                fields[i].style.boxShadow = "none";
                check = true;  
              }
            }
            // Kontrollib, kas sisestatud email on sobilik (ei kasuta kahtlaseid/mitte-sobilikke sümboleid)
            if (fields[i].id === 'email') {
                val = isValidEmail(fields[i]);
                if(val === false) {
                    fields[i].nextElementSibling.innerHTML = "Teie email pole sobilik";
                    fields[i].style.boxShadow = "0 0 2px 1px #cc0001";
                    check = false;
                    errArr.push(fields[i]);
                } else {
                    fields[i].nextElementSibling.innerHTML = "";
                    fields[i].style.boxShadow = "none";
                    check = true;
                }
            }
        }
    }
  
    return check

    // Eraldi toodudud funktsioonid, mis aitavad sobilikkuse kontrollimiseks
    function isValidEmail(e) {
        regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var email = e.value;
        if (!regEx.test(email)) {
            return false;
        }
    }
    
    function isValidChar(e) {
        regEx = /^[a-zA-Z@#$%!?^&*()_+\-=\[\]{};':"\\|,.\/? ]*$/;
        var value = e.value;
        if (!regEx.test(value)) {
            return false;
        }
    }
    
    function isValidPhone(e) {
      regEx = /^[+]?[(]?[+]?\d{2,4}[)]?[-\s]?\d{2,8}[-\s]?\d{2,8}$/;
      var value = e.value;
      if(!regEx.test(value)) {
        return false;
      }
    }
};

/* viide* https://www.codehim.com/text-input/contact-form-validation-in-javascript/ */