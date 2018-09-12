/*
* @author Ahsan Zahid Chowdhury <itszahid.info>
* @since 12th September 2018
* @abstract To enable custom promise confirmbox
*/
let exConfirmPromiseVal = null;
let exConfirmPromiseInterval = null;
let exConfirmPromise = {
    "make": function (options) {
        //setting default value
        options = Object.assign({
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
        }, options);
        exConfirmPromise.doReset();

        //prepaer inner html
        let htmlDiv = '<div id="exConfirmPromiseWrap" style="' +
                                                'background:'+options.bodyBackground+';'+
                                                'position: fixed;'+
                                                'top: ' + options.top + ';' +
                                                'right: 35%;' +
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
                       '<div style="padding: 10px;text-align: ' + options.btnPosition + ';">' +
                        '<button onclick="exConfirmPromise.resolve();" style=" width: 62px;" class="' + options.btnClassSuccess + '" autofocus> Yes</button> ' +
                        '<button onclick="exConfirmPromise.reject();" style=" width: 62px;" class="' + options.btnClassFail + '" > No</button> ' +
                       '</div>' +
                   '</div>';
        //append inner html
        exMainDiv = document.createElement("div");
        exMainDiv.setAttribute("id", "exConfirmPromiseOverLay");
        exMainDiv.setAttribute("style", "position:fixed;top:0;left:0;width:100%;height:100%;z-index:99998;");
        exMainDiv.innerHTML = htmlDiv
        document.querySelector("body").appendChild(exMainDiv);

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

