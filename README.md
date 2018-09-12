# ExConfirmBox
Pure JavaScript confirmbox

Add script to your project
<script src="exConfirm.js"></script>

call the function to get confirmation

Default Options
{
    bodyBackground: "rgba(255,255,255,1)",
    titleBackground: "rgba(66, 139, 202, 1)",
    textColor: "#000000",
    titleColor: "#ffffff",
    btnPosition: "right",
    top: "25%",
    btnClassSuccess: "btn btn-success btn-sm",
    btnClassFail: "btn btn-danger btn-sm",
    title: "Confirmation",
    message: "Confirmation Required!"
}

var configOpt = {
    title: "Sample Title!",
    message : "Sample Query?"
};
exConfirmPromise.make(configOpt).then(function (userOption) {
  alert(userOption);
});

