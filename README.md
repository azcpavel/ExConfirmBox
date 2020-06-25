# ExConfirmBox
Pure JavaScript confirmbox

Add script to your project
<script src="exConfirm.js"></script>

call the function to get confirmation
```
Default Options
{
    zIndex: 9999, //Integer
    overlayBackground: "rgba(255,255,255,0)", //String [HEX, RGB, RGBA]
    bodyBackground: "rgba(255,255,255,1)", //String [HEX, RGB, RGBA]
    bodyBorder: "2px solid #1c84ef", //String
    titleBackground: "rgb(28, 132, 239)", //String [HEX, RGB, RGBA]
    textColor: "#000000", //String [HEX, RGB, RGBA]
    titleColor: "#ffffff", //String [HEX, RGB, RGBA]
    btnPosition: "right", //String [left, center, right]
    top: "5%", //String [px, %]
    right: "38%", //String [px, %]
    btnClassSuccess: "btn btn-default btn-sm btn-sm-25px", //String
    btnClassSuccessText: "Yes", //String
    btnClassFail: "btn btn-default btn-sm btn-sm-25px", //String
    btnClassFailText: "No", //String
    title: "Confirmation", //String
    message: "Confirmation Required!", //String
    animation: true, //Bool
    animationTime: 500, //Integer
    disableForceFocus : false, //Bool
    onResolve : function(){ //Function

    },
    onReject : function(){ //Function

    },   
}

var configOpt = {
    title: "Sample Title!",
    message : "Sample Query?"
};
exConfirmPromise.make(configOpt).then(function (userOption) {
    alert(userOption);
}).then(function () {
    exConfirmPromise.make(configOpt).then(function (userOption) {
        alert(userOption)
    });
});
```
