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
        animationTime: 500 //Integer        
    },
    "confirmPromiseVal": null,
    "confirmPromiseInterval": null,
    "activeElement": null,
    "activeButton" : null,
    "fadeInInterval": null,
    "fadeOutInterval": null,
    "exitTimeout" : null,
    "make": function (optionsParam) {        
        //setting default value        
        optionsParam = typeof optionsParam == "undefined" ? {} : optionsParam;

        let options = Object.assign(this.options, optionsParam);
        exConfirmPromise.doReset(options);

        //prepare inner html
        let exPromiseWrap = document.createElement("div");
        exPromiseWrap.setAttribute("id", "exConfirmPromiseWrap");
        exPromiseWrap.setAttribute("style", 'background:' + options.bodyBackground + ';' +
                                                'position: fixed;' +
                                                'top: ' + options.top + ';' +
                                                'right: ' + options.right + ';' +
                                                'width:342px;' +
                                                'cursor: pointer;' +
                                                'overflow: hidden;' +
                                                '-webkit-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);' +
                                                '-moz-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);' +
                                                '-o-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);' +
                                                'box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);' +
                                                '-wekbit-border-radius: 5px;' +
                                                '-moz-border-radius: 5px;' +
                                                '-o-border-radius: 5px;' +
                                                'border-radius: 3px;' +
                                                'border:' + options.bodyBorder + ';' +
                                                'z-index: ' + options.zIndex + ';');
        exPromiseWrap.innerHTML = '<div id="exConfirmPromise_title" style="height: 26px;padding: 4px 0px 0px 10px;background:' + options.titleBackground + ';color:' + options.titleColor + '";">' + options.title + '</div>' +
                       '<p style="text-align: left;padding: 16px 5px 0px 10px;width: 100%;margin: 0;font-size: 13px;color:' + options.textColor + '">' + options.message + '</p>';

        let exPromiseWrapBtn = document.createElement("div");
        exPromiseWrapBtn.setAttribute("id", "exConfirmPromiseBtnWrap");
        exPromiseWrapBtn.setAttribute("style",'padding: 10px;text-align: ' + options.btnPosition + ';');                       
                   
        // prepare button with click function
        let exResolveBtn = document.createElement("button");
        exResolveBtn.setAttribute("id", "exConfirmPromiseBtnYes");
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
        exRejectBtn.setAttribute("id", "exConfirmPromiseBtnNo");
        exRejectBtn.setAttribute("style", "width: 62px;");
        exRejectBtn.setAttribute("class", options.btnClassFail);
        exRejectBtn.innerHTML = options.btnClassFailText;
        exRejectBtn.addEventListener("click", (event) => {
            exConfirmPromise.reject();
        });

        //arrow function
        exResolveBtn.addEventListener('keydown', (event) => {
            if (event.key == "ArrowRight") {
                this.activeButton = exRejectBtn;
                exRejectBtn.focus();
            }
        });
        exRejectBtn.addEventListener('keydown', (event) => {
            if (event.key == "ArrowLeft") {
                this.activeButton = exResolveBtn;
                exResolveBtn.focus();
            }
        });
        //append buttons
        exPromiseWrapBtn.appendChild(exResolveBtn);
        exPromiseWrapBtn.appendChild(exBtnDivSpace);
        exPromiseWrapBtn.appendChild(exRejectBtn);
        //append button wrap
        exPromiseWrap.appendChild(exPromiseWrapBtn);
        //append inner html to body
        let exMainDiv = document.createElement("div");
        exMainDiv.setAttribute("id", "exConfirmPromiseOverLay");
        exMainDiv.setAttribute("style", "position:fixed;top:0;left:0;width:100%;height:100%;z-index:" + (options.zIndex - 1) + ";background:" + options.overlayBackground + ";");
        exMainDiv.appendChild(exPromiseWrap);
        document.querySelector("body").appendChild(exMainDiv);
        //backup current active element
        this.activeElement = document.activeElement;
        exResolveBtn.focus();
        this.activeButton = exResolveBtn;
        //check animation config
        if (options.animation) {
            exPromiseWrap.style.display = "none";
            this.fadeIn(exPromiseWrap, options.animationTime);
        }
            
        //return promise
        return new Promise((resolve, reject) => {
            exConfirmPromise.confirmPromiseInterval = setInterval(function() {
                if (exConfirmPromise.confirmPromiseVal === true) {
                    exConfirmPromise.doReset(options);
                    resolve(true);
                } else if (exConfirmPromise.confirmPromiseVal === false) {
                    exConfirmPromise.doReset(options);
                    resolve(false);
                }
            });            
        });
    },
    "resolve": function () {
        this.confirmPromiseVal = true;
    },
    "reject": function () {
        this.confirmPromiseVal = false;
    },
    "doReset": function (options) {
        if (this.exitTimeout)
            clearTimeout(this.exitTimeout);

        if (this.fadeInInterval)
            clearInterval(this.fadeInInterval);

        if (this.fadeOutInterval)
            clearInterval(this.fadeOutInterval);

        if (options.animation && this.confirmPromiseVal != null) {            
            this.fadeOut(document.querySelector('#exConfirmPromiseWrap'), options.animationTime);
            this.exitTimeout = setTimeout(function () {
                if (document.querySelector("#exConfirmPromiseOverLay") != null) {
                    document.querySelector("#exConfirmPromiseOverLay").remove();
                }
            }, options.animationTime + 10);
        } else {
            if (document.querySelector("#exConfirmPromiseOverLay") != null) {
                document.querySelector("#exConfirmPromiseOverLay").remove();
            }
        }
        if (this.confirmPromiseInterval) {
            clearInterval(this.confirmPromiseInterval);
        }
        
        this.confirmPromiseVal = null;

        if (this.activeElement) {
            this.activeElement.focus();
            this.activeElement = null;
        }

        this.activeButton = null;
    },    
    "fadeIn": function (element, duration) {        
        element.style.display = "initial";
        element.style.opacity = "0";
        
        let optI = (10 / duration);
        let opt = optI;
        this.fadeInInterval = setInterval(function () {
            if (opt >= 1)
                clearInterval(this.fadeInInterval);

            element.style.opacity = opt;
            opt = opt + optI;
        })
    },
    "fadeOut": function (element, duration) {
        
        element.style.opacity = "1";

        let optI = (10 / duration);
        let opt = 1;
        this.fadeOutInterval = setInterval(function () {
            if (opt <= 0)
                clearInterval(this.fadeOutInterval);

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
// disable other focus during active window
document.addEventListener('click', (event) => {
    if (document.querySelector("#exConfirmPromiseOverLay") != null) {        
        if (!event.target.isEqualNode(document.querySelector("#exConfirmPromiseBtnYes")) || !event.target.isEqualNode(document.querySelector("#exConfirmPromiseBtnNo")))
            exConfirmPromise.activeButton.focus();        
    }
});

