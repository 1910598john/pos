<?php
session_start();
if (!isset($_SESSION['cashier'])) {
    header('Location: http://localhost/pos/');
}
?>
<html>
<head>
    <title>Cashier Interface (<?php echo $_SESSION['cashier']; ?>)</title>
    <link rel="stylesheet" href="./css/styles.css">
    <script src="./js/jquery-3.6.2.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=0">
</head>
<body onbeforeunload="force_close()">
<div class="print-wrapper" id="print-wrapper"></div>
<div id="body-content">
    <div id="notification-container"></div>
    <div class="side-bar">
        <div class="side-bar-content">
            <h2 style="text-align:center;">Playground</h2>
            <div class="time-wrapper">
                <table id="time-table">
                    <tr>
                        <td style="font-size:12px;font-weight:bold;text-align:center;border-bottom:1px solid gray;">TICKET_ID</td>
                        <td style="border-left:1px solid gray;font-size:12px;font-weight:bold;text-align:center;border-bottom:1px solid gray;">ITEM</td>
                        <td style="font-size:12px;font-weight:bold;text-align:center;border-left:1px solid gray;border-bottom: 1px solid gray;padding: 0 20px;">END_TIME</td>
                        <td style="font-size:12px;font-weight:bold;text-align:center;border-left:1px solid gray;border-bottom: 1px solid gray;padding: 0 20px;">QTY</td>
                    </tr>
                </table>
            </div>
            <div class="bottom-panel">
                <div class="buttons">
                    <button id="extend">EXTEND</button>
                    <button id="remove">REMOVE</button>
                </div>
                <div class="current-user">
                    <span>User: <?php echo $_SESSION['cashier'];?></span>
                    <button id="check-balance">CHECK BALANCE</button>
                </div>
                <button id="show-pending-orders">SHOW ORDERS</button>
            </div>
        </div>
    </div>
    <div class="main">
        <div class="header">
            <span id="time-now">00:00 AM</span>
        </div>
        <div class="main-content">
            <div class="items-container" id="items-container" style="box-shadow: 0 0 5px gray;"></div>
            <div class="items-container-playground" id="items-container-playground" style="box-shadow: 0 0 5px gray;">
                
                <!---->
            </div>
        </div>
    </div>
    <div class="check-out-modal">
        <button id="cancel">Cancel</button>
        <div class="modal-content" >
            <div class="modal-header">
                <span>Item</span>
                <span>Description</span>
                <span>Amount</span>
            </div>
            <div class="item-to-check-out-container" id="modal-main-content"></div>
            <div class="total-wrapper">
                <div>
                    <span>Total: <span id="is-employee" style="font-size:15px;opacity:0;"> (discounted)</span></span>
                    <span id="total-price">???0</span>
                </div>
                <div>
                    <button id="employee">Employee</button>
                </div>
            </div>
            <div class="modal-buttons">
                <button id="clear-all">Clear all</button>
                <button id="check-out">Check Out</button>
            </div>
            <div class="available-tables" style="display:none;">
                <h4 style="text-align:center;padding:10px 0;">SELECT TABLE</h4>
                <div id="tables"></div>
            </div>
        </div>
    </div>
    <div class="pop-up-wrapper" style="display:none;">
        <div class="pop-up">
        <button id="back">Back</button>
            <span id="amount" style="color:#666;">0</span>
            <div class="buttons-container">
                <div id="one">1</div>
                <div id="five">5</div>
                <div id="ten">10</div>
                <div id="twenty">20</div>
                <div id="fifty">50</div>
                <div id="one-hundred">100</div>
                <div id="two-hundred">200</div>
                <div id="five-hundred">500</div>
                <div id="1k">1000</div>
                <div id="delete" style="background:red;">DELETE</div>
            </div>
            <button id="proceed">Proceed</button>
        </div>
    </div>
</div>
<div class="orders" style="z-index:3000;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);display:none;">
    <div class="orders-list-wrapper" style="position:relative;">
        <button id="exit-orders-panel" style="position:absolute;right:3%;top:3%;padding:15px 30px;background:red;color:#fff;font-size:15px;font-weight:bold;border-radius:4px;border:1px solid transparent;">EXIT</button>
        <span style="font-size:30px;">Pending Orders</span>
        <div class="orders-list">
            <table>
                <thead>
                    <tr>
                        <th>Ticket No.</th>
                        <th>Table No.</th>
                        <th>Order</th>
                        <th>Time Ordered</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                </tbody>
            </table>
        </div>
    </div>
</div>
<div class="combo-deals-overlay" style="z-index:5000;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);">
    <div class="combo-deals-wrapper">
        <div class="header">
            <span>COMBO DEALS</span>
        </div>
        <div class="content">
            <div class="fries-choices primary-choices choices-wrapper">
                <span>First choice: </span>
                <div class="choices" id="primary-choices-container"></div>
            </div>
            <div class="food-choices secondary-choices choices-wrapper">
                <span>Second choice: </span>
                <div class="choices" id="secondary-choices-container"></div>
            </div>
            <div class="drinks-choices">
                <span>Drinks: </span>
                <div id="drinks-choices-container"></div>
            </div>
            <!--if there is third-choice-->
            <div class="food-choices third-choices choices-wrapper">
                <span>Third choice: </span>
                <div id="third-choices-container"></div> 
            </div>
        </div>
    </div>
</div>
<div class="cashier-balance" style="z-index:3000;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);display:none;">
    <div class="balance-wrapper">
        <button id="exit-cashier-balance">Exit</button>
        <div class="cashier-profile">
            <div class="profile-pic-container">
                <div class="profile-pic"></div>
                <div class="name-of-cashier"><span>Cashier : <?php echo $_SESSION['cashier']; ?></span></div>
            </div>
            <button id="log-out">END SHIFT</button>
            <button id="change-user" style="background:#28a745;">CHANGE USER</button>
        </div>
        <div class="header">
            <span>Total Sales : <span id="total-sales">0</span></span>
        </div>
        <select id="cat-cashier" style="position:absolute;left:20px;padding:5px;border-radius:4px;color:#666;">
            <option value="all">All</option>
            <option value="play" style="font-size:15px;">Playground</option>
            <option value="cafe" style="font-size:15px;">Cafe</option>
        </select>
        <div class="report">
            <table>
                <thead>
                    <th>ITEM</th>
                    <th>AMOUNT</th>
                    <th>QUANTITY</th>
                    <th>isEmployee</th>
                    <th>TIME</th>
                    <th>DATE</th>
                </thead>
                <tbody id="tbody2">
                </tbody>
            </table>
        </div>
        <div style="position:absolute;left:50px;font-size:25px;"><span id="section-cashier">Cashier Total</span></span> : <span id="total-cashier">0</span></span>
    </div>
</div>
<div class="confirm-check-out-modal" style="display:none;">
    <div>
        <span>You haven't selected a table yet.</span>
        <div>
            <button id="continue-check-out">Continue anyway</button>
            <button id="back">Back</button>
        </div>
    </div>
</div>
<div class="confirmation-overlay" style="z-index:5000;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);display:none;">
    <div class="confirmation-wrapper">
        <span id="message">Message</span>
        <div class="confirmation-buttons">
            <button id="yes">YES</button>
            <button id="no">NO</button> 
        </div>
    </div>
</div>

<script src="./js/main.js"></script>
</body>
</html>