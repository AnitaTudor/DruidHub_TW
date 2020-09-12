function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xml_parse(this);
        }
    };
    xhttp.open("GET", "../XML_data/XML_expansion.xml", true);
    xhttp.send();
}



function xml_parse(xml) {

    var xmlDoc = xml.responseXML;

    var XML_doc = xmlDoc.getElementsByTagName("expansion");
    var OK = 0;

    for (let i = 0; i < XML_doc.length; i++) {
        // console.log("sjadsa");
        if (OK == 0) {
            var newArticle = document.createElement("article");
            newArticle.className = "resizable";
            document.getElementById("show-expansion").appendChild(newArticle);
            var heading = document.createElement("h2");
            newArticle.appendChild(heading);
            var newTable = document.createElement("table");
            newArticle.appendChild(newTable);
            var XML_doc = xmlDoc.getElementsByTagName("expansion");
            newArticle.className = XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue;
            heading.innerHTML = XML_doc[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
            newTable.className = "e" + XML_doc[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
            var tr = document.createElement("tr");
            newTable.appendChild(tr);
            var p = document.createElement("p");
            newArticle.appendChild(p);
            p.innerHTML = XML_doc[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;

            var img = document.createElement("img");
            img.src = XML_doc[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;
            p.appendChild(img);

            var p = document.createElement("p");
            newArticle.appendChild(p);
            p.innerHTML = XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue
            myStorage = window.localStorage;
            localStorage.setItem('expansions', heading.innerHTML);

            OK++;
        }

        //console.log("sjadsa");

        for (let x = 0; x < 5; x++) {
            var td = document.createElement("td");
            tr.appendChild(td);
        }



        if (OK == 1) {

            //random change of price, in cazul in care informatia e invechita
            let prices = ['100', '120', '140', '60', '70'];
            var randomprice = prices[Math.floor(Math.random() * prices.length)].toString();
            tr.childNodes[0].innerHTML = "price" + ":" + XML_doc[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
            tr.childNodes[0].innerHTML = "price" + ":" + randomprice;
            tr.childNodes[1].innerHTML = "date" + ":" + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue;
            tr.childNodes[2].innerHTML = "difficulty" + ":" + XML_doc[i].getElementsByTagName("difficulty")[0].childNodes[0].nodeValue;
            tr.childNodes[3].innerHTML = "social_net" + ":" + XML_doc[i].getElementsByTagName("social_net")[0].childNodes[0].nodeValue;
            tr.childNodes[4].innerHTML = "multiplayer" + ":" + XML_doc[i].getElementsByTagName("multiplayer")[0].childNodes[0].nodeValue;

            OK = 0;
        }


        //computedstyle for article backround
        var button_backround = document.createElement("button");
        button_backround.type = "button";
        newArticle.appendChild(button_backround);
        button_backround.onclick = function getBackround() {
            var target = document.getElementById("show-expansion").getElementsByTagName("article");
            for (var i = 0; i < target.length; i++) {
                var p_backround = document.createElement("p");
                p_backround.id = "backround";
                target[i].appendChild(p_backround);
                var elem = document.getElementById("show-expansion").getElementsByTagName("article")[i];
                var backround = window.getComputedStyle(elem, null).backgroundColor;
                console.log(backround);
                p_backround.innerHTML = backround;
            }
        }


        //deletedom
        var txt = document.createTextNode("X");
        var button = document.createElement("button");
        button.type = "button";
        button.className = "delete_dom";
        newArticle.appendChild(button);
        button.appendChild(txt);
        button.style.position = "absolute";
        button.style.right = "0px";
        button.style.top = "0px";
        newArticle.style.position = "relative";
        button.onclick = function() {
            this.parentNode.remove();

        }

        function changeColor_red(element) {
            element.classList.toggle("color_red");

        }

        function changeColor_green(element) {
            element.classList.toggle("color_green");

        }
        var enhance = document.createElement("div");
        enhance.className = "enhance_article";
        changeColor_red(enhance);
        newArticle.appendChild(enhance);

        enhance.onmousedown = function(event) {
            //alert("GET DOWN");
            changeColor_green(this);

            var startX = event.clientX;
            var startY = event.clientY;
            var min_width = 300;
            var max_width = 1300;
            var positionInfo = this.parentNode.getBoundingClientRect();
            var startWidth = positionInfo.width;
            var startHeight = positionInfo.height;
            if (startX >= min_width && startX <= max_width) {
                enhance.onmousemove = function() {
                    this.parentNode.style.width = (startWidth + event.clientX - startX) + 'px';
                    this.parentNode.style.height = (startHeight + event.clientY - startY) + 'px';
                }
            }


        }





    }




    var my_ad = setInterval(function() {
        var div_ad = document.createElement("div");
        div_ad.style.position = "fixed";
        div_ad.style.left = "30%";
        div_ad.style.top = "30%";
        document.body.appendChild(div_ad);
        var img = document.createElement("img");
        img.src = "../images/ad.jpg";
        img.className = "ad_img";
        div_ad.appendChild(img);

        var ad_button = document.createElement("button");
        ad_button.type = button;
        ad_button.innerHTML = "Accept Promotion";
        ad_button.className = "ad_button";
        div_ad.appendChild(ad_button);
        ad_button.onclick = function() {
            alert("U accepted the promotion");
            //alert("visit  cola.com for promotion");
            //div_ad.style.display = "none";
            clearInterval(my_ad);

        }

        setInterval(function() {
            div_ad.style.display = "none";

        }, 3000);




    }, 7000);




    function reverseChildren(parent) {
        for (var i = 1; i < parent.childNodes.length; i++) {
            parent.insertBefore(parent.childNodes[i], parent.firstChild);
        }
    }



    window.onkeydown = function reverseExpansions(event) {


        // console.log(document.getElementById("show-expansion"));
        if (event.keyCode == 17) {
            console.log("YOOOOOOOOO");
            reverseChildren(document.getElementById("show-expansion"));
        }
    }


}

function show_date() {
    var date = new Date();
    alert(date.getDate(), date.getMonth(), date.getFullYear());

}

function validate() {
    var phoneNumber = document.getElementById('phone-number').value;
    var phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    var phoneResult = phoneRGEX.test(phoneNumber);
    alert("phone:" + phoneResult);
}


function helpmeParse_TXT_INPUT() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            filter_BY_TXT_INPUT(this);

        }
    };
    xhttp.open("GET", "../XML_data/XML_expansion.xml", true);
    xhttp.send();

}

function helpmeParse_RANGE_INPUT() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            filter_BY_RANGE_INPUT(this);
        }
    };
    xhttp.open("GET", "../XML_data/XML_expansion.xml", true);
    xhttp.send();

}

function helpmeParse_CHECKBOX_INPUT() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            filter_BY_CHECKBOX_INPUT(this);
        }
    };
    xhttp.open("GET", "../XML_data/XML_expansion.xml", true);
    xhttp.send();

}

function helpmeParse_RADIO_INPUT() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            filter_BY_RADIO_INPUT(this);
        }
    };
    xhttp.open("GET", "../XML_data/XML_expansion.xml", true);
    xhttp.send();

}

function helpmeParse_SELECT_INPUT() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            filter_BY_SELECT_INPUT(this);
        }
    };
    xhttp.open("GET", "../XML_data/XML_expansion.xml", true);
    xhttp.send();

}

function helpmeParse_TEXT_AREA_INPUT() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            filter_BY_TEXT_AREA_INPUT(this);
        }
    };
    xhttp.open("GET", "../XML_data/XML_expansion.xml", true);
    xhttp.send();

}


window.addEventListener("beforeunload", function(e) {
    var confirmationMessage = 'It looks like you have been editing something. ' +
        'If you leave before saving, your changes will be lost.';
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
});

function filter_BY_TXT_INPUT(xml) {

    var xmlDoc = xml.responseXML;
    var XML_doc = xmlDoc.getElementsByTagName("expansion");



    var label_txt = document.createElement("label");
    label_txt.classList.add("label_txt");
    document.getElementById("user-inputs").appendChild(label_txt);
    var input_txt_descr = document.createTextNode("Enter a month");
    label_txt.appendChild(input_txt_descr);

    var input_txt = document.createElement("input");
    input_txt.type = "text";
    label_txt.appendChild(input_txt);

    var filter_button = document.createElement("button")
    filter_button.type = "button";
    filter_button.innerHTML = "Filter";
    filter_button.style.display = "inline";
    label_txt.appendChild(filter_button);

    /* var sort_button = document.createElement("button")
    sort_button.type = "button";
    sort_button.innerHTML = "Sort";
    sort_button.style.display = "inline";
    label_txt.appendChild(sort_button);
*/
    filter_button.onclick = function() {

        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        for (let i = 0; i < target.length; i++) {


            if (XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue.includes(input_txt.value)) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }


    }

    /* sort_button.onclick = function() {
    var date_array = [];
    var normal_dates = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
    var target = document.getElementById("show-expansion").getElementsByTagName("article");
    for (let i = 0; i < target.length; i++) {
        for (let j = 0; j < 12; j++)
            if (XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue.includes(normal_dates[j]))
                date_array[i] = j;


    }

    */
    /*
        console.log(date_array);
        var date_array_copy = date_array.slice();
        var old_length = target.length;
        date_array.sort(function(a, b) {
            return a - b;
        });

        var article_array = [];
        //article_array = document.getElementById("show-expansion").children;
        for (let i = 0; i < target.length; i++)
            article_array[i] = document.getElementById("show-expansion").childNodes[i];

    sort_button.onclick = function() {

        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        for (let i = 0; i < target.length; i++) {

            if (XML_doc[i].getElementsByTagName("price")[0].childNodes[0].nodeValue == input_txt.value) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";

            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }
        for (let j = 0; j < target.length; j++)
            if (target[j].style.backgroundColor != "lightgray") {
                //console.log("ZULUL");
                document.getElementById("show-expansion").appendChild(target[j]);
                target[j].style.display = "block";
            }

    }
   */



}


function filter_BY_RANGE_INPUT(xml) {

    var xmlDoc = xml.responseXML;
    var XML_doc = xmlDoc.getElementsByTagName("expansion");


    var label_range = document.createElement("label");
    document.getElementById("user-inputs").appendChild(label_range);
    var input_range_descr = document.createTextNode("Enter a price");
    label_range.appendChild(input_range_descr);

    var input_range = document.createElement("input");
    input_range.type = "range";
    input_range.min = "50";
    input_range.max = "200";
    label_range.appendChild(input_range);

    var value = document.createElement("p");
    label_range.appendChild(value);

    input_range.oninput = function() {
        value.innerHTML = input_range.value;

    }

    var filter_button = document.createElement("button")
    filter_button.type = "button";
    filter_button.innerHTML = "Filter";
    filter_button.style.display = "inline";
    label_range.appendChild(filter_button);

    /* var sort_button = document.createElement("button")
     sort_button.type = "button";
     sort_button.innerHTML = "Sort";
     sort_button.style.display = "inline";
     label_range.appendChild(sort_button);
     */
    filter_button.onclick = function() {

        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        for (let i = 0; i < target.length; i++) {

            if (XML_doc[i].getElementsByTagName("price")[0].childNodes[0].nodeValue == input_range.value) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";

            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }


    /*  sort_button.onclick = function() {

        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        for (let i = 0; i < target.length; i++) {

            if (XML_doc[i].getElementsByTagName("price")[0].childNodes[0].nodeValue == input_range.value) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";

            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }
        for (let j = 0; j < target.length; j++)
            if (target[j].style.backgroundColor != "lightgray") {
                //console.log("ZULUL");
                document.getElementById("show-expansion").appendChild(target[j]);
                target[j].style.display = "block";
            }

    }

*/


}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function filter_BY_CHECKBOX_INPUT(xml) {
    // var app = express();
    var xmlDoc = xml.responseXML;
    var XML_doc = xmlDoc.getElementsByTagName("expansion");


    var label_box = document.createElement("label");
    document.getElementById("user-inputs").appendChild(label_box);
    var input_box_descr = document.createTextNode("Multiplayer ");
    label_box.appendChild(input_box_descr);

    var input_box1 = document.createElement("input");
    input_box1.type = "checkbox";
    input_box1.value = "YES";
    label_box.appendChild(input_box1);

    var input_box1_descr = document.createTextNode("YES");
    insertAfter(input_box1_descr, input_box1);


    //input_box2_descr = document.createTextNode("NO")
    var input_box2 = document.createElement("input");
    input_box2.type = "checkbox";
    input_box2.value = "NO";
    //input_box2.innerHTML = "NO";
    // input_box2.appendChild(input_box2_descr);
    label_box.appendChild(input_box2);
    //var failure = 0;
    var input_box2_descr = document.createTextNode("NO");
    insertAfter(input_box2_descr, input_box2);

    var filter_button = document.createElement("button")
    filter_button.type = "button";
    filter_button.innerHTML = "Filter";
    filter_button.style.display = "inline";
    label_box.appendChild(filter_button);

    /*var sort_button = document.createElement("button")
    sort_button.type = "button";
    sort_button.innerHTML = "Sort";
    sort_button.style.display = "inline";
    label_box.appendChild(sort_button);
*/
    filter_button.onclick = function() {
            if (input_box1.checked == true) {

                var target = document.getElementById("show-expansion").getElementsByTagName("article");
                for (let i = 0; i < target.length; i++) {

                    if (XML_doc[i].getElementsByTagName("multiplayer")[0].childNodes[0].nodeValue == input_box1.value) {
                        //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                        target[i].style.backgroundColor = "lightgray";
                        target[i].style.display = "block";
                    } else {
                        //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                        target[i].style.display = "none";
                    }

                }
            } else {

                var target = document.getElementById("show-expansion").getElementsByTagName("article");
                for (let i = 0; i < target.length; i++) {

                    if (XML_doc[i].getElementsByTagName("multiplayer")[0].childNodes[0].nodeValue == input_box2.value) {
                        //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                        target[i].style.backgroundColor = "lightgray";
                        target[i].style.display = "block";

                    } else {
                        //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                        target[i].style.display = "none";
                    }

                }

                for (let j = 0; j < target.length; j++)
                    if (target[j].style.backgroundColor != "lightgray") {
                        //console.log("ZULUL");
                        document.getElementById("show-expansion").appendChild(target[j]);
                        target[j].style.display = "block";
                    }



            }

        }
        /* sort_button.onclick = function() {
        if (input_box1.checked == true) {
            var target = document.getElementById("show-expansion").getElementsByTagName("article");
            for (let i = 0; i < target.length; i++) {

                if (XML_doc[i].getElementsByTagName("multiplayer")[0].childNodes[0].nodeValue == input_box1.value) {
                    //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                    target[i].style.backgroundColor = "lightgray";
                    target[i].style.display = "block";
                } else {
                    //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                    target[i].style.display = "none";
                }

            }
            for (let j = 0; j < target.length; j++)
                if (target[j].style.backgroundColor != "lightgray") {
                    //console.log("ZULUL");
                    document.getElementById("show-expansion").appendChild(target[j]);
                    target[j].style.display = "block";
                }
        } else {

            var target = document.getElementById("show-expansion").getElementsByTagName("article");
            for (let i = 0; i < target.length; i++) {

                if (XML_doc[i].getElementsByTagName("multiplayer")[0].childNodes[0].nodeValue == input_box2.value) {
                    //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                    target[i].style.backgroundColor = "lightgray";
                    target[i].style.display = "block";

                } else {
                    //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                    target[i].style.display = "none";
                }

            }
            for (let j = 0; j < target.length; j++)
                if (target[j].style.backgroundColor != "lightgray") {
                    //console.log("ZULUL");
                    document.getElementById("show-expansion").appendChild(target[j]);
                    target[j].style.display = "block";
                }



        }

    }

*/

}


function filter_BY_RADIO_INPUT(xml) {


    var xmlDoc = xml.responseXML;
    var XML_doc = xmlDoc.getElementsByTagName("expansion");


    var label_radio = document.createElement("label");
    document.getElementById("user-inputs").appendChild(label_radio);
    var input_radio_descr = document.createTextNode("Category");
    label_radio.appendChild(input_radio_descr);

    var input_radio1 = document.createElement("input");
    input_radio1.type = "radio";
    //input_radio1.checked = false;
    label_radio.appendChild(input_radio1);
    var input_radio1_descr = document.createTextNode("Pandas");
    insertAfter(input_radio1_descr, input_radio1);


    var input_radio2 = document.createElement("input");
    input_radio2.type = "radio";
    //input_radio2.checked = false;
    label_radio.appendChild(input_radio2);
    var input_radio2_descr = document.createTextNode("Hellscream");
    insertAfter(input_radio2_descr, input_radio2);


    var input_radio3 = document.createElement("input");
    input_radio3.type = "radio";
    // input_radio3.checked = false;
    label_radio.appendChild(input_radio3);
    var input_radio3_descr = document.createTextNode("Horde");
    insertAfter(input_radio3_descr, input_radio3);



    var input_radio4 = document.createElement("input");
    input_radio4.type = "radio";
    //  input_radio4.checked = false;
    label_radio.appendChild(input_radio4);
    var input_radio4_descr = document.createTextNode("Alliance");
    insertAfter(input_radio4_descr, input_radio4);


    var input_radio5 = document.createElement("input");
    input_radio5.type = "radio";
    //input_radio5.checked = false;
    label_radio.appendChild(input_radio5);
    var input_radio5_descr = document.createTextNode("Blood-Elfs");
    insertAfter(input_radio5_descr, input_radio5);

    var input_radio6 = document.createElement("input");
    input_radio6.type = "radio";
    // input_radio6.checked = false;
    label_radio.appendChild(input_radio6);
    var input_radio6_descr = document.createTextNode("Arthas");
    insertAfter(input_radio6_descr, input_radio6);

    var input_radio7 = document.createElement("input");
    input_radio7.type = "radio";
    //input_radio7.checked = false;
    label_radio.appendChild(input_radio7);
    var input_radio7_descr = document.createTextNode("Deathwing");
    insertAfter(input_radio7_descr, input_radio7);


    var input_radio8 = document.createElement("input");
    input_radio8.type = "radio";
    // input_radio8.checked = false;
    label_radio.appendChild(input_radio8);
    var input_radio8_descr = document.createTextNode("Warlords");
    insertAfter(input_radio8_descr, input_radio8);



    var input_radio9 = document.createElement("input");
    input_radio9.type = "radio";
    //input_radio9.checked = false;
    label_radio.appendChild(input_radio9);
    var input_radio9_descr = document.createTextNode("Legion");
    insertAfter(input_radio9_descr, input_radio9);


    input_radio1.onchange = function filter(x) {
        if (this.checked == true) {
            input_radio2.checked = false;
            input_radio3.checked = false;
            input_radio4.checked = false;
            input_radio5.checked = false;
            input_radio6.checked = false;
            input_radio7.checked = false;
            input_radio8.checked = false;
            input_radio9.checked = false;


        }
        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));

            if (XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue.includes("Pandas")) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }

    input_radio2.onchange = function filter(x) {
        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        if (this.checked == true) {
            input_radio1.checked = false;
            input_radio3.checked = false;
            input_radio4.checked = false;
            input_radio5.checked = false;
            input_radio6.checked = false;
            input_radio7.checked = false;
            input_radio8.checked = false;
            input_radio9.checked = false;


        }
        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));

            if (XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue.includes("Hellscream")) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }

    input_radio3.onchange = function filter(x) {
        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        if (this.checked == true) {
            input_radio1.checked = false;
            input_radio2.checked = false;
            input_radio4.checked = false;
            input_radio5.checked = false;
            input_radio6.checked = false;
            input_radio7.checked = false;
            input_radio8.checked = false;
            input_radio9.checked = false;


        }

        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));

            if (XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue.includes("Horde")) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }


    input_radio4.onchange = function filter(x) {
        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        if (this.checked == true) {
            input_radio1.checked = false;
            input_radio2.checked = false;
            input_radio3.checked = false;
            input_radio5.checked = false;
            input_radio6.checked = false;
            input_radio7.checked = false;
            input_radio8.checked = false;
            input_radio9.checked = false;


        }

        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));

            if (XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue.includes("Alliance")) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }

    input_radio5.onchange = function filter(x) {
        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        if (this.checked == true) {
            input_radio1.checked = false;
            input_radio2.checked = false;
            input_radio3.checked = false;
            input_radio4.checked = false;
            input_radio6.checked = false;
            input_radio7.checked = false;
            input_radio8.checked = false;
            input_radio9.checked = false;


        }

        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));

            if (XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue.includes("Blood-Elfs")) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }

    input_radio6.onchange = function filter(x) {
        var target = document.getElementById("show-expansion").getElementsByTagName("article");

        if (this.checked == true) {
            input_radio1.checked = false;
            input_radio2.checked = false;
            input_radio3.checked = false;
            input_radio4.checked = false;
            input_radio5.checked = false;
            input_radio7.checked = false;
            input_radio8.checked = false;
            input_radio9.checked = false;


        }

        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));

            if (XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue.includes("Arthas")) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }

    input_radio7.onchange = function filter(x) {
        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        if (this.checked == true) {
            input_radio1.checked = false;
            input_radio2.checked = false;
            input_radio3.checked = false;
            input_radio4.checked = false;
            input_radio5.checked = false;
            input_radio6.checked = false;
            input_radio8.checked = false;
            input_radio9.checked = false;


        }

        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));

            if (XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue.includes("Deathwing")) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }
    input_radio8.onchange = function filter(x) {
        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        if (this.checked == true) {
            input_radio1.checked = false;
            input_radio2.checked = false;
            input_radio3.checked = false;
            input_radio4.checked = false;
            input_radio5.checked = false;
            input_radio6.checked = false;
            input_radio7.checked = false;
            input_radio9.checked = false;


        }

        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));

            if (XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue.includes("Warlords")) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }
    input_radio9.onchange = function filter(x) {
        var target = document.getElementById("show-expansion").getElementsByTagName("article");

        if (this.checked == true) {
            input_radio1.checked = false;
            input_radio2.checked = false;
            input_radio3.checked = false;
            input_radio4.checked = false;
            input_radio5.checked = false;
            input_radio6.checked = false;
            input_radio7.checked = false;
            input_radio8.checked = false;


        }
        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));

            if (XML_doc[i].getElementsByTagName("category")[0].childNodes[0].nodeValue.includes("Legion")) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }



}


function filter_BY_SELECT_INPUT(xml) {
    var xmlDoc = xml.responseXML;

    var XML_doc = xmlDoc.getElementsByTagName("expansion");


    var label_select = document.createElement("label");
    document.getElementById("user-inputs").appendChild(label_select);
    var input_select_descr = document.createTextNode("Difficulty");
    label_select.appendChild(input_select_descr);

    var input_select = document.createElement("SELECT");
    label_select.appendChild(input_select);
    var easy = document.createElement("option");
    var medium = document.createElement("option");
    var hard = document.createElement("option");
    //console.log("? ? ? ? ");
    easy.value = "easy";
    medium.value = "medium";
    hard.value = "hard";

    easy.innerHTML = "Easy";
    medium.innerHTML = "Medium";
    hard.innerHTML = "Hard";

    input_select.appendChild(easy);
    input_select.appendChild(medium);
    input_select.appendChild(hard);

    input_select.onchange = function filter(x) {
        var target = document.getElementById("show-expansion").getElementsByTagName("article");


        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));

            if ((XML_doc[i].getElementsByTagName("difficulty")[0].childNodes[0].nodeValue.includes("easy") && x.currentTarget.value == "easy") || (XML_doc[i].getElementsByTagName("difficulty")[0].childNodes[0].nodeValue.includes("medium") && x.currentTarget.value == "medium") || (XML_doc[i].getElementsByTagName("difficulty")[0].childNodes[0].nodeValue.includes("hard") && x.currentTarget.value == "hard")) {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }

}


function filter_BY_TEXT_AREA_INPUT(xml) {

    var xmlDoc = xml.responseXML;

    var XML_doc = xmlDoc.getElementsByTagName("expansion");


    var label_text_area = document.createElement("label");
    document.getElementById("user-inputs").appendChild(label_text_area);
    var input_text_area_descr = document.createTextNode("Difficulty");
    label_text_area.appendChild(input_text_area_descr);

    var input_text_area = document.createElement("textarea");
    label_text_area.appendChild(input_text_area);
    input_text_area.rows = "3";
    input_text_area.cols = "30";


    input_text_area.onchange = function filter(x) {
        var target = document.getElementById("show-expansion").getElementsByTagName("article");
        //alert("zulul");

        for (let i = 0; i < target.length; i++) {

            // console.log(document.getElementById("show-expansion").getElementsByTagName("article"));
            // console.log(x.currentTarget.value);
            if (XML_doc[i].getElementsByTagName("description")[0].childNodes[0].nodeValue.includes(x.currentTarget.value) && x.currentTarget.value != "") {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                //console.log(x.currentTarget);
                target[i].style.backgroundColor = "lightgray";
                target[i].style.display = "block";
            } else {
                //console.log(x.currentTarget.value + XML_doc[i].getElementsByTagName("date")[0].childNodes[0].nodeValue);
                target[i].style.display = "none";
            }

        }

    }


}