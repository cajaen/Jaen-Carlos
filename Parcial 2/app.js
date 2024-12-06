const app = (function() {
    let numbers = [];

    function generateNumber() {
        if (numbers.length >= 99) {
            alert('Se han generado todos los números posibles.');
            return;
        }

        let newNumber;
        do {
            newNumber = Math.floor(Math.random() * 99) + 1;
        } while (numbers.includes(newNumber));

        numbers.push(newNumber);
        updateDisplay();
    }

    function sortNumbers(order) {
        if (order === 'asc') {
            numbers.sort((a, b) => a - b);
        } else if (order === 'desc') {
            numbers.sort((a, b) => b - a);
        }
        updateDisplay();
    }

    function updateDisplay() {
        const container = document.getElementById('number-container');
        container.innerHTML = '';

        numbers.forEach(number => {
            const numberBox = document.createElement('button');
            numberBox.classList.add('number-box');
            numberBox.textContent = String(number).padStart(2, '0');
            container.appendChild(numberBox);
        });
    }

    return { generateNumber, sortNumbers };
})();



  