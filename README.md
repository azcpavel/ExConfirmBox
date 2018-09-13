# ExConfirmBox
Pure JavaScript confirmbox

Add script to your project
<script src="exConfirm.js"></script>

call the function to get confirmation
```
Default Options
{
    overlayBackground : "rgba(255,255,255,0)", //String [HEX, RGB, RGBA]
    bodyBackground: "rgba(255,255,255,1)", //String [HEX, RGB, RGBA]
    titleBackground: "rgba(66, 139, 202, 1)", //String [HEX, RGB, RGBA]
    textColor: "#000000", //String [HEX, RGB, RGBA]
    titleColor: "#ffffff", //String [HEX, RGB, RGBA]
    btnPosition: "right", //String [left, center, right]
    top: "25%", //String [px, %]
    right: "38%", //String [px, %]
    btnClassSuccess: "btn btn-success btn-sm", //String
    btnClassSuccessText: "Yes", //String
    btnClassFail: "btn btn-danger btn-sm", //String
    btnClassFailText: "No", //String
    title: "Confirmation", //String
    message: "Confirmation Required!" //String
}

var configOpt = {
    title: "Sample Title!",
    message : "Sample Query?"
};
exConfirmPromise.make(configOpt).then(function (userOption) {
  alert(userOption);
});
```
