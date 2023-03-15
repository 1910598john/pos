var itemsContainer = document.getElementById("items-container");
const pickedItems = [];
const price = [];
const play_items = [];
const end_time_list = [];
var totalPrice = 0;
var totalPriceElement = document.getElementById("total-price");
var time_table = document.getElementById("time-table");
var amount = 0;
var change = 0;
var proceedButtonClicked = false;
var receiptProceeding = false;
var cafeItemsPicked = false;
var playgroundItemsPicked = false;
var section = '';
var items_remaining_time = [];
var ticketNumbers = [];
var extendClicked = false;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const time = new Date();
var amountToPay;
var selectedTicket;
var itemName;
var quantityforextension;
var pageReloading = false;
var isEmployee = false;
var discount = [];
var interval;
var discounted = false;
var showAvailableTables = false;
var chosenTable = 'None';
var cafeTicket;
var cashier_balance;
var play_quantity = 0;
var play_item_aded = false;
var play_item_end_time;
var endtime = null;
var foopayment = 0;
setInterval(() => {
    //render time now
    let time = new Date();
    let mon = months[time.getMonth()];
    let date = time.getDate();
    let day = days[time.getDay()];
    let hr = time.getHours();
    let isMorning = true;
    if (hr > 12) {
        hr = hr - 12;
        isMorning = false;
    } 
    let min = time.getMinutes();
    min < 10 ? min = `0${min}` : min = min;
    let txt = 'AM';
    isMorning ? txt = txt : txt = 'PM';

    $("#time-now").html(`${hr}:${min} ${txt} <span style="font-size:25px;">(${mon} ${date}, ${day})</span>`);
    
}, 1000);

//
$("#register").on("click", function(){
    window.open("http://localhost/pos/register.php", "_self");
})
$("#login").on("click", function(){
    window.open("http://localhost/pos/", "_self");
})


$(document).ready(function(){
    $(".side-bar").animate({
        left: "0"
    }, "slow");
    
    /*
    function start_time(map){
        for (let i = 0; i < items_remaining_time.length; i++) {
            if (items_remaining_time[i] == 'No limit'){
                items_remaining_time[i] = 0;
            } else {
                items_remaining_time[i] = parseInt(items_remaining_time[i]);
            }
        }
        //start count down
        let firstId = map.get('firstId');
        let size = firstId - (firstId - map.size) - 1;
        let x = 0;
        let ended_alert_created = false;
        interval = setInterval(startCountdown, 1000);
        
        function startCountdown(){
            //
            if (map.size == 1) {
                clearInterval(interval);
            }
            for(let i = firstId; i < (firstId + size); i++){
                if (map.get(`id${i}`) <= 0) {
                    $(`#time${i}`).html('No limit');
                } else {
                    let rem = map.get(`id${i}`) / 60;
                    rem = Math.round(rem);
                    //time ended
                    if (map.get(`id${i}`) == 1){
                        //update status
                        $.ajax({
                            type: 'POST',
                            url: 'updateTimeStatus.php',
                            data:{
                                id: i,
                            }, 
                            success: function(res){
                                //
                                $(`#time${i}`).html("<span style='font-size:13px;color:red;'>ENDED</span>");
                                if(!ended_alert_created){
                                    //get ticket number
                                    $.ajax({
                                        type: 'post',
                                        url: 'getTicketNumber.php',
                                        data: {
                                            id: i
                                        },
                                        success: function(res){
                                            ended_alert_created = true;
                                            document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                                            <div class="time-ended-alert">
                                                <div>
                                                    <span style="text-align:center;">${res} time ended</span>
                                                    <button>OK</button>
                                                </div>
                                            </div>`)

                                            $(".time-ended-alert > div").css({
                                                "display" : "flex",
                                                "flex-direction": "column",
                                                "width" : "30vw",
                                                "height" : "40vh",
                                                "background" : "#fff",
                                                "border-radius": "10px",
                                                "box-shadow": "0 0 10px red",
                                                "padding" : "5%"
                                            })

                                            $(".time-ended-alert button").on("click", function(){
                                                $(".time-ended-alert").remove();
                                            })
                                        }
                                    })
                                }
                                let notifs = document.querySelectorAll(".check-out-notif");
                                setTimeout(function(){
                                    for (let i = 0; i < notifs.length; i++){
                                        notifs[i].remove();
                                    }
                                }, 10000);
                            }
                        })
                        
                        let notifs = document.querySelectorAll(".check-out-notif");
                        setTimeout(function(){
                            for (let i = 0; i < notifs.length; i++){
                                notifs[i].remove();
                            }
                        }, 10000);
                        
                    
                    } else {
                        $(`#time${i}`).html(rem + " min(s)");
                        map.set(`id${i}`, map.get(`id${i}`) - 1);
                    }
                }
            }
            
            //update playground time every 10 seconds
            if (x == 5) {
                for(let i = firstId; i < (firstId + size); i++) {
                    $.ajax({
                        type: 'POST',
                        url: 'updatePlaygroundTime.php',
                        data:{
                            id: i,
                            rem: map.get(`id${i}`)
                        }, success: function(){
                            //check items ended time already passed
                            $.ajax({
                                type: 'POST',
                                url: 'get_ended_items.php',
                                success: function(res) {
                                    res = JSON.parse(res);
                                    for (let i = 0; i < res.length; i++) {
                                        $.ajax({
                                            type: 'POST',
                                            url: 'time_passed.php',
                                            data: {
                                                id: res[i]
                                            },
                                            success: function(id) {
                                                console.log(id + " time has passed.");
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
                x = 0;
            }
            x += 1
        };
    }
    */
    //render playground time section
    $.ajax({
        type: 'POST',
        url: 'fetch_playground_time.php',
        data: {
            date: `${months[time.getMonth()]} ${time.getDate()}`,
            year: `${time.getFullYear()}`
        },
        success: function(res){
            if (!res.length == 0) {
                res = JSON.parse(res);
                
                let len = res.length;
                //let map = new Map();
                //map.set('firstId', parseInt(res[0][0]));
                for (let i = 0; i < len; i++){
                    /*
                    if (res[i][4] == 'ended') {
                        res[i][2] = "1";
                    } */
                    //items_remaining_time.push(res[i][2]);
                    let txt = '';
                    //let rem;
                    let itemName;
                    /*
                    if (res[i][2] == 'No limit'){
                        rem = 0;
                    } else {
                        rem = parseInt(res[i][2]);
                    } 
                    map.set(`id${res[i][0]}`, rem);*/
                    if (res[i][1] == 'Half hour'){
                        res[i][1] = 'Half hour';
                        txt = '30 mins';
                        itemName = "Half hour";
                    }
                     else if (res[i][1] == '1 hour'){
                        res[i][1] = '1hr';
                        txt = '60 mins';
                        itemName = "1hr";
                    } else if (res[i][1] == '2 hours'){
                        res[i][1] = '2hrs';
                        txt = '120 mins';
                        itemName = "2hrs";
                    } else if (res[i][1] == 'KTV'){
                        res[i][1] = 'KTV';
                        txt = '60 mins';
                        itemName = "KTV";
                    }
                    else if (res[i][1] == 'Unlimited'){
                        res[i][1] = 'Unli';
                        txt = 'No limit';
                        itemName = "Unli";
                    }
                    time_table.insertAdjacentHTML("beforeend", `
                    <tr>
                        <td style="font-size:12px;border-bottom: 1px solid gray;text-align:center;">#${res[i][3]}</td>
                        <td style="font-size:12px;border-bottom: 1px solid gray;text-align:center;border-left:1px solid gray;">${itemName}</td>
                        <td style="font-size:12px;border-left:1px solid gray;text-align:center;border-bottom: 1px solid gray;">${res[i][2]}</td>
                        <td style="font-size:12px;border-left:1px solid gray;text-align:center;border-bottom: 1px solid gray;">${res[i][5]}</td>
                    </tr>`)
                }
                //start_time(map);
            } else {
                time_table.insertAdjacentHTML("beforeend", `
                <tr>
                    <td colspan="4" style="text-align:center;padding:20px 0;font-size:12px;">No item</td>
                </tr>`);
            }
        }
    })

    //fetch products
    $.ajax({
        type: 'get',
        url: 'fetchAvailableProducts.php',
        success: function(items){
            items = JSON.parse(items);
            for (let i = 0; i < items.length; i++) {
                if (items[i][3] == 'cafe'){
                    itemsContainer.insertAdjacentHTML("beforeend", `
                    <div class="item" id="fetched-item${i + 1}">
                        <div class="item-price"><span data-price="${items[i][2]}">₱${items[i][2]}</span></div>
                        <div class="item-name-container">
                            <span data-item="${items[i][0]}">${items[i][0]}</span>
                            <span data-description="${items[i][1]}">${items[i][1]}</span>
                        </div>
                    </div>`);
                } else {
                    if (items[i][1].includes("time") || items[i][1].includes("minutes")) {
                        document.getElementById("items-container-playground").insertAdjacentHTML("beforeend", `
                        <div class="item time" id="fetched-item${i + 1}">
                            <div class="item-price"><span data-price="${items[i][2]}">₱${items[i][2]}</span></div>
                            <div class="item-name-container">
                                <span data-item="${items[i][0]}">${items[i][0]}</span>
                                <span data-description="${items[i][1]}">${items[i][1]}</span>
                            </div>
                        </div>`);
                    }
                    else {
                        document.getElementById("items-container-playground").insertAdjacentHTML("beforeend", `
                        <div class="item" id="fetched-item${i + 1}">
                            <div class="item-price"><span data-price="${items[i][2]}">₱${items[i][2]}</span></div>
                            <div class="item-name-container">
                                <span data-item="${items[i][0]}">${items[i][0]}</span>
                                <span data-description="${items[i][1]}">${items[i][1]}</span>
                            </div>
                        </div>`);
                    }

                    if (items[i][0].includes("Pass") || items[i][0].includes("Socks")){
                        $(`#fetched-item${i + 1}`).addClass("pass");
                    }
                
                }
                
                let image = items[i][4];

                $(`#fetched-item${i + 1}`).css({
                    'background-image': `url(${image})`,
                    'background-position' : 'center',
                    'background-repeat' :'no-repeat',
                    'background-size' : 'cover'
                });
                
            }
            
            //cafe item pick function..
            $(".items-container .item").on("click", function(){
                if (!pageReloading){
                    if (isEmployee){
                        
                        location.reload();
                    }


                    
                    if (playgroundItemsPicked) {
                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                        <div class="check-out-notif" style="background:#ed3a2d;padding:10px;">Picking items in this section is disabled.</div>`);
                        section = 'cafe';
    
                    } else {
                        $("#employee").css("display", "block");
                        
                        //show tables
                        if (!showAvailableTables) {
                            showAvailableTables = true;
                           // $(".available-tables").css("display", "block");
                            $.ajax({
                                type: 'POST',
                                url: 'show_available_tables.php',
                                success: function(res){
                                    res = JSON.parse(res);
                                    for (let i = res.length - 1; i >= 0; i--) {
                                        document.getElementById("tables").insertAdjacentHTML("afterbegin", `
                                        <div class="table-id">${res[i]}</div>`)
                                    }
                                    
                                    $("#tables > div").on("click", function(){
                                        $("#tables > div").css("background", "rgb(36, 163, 206)");
                                        $(this).css("background", "orange");
                                        chosenTable = $(this).html();
                                    })
                                }
                            })
                        }
                        cafeItemsPicked = true;
                        $(".check-out-modal").addClass("check-out-modal-animate");
                        $(".check-out-modal").removeClass("check-out-modal-animate2");
                        let itemId = $(this).attr("id");
                        let item = document.getElementById(`${itemId}`);
                        
                        //get item price
                        let itemPrice = item.children[0].children[0].dataset.price;
                        let itemName = item.children[1].children[0].dataset.item;
                        let itemDescription = item.children[1].children[1].dataset.description;

                        //fetch discount
                        $.ajax({
                            type: 'POST',
                            url: 'fetchItemDiscount.php',
                            data: {
                                item: itemName
                            },
                            success: function(res){
                                let disc;
                                disc = parseInt(itemPrice) * parseFloat(`0.${res}`);
                                discount.push(Math.round(disc));
                            }
                        })
                        
                        //add items
                        price.push(parseInt(itemPrice));
                        pickedItems.push(itemName);
                        document.getElementById("modal-main-content").insertAdjacentHTML("afterbegin", `
                        <div class="item-to-check-out">
                            <span>${itemName}</span>
                            <span>${itemDescription}</span>
                            <span>₱${itemPrice}</span>
                        </div>`);
                        totalPrice += parseInt(itemPrice);
                        totalPriceElement.innerHTML = `₱${totalPrice}`;
                        /*
                        if (itemDescription == 'Combo') {
                            $(".combo-deals-overlay").css("display", "block");

                            $(".combo-deals-overlay").on("click", function(){
                                $(this).css("display", "none");
                                let primary_container = document.getElementById("primary-choices-container");
                                let secondary_container = document.getElementById("secondary-choices-container");
                                let third_container = document.getElementById("third-choices-container");
                                let drinks_container = document.getElementById("drinks-choices-container");
                                while (primary_container.lastElementChild) {
                                    primary_container.removeChild(primary_container.lastElementChild);
                                }
                                while (secondary_container.lastElementChild) {
                                    secondary_container.removeChild(secondary_container.lastElementChild);
                                }
                                while (third_container.lastElementChild) {
                                    third_container.removeChild(third_container.lastElementChild);
                                }
                                while (drinks_container.lastElementChild) {
                                    drinks_container.removeChild(drinks_container.lastElementChild);
                                }
                            })
                            $(".combo-deals-overlay > div").on("click", function(event){
                                event.stopPropagation();
                            })
                            let combo = itemName.slice(0, 2);
                            //fetch pizza waffles
                            $.ajax({
                                type: 'POST',
                                url: 'fetch_combo_choices.php',
                                data: {
                                    combo: combo,
                                },
                                success: function(res){
                                    res = JSON.parse(res);
                                    console.log(res);
                                    let primary_container = document.getElementById("primary-choices-container");
                                    let secondary_container = document.getElementById("secondary-choices-container");
                                    let third_container = document.getElementById("third-choices-container");
                                    let drinks_container = document.getElementById("drinks-choices-container");
                                    let primary = 0;
                                    let secondary = 0;
                                    let third = 0;
                                    let drinks = 0;
                                    if (combo == 'B1') {
                                        primary = 1;
                                        secondary = 1;
                                        drinks = 2;
                                        for (let i = 0; i < res.length; i++) {
                                            if (res[i][1] == 'Fries') {
                                                primary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="primary-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#primary-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#primary-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                            
                                            else if (res[i][3] == 'Pizza Waffle') {
                                                secondary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="secondy-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#secondy-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#secondy-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            } else if (res[i][3] == 'Drinks') {
                                                drinks_container.insertAdjacentHTML("afterbegin", `
                                                <div id="secondy-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#secondy-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#secondy-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                        }
                                        
                                    } 
                                    else if (combo == 'B2') {
                                        primary = 1;
                                        secondary = 1;
                                        drinks = 2;
                                        for (let i = 0; i < res.length; i++) {
                                            if (res[i][1] == 'Fries') {
                                                primary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="primary-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#primary-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#primary-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                            
                                            else if (res[i][3] == 'Sushi Roll') {
                                                secondary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="third-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#third-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#third-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                            else if (res[i][3] == 'Drinks') {
                                                drinks_container.insertAdjacentHTML("afterbegin", `
                                                <div id="secondy-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#secondy-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#secondy-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                        }
                                        
                                    }
                                    else if (combo == 'C1') {
                                        primary = 1;
                                        secondary = 1;
                                        drinks = 4;
                                        for (let i = 0; i < res.length; i++) {
                                            if (res[i][1] == 'Fries') {
                                                primary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="primary-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#primary-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#primary-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                            
                                            else if (res[i][1] == 'Spaghetti') {
                                                secondary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="third-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#third-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#third-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                             else if (res[i][3] == 'Drinks') {
                                                drinks_container.insertAdjacentHTML("afterbegin", `
                                                <div id="secondy-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#secondy-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#secondy-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                        }
                                        
                                    }
                                    else if (combo == 'C2') {
                                        primary = 1;
                                        secondary = 1;
                                        third = 1;
                                        drinks = 4;
                                        for (let i = 0; i < res.length; i++) {
                                            if (res[i][1] == 'Fries') {
                                                primary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="primary-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#primary-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#primary-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                            
                                            else if (res[i][1] == 'Spaghetti') {
                                                secondary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="third-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#third-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#third-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                            else if (res[i][1] == 'Baked chicken with vege (half)' || res[i][3] == 'Chicken') {
                                                third_container.insertAdjacentHTML("afterbegin", `
                                                
                                                <div id="third-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#third-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#third-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                             else if (res[i][3] == 'Drinks') {
                                                drinks_container.insertAdjacentHTML("afterbegin", `
                                                <div id="secondy-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#secondy-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#secondy-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                        }
                                        
                                    }
                                    else if (combo == 'D1') {
                                        primary = 1;
                                        secondary = 1;
                                        drinks = 1;
                                        for (let i = 0; i < res.length; i++) {
                                            if (res[i][1] == 'Original Waffle') {
                                                primary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="primary-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#primary-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#primary-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                            
                                            else if (res[i][1] == 'Ice cream with toppings') {
                                                secondary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="third-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#third-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#third-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }

                                             else if (res[i][3] == 'Drinks') {
                                                drinks_container.insertAdjacentHTML("afterbegin", `
                                                <div id="secondy-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#secondy-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#secondy-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                        }
                                    }
                                    else if (combo == 'D2') {
                                        primary = 1;
                                        secondary = 1;
                                        drinks = 1;
                                        for (let i = 0; i < res.length; i++) {
                                            if (res[i][1] == 'Fries') {
                                                primary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="primary-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#primary-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#primary-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                            
                                            else if (res[i][1] == 'Ice cream with toppings') {
                                                secondary_container.insertAdjacentHTML("afterbegin", `
                                                <div id="third-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#third-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#third-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }

                                             else if (res[i][3] == 'Drinks') {
                                                drinks_container.insertAdjacentHTML("afterbegin", `
                                                <div id="secondy-choice${res[i][0]}" style="width:100px;height:100px;margin:5px;cursor:pointer;">
                                                    <div><span style="font-size:13px;">${res[i][1]}</span></div>
                                                </div>`);
                                                $(`#secondy-choice${res[i][0]}`).css({
                                                    "background-image": `url(${res[i][2]})`,
                                                    "background-repeat" : "no-repeat",
                                                    "background-position" : "center",
                                                    "background-size" : "cover",
                                                    "position" : "relative",
                                                    "border-radius" : "4px",
                                                    "box-shadow" : "0 0 3px #666"
                                                });
                                                $(`#secondy-choice${res[i][0]} > div`).css({
                                                    "position" : "absolute",
                                                    "bottom" : "0",
                                                    "left " : "0",
                                                    "text-align" : "center",
                                                    "padding" : "5px",
                                                    "width" : "100%",
                                                    "background" : "#fff",
                                                    "border-radius" : "0 0 4px 4px",
                                                })
                                            }
                                        }
                                        
                                    }
                                }
                            })
                        } */
                    }
                    let notifs = document.querySelectorAll(".check-out-notif");
                    setTimeout(function(){
                        for (let i = 0; i < notifs.length; i++){
                            notifs[i].remove();
                        }
                    }, 5000);
                }
            })

            //playground item pick function..
            $(".items-container-playground > .item").on("click", function(){
                if (!pageReloading){
                    if (isEmployee){
                        
                        location.reload();
                    }
                    if ($(this).css("opacity") != 0.5) {
                        
                        if (cafeItemsPicked) {
                            document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                            <div class="check-out-notif" style="background:#ed3a2d;padding:10px;">Picking items in this section is disabled.</div>`);
                            section = 'play';
        
                        } else {
                            playgroundItemsPicked = true;
                            $(".check-out-modal").addClass("check-out-modal-animate");
                            $(".check-out-modal").removeClass("check-out-modal-animate2");
                            let itemId = $(this).attr("id");
                            let item = document.getElementById(`${itemId}`);
                            
                            //get item price
                            let itemPrice = item.children[0].children[0].dataset.price;
                            let itemName = item.children[1].children[0].dataset.item;
                            let itemDescription = item.children[1].children[1].dataset.description;

                            if ($(this).hasClass("time")) {
                                if (!play_item_aded == true) {
                                    play_item_aded = true;
                                    play_items.push(itemName);
                                }
                                $(".items-container-playground .time").css("opacity", ".5");
                                $(this).css("opacity", "1");
                                play_quantity += 1;


                            } else if ($(this).hasClass("pass")) {
                                $(".items-container-playground .ktv").css("opacity", ".5");
                                play_items.push(itemName);
                            }
                            console.log(pickedItems);
                            $("#employee").css("display", "none");
                            
                            //show tables
                            if (!showAvailableTables) {
                                showAvailableTables = true;
                               // $(".available-tables").css("display", "block");
                                $.ajax({
                                    type: 'POST',
                                    url: 'show_available_tables.php',
                                    success: function(res){
                                        res = JSON.parse(res);
                                        for (let i = res.length - 1; i >= 0; i--) {
                                            document.getElementById("tables").insertAdjacentHTML("afterbegin", `
                                            <div class="table-id">${res[i]}</div>`)
                                        }
                                        
                                        $("#tables > div").on("click", function(){
                                            $("#tables > div").css("background", "rgb(36, 163, 206)");
                                            $(this).css("background", "orange");
                                            chosenTable = $(this).html();
                                        })
                                    }
                                })
                            }
                            
    
                            //fetch discount
                            $.ajax({
                                type: 'POST',
                                url: 'fetchItemDiscount.php',
                                data: {
                                    item: itemName
                                },
                                success: function(res){
                                    console.log(res);
                                    let disc;
                                    disc = parseInt(itemPrice) * parseFloat(`0.${res}`);
                                    discount.push(Math.round(disc));
                                }
                            })
                            
                            //add items
                            price.push(parseInt(itemPrice));
                            pickedItems.push(itemName);
                            document.getElementById("modal-main-content").insertAdjacentHTML("beforeend", `
                            <div class="item-to-check-out">
                                <span>${itemName}</span>
                                <span>${itemDescription}</span>
                                <span>₱${itemPrice}</span>
                            </div>`);
                            totalPrice += parseInt(itemPrice);
                            totalPriceElement.innerHTML = `₱${totalPrice}`;
    
                        }
                        let notifs = document.querySelectorAll(".check-out-notif");
                        setTimeout(function(){
                            for (let i = 0; i < notifs.length; i++){
                                notifs[i].remove();
                            }
                        }, 5000);
                    }
                    
                    
                }
                /*
                if (!pageReloading){
                    $("#employee").css("display", "none");
                    if (cafeItemsPicked) {
                        $("#employee").css("display", "block");
                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                        <div class="check-out-notif" style="background:#ed3a2d;padding:10px;">Picking items in this section is disabled.</div>`);
                        
                        let notifs = document.querySelectorAll(".check-out-notif");
                        setTimeout(function(){
                            for (let i = 0; i < notifs.length; i++){
                                notifs[i].remove();
                            }
                        }, 5000);
            
                    } else {


                        if (showAvailableTables) {
                            showAvailableTables = false;
                            $(".available-tables").css("display", "none");
                            let container = document.getElementById("tables");
                            while (container.lastElementChild) {
                                container.removeChild(container.lastElementChild);
                            }
                        }
                        playgroundItemsPicked = true;
                        let itemId = $(this).attr("id");
                        $(".check-out-modal").addClass("check-out-modal-animate");
                        $(".check-out-modal").removeClass("check-out-modal-animate2");
            
                        if (itemId == "one-hour") {
                            document.getElementById("modal-main-content").insertAdjacentHTML("beforeend", `
                            <div class="item-to-check-out">
                                <span>1 hour</span>
                                <span>60 minutes</span>
                                <span>₱150</span>
                            </div>`);
                            itemPrice = 150;
                            pickedItems.push("1 hour");

                            

                        }
                        else if (itemId == "half-hour") {
                            document.getElementById("modal-main-content").insertAdjacentHTML("beforeend", `
                            <div class="item-to-check-out">
                                <span>Half hour</span>
                                <span>30 minutes</span>
                                <span>₱90</span>
                            </div>`);
                            itemPrice = 90;
                            pickedItems.push("Half hour");

                            
            
                        }
                        else if (itemId == "two-hours") {
                            document.getElementById("modal-main-content").insertAdjacentHTML("beforeend", `
                            <div class="item-to-check-out">
                                <span>2 hours</span>
                                <span>120 minutes</span>
                                <span>₱200</span>
                            </div>`);
                            itemPrice = 200;
                            pickedItems.push("2 hours");

                        

                        } else if (itemId == "unlimited") {
                            document.getElementById("modal-main-content").insertAdjacentHTML("beforeend", `
                            <div class="item-to-check-out">
                                <span>Unlimited</span>
                                <span>No limit</span>
                                <span>₱250</span>
                            </div>`);
                            itemPrice = 250;
                            pickedItems.push("Unlimited");
                        }
                        else if (itemId == "ktv") {
                            document.getElementById("modal-main-content").insertAdjacentHTML("beforeend", `
                            <div class="item-to-check-out">
                                <span>KTV</span>
                                <span>120 minutes</span>
                                <span>₱200</span>
                            </div>`);
                            itemPrice = 200;
                            pickedItems.push("KTV");

                            
                        }
                        price.push(itemPrice);
                        totalPrice += itemPrice;
                        totalPriceElement.innerHTML = `₱${totalPrice}`;
                    } 
                }
                */
            })
            
            $("#employee").on("click", function(){
                if (!pageReloading){
                    if (!isEmployee){
                        let temp_total = totalPrice;

                        for (let i = 0; i < discount.length; i++){
                            temp_total -= discount[i];
                        }

                        for (let i = 0; i < discount.length; i++) {
                            price[i] -= discount[i];
                        }

                        totalPriceElement.innerHTML = `₱${temp_total}`;
                        isEmployee = true;

                        discounted = true;
                        
                        $("#is-employee").css("opacity", "1");
                        $(this).css("background", "orange");
    
                    } else {
                        isEmployee = false;

                        for (let i = 0; i < discount.length; i++) {
                            price[i] += discount[i];
                        }

                        discounted = false;

                        $("#is-employee").css("opacity", "0");
                        $(this).css("background", "rgb(36, 163, 206)");
    
                        totalPriceElement.innerHTML = `₱${totalPrice}`;
                    }
                    console.log(price);
                }
            })
        }
    })

    //cancel function
    $("#cancel").on("click", () => {
        if (isEmployee){
            location.reload();
        }
        if (!pageReloading){
            while (discount.length > 0) {
                discount.pop();
            }

            $(".items-container-playground .item").css("opacity", "1");
            play_quantity = 0;
            $(".check-out-modal").removeClass("check-out-modal-animate");
            $(".check-out-modal").addClass("check-out-modal-animate2");
            //clear elements
            let container = document.getElementById("modal-main-content");
            while (container.lastElementChild) {
                container.removeChild(container.lastElementChild);
            }
            //empty remove elements
            while (pickedItems.length > 0) {
                pickedItems.pop();
            }
            while (price.length > 0) {
                price.pop();
            }
            while (discount.length > 0) {
                discount.pop();
            }

            totalPrice = 0;
            amount = 0;

            cafeItemsPicked = false;
            playgroundItemsPicked = false;

            isEmployee = false;

            location.reload();
        }
        
    })
    //clear all items selected
    $("#clear-all").on("click", () => {

        if (!pageReloading){
            $(".items-container-playground .item").css("opacity", "1");
            if (pickedItems.length == 0) {
                document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                <div class="check-out-notif" style="background:#ed3a2d;padding:10px;">You have not picked an item.</div>`);
            } else {
                //clear elements
                let container = document.getElementById("modal-main-content");
                while (container.lastElementChild) {
                    container.removeChild(container.lastElementChild);
                }
                //notif
                document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                <div class="check-out-notif" style="background:orange;padding:15px 10px;">Item(s) cleared.</div>`);
    
                //empty remove elements
                while (pickedItems.length > 0) {
                    pickedItems.pop();
                }
                while (price.length > 0) {
                    price.pop();
                }
                while (discount.length > 0) {
                    discount.pop();
                }

                totalPrice = 0;
                totalPriceElement.innerHTML = `₱${totalPrice}`;
    
                cafeItemsPicked = false;
                playgroundItemsPicked = false;
            }
            let notifs = document.querySelectorAll(".check-out-notif");
            setTimeout(function(){
                for (let i = 0; i < notifs.length; i++){
                    notifs[i].remove();
                }
            }, 5000);
        }
    })

    //check out function..
    $("#check-out").on("click", () => {
        if (!pageReloading){
            if (pickedItems.length == 0) {
                document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                <div class="check-out-notif" style="background:#ed3a2d;padding:15px 10px;">There is nothing to check out.</div>`);
                let notifs = document.querySelectorAll(".check-out-notif");
                setTimeout(function(){
                    for (let i = 0; i < notifs.length; i++){
                        notifs[i].remove();
                    }
                }, 5000);
            } else {
                if (receiptProceeding){
                    document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                    <div class="check-out-notif" style="background:#ed3a2d;padding:10px;">Check out button disabled.</div>`);
    
                    let notifs = document.querySelectorAll(".check-out-notif");
                    setTimeout(function(){
                        for (let i = 0; i < notifs.length; i++){
                            notifs[i].remove();
                        }
                    }, 5000);
                } else {
                    $(".pop-up-wrapper").css("display", "block");
                    $(".buttons-container div").on("click", function(){
                        if (proceedButtonClicked) {
                            proceedButtonClicked = false;
                        }
    
                        if ($(this).html() == "DELETE") {
                            amount = 0;
                            $("#amount").html(amount);
                        } else {
                            amount += parseInt($(this).html());
                            $("#amount").html(amount);
                        }
                    })
                    /*
                    if (chosenTable == 'None' && cafeItemsPicked){
                        $(".confirm-check-out-modal").css("display", "block");
                        $(".confirm-check-out-modal #back").on("click", function(){
                            location.reload();
                        })
                        $("#continue-check-out").on("click", function(){
                            $(".confirm-check-out-modal").css("display", "none");
                            $(".pop-up-wrapper").css("display", "block");
                            $(".buttons-container div").on("click", function(){
                                if (proceedButtonClicked) {
                                    proceedButtonClicked = false;
                                }
            
                                if ($(this).html() == "DELETE") {
                                    amount = 0;
                                    $("#amount").html(amount);
                                } else {
                                    amount += parseInt($(this).html());
                                    $("#amount").html(amount);
                                }
                            })
                        })
                        
                    } else {
                        $(".pop-up-wrapper").css("display", "block");
                        $(".buttons-container div").on("click", function(){
                            if (proceedButtonClicked) {
                                proceedButtonClicked = false;
                            }
        
                            if ($(this).html() == "DELETE") {
                                amount = 0;
                                $("#amount").html(amount);
                            } else {
                                amount += parseInt($(this).html());
                                $("#amount").html(amount);
                            }
                        })
                    } */
                    
                }
            }
        }
    })

    //back button
    $("#back").on("click", function(){
        if (!pageReloading){
            location.reload();
        }
    })

    //proceed function..
    $("#proceed").on("click", () => {
        if (!pageReloading){
            //
            clearInterval(interval);
            if (!extendClicked){
                if (amount < totalPrice) {
                    document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                    <div class="check-out-notif" style="background:#ed3a2d;padding:15px 10px;">Not enough amount.</div>`);
                    let notifs = document.querySelectorAll(".check-out-notif");
                    setTimeout(function(){
                        for (let i = 0; i < notifs.length; i++){
                            notifs[i].remove();
                        }
                    }, 5000);
                    
                } else {
                    if (!proceedButtonClicked){
                        proceedButtonClicked = true;
                        var disc = 0;
                        if (isEmployee){
                            for (let i = 0; i < discount.length; i++){
                                disc += discount[i];
                            }
                        }
                        change = amount - (totalPrice - disc);

                        //change notif
                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                        <div class="check-out-notif" style="background:orange;font-size:20px;padding:15px 10px;">Change: <span style="padding-left:3px;">₱${change}</span></div>`);
                        
                        document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                        <div class="proceed-receipt">
                            <div class="wrapper">
                                <span>Proceed?</span>
                                <div class="proceed-buttons">
                                    <button id="proceed-receipt">Yes</button>
                                    <button>No</button>
                                </div>
                            </div>
                        <div>`)
                        
                        $(".proceed-receipt button").on("click", function(){
                            if (!pageReloading){
                                if ($(this).attr("id") !== undefined) {
                                    receiptProceeding = true;
                                    //verify items..
                                    if (cafeItemsPicked) {
                                        section = 'cafe';
                                    }
                                    if (playgroundItemsPicked){
                                        section = 'play';
                                    }
                                    $(".proceed-receipt").remove();
                                    $(".pop-up-wrapper").css("display", "none");
                                    
                                    let wrapper = document.getElementById("print-wrapper");

                                    let ticket = '';
                                    //generate ticket
                                    for (let i = 0; i < 4; i++){
                                        let num = Math.round(Math.random() * 9);
                                        if (num == 0) {
                                            num = Math.round(Math.random() * 9);
                                        }
                                        ticket += num;
                                    }
                                    
                                    cafeTicket = ticket;

                                    wrapper.insertAdjacentHTML("beforeend", `
                                    <div class="document-to-print">
                                        <div class="print-header">
                                            <span style="font-size:12px;">ANSON'S PLAYGROUND AND CAFE</span>
                                            <span style="font-size:12px;">Osmeña st., Masbate City</span>
                                        </div>
                                        <table id="table">
                                            <tr>
                                                <td colspan="2" style="text-align:center;padding: 3px 0 3px 0; font-size: 30px;"><span style="font-size:13px;"></span> <span style="font-weight:bold;">${cafeTicket}</span></td>
                                            </tr>
                                            <tr>
                                                <td style="width:50%;font-size: 12px;margin-top:10px;margin-bottom:4px;font-weight:bold;">Item:</td>
                                                <td style="width:50%;font-size: 12px;margin-top:10px;margin-bottom:4px;font-weight:bold;">Price:</td>
                                            </tr>
                                        </table>
                                    </div>`);

                                    let table = document.getElementById("table");
                                    for (let i = 0; i < pickedItems.length; i++) {
                                        table.insertAdjacentHTML("beforeend", `
                                        <tr>
                                            <td style="padding:1px 0; font-size: 11px;text-align:center;">${pickedItems[i]}</td>
                                            <td style="padding:1px 0; font-size: 11px;font-weight:bold;text-align:center;">₱${price[i]}</td>
                                        </tr>`)
                                    }
                                    if (isEmployee){
                                        table.insertAdjacentHTML("beforeend", `
                                        <tr>
                                            <td style="margin-top:5px;margin-bottom:10px;padding: 1px 0 5px; font-size: 11px;text-align:left;">Total: <span style="font-weight:bold">₱${totalPrice - disc}</span></td>
                                            <td style="margin-top:5px;margin-bottom:10px;padding: 1px 0 5px; font-size: 11px;text-align:right;"><span style="font-weight:bold"><span style="font-size:10px;">(discounted)</span></span></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="margin-top:5px;margin-bottom:10px;padding: 1px 0 5px; font-size: 11px;text-align:left;">Amount:<span style="font-weight:bold"><span style="font-size:10px;"> ₱${amount}</span></span></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="margin-top:5px;margin-bottom:10px;padding: 1px 0 5px; font-size: 11px;text-align:left;"><span style="font-weight:bold"><span style="font-size:11px;">₱${amount} - ₱${totalPrice - disc}</span></span></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="margin-top:5px;margin-bottom:10px;padding: 1px 0 5px; font-size: 11px;text-align:left;">Change:<span style="font-weight:bold"><span style="font-size:11px;"> ₱${change}</span></span></td>
                                        </tr>`)

                                    } else {
                                        table.insertAdjacentHTML("beforeend", `
                                        <tr>
                                            <td style="margin-top:5px;margin-bottom:10px;padding: 1px 0 5px; font-size: 11px;">Total: <span style="font-weight:bold">₱${totalPrice}</span></td>
                                            <td style="margin-top:5px;margin-bottom:10px;padding: 1px 0 5px; font-size: 11px;text-align:right;">Amount:<span style="font-weight:bold"><span style="font-size:10px;"> ₱${amount}</span></span></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="margin-top:5px;margin-bottom:10px;padding: 1px 0 5px; font-size: 11px;text-align:right;"><span style="font-weight:bold"><span style="font-size:11px;">₱${amount} - ₱${totalPrice}</span></span></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="margin-top:5px;margin-bottom:10px;padding: 1px 0 5px; font-size: 11px;text-align:right;">Change:<span style="font-weight:bold"><span style="font-size:11px;"> ₱${change}</span></span></td>
                                        </tr>`)
                                        
                                    }
                                    
        
                                    //print
                                    window.print();
                                    
                                    
                                    //notif
                                    document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                    <div class="check-out-notif" style="background:orange;padding:15px 10px;">Printing receipt..</div>`);
            
            
                                    //clear elements
                                    let container = document.getElementById("print-wrapper");
                                    while (container.lastElementChild) {
                                        container.removeChild(container.lastElementChild);
                                    }
            
                                    document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                                    <div class="proceed-receipt receipt-printed-modal">
                                        <div class="wrapper">
                                            <span>Receipt printed</span>
                                            <div class="proceed-buttons">
                                                <button id="proceed-print">Confirm</button>
                                                <button>No</button>
                                            </div>
                                        </div>
                                    <div>`)
            
                                    $(".receipt-printed-modal .proceed-buttons > button").on("click", function(){
                                        if (!pageReloading){
                                            if ($(this).attr("id") !== undefined) {
                                                pageReloading = true;
                                                //current time and date
                                                let mon = months[time.getMonth()];
                                                let date = time.getDate();
                                                let day = days[time.getDay()];
                                                let hr = time.getHours();
                                                let isMorning = true;
                                                if (hr > 12) {
                                                    hr = hr - 12;
                                                    isMorning = false;
                                                } 
                                                let min = time.getMinutes();
                                                min < 10 ? min = `0${min}` : min = min;
                                                let txt = 'AM';
                                                isMorning ? txt = txt : txt = 'PM';
                                                //let currentTimeAndDate = `${hr}:${min} ${txt}, ${day} (${mon}, ${date})`;
                                                let _items;
                                                if (section == 'play') {
                                                    _items = play_items;
                                                } else {
                                                    _items = pickedItems;
                                                }

                                                //inserting into database..
                                                insertIntoDatabase(section, cafeTicket, _items, price, `${hr}:${min} ${txt}`, `${mon} ${date}`, play_quantity);

                                                let d_time = `${hr}:${min} ${txt}`;
                                                let d_mon_and_date = `${mon} ${date}`;
                                                //insert into detailed report
                                                detailedReportDatabase(section, cafeTicket, _items, price, d_time, d_mon_and_date, play_quantity);
                
                                                let notifs = document.querySelectorAll(".check-out-notif");
                                                setTimeout(function(){
                                                    for (let i = 0; i < notifs.length; i++){
                                                        notifs[i].remove();
                                                    }
                                                }, 5000);
                                            } else {                                
                                                location.reload();
                                            }
                                            $(".receipt-printed-modal").remove();

                                            if (pageReloading){
                                                $(document).on("click", function(){
                                                    document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                                    <div class="check-out-notif" style="background:#ed3a2d;padding:10px;">Please wait a moment..</div>`);
                                                })
                                            }
                                        }
                                    })

                                } else {
                                    $(".proceed-receipt").remove();
                                    proceedButtonClicked = false;
                                }
                            }
                            
                        })
        
                        let notifs = document.querySelectorAll(".check-out-notif");
                        setTimeout(function(){
                            for (let i = 0; i < notifs.length; i++){
                                notifs[i].remove();
                            }
                        }, 5000);
                    }
                }
            } else {
                let change = amount - amountToPay;

                if (amount >= amountToPay) {
                    ///fetch end time
                    $.ajax({
                        type: 'POST',
                        url: 'fetch_end_time.php',
                        data: {
                            ticket: selectedTicket
                        }, success: function(res){
                            endtime = res;
                        }
                    })
                    document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                        <div class="check-out-notif" style="background:orange;font-size:20px;padding:15px 10px;">Change: <span style="padding-left:3px;">₱${change}</span></div>`);

                    
                    $.ajax({
                        type: 'POST',
                        url: 'extend.php',
                        data: {
                            selectedticket: selectedTicket,
                            payment: amountToPay,
                            itemName: itemName,
                            end: endtime,
                            foopayment: foopayment

                        }, success: function(res){
                            //update detailed report
                            $.ajax({
                                type: 'POST',
                                url: 'addExtendPaymentOnDetailedReport.php',
                                data: {
                                    payment: amountToPay,
                                    ticket: selectedTicket,
                                    itemName: itemName,
                                    foopayment: foopayment
                                },
                            });
                            //update cashier balance
                            $.ajax({
                                type: 'POST',
                                url: 'update_cashierbalance.php',
                                data: {
                                    payment: amountToPay
                                },
                                success: function(res){
                                    console.log(res);
                                }
                            })

                            //update playground report
                            $.ajax({
                                type: 'POST',
                                url: 'addExtendPayment.php',
                                data: {
                                    payment: amountToPay,
                                    ticket: selectedTicket,
                                    itemName: itemName,
                                    foopayment: foopayment
                                },
                                success: function(res){
                                    setTimeout(function(){
                                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                        <div class="check-out-notif" style="background:orange;padding:10px;">${selectedTicket} time extended.</div>`);
                                    }, 2000);
                                    setTimeout(function(){
                                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                        <div class="check-out-notif" style="background:orange;padding:10px;">Reloading the page..</div>`);
                                        setTimeout(function(){
                                            location.reload();
                                        }, 2000);
                                    }, 3500);
                                }
                            })
                            
                            
                        }
                    })

                    $(".pop-up-wrapper").css("display", "none");
                } else {
                    alert('Not enough amount.');
                }
            }
        }
    })
})

function detailedReportDatabase(section, cafeticket, pickedItems, price, _time, date, qty){
    $.ajax({
        type: 'POST',
        url: 'detailed_report.php',
        data: {
            section: section,
            items: pickedItems,
            price: price,
            time: _time,
            mon: date,
            year: `${time.getFullYear()}`,
            discounted: discounted,
            cafeticket: cafeticket,
            quantity: qty
        },
    })

}

function insertIntoDatabase(section, ticketcafe, items, pricelist, _time, date, qty){
    //verify tickets
    /*
    for (let i = 0; i < tickets.length; i++) {
        let temp = tickets[i];
        if (temp.length != 4) {
            for (let x = temp.length; x < 4; x++) {
                temp += JSON.stringify(Math.round(Math.random() * 9));
            }
        }
        tickets[i] = temp;
    }
    console.log(tickets);
    */
    let url = '';
    section == 'play' ? url = 'playgroundReport.php' : url = 'cafeReport.php';
    
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            items: items,
            pricelist: pricelist,
            time: _time,
            date: date,
            year: `${time.getFullYear()}`,
            tablenumber: chosenTable,
            cafeticket: ticketcafe,
            quantity: qty
        },

        success: function(res){
            setTimeout(function(){
                document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                <div class="check-out-notif" style="background:#32a852;padding:20px 10px;font-weight:bold;">Transaction success!</div>`);
            }, 1000)
            setTimeout(function(){
                document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                <div class="check-out-notif" style="background:orange;padding:20px 10px;font-weight:bold;">Reloading the page..</div>`);
                setTimeout(function(){
                    location.reload();
                }, 2000);
            }, 3000)
            
            //add row in playground_time table
            if (section == 'play') {
                let time = new Date();
                let chosenItems = items;
                let filtered_items;
                
                function list( value ) {
                    return value.includes("hours") || value.includes("hour") || value.includes("Unlimited") || value.includes("KTV");
                }
                    
                function filter() {
                    var filtered = chosenItems.filter( list );

                    filtered_items = filtered;
                    console.log(filtered);
                }

                filter();

                $.ajax({
                    type: 'POST',
                    url: 'playground_time.php',
                    data: {
                        quantity: qty,
                        items: filtered_items,
                        cafeticket: ticketcafe,
                        year: `${time.getFullYear()}`,
                        date: `${months[time.getMonth()]} ${time.getDate()}`,
                    },
                })
            } /*else {
                
                $.ajax({
                    type: 'POST',
                    url: 'update_table_availability.php',
                    data: {
                        tablenumber: chosenTable
                    }, success: function(res){
                        console.log(res);
                    }
                })
            } */
            //add balance
            let disc = 0;
            if (isEmployee){
                for (let i = 0; i < discount.length; i++){
                    disc += discount[i];
                }
            }
            $.ajax({
                type: 'POST',
                url: 'add_cashier_balance.php',
                data: {
                    balance: totalPrice - disc
                }
            })
        }
    })
}

$("#remove").on("click", function(){
    if (!pageReloading){
        $.ajax({
            type: 'POST',
            url: 'fetch_ended_play_items_id.php',
            data: {
                date: `${months[time.getMonth()]} ${time.getDate()}`,
                year: `${time.getFullYear()}`
            },
            success: function(res){
                res = JSON.parse(res);
                $.ajax({
                    type: 'POST',
                    url: 'remove_ended_items.php',
                    data: {
                        id_list: res,
                        date: `${months[time.getMonth()]} ${time.getDate()}`,
                        year: `${time.getFullYear()}`
                    },
                    success: function(res){
                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                        <div class="check-out-notif" style="background:orange;padding:20px 10px 20px 10px;">Removing ended..</div>`);
                        
                        setTimeout(function(){
                            document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                            <div class="check-out-notif" style="background:orange;padding:20px 10px;">Reloading the page..</div>`);
                            setTimeout(function(){
                                location.reload();
                            }, 2000);
                        }, 2000)
                    }
                })
            }
        })
        
    }
})

$("#extend").on("click", function(){
    if (!pageReloading){
        extendClicked = true;
        document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
        <div class="tickets-list-wrapper" style="display:none;">
            <div class="tickets-container" id="tickets-list-wrapper">
                <div class="tickets" id="tickets-container">
                </div>
                <div class="buttons-tickets-list">
                    <div class="confirm-button">
                        <button>Confirm</button>
                    </div>
                    <div class="cancel-extend">
                        <button>Cancel</button>
                    </div>
                </div>
                
            </div>
        </div>`)
        //fetch today's tickets
        $.ajax({
            type: 'POST',
            url: 'fetchTicketsForExtension.php',
            data: {
                date: `${months[time.getMonth()]} ${time.getDate()}`,
                year: `${time.getFullYear()}`
            },
            success: function(res){
                res = JSON.parse(res);
                if (res.length != 0){
                    $(".tickets-list-wrapper").css("display", "block");
                } else {
                    alert('No available tickets');
                }
                for (let i = 0; i < res.length; i++){
                    document.getElementById("tickets-container").insertAdjacentHTML("afterbegin", `
                    <div>${res[i]}</div>`)
                }
                $(".tickets > div").on("click", function(){
                    if (!pageReloading){
                        $(".tickets > div").css("background", "orange");
                        $(this).css("background", "red");
                        selectedTicket = $(this).html();
                    }
                    
                })
                
            }
        })
        $(".cancel-extend button").on("click", function(){
            location.reload();
        })
        $(".confirm-button button").on("click", function(){
            $.ajax({
                type: 'POST',
                url: 'getItemName.php',
                data:{
                    selected: selectedTicket
                },
                success: function(res){
                    res = JSON.parse(res);
                    itemName = res[0];
                    quantityforextension = res[1];
                    //fetch end time
                    $.ajax({
                        type: 'POST',
                        url: 'fetch_end_time.php',
                        data: {
                            ticket: selectedTicket
                        }, success: function(res){
                            endtime = res;
                        }
                    })
                    if (selectedTicket != undefined) {
                        if (itemName == '2 hours'){
                            document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                            <div id="amount-to-pay">
                                <div>
                                    <div class="amount-to-pay-wrapper">
                                        <div id="fifty">${50 * parseInt(quantityforextension)}</div>
                                        <div id="free" style="font-size:12px;">Free 1hr</div>
                                    </div>
                                    <div class="buttons-extension">
                                        <button class="continue">Confirm</button>
                                        <button id="cancel-extend" style="background:red;">Cancel</button>
                                    </div>
                                </div>
                            </div>`);
                        } else if (itemName == '1 hour') {
                            document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                            <div id="amount-to-pay">
                                <div>
                                    <div class="amount-to-pay-wrapper">
                                        <div id="fifty">${50 * parseInt(quantityforextension)}</div>
                                        <div id="1hun">${100 * parseInt(quantityforextension)}</div>
                                        <div id="free" style="font-size:12px;">Free 1hr</div>
                                    </div>
                                    <div class="buttons-extension">
                                        <button class="continue">Confirm</button>
                                        <button id="cancel-extend" style="background:red;">Cancel</button>
                                    </div>
                                </div>
                            </div>`);
                        } else if (itemName == 'Half hour') {
                            document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                            <div id="amount-to-pay">
                                <div>
                                    <div class="amount-to-pay-wrapper">
                                        <div id="sixty">${60 * parseInt(quantityforextension)}</div>
                                        <div id="1hun-ten">${110 * parseInt(quantityforextension)}</div>
                                        <div id="1hun-sixty">${160 * parseInt(quantityforextension)}</div>
                                    </div>
                                    <div class="buttons-extension">
                                        <button class="continue">Confirm</button>
                                        <button id="cancel-extend" style="background:red;">Cancel</button>
                                    </div>
                                </div>
                            </div>`);
                        }
                        
                        $(".amount-to-pay-wrapper > div").on("click", function() {
                            if (!pageReloading){
                                $(".amount-to-pay-wrapper > div").css("background", "green");
                                $(this).css("background", "orange");
                                if ($(this).attr("id") == 'fifty') {
                                    foopayment = 50;
                                } else if ($(this).attr("id") == '1hun') {
                                    foopayment = 100;
                                } else if ($(this).attr("id") == 'sixty') {
                                    foopayment = 60;
                                } else if ($(this).attr("id") == '1hun-ten') {
                                    foopayment = 110;
                                } else if ($(this).attr("id") == '1hun-sixty') {
                                    foopayment = 160;
                                } 
                                if ($(this).attr("id") == 'free'){
                                    amountToPay = 0;
                                    foopayment = 0;
                                } else {
                                    amountToPay = $(this).html();
                                    amountToPay = parseInt(amountToPay);
                                }
                            }
                        })
                        $(".buttons-extension #cancel-extend").on("click", function(){
                            location.reload();
                        })
                        $(".buttons-extension .continue").on("click", function(){
                            clearInterval(interval);
                            if (!pageReloading){
                                if (amountToPay != undefined) {
                                    $(".tickets-list-wrapper").remove();
                                    $("#amount-to-pay").remove();
                                    if (amountToPay == 0){
                                        console.log(selectedTicket + " " + amountToPay + " " +itemName + " " +endtime + " " + foopayment);
                                        $.ajax({
                                            type: 'POST',
                                            url: 'extend.php',
                                            data: {
                                                selectedticket: selectedTicket,
                                                payment: amountToPay,
                                                itemName: itemName,
                                                end: endtime,
                                                foopayment: foopayment
                    
                                            }, success: function(res){
                                                //update detailed report
                                                $.ajax({
                                                    type: 'POST',
                                                    url: 'addExtendPaymentOnDetailedReport.php',
                                                    data: {
                                                        payment: amountToPay,
                                                        ticket: selectedTicket,
                                                        itemName: itemName,
                                                        foopayment: foopayment
                                                    },
                                                });
                                                //update cashier balance
                                                $.ajax({
                                                    type: 'POST',
                                                    url: 'update_cashierbalance.php',
                                                    data: {
                                                        payment: amountToPay
                                                    },
                                                    success: function(res){
                                                        console.log(res);
                                                    }
                                                })
                                                //update playground report
                                                $.ajax({
                                                    type: 'POST',
                                                    url: 'addExtendPayment.php',
                                                    data: {
                                                        payment: amountToPay,
                                                        ticket: selectedTicket,
                                                        itemName: itemName,
                                                        foopayment: foopayment
                                                    },
                                                    success: function(res){
                                                        
                                                        setTimeout(function(){
                                                            document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                                            <div class="check-out-notif" style="background:orange;padding:10px;">${selectedTicket} time extended.</div>`);
                                                        }, 2000);
                                                        setTimeout(function(){
                                                            document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                                            <div class="check-out-notif" style="background:orange;padding:10px;">Reloading the page..</div>`);
                                                            setTimeout(function(){
                                                                location.reload();
                                                            }, 2000);
                                                        }, 3500);
                                                    }
                                                })
                                                
                                            }
                                        })
                                        
                                    } else {
                                        $(".tickets-list-wrapper").remove();
                                        $("#amount-to-pay").remove();
                                        $(".pop-up-wrapper").css("display", "block");
                                        $(".pop-up-wrapper .buttons-container div").on("click", function(){
                                            if (proceedButtonClicked) {
                                                proceedButtonClicked = false;
                                            }
                                            if ($(this).html() == "DELETE") {
                                                amount = 0;
                                                $("#amount").html(amount);
                                            } else {
                                                amount += parseInt($(this).html());
                                                $("#amount").html(amount);
                                            }
                                        })
                                    }
                                    
                                } 
                                else {
                                    alert('Please pick an amount.');
                                }

                                
                            }
                        })
                    } else {
                        alert('Please select a ticket.');
                    }
                }
            })  
        })
    }
    
})

//check balance
$("#check-balance").on("click", function(){
    if (!pageReloading){
        $.ajax({
            type: 'POST',
            url: 'check_balance.php',
            data: {
                date: `${months[time.getMonth()]} ${time.getDate()}`,
                year: `${time.getFullYear()}`
            },
            success: function(res){
                res = JSON.parse(res);
                var table_container = document.getElementById("tbody2");
                for (let i = 0; i < res.length; i++){
                    let temp = res[i][3];
                    let txt = `
                    <tr id="b-item${res[i][0]}">
                        <td>${res[i][1]}</td>
                        <td>${res[i][2]}</td>`;
                    if (res[i][3] == 'true') {
                        temp = 'Employee';
                    } else {
                        temp = 'Customer';
                    }
                    table_container.insertAdjacentHTML("afterbegin", `
                        ${txt}
                        <td>${res[i][7]}</td>
                        <td>${temp}</td>
                        <td>${res[i][5]}</td>
                        <td>${res[i][6]}</td>
                    </tr>
                    `);
                }
                //on change function
                $("#cat-cashier").on("change", function(){
                    if ($(this).val() == 'play') {
                        $("#section-cashier").html("Playground");
                        $.ajax({
                            type: 'POST',
                            url: 'fetch_balance_play.php',
                            data: {
                                date: `${months[time.getMonth()]} ${time.getDate()}`,
                                year: `${time.getFullYear()}`
                            },
                            success: function(res){
                                res = JSON.parse(res);
                                let total = 0;
                                for (let i = 0; i < res[0].length; i++ ){
                                    total += (parseInt(res[0][i]) * parseInt(res[1][i]));
                                }
                                $("#total-cashier").html(`₱${total}`);
                            }
                        })
                        $.ajax({
                            type: 'POST',
                            url: 'fetch_playground_items_cashier.php',
                            data: {
                                date: `${months[time.getMonth()]} ${time.getDate()}`,
                                year: `${time.getFullYear()}`
                            },
                            success:function(res){
                                res = JSON.parse(res);
                                let container = document.getElementById("tbody2");
                                while (container.lastElementChild) {
                                    container.removeChild(container.lastElementChild);
                                }
                                for (let i = 0; i < res.length; i++){
                                    let temp = res[i][3];
                                    let txt = `
                                    <tr id="b-item${res[i][0]}">
                                        <td>${res[i][1]}</td>
                                        <td>${res[i][2]}</td>`;
                                    if (res[i][3] == 'true') {
                                        temp = 'Employee';
                                    } else {
                                        temp = 'Customer';
                                    }
                                    table_container.insertAdjacentHTML("afterbegin", `
                                        ${txt}
                                        <td>${res[i][7]}</td>
                                        <td>${temp}</td>
                                        <td>${res[i][5]}</td>
                                        <td>${res[i][6]}</td>
                                    </tr>
                                    `);
                                }
                            }
                        })
                    } else if ($(this).val() == 'cafe') {
                        $("#section-cashier").html("Cafe");
                        $.ajax({
                            type: 'POST',
                            url: 'fetch_balance_cafe.php',
                            data: {
                                date: `${months[time.getMonth()]} ${time.getDate()}`,
                                year: `${time.getFullYear()}`
                            },
                            success: function(res){
                                res = JSON.parse(res);
                                let total = 0;
                                for (let i = 0; i < res.length; i++ ){
                                    total += parseInt(res[i]);
                                }
                                $("#total-cashier").html(`₱${total}`);
                            }
                        })
                        $.ajax({
                            type: 'POST',
                            url: 'fetch_cafe_items_cashier.php',
                            data: {
                                date: `${months[time.getMonth()]} ${time.getDate()}`,
                                year: `${time.getFullYear()}`
                            },
                            success:function(res){
                                res = JSON.parse(res);
                                let container = document.getElementById("tbody2");
                                while (container.lastElementChild) {
                                    container.removeChild(container.lastElementChild);
                                }
                                for (let i = 0; i < res.length; i++){
                                    let temp = res[i][3];
                                    let txt = `
                                    <tr id="b-item${res[i][0]}">
                                        <td>${res[i][1]}</td>
                                        <td>${res[i][2]}</td>`;
                                    if (res[i][3] == 'true') {
                                        temp = 'Employee';
                                    } else {
                                        temp = 'Customer';
                                    }
                                    table_container.insertAdjacentHTML("afterbegin", `
                                        ${txt}
                                        <td>${res[i][7]}</td>
                                        <td>${temp}</td>
                                        <td>${res[i][5]}</td>
                                        <td>${res[i][6]}</td>
                                    </tr>
                                    `);
                                }
                            }
                        })
                    } else if ($(this).val() == 'all') {
                        $("#section-cashier").html("Cashier Total");
                        $.ajax({
                            type: 'POST',
                            url: 'daily_sales_check.php',
                            data: {
                                date: `${months[time.getMonth()]} ${time.getDate()}`,
                                year: `${time.getFullYear()}`
                            },
                            success: function(res){
                                res = JSON.parse(res);
                                let daily = 0;
                                for (let i = 0; i < res[0].length; i++) {
                                    daily = daily + (parseInt(res[0][i]) * parseInt(res[1][i]));
                                }
                                $("#total-cashier").html(`₱${daily}`);
                            }
                        })
                        let container = document.getElementById("tbody2");
                        while (container.lastElementChild) {
                            container.removeChild(container.lastElementChild);
                        }
                        for (let i = 0; i < res.length; i++){
                            let temp = res[i][3];
                            let txt = `
                            <tr id="b-item${res[i][0]}">
                                <td>${res[i][1]}</td>
                                <td>${res[i][2]}</td>`;
                            if (res[i][3] == 'true') {
                                temp = 'Employee';
                            } else {
                                temp = 'Customer';
                            }
                            table_container.insertAdjacentHTML("afterbegin", `
                                ${txt}
                                <td>${res[i][7]}</td>
                                <td>${temp}</td>
                                <td>${res[i][5]}</td>
                                <td>${res[i][6]}</td>
                            </tr>
                            `);
                        }
                    }
                }) 
            }
        })
        
        $.ajax({
            type: 'POST',
            url: 'daily_sales_check.php',
            data: {
                date: `${months[time.getMonth()]} ${time.getDate()}`,
                year: `${time.getFullYear()}`
            },
            success: function(res){
                res = JSON.parse(res);
                let daily = 0;
                console.log(res);
                for (let i = 0; i < res[0].length; i++) {
                    daily = daily + (parseInt(res[0][i]) * parseInt(res[1][i]));
                }
                $("#total-sales").html(`₱${daily}`);
                $("#total-cashier").html(`₱${daily}`);
            }
        })
        $(".cashier-balance").css("display", "block");
    }
    
})

$("#log-out").on("click", function(){
    if (!pageReloading){
        confirmation("log-out", "Do you want to continue?");
    }
})
$("#change-user").on("click", function(){
    if (!pageReloading){
        confirmation("change-user", "Continue changing user?");
    }
})

$("#exit-cashier-balance").on("click", function(){
    location.reload();
    /*
    $(".cashier-balance").css("display", "none");
    let container = document.getElementById("tbody2");
    while (container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    }*/
})



$("#show-pending-orders").on("click", function(){
    let mon = months[time.getMonth()];
    let date = time.getDate();
    //fetch pending orders
    $.ajax({
        type: 'POST',
        url: 'fetch_pending_orders.php',
        data : {
            date: `${mon} ${date}`,
            year: `${time.getFullYear()}`
        },
        success: function(res){
            if (res == 'No orders'){
                alert(res);
            } else {
                res = JSON.parse(res);
                let container = document.getElementById("tbody");
                for (let i = 0; i < res.length; i++) {
                    let entry_html = `
                    <tr id="order${res[i][0]}">
                        <td>${res[i][1]}</td>
                        <td>${res[i][2]}</td>
                        <td>${res[i][3]}</td>
                        <td>${res[i][4]}</td>
                    `;
                    if (res[i][5] == 'Pending') {
                        entry_html += `<td class="order-status" style="color:red;font-weight:bold;">${res[i][5]}</td>
                        `;
                    } else if (res[i][5] == 'Ready'){
                        entry_html += `<td class="order-status" style="color:rgb(36, 163, 206);font-weight:bold;">${res[i][5]}</td>
                        `;
                    }  else if (res[i][5] == 'Cancelled'){
                        entry_html += `<td class="order-status" style="color:orange;font-weight:bold;">${res[i][5]}</td>
                        `;
                    }
                    else if (res[i][5] == 'Served'){
                        entry_html += `<td class="order-status" style="color:#28a745;font-weight:bold;">${res[i][5]}</td>
                        `;
                    }
                    entry_html += `
                        <td class="table-action">
                            <button id="cancel-order" class="${res[i][0]}">Cancel</button>
                            <button id="ready" class="${res[i][0]}">Ready</button>
                            <button id="serve" class="${res[i][0]}">Serve</button>
                            <button id="delete-order-entry" class="${res[i][0]}">Delete</button>
                        </td>
                    </tr>`;
                    container.insertAdjacentHTML("afterbegin", entry_html);
                }
                $(".orders").css("display", "block");

                //actions..
                //cancel
                $(".table-action #cancel-order").on("click", function(){
                    //cancel all

                    let id = $(this).attr("class");
                    //fetch ticket
                    $.ajax({
                        type: 'POST',
                        url: 'fetch_ticket_for_cancellation.php',
                        data: {
                            id: id
                        },
                        success: function(res){
                            let ticket = res;
                            document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                            <div class="cancellation-option-overlay" id="cancel-order-confirmation" style="z-index:4000;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);">
                                <div>
                                    <span style="text-align:center;font-size:20px;color:#666;">Cancel option:</span>
                                    <div>
                                        <button>All orders</button>
                                        <button>Selected</button>
                                    </div>
                                </div>
                            </div>`);

                            $(".cancellation-option-overlay").on("click", function(){
                                $(this).remove();
                            })
                            $(".cancellation-option-overlay > div").on("click", function(event){
                                event.stopPropagation();
                            })

                            //cancel all orders
                            $(".cancellation-option-overlay button:nth-child(1)").on("click", function(){
                                alert('This feature is not available.');
                                /*
                                $(".cancellation-option-overlay").remove();
                                document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                                <div class="cancel-order-confirmation" id="cancel-order-confirmation" style="z-index:4000;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);">
                                    <div>
                                        <span style="text-align:center;font-weight:bold;color:#666;font-size:20px;">Cancel ${res} all orders.</span>
                                        <input id="admin-password" type="password" placeholder="Admin password.."/>
                                        <button id="order-cancellation-confirm">Cancel Order</button>
                                    </div>
                                </div>`);

                                $(".cancel-order-confirmation").on("click", function(){
                                    $(this).remove();
                                })
                                $(".cancel-order-confirmation > div").on("click", function(event){
                                    event.stopPropagation();
                                })

                                $("#order-cancellation-confirm").on("click", function(){
                                    let pass = document.getElementById("admin-password");
                                    $.ajax({
                                        type: 'POST',
                                        url: 'verify_admin_password.php',
                                        data: {
                                            pass: pass.value,
                                        },
                                        success: function(res){
                                            if (res == 'confirmed') {
                                                $.ajax({
                                                    type: 'POST',
                                                    url: 'cancel_all_orders_confirmed.php',
                                                    data: {
                                                        ticket: ticket
                                                    },
                                                })
                                                $.ajax({
                                                    type: 'POST',
                                                    url: 'fetch_amount_all_forCancellation.php',
                                                    data: {
                                                        ticket: ticket
                                                    },
                                                    success: function(res){
                                                        res = JSON.parse(res);
                                                        let totalAmount = 0;
                                                        for (let i = 0; i < res.length; i++) {
                                                            totalAmount += parseInt(res[i]);
                                                        }
                                                        alert(totalAmount);
                                                        $.ajax({
                                                            type: 'POST',
                                                            url: 'subtract_balance_cashier.php',
                                                            data: {
                                                                amount: totalAmount
                                                            },
                                                            success: function(){
                                                                document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                                                <div class="check-out-notif" style="background:rgb(36, 180, 36);padding:15px 10px;font-size:20px;">Order Cancelled.</div>`);
                                                                $(".cancel-order-confirmation").remove();
                                                                setTimeout(function(){
                                                                    document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                                                    <div class="check-out-notif" style="background:orange;padding:10px;">Reloading the page..</div>`);
                                                                    setTimeout(function(){
                                                                        location.reload();
                                                                    }, 2000);
                                                                }, 1000);
                                                            }
                                                        })
                                                        //update detailed report
                                                        $.ajax({
                                                            type: 'POST',
                                                            url: 'update_detailed_report_allOrders_cancellation.php',
                                                            data: {
                                                                ticket: ticket
                                                            }
                                                        })
                                                    }
                                                })
                                                
                                            } else {
                                                alert("Not an admin password.");
                                            }
                                        }
                                    })
                                }) */
                                
                            })

                            //individual
                            $(".cancellation-option-overlay button:nth-child(2)").on("click", function(){
                                $(".cancellation-option-overlay").remove();
                                document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                                <div class="cancel-order-confirmation" id="cancel-order-confirmation" style="z-index:4000;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);">
                                    <div>
                                        <span style="text-align:center;font-weight:bold;color:#666;font-size:20px;">Cancel ${res} order.</span>
                                        <input id="admin-password" type="password" placeholder="Admin password.."/>
                                        <button id="order-cancellation-confirm">Cancel Order</button>
                                    </div>
                                </div>`);

                                $(".cancel-order-confirmation").on("click", function(){
                                    $(this).remove();
                                })
                                $(".cancel-order-confirmation > div").on("click", function(event){
                                    event.stopPropagation();
                                })

                                $("#order-cancellation-confirm").on("click", function(){
                                    let pass = document.getElementById("admin-password");
                                    $.ajax({
                                        type: 'POST',
                                        url: 'verify_admin_password.php',
                                        data: {
                                            pass: pass.value,
                                        },
                                        success: function(res){
                                            if (res == 'confirmed') {
                                                $.ajax({
                                                    type: 'POST',
                                                    url: 'cancel_order_confirmed.php',
                                                    data: {
                                                        id: id
                                                    },
                                                    success: function(res){
                                                        $.ajax({
                                                            type: 'POST',
                                                            url: 'fetch_individual_forCancellation.php',
                                                            data: {
                                                                id: id
                                                            },
                                                            success: function(res){
                                                                console.log(res);
                                                                res = JSON.parse(res);
                                                                $.ajax({
                                                                    type: 'POST',
                                                                    url: 'subtract_balance_cashier.php',
                                                                    data: {
                                                                        amount: parseInt(res[0])
                                                                    },
                                                                    success: function(){
                                                                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                                                        <div class="check-out-notif" style="background:rgb(36, 180, 36);padding:15px 10px;font-size:20px;">Order Cancelled.</div>`);
                                                                        $(".cancel-order-confirmation").remove();
                                                                        setTimeout(function(){
                                                                            document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                                                            <div class="check-out-notif" style="background:orange;padding:10px;">Reloading the page..</div>`);
                                                                            setTimeout(function(){
                                                                                location.reload();
                                                                            }, 2000);
                                                                        }, 1000);
                                                                    }
                                                                })

                                                                //update detailed report
                                                                $.ajax({
                                                                    type: 'POST',
                                                                    url: 'update_detailed_report_individual_cancellation.php',
                                                                    data: {
                                                                        year: time.getFullYear(),
                                                                        time: res[1],
                                                                        ticket: res[2],
                                                                        item: res[3],
                                                                    }
                                                                })
                                                            }
                                                        })
                                                        
                                                    }
                                                })
                                                
                                            } else {
                                                alert("Not an admin password.");
                                            }
                                        }
                                    })
                                })
                            })
                        }
                    })
                    
                    /*
                    $.ajax({
                        type: 'POST',
                        url: 'update_order.php',
                        data: {
                            action: "Cancel",
                            id: $(this).attr("class")
                        },
                        success: function(res){
                            $(`#order${txt} .order-status`).html("Cancelled");
                            $(`#order${txt} .order-status`).css("color", "orange");
                        }
                    }) */
                })

                //ready
                $(".table-action #ready").on("click", function(){
                    let txt = $(this).attr("class");
                    $.ajax({
                        type: 'POST',
                        url: 'update_order.php',
                        data: {
                            action: "Ready",
                            id: $(this).attr("class")
                        },
                        success: function(res){
                            $(`#order${txt} .order-status`).html("Ready");
                            $(`#order${txt} .order-status`).css("color", "rgb(36, 163, 206)");
                        }
                    })
                })
                
                //to be served
                $(".table-action #serve").on("click", function(){
                    let txt = $(this).attr("class");
                    $.ajax({
                        type: 'POST',
                        url: 'update_order.php',
                        data: {
                            action: "Served",
                            id: $(this).attr("class")
                        },
                        success: function(res){
                            $(`#order${txt} .order-status`).html("Served");
                            $(`#order${txt} .order-status`).css("color", "#28a745");
                        }
                    })
                })
                //delete order entry
                $(".table-action #delete-order-entry").on("click", function(){
                    let txt = $(this).attr("class");
                    $.ajax({
                        type: 'POST',
                        url: 'update_order.php',
                        data: {
                            action: "delete",
                            id: $(this).attr("class")
                        },
                        success: function(res){
                            $(`#order${txt}`).remove();
                        }
                    })
                })
            }
        }
    })
})
//exit
$("#exit-orders-panel").on("click", function(){
    $(".orders").css("display", "none");
    let container = document.getElementById("tbody");
    while (container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    }
})

function confirmation(action, message){
    $("#message").html(`<span style="font-size:20px;color:#666;">${message}</span>`);

    $(".confirmation-overlay").css("display", "block");

    $(".confirmation-buttons #yes").on("click", function(){
        if (action == 'log-out') {
            $.ajax({
                type: 'POST',
                url: 'logged_out.php',
                success: function(res){
                    location.reload();
                }
            })
        } else if (action == 'change-user') {
            $.ajax({
                type: 'POST',
                url: 'change_user.php',
                success: function(res){
                    location.reload();
                }
            })
        }
        
    })

    $(".confirmation-buttons #no").on("click", function(){
        $(".confirmation-overlay").css("display", "none");
    })
    
}

//force close
function force_close(){
    clearInterval(interval);
    $.ajax({
        type: 'POST',
        url: 'force_close.php'
    })
}