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
</head>
<body>
<div id="body-content">
    <div id="notification-container"></div>
    <div class="side-bar">
        <div class="side-bar-content">
            <h2 style="text-align:center;">Playground</h2>
            <div class="time-wrapper">
                <table id="time-table">
                    <tr>
                        <td style="font-size:12px;font-weight:bold;text-align:center;border-bottom:1px solid gray;">Ticket ID</td>
                        <td style="border-left:1px solid gray;font-size:12px;font-weight:bold;text-align:center;border-bottom:1px solid gray;">Item</td>
                        <td style="font-size:12px;font-weight:bold;text-align:center;border-left:1px solid gray;border-bottom: 1px solid gray;padding: 0 20px;">Remaining</td>
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
                    <button id="log-out">Logout</button>
                </div>
            </div>
        </div>
    </div>
    <div class="main">
        <div class="header"></div>
        <div class="main-content">
            <div class="items-container" id="items-container" style="box-shadow: 0 0 5px gray;"></div>
            <div class="items-container-playground" id="items-container-playground" style="box-shadow: 0 0 5px gray;">
                <div id="one-hour">
                    <div class="price">₱150</div>
                    <span>1 hour</span>
                </div>
                <div id="two-hours">
                    <div class="price">₱200</div>
                    <span>2 hours</span>
                </div>
                <div id="unlimited">
                    <div class="price">₱250</div>
                    <span>Unlimited</span>
                </div>
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
                    <span id="total-price">₱0</span>
                </div>
                <div>
                    <button id="employee">Employee</button>
                </div>
            </div>
            <div class="modal-buttons">
                <button id="clear-all">Clear all</button>
                <button id="check-out">Check Out</button>
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
<div class="print-wrapper" id="print-wrapper"></div>
<script src="./js/main.js"></script>
</body>
</html>