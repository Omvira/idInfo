var fs = require('fs');
/**
 * 从18位/17位身份证号算出校验位
 * @param idCardNO
 * @return string
 */

function BASE_getCheckDigit18(idCardNO) {
    //权重值
    var VERIFY18RIGHTS = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var VERIFY18_CHECKDIGIT = "10X98765432";
    var sum = 0;
    for (var i = 0; i <= 16; i++) {
        sum += parseInt(idCardNO.charAt(i)) * VERIFY18RIGHTS[i];
    }
    //对权重值取模
    return VERIFY18_CHECKDIGIT.charAt(sum % 11);
}

var idInfo = function (id) {
    id = (id || '').trim();
    if (!/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(id)) {
        console.log("身份证号信息错误");
        return "身份证号信息错误";
    }
    var provinceCode = id.substring(0, 2) + "0000";
    var cityCode = id.substring(0, 4) + "00";
    var countryCode = id.substring(0, 6);
    var birthYear = 0;
    var birthDay = '';
    var gendar = 0;

    if (id.length == 15) {
        birthYear = "19" + id.substring(6, 8);
        birthDay = "19" + id.substring(6, 12);
        gendar = parseInt(id.substring(12, 15)) % 2;
    }

    if (id.length == 18) {
        birthYear = id.substring(6, 10);
        birthDay = id.substring(6, 14);
        gendar = parseInt(id.substring(14, 17)) % 2;
    }

    var countryName = "";
    var dataYear = 2019;
    while (!countryName && dataYear >= 1980) {
        var content = fs.readFileSync("./regionalismCode/regionalismCode_" + dataYear + ".json");
        var dataJson = JSON.parse(content);
        countryName = dataJson[countryCode];
        dataYear--;
    }

    var getProvince = () => {
        return dataJson[provinceCode] + `(${provinceCode})`;
    };

    var getCity = () => {
        return dataJson[cityCode] + `(${cityCode})`;
    };

    var getCountry = () => {
        return countryName || '未知';
    };
    var getAge = () => {
        return new Date().getFullYear() - parseInt(birthYear);
    };
    var getBirthDay = () => {
        return birthDay;
    };
    var getSex = () => {
        return gendar == 0 ? "女" : "男";
    };
    var isLegal = () => {
        if (id.length === 15) {
            return "未知";
        }
        if (id.length === 18) {
            return BASE_getCheckDigit18(id) === id.substring(17, 18);
        }
    };
    return {
        getProvince,
        getCity,
        getCountry,
        getAge,
        getBirthDay,
        getSex,
        isLegal,
        getInfo: () => {
            return {
                '省': getProvince(),
                '市': getCity(),
                '县': getCountry(),
                '年龄': getAge(),
                '生日': getBirthDay(),
                '性别': getSex(),
                '有效': isLegal()
            };
        }
    };
};

console.log(idInfo("130503670401001").getInfo());
console.log(idInfo("421023198704287530").getInfo());