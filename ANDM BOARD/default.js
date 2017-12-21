// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// convert XML format to Json format
var xmlHttp;
var xmlHttpSuccess = -1;
var xmlHttpMessage = "";

$.ajaxSetup({cache: false});

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function getData(url, callback) {
    //showLoading();
    $.get(url, function (xmldata) {
    }).done(function (xmldata) {
        var jsondata = xmlToJson(xmldata);
        callback.call(this, jsondata)
    }).fail(function (jqXHR, textStatus, errorThrown) {
        //var jsondata = xmlToJson();
        // alert('Better Call Sean');
        //hideLoading();
    });
}


function getDataTest(url, callback) {
    //showLoading();
    $.get(url, function (xmldata) {
    }).done(function (xmldata) {
        var jsondata = xmlToJson(xmldata);
        callback.call(this, jsondata)
    }).fail(function (jqXHR, textStatus, errorThrown) {
        //var jsondata = xmlToJson();
        // alert('Better Call Sean');
        //hideLoading();
    });
}


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function xmlToJson(xmldoc) {
    // Create the return object
    var obj = [];
    var xmlrows = $(xmldoc).find('Row');
    for (var i = 0; i < xmlrows.length; i++) {
        obj[i] = {};
        for (var j = 0; j < xmlrows[i].childNodes.length; j++) {
            var tempO = xmlrows[i].childNodes[j].childNodes[0];
            var valu = (typeof(tempO) != "undefined") && (tempO != null) ? tempO.nodeValue : "";
            obj[i][xmlrows[i].childNodes[j].nodeName] = valu;
        }
    }
    return obj;
};

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function handleRequestStateChange() {
    xmlHttpSuccess = -1;
    xmlHttpMessage = "";
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            try {
                response = xmlHttp.responseText;
                s = response.match("<Message>(.*)</Message>");
                if (s != null) {
                    xmlHttpMessage = s[1];
                    xmlHttpSuccess = 0;
                    return 1;
                } else {
                    xmlHttpSuccess = 1;
                    xmlHttpMessage = response.match("<FatalError>(.*)</FatalError>")[1];
                }
            }
            catch (e) {
                xmlHttpSuccess = 2;
                xmlHttpMessage = "Error submitting: " + e.toString();
                // alert'('Better Call Sean');
            }
        } else {
            xmlHttpSuccess = 3;
            xmlHttpMessage = "There was a problem submitting the data: \n" + xmlHttp.statusText;
        }
    }
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function process(urlStr) {
    if (xmlHttp) {
        try {
            xmlHttp.open("GET", urlStr, "", true);
            xmlHttp.onreadystatechange = handleRequestStateChange;
            xmlHttp.send();
        }
        catch (e) {
            xmlHttpSuccess = 4;
            xmlHttpMessage = "Can't connect to server: \n" + e.toString();
        }
    }
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// returns true if the string is empty
function isEmpty(str) {
    return (str == null) || (str.length == 0);
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function trim(s) {
    return s.replace(/^\s+|\s+$/g, "");
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function replaceAll(string, find, replace) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function isNumeric(str) {
    var n = trim(str);
    return n.length > 0 && !(/[^-0-9.]/).test(n)
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function escapeSQLString(txtString) {
    var sqlString = String(txtString).replace(/'/g, "''");
    return sqlString;
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// returns true if the string contains only whitespace
// cannot check a password type input for whitespace
function isWhitespace(str) {
    var re = /[\S]/g
    if (re.test(str)) return false;
    return true;
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// removes any whitespace from the string and returns the result
// the value of "replacement" will be used to replace the whitespace (optional)
function stripWhitespace(str, replacement) {
    if (replacement == null) replacement = '';
    var result = str;
    var re = /\s/g
    if (str.search(re) != -1) {
        result = str.replace(re, replacement);
    }
    return result;
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Date.prototype.yyyymmddhhmiss = function () {

    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();

    var hh = this.getHours().toString();
    var mi = this.getMinutes().toString();
    var ss = this.getSeconds().toString();

    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]) + ' ' + (hh[1] ? hh : "0" + hh[0]) + ':' + (mi[1] ? mi : "0" + mi[0]) + ':' + (ss[1] ? ss : "0" + ss[0]);
};
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Date.prototype.yyyymmdd = function () {

    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();

    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
};
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Date.prototype.yyyymmddWoDash = function () {

    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();

    return yyyy + '' + (mm[1] ? mm : "0" + mm[0]) + '' + (dd[1] ? dd : "0" + dd[0]);
};

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function parse(str) {
    var y = str.substr(0, 4),
        m = str.substr(4, 2) - 1,
        d = str.substr(6, 2);
    var D = new Date(y, m, d);
    return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------