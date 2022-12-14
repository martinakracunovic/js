window.onload = function() {

    // --- MENU/LINKS FOR FOOTER/HEADER 

    const menuArr = [
        ["index.html", "Home"],
        ["menu.html", "Menu"],
        ["author.html", "Author"],
        ["reservation.html", "Reservation"]
    ]
    const linksArr = [
        ["docs.pdf", "Docs"],
        ["js/main.js", "Js"],
        ["sitemap.xml", "Sitemap"]
    ]

    // ---- MEAL [name, description, img, price] 

    const Breakfast = [
        ["Smokey Sun", "Smoked prosciutto, chives, three eggs", "smokeySun.png","5,99"],
        ["Italian space", "Omelet with green pesto, sun-dried tomatoes and Parmesan, served in a tortilla", "italianSpace.png", "3,75"],
        ["Continental", "Bacon, Emmental cheese, three eggs, beans, grilled tomato, bun, drink", "continental.png", "7,21"],
    ];

    const Lunch = [
        ["Philadelphia", "Grilled steak strips, cheddar, cheese, tomato, grilled red onion and pepper, iceberg","philadelphia.png", "14,54"],
        ["Trappist", "Grilled beef, Trappist cheese, meat from the ribs, mixed green salads, sweet and spicy chili sauce", "trapist.png", "10,03"],
        ["Silver Surfer", "Surf and turf, beef, gambori, mixed green salad, roasted peppers with garlic, thousand island dressing", "surfer.png", "31,53"],
        ["Spore Drive", "Beef burger with white grilled cheese and mixed mushrooms in oil, sour cream, arugula salad", "spore.png", "9,23"]
    ];

    const Dinner = [
        ["Esa Tuna", "Grilled tuna fillet with black and white sesame on grilled vegetables", "tuna.png", "14,54"],
        ["Rocket smash", "Grilled sausage stuffed with cheese, mashed potatoes, maple syrup and mustard sauce, grilled onions", "rocket.png", "10,03"],
        ["Steak", "Grilled steak, tagliat with Cafe de Pris butter medallions, vegetables, thick fries", "steak.png", "10,53"],
        ["Attack", "Nudle sa pečenim grskavim batacima iz rerne, tikvicama, šargarepom, crvenom paprikom, indijskim oraščićima", "attack.png", "16,23"]
    ];

    const mealsArr = [Breakfast, Lunch,  Dinner];
    const mealsArrString = ["Breakfast", "Lunch", "Dinner"];

    // -------------------- ALL PAGES INITIAL FUNCTION

    menuHeader(menuArr);
    menuFooter(menuArr);
    linksFooter(linksArr);

    // -------------------- SPECIFIC PAGE ( INDEX ) 

    let page = window.location.pathname;
    if(page == '/' || page.indexOf('index') != -1) {
        mainPageSlider();
    }

    if(page.indexOf('reservation') != -1) {
        var now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        document.getElementById('inputDateTime').setAttribute("min", now.toISOString().slice(0,16));
    }

    if(page.indexOf('menu') != -1) {
        insertMeals();
        filterMeals();
    }
    
    // -------------------- ALL PAGES (MENU - FO0TER/HEADER ; LINKS - FOOTER)
    
    function linksFooter(linksArr){
        let html = '';
        for (let i = 0; i < linksArr.length; i++) {
            html += ` <li class="nav-item"><a href="${linksArr[i][0]}" target="_blanc"class="nav-link text-secondary">${linksArr[i][1]}</a></li>`;
        }
        $('#links').html(html);
    }

    function menuFooter(menuArr) {

        let page = window.location.pathname;
        let menuFooter = document.querySelector("#footer-meni-ul");  
        let html = '';

        for (let i = 0; i < menuArr.length; i++) {
            if ((page == '/' || page.indexOf('index') != -1) && i == 0){
                html+= ` <li class="nav-item"><a href="${menuArr[i][0]}" class="nav-link text-dark">${menuArr[i][1]}</a></li>`;
            } else if ((page.indexOf('menu') != -1) && i == 1){
                html+= ` <li class="nav-item"><a href="${menuArr[i][0]}" class="nav-link text-dark">${menuArr[i][1]}</a></li>`;
            } else if ((page.indexOf('author') != -1) && i == 2){
                html+= ` <li class="nav-item"><a href="${menuArr[i][0]}" class="nav-link text-dark">${menuArr[i][1]}</a></li>`;
            } else if ((page.indexOf('reservation') != -1) && i == 3){
                html+= ` <li class="nav-item"><a href="${menuArr[i][0]}" class="nav-link text-dark">${menuArr[i][1]}</a></li>`;
            } else {
                html+= ` <li class="nav-item"><a href="${menuArr[i][0]}" class="nav-link text-secondary">${menuArr[i][1]}</a></li>`;
            }
        }
        menuFooter.innerHTML = html;
    }

    function menuHeader(menuArr) {

        let menuHeader = document.querySelector("#myTopnav"); 
        let page = window.location.pathname;

        let html = `<a class="navbar-brand" href="index.html">
        <img src="img/restologo.png" alt="Restaurant and Cafe"/>
        </a>`;

        for (let i = 0; i < menuArr.length; i++) {
            if ((page == '/' || page.indexOf('index') != -1) && i == 0){
                html+= `<a href=${menuArr[i][0]} class="text-dark">${menuArr[i][1]}</a>`;
            } else if ((page.indexOf('menu') != -1) && i == 1){
                html+= `<a href=${menuArr[i][0]} class="text-dark">${menuArr[i][1]}</a>`;
            } else if ((page.indexOf('author') != -1) && i == 2){
                html+= `<a href=${menuArr[i][0]} class="text-dark">${menuArr[i][1]}</a>`;
            } else if ((page.indexOf('reservation') != -1) && i == 3){
                html+= `<a href=${menuArr[i][0]} class="text-dark">${menuArr[i][1]}</a>`;
            } else {
                html+= `<a href=${menuArr[i][0]} class="text-secondary">${menuArr[i][1]}</a>`;
            }
        }
        
        menuHeader.innerHTML = html;
    }

    // -------------------- MODAL

    var modal = document.getElementById("contactUsModal"); 
    var btn = document.getElementById("contactUs");  
    var span = document.getElementsByClassName("close")[0]; 

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    //-------------------- VALIDATION 

    //--------- RESERVATION -------------
    $("#reservation").submit(function(event) {
        event.preventDefault();

        //regex
        let regName = /^[A-Z][a-z]{2,15}(\s[A-Z][a-z]{2,15}){0,4}$/;
        let regPhone = /^06[0-9]{7,8}$/;
        let regMaxPersons = 10;

        var regDateTime = new Date();
        regDateTime.setMinutes(regDateTime.getMinutes() - regDateTime.getTimezoneOffset());
        regDateTime.toISOString().slice(0,16);

        let spanName = $('#errNameReservation');
        let spanPhone = $('#errPhone');
        let spanDate = $('#errDateTime');
        let spanPersons = $('#errPersons');

        let elName = $('#inputNameResrvation');
        let elPhone = $('#inputPhone');
        let elDate = $('#inputDateTime');
        let elPersons = $('#inputPersons');

        if (checkInput(elName, elName.val(), spanName, regName, 'Name must start with capital letter')){
            if (checkInput(elPhone, elPhone.val(), spanPhone, regPhone, "Phone must start with '06' and have 9 or 10 digits without spacing")){
                if (checkInput(elDate, elDate.val(), spanDate, regDateTime, 'Reservation must be in future :)')){
                    if (checkInput(elPersons, parseInt(elPersons.val()), spanPersons, regMaxPersons, 'Number of persons must be between one and ten')) {
                        $('#reservationSuccess').removeClass('d-none').html("Successfuly reservation");
                        $('#reservation').trigger("reset");
                    }
                }
            }
        }
    })

    //--------- CONTACT 
    $("#contactUsForm").submit(function(event) {
        event.preventDefault();
        
        //regex
        let regFullName = /^[A-Z][a-z]{2,15}(\s[A-Z][a-z]{2,15}){0,4}$/;
        let regEmail = /^[a-z]((\.|-|)?[a-z0-9]){2,}@[a-z]((\.|-|)?[a-z0-9]+){2,}\.[a-z]{2,6}$/i;
        let regTextarea = /^[A-Za-z0-9 .'?!,@$#-_]{20,300}/;

        //input error spans
        let spanName = $('#errName');
        let spanEmail = $('#errEmail');
        let spanMessage = $('#errMessage');

        //input elements
        let elName = $('#inputName');
        let elEmail = $('#inputEmail');
        let elMessage = $('#inputMessage');

        if (checkInput(elName, elName.val(), spanName, regFullName, 'Full name must start with capital letter')){
            if (checkInput(elEmail, elEmail.val(), spanEmail, regEmail, "Email isn't correct")){
                if (checkInput(elMessage, elMessage.val(), spanMessage, regTextarea, 'Text must contain at least 20 letters and maximum 300')) {
                    $('#contactSuccess').removeClass('d-none').html("Successfuly send message");
                    $('#contactUsForm').trigger("reset");
                }
            }
        }
    })
    
    //validation functions
    function checkInput(element, value, errorSpan, regex, regexErrorMessage){

        errorSpan.html('');

        if (value === '') {
            showFormErrorMessage(element, errorSpan, 'Field is required')
            return false;
        }

        if (element.attr('type') == 'datetime-local') {
            return true
        }

        if (element.attr('type') == 'number') {
            return value > 0 && value <= regex ? true : false;
        }
        
        if (!regex.test(value)) {
            showFormErrorMessage(element, errorSpan, regexErrorMessage)
            return false
        }
        return true;
    }

    function showFormErrorMessage(element, errorSpan, message) {
        errorSpan.html(message);
        element.focus();
        element.addClass('shake');
        setTimeout(() => {
            element.removeClass('shake');
        }, 500)
    }

    //-------------------- MENU - RESPONSIVE
    document.querySelector(".icon").addEventListener("click", (event) => {
        var x = document.querySelector(".dropdown-menu");

        if (x.classList.contains('d-none')) {
            x.classList.remove("d-none");
            document.querySelector(".icon").classList.add("bg-light");
        } else {
            x.classList.add("d-none");
            document.querySelector(".icon").classList.remove("bg-light");
        }
    })

    // -------------------- INDEX
    function mainPageSlider(){
        var slideIndex = 0;
        var slides,dots;
        showSlides();

        function showSlides() {
            var i;
            slides = document.getElementsByClassName("mySlides");
            dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
            }
            slideIndex++;
            if (slideIndex> slides.length) {slideIndex = 1}    
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block";  
            dots[slideIndex-1].className += " active";
            setTimeout(showSlides, 4000); // Change image every 4 seconds
        }
    }
    
    // -------------------- MENU
    function insertMeals() {
        $('.mealfilter').removeClass( "btn-danger" ).addClass( "btn-outline-danger" );
        $('.mealfilter').first().removeClass( "btn-outline-danger" ).addClass( "btn-danger" );
        
        let meals = document.getElementById("meals");
        meals.innerHTML = ``;

        for (let i = 0; i < mealsArr.length; i++) {
            meals.innerHTML += `
                <h2 id="${mealsArrString[i]}" class=" text-secondary pl-2 mt-5 mb-3 pt-2 pb-2 col-12">${mealsArrString[i]}</h2>
                <div class="container d-flex justify-content-start flex-wrap">`
            for (let j = 0; j < mealsArr[i].length; j++) {
                meals.innerHTML += `
                    <div class="card border border-0 text-center col-sm-6 col-md-4 mb-3 px-5">
                        <img class="rounded card-img-top pt-3" src="img/${mealsArr[i][j][2]}" alt="${mealsArr[i][j][0]}"/>
                        <div class="card-body">
                            <h5 class="card-title font-weight-bold">${mealsArr[i][j][0]}</h5>
                            <p class="card-text text-secondary">${mealsArr[i][j][1]}</p>
                            <p class="text-dark">${mealsArr[i][j][3]} $</p>
                        </div>
                    </div>
                `;
            }

            meals.innerHTML += `</div>
            `;
        }
    }
    
    function filterMeals() {
        $(".mealfilter").on('click', function () {
            let id = $(this).data('id');

            $('.mealfilter').removeClass( "btn-danger" ).addClass( "btn-outline-danger" );
            $(this).removeClass( "btn-outline-danger" ).addClass( "btn-danger" );
            if(id === 0){
                insertMeals();
            }
            else{
                showMeals(id-1);
            }
        })
    }

    function showMeals(id){
        let meals = document.getElementById("meals");
        meals.innerHTML = ``;

        mealsToShowArray = mealsArr[id];
        meals.innerHTML += `
            <h2 id="${mealsArrString[id]}" class=" text-secondary pl-2 mt-5 mb-3 pt-2 pb-2 col-12">${mealsArrString[id]}</h2>
            <div class="container d-flex justify-content-start flex-wrap">`
        ;
        for (let j = 0; j < mealsToShowArray.length; j++) {
            meals.innerHTML += `
                <div class="card border border-0 text-center col-sm-6 col-md-4 mb-3 px-5">
                    <img class="rounded card-img-top pt-3" src="img/${mealsToShowArray[j][2]}" alt="${mealsToShowArray[j][0]}"/>
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">${mealsToShowArray[j][0]}</h5>
                        <p class="card-text text-secondary">${mealsToShowArray[j][1]}</p>
                        <p class="text-dark">${mealsToShowArray[j][3]} $</p>
                    </div>
                </div>
            `;
        }
        meals.innerHTML += `</div>
        `;
    }
}