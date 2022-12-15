/**
 * @author Adrian Fusco
 */

const firstText = "$ echo 'Hello world'"
const secondText = "Hello world"

var destinationElement;

// Re execute all code inside:
let reExecutionTimer = setTimeout(function tick() {
    destinationElement = document.getElementById("text-terminal");
    // If the element doesn't exist, we don't want to continue executing code:
    if (destinationElement == null) {
        return {
            error: false
        };
    }

    // Write text into an element char by char
    var charPosition = 0, timeInterval;
    timeInterval = window.setInterval(function () {
        destinationElement.innerHTML += firstText.charAt(charPosition++);
        if (charPosition > firstText.length) {
            linebreak = document.createElement("br");
            destinationElement.appendChild(linebreak);
            content = document.createTextNode(secondText);
            destinationElement.appendChild(content);
            window.clearInterval(timeInterval)
        }
    }, 50);
    // Clear element
    destinationElement.innerHTML = '';

    reExecutionTimer = setTimeout(tick, 2000);
}, 2000);
