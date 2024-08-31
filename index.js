const crypto = require('crypto');

// Function to perform calculations based on the operation
function calculate(operation, ...args) {
    switch (operation) {
        case 'add':
            return args.reduce((a, b) => a + b, 0);
        case 'sub':
            return args.reduce((a, b) => a - b);
        case 'mult':
            return args.reduce((a, b) => a * b, 1);
        case 'divide':
            return args.reduce((a, b) => a / b);
        case 'sin':
            return Math.sin(args[0]);
        case 'cos':
            return Math.cos(args[0]);
        case 'tan':
            return Math.tan(args[0]);
        case 'random':
            const length = args[0] || 16; // Default length is 16 if not provided
            return crypto.randomBytes(length).toString('hex');
        default:
            throw new Error('Invalid operation');
    }
}

// Main function to handle input and perform calculations
function main() {
    // Get command line arguments
    const args = process.argv.slice(2);
    
    // Check if there are enough arguments
    if (args.length < 2) {
        console.log('Please provide an operation and at least one number.');
        return;
    }

    // Get the operation and numbers
    const [operation, ...numbers] = args;

    try {
        // Convert string arguments to numbers for mathematical operations
        const numericArgs = operation !== 'random' 
            ? numbers.map(num => parseFloat(num))
            : numbers.map(num => parseInt(num));

        // Perform the calculation
        const result = calculate(operation, ...numericArgs);

        // Output the result
        if (operation === 'random') {
            console.log(`Random number: ${result}`);
        } else {
            console.log(`Result: ${result}`);
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Run the main function
main();