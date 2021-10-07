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

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //checking if month is february
    if (month === 2) {
        if (isLeapYear(year)) { //if february then check year is Leap year ?
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else { // if not leap year
            if (day > 28) { //and it is the last day of feb month in non leap year
                day = 1;
                month = 3;
            }
        }
    } else { //checking for remaining months except february
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var ctr = 0;

    while (1) {
        ctr++; //control variable helps us to count the number of days from given date to next possible palindrome date
        var dateStr = getDateAsString(nextDate); // getting next date
        var resultList = checkPalindromeForAllDateFormats(dateStr); // for the next date checking all the formats for any possibility of palindrome

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [ctr, nextDate];
            }
        }
        nextDate = getNextDate(nextDate); //calling for nextdate if the current date is not palindrome
    }
}

// function getPreviousDate(date) {
//     var day = date.day - 1;
//     var month = date.month;
//     var year = date.year;

//     var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//     if (day === 0) { // if day was 1 then day-1 will be 0 then go to prev month
//         month--;

//         if (month === 0) { // if month was 1 then month-1 will be o then go to dec
//             month = 12;
//             day = 31; //last date of december
//             year--; //update year
//         } else if (month === 2) {
//             if (isLeapYear(year)) {
//                 day = 29;
//             } else {
//                 day = 28;
//             }
//         } else {
//             day = daysInMonth[month - 1];
//         }
//     }
//     return {
//         day: day,
//         month: month,
//         year: year,
//     };
// }


// function getPreviousPalindromeDate(date) {
//     var previousDate = getPreviousDate(date);
//     var ctr = 0;

//     while (1) {
//         ctr++;
//         var dateStr = getDateAsString(previousDate);
//         var resultList = checkPalindromeForAllDateFormats(dateStr);

//         for (let i = 0; i < resultList.length; i++) {
//             if (resultList[i]) {
//                 return [ctr, previousDate];
//             }
//         }
//     }
// }


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

        if (!isPalindrome) { //not a palindrome
            const [ctr1, nextDate] = getNextPalindromeDate(date);

            //  const [ctr2, prevDate] = getPreviousPalindromeDate(date);
            //  if(ctr1>ctr2) //nearest is previous 
            //      resultDiv.innerText = `Your birthday is not palindrome !!    The nearest palindrome date is in past missed it ${prevDate.year}-${prevDate.month}-${prevDate.day}, you missed by ${ctr2} days.`;
            //  else

            resultDiv.innerText = `Your birthday is not palindrome !!    The next nearest palindrome date is  coming up on,   ${nextDate.year}-${nextDate.month}-${nextDate.day}, you missed by ${ctr1} days.`;
        } 
        else {
            resultDiv.innerText = "Yay! Your birthday is palindrome!";
        }
    } else
        resultDiv.innerText = "Enter required details";
}

showBtn.addEventListener("click", clickHandler);