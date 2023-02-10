var itemsContainer = document.getElementById("items-container");
const pickedItems = [];
const price = [];
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
var pageReloading = false;
var isEmployee = false;
var discount = 0;
var interval;
$(document).ready(function(){
    $(".side-bar").animate({
        left: "0"
    }, "slow");
    
    //start playground time
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
            if (x == 10) {
                for(let i = firstId; i < (firstId + size); i++) {
                    $.ajax({
                        type: 'POST',
                        url: 'updatePlaygroundTime.php',
                        data:{
                            id: i,
                            rem: map.get(`id${i}`)
                        }
                    })
                }
                x = 0;
            }
            x += 1
        };
    }


    //render playground time section
    $.ajax({
        type: 'POST',
        url: 'fetch_playground_time.php',
        data: {
            date: `${months[time.getMonth()]} ${time.getDate()}`
        },
        success: function(res){
            if (!res.length == 0) {
                res = JSON.parse(res);
                let len = res.length;
                let map = new Map();
                map.set('firstId', parseInt(res[0][0]));
                for (let i = 0; i < len; i++){
                    items_remaining_time.push(res[i][2]);
                    let txt = '';
                    let rem;
                    let itemName;
                    if (res[i][2] == 'No limit'){
                        rem = 0;
                    } else {
                        rem = parseInt(res[i][2]);
                    }
                    
                    map.set(`id${res[i][0]}`, rem);
                    if (res[i][1] == '1 hour'){
                        res[i][1] = '1hr';
                        txt = '60 mins';
                        itemName = "1hr";
                    } else if (res[i][1] == '2 hours'){
                        res[i][1] = '2hrs';
                        txt = '120 mins';
                        itemName = "2hrs";
                    } else if (res[i][1] == 'Unlimited'){
                        res[i][1] = 'Unli';
                        txt = 'No limit';
                        itemName = "Unli";
                    }
                    time_table.insertAdjacentHTML("beforeend", `
                    <tr>
                        <td style="font-size:12px;border-bottom: 1px solid gray;text-align:center;">#${res[i][3]}</td>
                        <td style="font-size:12px;border-bottom: 1px solid gray;text-align:center;border-left:1px solid gray;">${itemName}</td>
                        <td id="time${res[i][0]}" style="font-size:12px;border-left:1px solid gray;text-align:center;border-bottom: 1px solid gray;">${txt}</td>
                    </tr>`)
                }
                start_time(map);
            } else {
                time_table.insertAdjacentHTML("beforeend", `
                <tr>
                    <td colspan="3" style="text-align:center;padding:20px 0;font-size:12px;">No item</td>
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
                itemsContainer.insertAdjacentHTML("beforeend", `
                <div class="item" id="fetched-item${i + 1}">
                    <div class="item-price"><span data-price="${items[i][2]}">₱${items[i][2]}</span></div>
                    <div class="item-name-container">
                        <span data-item="${items[i][0]}">${items[i][0]}</span>
                        <span data-description="${items[i][1]}">${items[i][1]}</span>
                    </div>
                </div>`);
                let image;
                image = `url(./images/product${i + 1}.jpg)`;
                $(`#fetched-item${i + 1}`).css({
                    'background-image': image,
                    'background-position' : 'center',
                    'background-repeat' :'no-repeat',
                    'background-size' : 'cover'
                });
            }
            
            //cafe item pick function..
            $(".item").on("click", function(){
                if (!pageReloading){
                    if (isEmployee){
                        location.reload();
                    }
                    $("#employee").css("display", "block");
                    if (playgroundItemsPicked) {
                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                        <div class="check-out-notif" style="background:#ed3a2d;padding:10px;">Picking items in this section is disabled.</div>`);
    
                    } else {
                        cafeItemsPicked = true;
                        $(".check-out-modal").addClass("check-out-modal-animate");
                        $(".check-out-modal").removeClass("check-out-modal-animate2");
                        let itemId = $(this).attr("id");
                        let item = document.getElementById(`${itemId}`);
                        
                        //get item price
                        let itemPrice = item.children[0].children[0].dataset.price;
                        let itemName = item.children[1].children[0].dataset.item;
                        let itemDescription = item.children[1].children[1].dataset.description;
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
                
            })
            $("#employee").on("click", function(){
                
                if (!isEmployee){
                    let dsc = 0;
                    let temp_total = totalPrice;
                    for (let i = 0; i < price.length; i++) {
                        dsc += price[i] * 0.40;
                    }
                    temp_total = temp_total - dsc;
                    temp_total = Math.round(temp_total);
                    discount = temp_total;
                    totalPriceElement.innerHTML = `₱${temp_total}`;

                    isEmployee = true;
                    $("#is-employee").css("opacity", "1");
                    $(this).css("background", "orange");

                    document.getElementById("modal-main-content").insertAdjacentHTML("beforeend", `
                    <div class="item-to-check-out" id="discount-elem">
                        <span>Discount</span>
                        <span>Employee</span>
                        <span>₱-${totalPrice - temp_total}</span>
                    </div>`);

                    price.push(parseInt(`-${totalPrice - temp_total}`));
                    pickedItems.push('Discount');

                } else {
                    isEmployee = false;
                    $("#is-employee").css("opacity", "0");
                    $(this).css("background", "rgb(36, 163, 206)");

                    $("#discount-elem").remove();
                    price.pop();
                    discount = 0;
                    totalPriceElement.innerHTML = `₱${totalPrice}`;
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
            totalPrice = 0;

            cafeItemsPicked = false;
            playgroundItemsPicked = false;

            isEmployee = false;
        }
        
    })
    //clear all items selected
    $("#clear-all").on("click", () => {

        if (!pageReloading){
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
            if (isEmployee){
                totalPrice = discount;
            }
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
                        if (isEmployee){
                            amount = amount + (totalPrice - discount);
                        }
                        change = amount - totalPrice;

                        //change notif
                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                        <div class="check-out-notif" style="background:orange;font-size:20px;padding:15px 10px;">Change: <span style="padding-left:3px;">${change}</span></div>`);
                        
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
            
                                    
                                    if (section == 'play') {
                                        generateTickets();
                                        //generate tickets
                                        function generateTickets(){
                                            for (let i = 0; i < pickedItems.length; i++){
                                                let txt = '';
                                                for (let j = 0; j < 4; j++) {
                                                    let num = Math.round(Math.random() * 9);
                                                    txt += num;
                                                }
                                                ticketNumbers.push(txt);
                
                                                verifyTickets(ticketNumbers);
                                            }
                                        }
                                        
                                        function verifyTickets(tickets){
                                            let len = 0;
                                            for (let x = 0; x < tickets.length; x++){
                                                if (tickets[x].length == 4) {
                                                    len += 1;
                                                }
                                            }
                                            if (!(len == tickets.length)) {
                                                generateTickets();
                                            }
                                        }
            
                                        for (let x = 0; x < pickedItems.length; x++) {
                                            let wrapper = document.getElementById("print-wrapper");
                                            wrapper.insertAdjacentHTML("beforeend", `
                                            <div class="document-to-print">
                                                <span style="font-size:12px;">ANSON'S PLAYGROUND AND CAFE</span>
                                                <span style="font-size:12px;">Osmeña st., Masbate City</span>
                                                <table id="table">
                                                    <tr>
                                                        <td colspan="2" style="text-align:center;padding: 3px 0 3px 0; font-size: 30px;"><span style="font-size:13px;"></span> <span style="font-weight:bold;">${ticketNumbers[x]}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td style=" font-size: 13px;">Item:</td>
                                                        <td style=" font-size: 13px;">Price:</td>
                                                    </tr>
                                                </table>
                                            </div>`)
            
                                            let table = document.getElementById("table");
                                            table.insertAdjacentHTML("beforeend", `
                                            <tr>
                                                <td style="padding:3px 0 3px 0; font-size: 11px;">${pickedItems[x]}</td>
                                                <td style="padding:3px 0 3px 0; font-size: 12px;font-weight:bold;">₱${price[x]}</td>
                                            </tr>`);
            
                                            window.print();
            
                                            //clear elements
                                            let container = document.getElementById("print-wrapper");
                                            while (container.lastElementChild) {
                                                container.removeChild(container.lastElementChild);
                                            }
                                        }
            
                                    } else {
                                        let wrapper = document.getElementById("print-wrapper");
                                        wrapper.insertAdjacentHTML("beforeend", `
                                        <div class="document-to-print">
                                            <span style="font-size:12px;">ANSON'S PLAYGROUND AND CAFE</span>
                                            <span style="font-size:12px;">Osmeña st., Masbate City</span>
                                            <table id="table">
                                                <tr>
                                                    <td style="width:50%;font-size: 13px;font-weight:bold;margin-bottom:5px;">Item:</td>
                                                    <td style="width:50%;font-size: 13px;font-weight:bold;margin-bottom:5px;">Price:</td>
                                                </tr>
                                            </table>
                                        </div>`)

                                        let table = document.getElementById("table");
                                        for (let i = 0; i < pickedItems.length; i++) {
                                            table.insertAdjacentHTML("beforeend", `
                                            <tr>
                                                <td style="padding:3px 0 3px 0; font-size: 12px;">${pickedItems[i]}</td>
                                                <td style="padding:3px 0 3px 0; font-size: 12px;font-weight:bold;">₱${price[i]}</td>
                                            </tr>`)
                                        }
                                        if (isEmployee){
                                            table.insertAdjacentHTML("beforeend", `
                                            <tr>
                                                <td style="padding: 3px 0 3px 0; font-size: 12px;">Total: ₱${totalPrice}</td>
                                                <td style="padding: 3px 0 3px 0; font-size: 12px;"><span style="font-weight:bold"><span style="font-size:10px;">(discounted)</span></span></td>
                                            </tr>`)
                                        } else {
                                            table.insertAdjacentHTML("beforeend", `
                                            <tr>
                                                <td style="padding: 3px 0 3px 0; font-size: 12px;">Total: </td>
                                                <td style="padding: 3px 0 3px 0; font-size: 12px;"><span style="font-weight:bold">₱${totalPrice}</span></td>
                                            </tr>`)
                                        }
                                        
            
                                        //print
                                        window.print();
                                    }
                                    
                                    
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
                                                let currentTimeAndDate = `${hr}:${min} ${txt}, ${day} (${mon}, ${date})`;
                                                
                                                //inserting into database..
                                                insertIntoDatabase(section, ticketNumbers, pickedItems, price, currentTimeAndDate);
                                                //
                
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
                    //
                    document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                        <div class="check-out-notif" style="background:orange;font-size:20px;padding:15px 10px;">Change: <span style="padding-left:3px;">₱${change}</span></div>`);

                    $.ajax({
                        type: 'POST',
                        url: 'extend.php',
                        data: {
                            selectedticket: selectedTicket,
                            payment: amountToPay,
                            itemName: itemName

                        }, success: function(res){
                            console.log(res);
                            $.ajax({
                                type: 'POST',
                                url: 'addExtendedPayment.php',
                                data: {
                                    payment: amountToPay
                                },
                                success: function(res){
                                    console.log(res);
                                    setTimeout(function(){
                                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                        <div class="check-out-notif" style="background:orange;padding:10px;">${selectedTicket} time extended.</div>`);
                                    }, 2000);
                                    setTimeout(function(){
                                        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                        <div class="check-out-notif" style="background:orange;padding:10px;">Reloading the page..</div>`);
                                        setTimeout(function(){
                                            location.reload();
                                        }, 5000);
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

    //playground item pick function..
    $(".items-container-playground > div").on("click", function(){
        if (!pageReloading){
            $("#employee").css("display", "none");
            if (cafeItemsPicked) {
                document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                <div class="check-out-notif" style="background:#ed3a2d;padding:10px;">Picking items in this section is disabled.</div>`);
    
                let notifs = document.querySelectorAll(".check-out-notif");
                setTimeout(function(){
                    for (let i = 0; i < notifs.length; i++){
                        notifs[i].remove();
                    }
                }, 5000);
    
            } else {
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
    
                } else if (itemId == "two-hours") {
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
                price.push(itemPrice);
                totalPrice += itemPrice;
                totalPriceElement.innerHTML = `₱${totalPrice}`;
            } 
        }
        
    })
})

function insertIntoDatabase(section, tickets, items, pricelist, time){
    //verify tickets
    console.log(tickets);
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
    let url = '';
    section == 'play' ? url = 'playgroundReport.php' : url = 'cafeReport.php';
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            tickets: tickets,
            items: items,
            pricelist: pricelist,
            time: time,
        },
        success: function(res){
            res == 'success' ? success_notif() : error_notif();
            //notif
            function success_notif(){
                setTimeout(function(){
                    document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                    <div class="check-out-notif" style="background:#32a852;padding:20px 10px;font-weight:bold;">Transaction success!</div>`);
                }, 1000)
                setTimeout(function(){
                    document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                    <div class="check-out-notif" style="background:orange;padding:20px 10px;font-weight:bold;">Reloading the page..</div>`);
                }, 3000)
                setTimeout(function(){
                    location.reload();
                }, 10000);
                //add row in playground_time table
                if (section == 'play') {
                    let time = new Date();
                    $.ajax({
                        type: 'POST',
                        url: 'playground_time.php',
                        data: {
                            tickets: tickets,
                            items: items,
                            date: `${months[time.getMonth()]} ${time.getDate()}`
                        },
                    })
                }
            }
            function error_notif(){
                setTimeout(function(){
                    document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                    <div class="check-out-notif" style="background:#ed3a2d;padding:20px 10px;">An error occured!</div>`);
                }, 1000)
            }
        }
    })
}

$("#remove").on("click", function(){
    if (!pageReloading){
        document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
        <div class="check-out-notif" style="background:green;padding:20px 10px;">Removing ended items..</div>`);
        
        setTimeout(function(){
            document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
            <div class="check-out-notif" style="background:orange;padding:20px 10px;">Reloading the page..</div>`);
        }, 3000)
        setTimeout(function(){
            location.reload();
        }, 5000);
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
                <div class="confirm-button">
                    <button>Confirm</button>
                </div>
            </div>
        </div>`)
        //fetch today's tickets
        $.ajax({
            type: 'POST',
            url: 'fetchTicketsForExtension.php',
            data: {
                date: `${months[time.getMonth()]} ${time.getDate()}`
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
        $(".confirm-button button").on("click", function(){
            $.ajax({
                type: 'POST',
                url: 'getItemName.php',
                data:{
                    selected: selectedTicket
                },
                success: function(res){
                    itemName = res;
                    if (selectedTicket != undefined) {
                        if (itemName == '2 hours'){
                            document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                            <div id="amount-to-pay">
                                <div class="amount-to-pay-wrapper">
                                    <div id="fifty">50</div>
                                    <div id="free" style="font-size:12px;">Free 1hr</div>
                                    <button>Confirm</button>
                                </div>
                            </div>`);
                        } else {
                            document.getElementById("body-content").insertAdjacentHTML("afterbegin", `
                            <div id="amount-to-pay">
                                <div class="amount-to-pay-wrapper">
                                    <div id="fifty">50</div>
                                    <div id="1hun">100</div>
                                    <div id="free" style="font-size:12px;">Free 1hr</div>
                                    <button>Confirm</button>
                                </div>
                            </div>`);
                        }
                        
                        $(".amount-to-pay-wrapper > div").on("click", function() {
                            if (!pageReloading){
                                $(".amount-to-pay-wrapper > div").css("background", "green");
                                $(this).css("background", "orange");
                                
                                if ($(this).attr("id") == 'free'){
                                    amountToPay = 0;
                                } else {
                                    amountToPay = $(this).html();
                                    amountToPay = parseInt(amountToPay);
                                }
                            }
                        })
                        $(".amount-to-pay-wrapper button").on("click", function(){
                            clearInterval(interval);
                            if (!pageReloading){
                                if (amountToPay != undefined) {
                                    $(".tickets-list-wrapper").remove();
                                    $("#amount-to-pay").remove();
                                    if (amountToPay == 0){
                                        $.ajax({
                                            type: 'POST',
                                            url: 'extend.php',
                                            data: {
                                                selectedticket: selectedTicket,
                                                payment: amountToPay,
                                                itemName: itemName
                    
                                            }, success: function(res){
                                                console.log(res);
                                                $.ajax({
                                                    type: 'POST',
                                                    url: 'addExtendedPayment.php',
                                                    data: {
                                                        payment: amountToPay
                                                    },
                                                    success: function(res){
                                                        console.log(res);
                                                        setTimeout(function(){
                                                            document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                                            <div class="check-out-notif" style="background:orange;padding:10px;">${selectedTicket} time extended.</div>`);
                                                        }, 2000);
                                                        setTimeout(function(){
                                                            document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                                                            <div class="check-out-notif" style="background:orange;padding:10px;">Reloading the page..</div>`);
                                                            setTimeout(function(){
                                                                location.reload();
                                                            }, 5000);
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

$("#log-out").on("click", function(){
    if (!pageReloading){
        $.ajax({
            type: 'POST',
            url: 'sign_out_user.php',
            success: function(res){
                location.reload();
            }
        })
    }
})
