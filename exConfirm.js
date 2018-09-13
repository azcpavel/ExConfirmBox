/*
* @author Ahsan Zahid Chowdhury <itszahid.info>
* @since 12th September 2018
* @abstract To enable custom promise confirmbox
*/
let exConfirmPromiseVal = null;
let exConfirmPromiseInterval = null;
let exConfirmPromise = {
    "make": function (optionsParam) {
        //setting default value
        options = {
            overlayBackground : "rgba(255,255,255,0)", //String [HEX, RGB, RGBA]
            bodyBackground: "rgba(255,255,255,1)", //String [HEX, RGB, RGBA]
            titleBackground: "rgba(66, 139, 202, 1)", //String [HEX, RGB, RGBA]
            textColor: "#000000", //String [HEX, RGB, RGBA]
            titleColor: "#ffffff", //String [HEX, RGB, RGBA]
            btnPosition: "right", //String [left, center, right]
            top: "25%", //String [px, %]
            right: "38%", //String [px, %]
            btnClassSuccess: "btn btn-success btn-sm", //String
            btnClassFail: "btn btn-danger btn-sm", //String
            title: "Confirmation", //String
            message: "Confirmation Required!" //String
        };
        optionsParam = typeof optionsParam == "undefined" ? {} : optionsParam;
        
        options = Object.assign(options, optionsParam);
        exConfirmPromise.doReset();

        //prepaer inner html
        let htmlDiv = '<div id="exConfirmPromiseWrap" style="' +
                                                'background:'+options.bodyBackground+';'+
                                                'position: fixed;'+
                                                'top: ' + options.top + ';' +
                                                'right: ' + options.right + ';' +
                                                'width:300px;'+
                                                'cursor: pointer;'+
                                                'overflow: hidden;'+
                                                '-webkit-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);'+
                                                '-moz-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);'+
                                                '-o-box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);'+
                                                'box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);'+
                                                '-wekbit-border-radius: 5px;'+
                                                '-moz-border-radius: 5px;'+
                                                '-o-border-radius: 5px;'+
                                                'border-radius: 5px;' +
                                                'z-index: 99999;">'+
                       '<div id="exConfirmPromise_title" style="height: 26px;padding: 4px 0px 0px 10px;background:' + options.titleBackground + ';color:' + options.titleColor + ';">' + options.title + '</div>' +
                       '<p style="text-align: left;padding: 10px;width: 100%;margin: 0;color:' + options.textColor + '">' + options.message + '</p>' +
                       '<div id="exConfirmPromiseBtnWrap" style="padding: 10px;text-align: ' + options.btnPosition + ';">' +                        
                       '</div>' +
                   '</div>';
        // button click function
        let exResolveBtn = document.createElement("button");
        exResolveBtn.setAttribute("style", "width: 62px;");
        exResolveBtn.setAttribute("class", options.btnClassSuccess);
        exResolveBtn.setAttribute("autofocus","");
        exResolveBtn.innerHTML="Yes";
        exResolveBtn.addEventListener("click",(event) =>{
            exConfirmPromise.resolve();
        });
        // space between bbtton
        let exBtnDivSpace = document.createTextNode(" ");

        let exRejectBtn = document.createElement("button");
        exRejectBtn.setAttribute("style", "width: 62px;");
        exRejectBtn.setAttribute("class", options.btnClassFail);
        exRejectBtn.innerHTML="No";
        exRejectBtn.addEventListener("click",(event) =>{
            exConfirmPromise.reject();
        });
        //append inner html
        let exMainDiv = document.createElement("div");
        exMainDiv.setAttribute("id", "exConfirmPromiseOverLay");
        exMainDiv.setAttribute("style", "position:fixed;top:0;left:0;width:100%;height:100%;z-index:99998;background:"+options.overlayBackground+";");
        exMainDiv.innerHTML = htmlDiv
        document.querySelector("body").appendChild(exMainDiv);        
        //append btn
        document.querySelector("#exConfirmPromiseBtnWrap").appendChild(exResolveBtn);
        document.querySelector("#exConfirmPromiseBtnWrap").appendChild(exBtnDivSpace);
        document.querySelector("#exConfirmPromiseBtnWrap").appendChild(exRejectBtn);

        //return promise
        return new Promise((resolve, reject) => {
            exConfirmPromiseInterval = setInterval(function () {
                if (exConfirmPromiseVal === true) {
                    exConfirmPromise.doReset();
                    resolve(true);
                } else if (exConfirmPromiseVal === false) {
                    exConfirmPromise.doReset();
                    resolve(false);
                }                
            });            
        })
    },
    "resolve": function () {
        exConfirmPromiseVal = true;
    },
    "reject": function () {
        exConfirmPromiseVal = false;
    },
    "doReset": function () {        
        exConfirmPromiseVal = null;
        if (exConfirmPromiseInterval) {
            clearInterval(exConfirmPromiseInterval);
        }        
        if (document.querySelector("#exConfirmPromiseOverLay") != null) {
            document.querySelector("#exConfirmPromiseOverLay").remove();
        }
    }
}

document.addEventListener('keydown', (event) => {    
    if (event.key == "Escape") {
        exConfirmPromise.doReset();
    }
});
