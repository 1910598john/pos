<html>
<head>
    <link rel="stylesheet" href="./css/styles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
</head>
<body>
<div id="body-content">
    <div id="notification-container"></div>
    <div class="side-bar">
        <div class="side-bar-content">
            <h1 style="text-align:center;">Playground</h1>
            <div class="time-wrapper"></div>
        </div>
    </div>
    <div class="main">
        <div class="header"></div>
        <div class="main-content">
            <div class="items-container" id="items-container"></div>
            <div class="items-container-playground" id="items-container-playground">
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
                <span>Total:</span>
                <span id="total-price">₱0</span>
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
            <span id="amount">0</span>
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