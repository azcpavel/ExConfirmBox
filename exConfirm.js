/*
* @author Ahsan Zahid Chowdhury <itszahid.info>
* @since 12th September 2018
* @version 1.0.1
* @abstract To enable custom promise confirm box
*/
let exConfirmPromise = {
    "options" : {
        zIndex: 9999, //Integer
        overlayBackground: "rgba(255,255,255,0)", //String [HEX, RGB, RGBA]
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
        message: "Confirmation Required!", //String
        animation: true, //Bool
        animationTime: 500 //Integer
    },
    "exConfirmPromiseVal": null,
    "exConfirmPromiseInterval": null,
    "make": function (optionsParam) {
        if (document.querySelector("#exConfirmPromiseOverLay") != null)
            return;
        //setting default value        
        optionsParam = typeof optionsParam == "undefined" ? {} : optionsParam;

        let options = Object.assign(this.options, optionsParam);
        exConfirmPromise.doReset(options);

        //prepare inner html
        let htmlDiv = '<div id="exConfirmPromiseWrap" style="' +                                                
                                                'background:' + options.bodyBackground + ';' +
                                                'position: fixed;' +
                                                'top: ' + options.top + ';' +
                                                'right: ' + options.right + ';' +
                                                'width:300px;' +
                                                'cursor: pointer;' +
                                                'overflow: hidden;' +
                                                '-webkit-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);' +
                                                '-moz-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);' +
                                                '-o-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);' +
                                                'box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);' +
                                                '-wekbit-border-radius: 5px;' +
                                                '-moz-border-radius: 5px;' +
                                                '-o-border-radius: 5px;' +
                                                'border-radius: 5px;' +
                                                'z-index: ' + options.zIndex + ';">' +
                       '<div id="exConfirmPromise_title" style="height: 26px;padding: 4px 0px 0px 10px;background:' + options.titleBackground + ';color:' + options.titleColor + ';">' + options.title + '</div>' +
                       '<p style="text-align: left;padding: 10px;width: 100%;margin: 0;color:' + options.textColor + '">' + options.message + '</p>' +
                       '<div id="exConfirmPromiseBtnWrap" style="padding: 10px;text-align: ' + options.btnPosition + ';">' +
                       '</div>' +
                   '</div>';
        // prepare button with click function
        let exResolveBtn = document.createElement("button");
        exResolveBtn.setAttribute("style", "width: 62px;");
        exResolveBtn.setAttribute("class", options.btnClassSuccess);
        exResolveBtn.setAttribute("autofocus", "");
        exResolveBtn.innerHTML = options.btnClassSuccessText;
        exResolveBtn.addEventListener("click", (event) => {
            exConfirmPromise.resolve();
        });
        // space between the buttons
        let exBtnDivSpace = document.createTextNode(" ");

        let exRejectBtn = document.createElement("button");
        exRejectBtn.setAttribute("style", "width: 62px;");
        exRejectBtn.setAttribute("class", options.btnClassFail);
        exRejectBtn.innerHTML = options.btnClassFailText;
        exRejectBtn.addEventListener("click", (event) => {
            exConfirmPromise.reject();
        });
        //append inner html to body
        let exMainDiv = document.createElement("div");
        exMainDiv.setAttribute("id", "exConfirmPromiseOverLay");
        exMainDiv.setAttribute("style", "position:fixed;top:0;left:0;width:100%;height:100%;z-index:" + (options.zIndex - 1) + ";background:" + options.overlayBackground + ";");
        exMainDiv.innerHTML = htmlDiv;
        document.querySelector("body").appendChild(exMainDiv);
        //append buttons
        document.querySelector("#exConfirmPromiseBtnWrap").appendChild(exResolveBtn);
        document.querySelector("#exConfirmPromiseBtnWrap").appendChild(exBtnDivSpace);
        document.querySelector("#exConfirmPromiseBtnWrap").appendChild(exRejectBtn);
        if (options.animation) {
            document.querySelector("#exConfirmPromiseWrap").style.display = "none";
            this.fadeIn(document.querySelector('#exConfirmPromiseWrap'), options.animationTime);
        }
            
        //return promise
        return new Promise((resolve, reject) => {
            exConfirmPromise.exConfirmPromiseInterval = setInterval(function () {
                if (exConfirmPromise.exConfirmPromiseVal === true) {
                    exConfirmPromise.doReset(options);
                    resolve(true);
                } else if (exConfirmPromise.exConfirmPromiseVal === false) {
                    exConfirmPromise.doReset(options);
                    resolve(false);
                }
            });
        })
    },
    "resolve": function () {
        this.exConfirmPromiseVal = true;
    },
    "reject": function () {
        this.exConfirmPromiseVal = false;
    },
    "doReset": function (options) {
        if (options.animation && this.exConfirmPromiseVal != null) {            
            this.fadeOut(document.querySelector('#exConfirmPromiseWrap'), options.animationTime);
            setTimeout(function () {
                if (document.querySelector("#exConfirmPromiseOverLay") != null) {
                    document.querySelector("#exConfirmPromiseOverLay").remove();
                }
            }, options.animationTime + 10);
        } else {
            if (document.querySelector("#exConfirmPromiseOverLay") != null) {
                document.querySelector("#exConfirmPromiseOverLay").remove();
            }
        }
        if (this.exConfirmPromiseInterval) {
            clearInterval(this.exConfirmPromiseInterval);
        }
        this.exConfirmPromiseVal = null;
    },    
    "fadeIn": function (element, duration) {        
        element.style.display = "initial";
        element.style.opacity = "0";
        
        let optI = (10 / duration);
        let opt = optI;
        optInt = setInterval(function () {
            if (opt >= 1)
                clearInterval(optInt);

            element.style.opacity = opt;
            opt = opt + optI;
        })
    },
    "fadeOut": function (element, duration) {
        
        element.style.opacity = "1";

        let optI = (10 / duration);
        let opt = 1;
        optInt = setInterval(function () {
            if (opt <= 0)
                clearInterval(optInt);

            element.style.opacity = opt;
            opt = opt - optI;
        })
        element.style.display = "initial";
    }
}
// add Escape key function to exit confirm
document.addEventListener('keydown', (event) => {
    if (event.key == "Escape") {
        exConfirmPromise.doReset(exConfirmPromise.options);
    }
});
