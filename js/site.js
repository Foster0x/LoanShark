// Get the loan values from the page
function getValues() {
    // Step one-get values from page

    // Step two-calculate payment

    // Call buildSchedule
    let payments = buildSchedule(amount, rate, term, payment);

    // Call displayData
    displayData(payments);
}

// Builds amorization schedule
function buildSchedule(amount, rate, term, payment) {
    let payments = [];

    let curPayment = {
        month: 0,
        payment: 0,
        principle: 0,
        interest: 0,
        totalInterest: 0,
        balance: 0
    }

    // Return an array of payment objects
    return payments;
}

// Display the table of payments and summary info at top of page
function displayData() {

}