module.exports = {
    formatNumber(num) {
        // If float, convert to 2 decimal places. 
        if (num % 1 !== 0) {
            num = parseFloat(num.toPrecision(Math.ceil(num).toString().length + 2));
        }

        if (num >= 10000) {
            let arr = num.toString().split('');
            // Keep the original length of the integer portion of the number
            const len = Math.ceil(num).toString().length;
            // Calculate the amount of iterations needed (how many ',' need to be placed)
            const iter = Math.floor((len / 3) % 1 !== 0 ? len / 3 : len / 3 - 1);

            // Place a ',' for every iteration at a position specified using l and j
            for (let i = 0; i < iter; i++) {
                arr.splice(len - 3 * (i + 1), 0, ',')
            }

            return arr.join('');
        }
        else return num.toString();
    }
}