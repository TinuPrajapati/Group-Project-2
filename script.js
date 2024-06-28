/*++++++++++++++++++++++++++++++ for Home page ++++++++++++++++++++++++++++++*/
const change1 = document.getElementById("c-1");
const change2 = document.getElementById("c-2");
const change3 = document.getElementById("c-3");

/*++++++++++++++++++++++++++++++ for Home page ++++++++++++++++++++++++++++++*/
const changeText = (text, value) => {
    let count = 0;
    if (value < 50) {
        let change = setInterval(() => {
            text.innerHTML = `${count}+`;
            count++;
        }, 100);
        setTimeout(() => {
            clearInterval(change)
        }, (value + 1) * 100);
    } else {
        let change = setInterval(() => {
            text.innerHTML = `${count}+`;
            count++;
        }, 50);
        setTimeout(() => {
            clearInterval(change)
        }, (value + 1) * 50);
    }

};
changeText(change1, 15);
changeText(change2, 240);
changeText(change3, 2);

/*++++++++++++++++++++++++++++++ for Home page js end ++++++++++++++++++++++++++++++*/

/*++++++++++++++++++++++++++++++ for Services page ++++++++++++++++++++++++++++++*/
const addItems = document.querySelectorAll(".add-item");
const removeItems = document.querySelectorAll(".remove-item");
const sampleDiv = document.querySelector(".sample");
const tbody = document.querySelector(".t-body");
const table = document.querySelector(".table");
const totalAmount = document.getElementById("final-amount");
const submitBtn = document.getElementById("submit-btn");
const inputBox = document.querySelectorAll("input");
const bottomLine = document.querySelector(".bottom-line");

/*++++++++++++++++++++++++++++++ for Services page variable ++++++++++++++++++++++++++++++*/
let count = 1, sum = 0, srNo = 0;

/*++++++++++++++++++++++++++++++ for Services page add btn ++++++++++++++++++++++++++++++*/
addItems.forEach((btn) => {
    btn.addEventListener("click", () => {
        sampleDiv.remove();
        submitBtn.style.backgroundColor = "#0cacfc";
        let value = giveElement(btn);
        let tr = document.createElement("div");
        tr.innerHTML = `<p>${count++}</p>
        <p>${value[0]}</p>
        <p>${value[1]}</p>`;
        tr.classList.add("t-row");
        tr.classList.add("tbody-row");
        tbody.appendChild(tr);
        sum += parseInt(value[1].slice(1));
        totalAmount.innerHTML = `₹${sum}`;
        value[2].classList.toggle("remove");
    });
});

/*++++++++++++++++++++++++++++++ for Services page submit btn ++++++++++++++++++++++++++++++*/
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let alert = document.createElement("p");
    // give alert if table body is empty  
    if (tbody.children.length == 0) {
        bottomLine.innerHTML = '';
        alert.innerHTML = `<i class="ri-information-line"></i>Add the items to the cart and book`;
        alert.style.color = "red";
    }
    else {
        sendEmail();
        bottomLine.innerHTML = '';
        alert.innerHTML = `<i class="ri-information-line"></i>Thanks For using our services`;
        alert.style.color = "green";
        for(input of inputBox){
            input.value = '';
        }
        print();
        for(btn of removeItems){
           if(btn.style.diaplay!="none"){
            btn.style.display = "none";
           }
        }
    }
    bottomLine.appendChild(alert);
    setTimeout(() => {
        bottomLine.innerHTML = '';
    }, 5000);
});



/*++++++++++++++++++++++++++++++ for Services page remove btn ++++++++++++++++++++++++++++++*/
removeItems.forEach((btn) => {
    btn.addEventListener("click", () => {
        let value = giveElement(btn);
        for (row of tbody.children) {
            if (row.children[2].innerHTML == value[1]) {
                srNo = parseInt(row.children[0].innerHTML);
                row.remove();
            }
        }
        value[2].classList.toggle("remove");
        let amount = totalAmount.innerHTML.slice(1) - value[1].slice(1);
        totalAmount.innerHTML = `₹${amount}`;
        // add the sample-div if table body is empty  
        if (tbody.children.length == 0) {
            print();
        }
    });
});

/*++++++++++++++++++++++++++++++ for common property for both btn ++++++++++++++++++++++++++++++*/
function giveElement(value) {
    let serviceName = value.parentElement.parentElement.children[0].children[1].innerHTML;
    let servicePrice = value.parentElement.parentElement.children[0].children[3].innerHTML;
    let changeBtn = value.parentElement.children[1];
    return [serviceName, servicePrice, changeBtn];
}

function print() {
    tbody.innerHTML='';
    table.append(sampleDiv);
    submitBtn.style.backgroundColor = "#892be25c"
    sum = 0;
    count = 1;
    
}

function sendEmail(){
    let params={
        name:document.querySelector("#name").value,
        email:document.querySelector("#email").value,
        Phone_Number:parseInt(document.querySelector("#number").value),
    };
    emailjs.send("service_rs4hjbp","template_l8b9rbi",params).then(()=>{
        alert("Email was successfully sent");
    });
};