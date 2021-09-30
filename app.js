function reverseString(str) {
    var listOfChars = str.split("");
    var reversedListOfChar = listOfChars.reverse();
    var reversedString = reversedListOfChar.join("");
    return reversedString;
}

function isStringPalindrome(str) {
    var reversedString = reverseString(str);
    return str === reversedString;
}

function getDateAsString(date) {
    var dateInStr = {
        day: "",
        month: "",
        year: ""
    };

    if (date.day < 10) {
        dateInStr.day = "0" + date.day;
    } else {
        dateInStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateInStr.month = "0" + date.month;
    } else {
        dateInStr.month = date.month.toString();
    }

    dateInStr.year = date.year.toString();
    return dateInStr;
}

function getDateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var dateFormatList = getDateInAllFormats(date);
    var palindromeList = [];

    for (var i = 0; i < dateFormatList.length; i++) {
        var result = isStringPalindrome(dateFormatList[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}

function isLeapYear(year) {
    if (year % 400 === 0) return true;

    if (year % 100 === 0) return false;

    if (year % 4 === 0) return true;

    return false;
}

var bdayInput = document.querySelector("#bday-input");
var showBtn = document.querySelector("#show-btn");
var resultDiv = document.querySelector("#result");

function clickHandler(e) {
    var bdayString = bdayInput.value;

    if (bdayString !== "") {
        var date = bdayString.split("-"); //here date array has year month and day 
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2];

        date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy),
        };

        var dateStr = getDateAsString(date);
        var list = checkPalindromeForAllDateFormats(dateStr);
        var isPalindrome = false;

        for (let i = 0; i < list.length; i++) {
            if (list[i]) {
                isPalindrome = true;
                break;
            }
        }

        if (!isPalindrome) {
            resultDiv.innerText = "Your birthday is not a palindrome!";
        } else {
            resultDiv.innerText = "Yay! Your birthday is palindrome!";
        }
    } else
        resultDiv.innerText = "Enter required details";
}

showBtn.addEventListener("click", clickHandler);