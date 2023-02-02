$(document).ready(function(){
    $(".side-bar").animate({
        left: "0"
    }, "slow");
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
    var currentUser = "JM";
    var section = '';
    var items_remaining_time = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const time = new Date();

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
        setInterval(function(){
            for(let i = firstId; i < (firstId + size); i++){
                if (map.get(`id${i}`) <= 0) {
                    $(`#item${i}`).html('No limit');
                } else {
                    let rem = map.get(`id${i}`) / 60;
                    rem = Math.round(rem);
                    //time ended
                    if (map.get(`id${i}`) == 1){
                        //alert cashier
                        $(`#item${i}`).html("<span style='font-size:15px;color:red;'>ENDED</span>");
                    } else {
                        $(`#item${i}`).html(rem + " min(s)");
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
                        },
                        success: function(res){
                            console.log(res);
                        },
                        error: function(res){
                            console.log(res);
                        }
                    })
                }
                x = 0;
            }
            x += 1
        }, 10);
        
    }


    //render playground time section
    $.ajax({
        type: 'get',
        url: 'fetch_playground_time.php',
        success: function(res){
            console.log(res);
            res = JSON.parse(res);
            let len = res.length;
            let map = new Map();
            map.set('firstId', parseInt(res[0][0]));
            for (let i = 0; i < len; i++){
                items_remaining_time.push(res[i][2]);
                let txt = '';
                let rem;
                if (res[i][2] == 'No limit'){
                    rem = 0;
                } else {
                    rem = parseInt(res[i][2]);
                }
                
                map.set(`id${res[i][0]}`, rem);
                if (res[i][1] == '1 hour'){
                    res[i][1] = '1hr';
                    txt = '60 mins';
                } else if (res[i][1] == '2 hours'){
                    res[i][1] = '2hrs';
                    txt = '120 mins';
                } else if (res[i][1] == 'Unlimited'){
                    res[i][1] = 'Unli';
                    txt = 'No limit';
                }
                time_table.insertAdjacentHTML("beforeend", `
                <tr>
                    <td style="font-size:12px;border-bottom: 1px solid gray;text-align:center;">#${res[i][0]}</td>
                    <td style="font-size:12px;border-bottom: 1px solid gray;text-align:center;border-left:1px solid gray;">${res[i][1]}</td>
                    <td id="item${res[i][0]}" style="font-size:12px;border-left:1px solid gray;text-align:center;border-bottom: 1px solid gray;">${txt}</td>
                </tr>`)
            }
            start_time(map);
        }
    })
    
    $.ajax({
        type: 'get',
        url: 'fetchAvailableProducts.php',
        success: function(items){
            items = JSON.parse(items);
            for (let i = 0; i < items.length; i++) {
                itemsContainer.insertAdjacentHTML("beforeend", `
                <div class="item" id="item${i + 1}">
                    <div class="item-price"><span data-price="${items[i][2]}">₱${items[i][2]}</span></div>
                    <div class="item-name-container">
                        <span data-item="${items[i][0]}">${items[i][0]}</span>
                        <span data-description="${items[i][1]}">${items[i][1]}</span>
                    </div>
                </div>`)
            }
            
            //cafe item pick function..
            $(".item").on("click", function(){
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
                        <span>${itemPrice}</span>
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
            })
        }
    })
    //cancel function
    $("#cancel").on("click", () => {
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
    })
    //clear all items selected
    $("#clear-all").on("click", () => {
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
    })

    //check out function..
    $("#check-out").on("click", () => {
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
    })

    //back button
    $("#back").on("click", function(){
        location.reload();
    })

    //proceed function..
    $("#proceed").on("click", () => {
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
                change = amount - totalPrice;
                //change notif
                document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                <div class="check-out-notif" style="background:orange;font-size:20px;padding:15px 10px;">Change:${change}</div>`);
                
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
                        
                        setTimeout(function(){
                            let wrapper = document.getElementById("print-wrapper");
                            wrapper.insertAdjacentHTML("beforeend", `
                            <div class="document-to-print">
                                <span>ANSON'S PLAYGROUND AND CAFE</span>
                                <span>Osmeña st., Masbate City</span>
                                <table id="table">
                                    <tr>
                                        <td style=" font-size: 12px;">Product:</td>
                                        <td style=" font-size: 12px;">Price:</td>
                                    </tr>
                                </table>
                            </div>`)
                            let table = document.getElementById("table");
                            for (let i = 0; i < pickedItems.length; i++) {
                                table.insertAdjacentHTML("beforeend", `
                                <tr>
                                    <td style="padding:3px 0 3px 40px; font-size: 12px;">${pickedItems[i]}</td>
                                    <td style="padding:3px 0 3px 40px; font-size: 12px;">${price[i]}</td>
                                </tr>`)
                            }
                            table.insertAdjacentHTML("beforeend", `
                            <tr>
                                <td colspan="2" style="padding: 3px 0 3px 40px; font-size: 12px;">Total: ${totalPrice}</td>
                            </tr>`)
                            
                            //notif
                            document.getElementById("notification-container").insertAdjacentHTML("afterbegin", `
                            <div class="check-out-notif" style="background:orange;padding:15px 10px;">Printing receipt..</div>`);

                            //print
                            window.print();

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
                                if ($(this).attr("id") !== undefined) {
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
                                    insertIntoDatabase(section, pickedItems, price, currentUser, currentTimeAndDate);
                                    //

                                    let notifs = document.querySelectorAll(".check-out-notif");
                                    setTimeout(function(){
                                        for (let i = 0; i < notifs.length; i++){
                                            notifs[i].remove();
                                        }
                                    }, 5000);
                                } else {
                                    amount = 0;
                                    $("#amount").html(amount);
                                }
                                $(".receipt-printed-modal").remove();
                            })

                            
                        }, 3000);

                    } else {
                        $(".proceed-receipt").remove();
                        proceedButtonClicked = false;
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
    })

    //playground item pick function..
    $(".items-container-playground > div").on("click", function(){
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
                    <span>150</span>
                </div>`);
                itemPrice = 150;
                pickedItems.push("1 hour");

            } else if (itemId == "two-hours") {
                document.getElementById("modal-main-content").insertAdjacentHTML("beforeend", `
                <div class="item-to-check-out">
                    <span>2 hours</span>
                    <span>120 minutes</span>
                    <span>200</span>
                </div>`);
                itemPrice = 200;
                pickedItems.push("2 hours");
            } else if (itemId == "unlimited") {
                document.getElementById("modal-main-content").insertAdjacentHTML("beforeend", `
                <div class="item-to-check-out">
                    <span>Unlimited</span>
                    <span>No limit</span>
                    <span>250</span>
                </div>`);
                itemPrice = 250;
                pickedItems.push("Unlimited");
            }
            price.push(itemPrice);
            totalPrice += itemPrice;
            totalPriceElement.innerHTML = `₱${totalPrice}`;
        }
    })
})

function insertIntoDatabase(section, items, pricelist, user, time){
    //console.log(section, items, pricelist, user, time);
    let url = '';
    section == 'play' ? url = 'playgroundReport.php' : url = 'cafeReport.php';
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            items: items,
            pricelist: pricelist,
            user: user,
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
                    $.ajax({
                        type: 'POST',
                        url: 'playground_time.php',
                        data: {
                            items: items,
                        },
                        success: function(res){
                            console.log(`${res} adding row in playground_time table.`)
                        },
                        error: function(res){
                            console.log(`${res} adding row in playground_time table.`);
                        }
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

