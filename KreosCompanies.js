let geography = {"6":"Sweden", "15":"Austria", "16":"Belgium", "18":"Netherlands", "19":"Finland", "20":"France", "21":"Germany", "22":"Ireland", "23":"Israel", "24":"Netherlands", "25":"Spain", "26":"Switzerland", "27":"United Kingdom", "28":"USA", "31":"Italy", "33":"Poland"};

let industry = {"8":"Cleantech", "9":"Communications", "10":"Consumer", "11":"Life Schiences", "12":"Other", "13":"Semiconductor/Hardware", "14":"Software", "56":"Fintech"};

function stripHTML(str){
    let el = document.createElement("div");
    el.innerHTML = str;
    return el.textContent;
 };