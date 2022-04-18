// Calculate payment
function calcPayment(amount, rate, term) {
    return (amount * rate) / (1 - Math.pow(1 + rate, -term));
}

// Calculate interest
function calcInterest(balance, rate) {
    return balance * rate;
}

function buildSchedule() {
    const loanAmount = Number(document.getElementById("lamount").value);
    let rate = parseFloat(document.getElementById("lrate").value);
    // Convert to monthly
    rate = rate / 1200;
    // Assume monthly input
    const term = parseInt(document.getElementById("lterm").value);
    const payment = calcPayment(loanAmount, rate, term);
    const paymentDS = getPayments(loanAmount, rate, term, payment);
    // Pass array to the display function
    displayData(paymentDS);
}

// Build the amoratization schedule
function getPayments(amount, rate, term, payment) {
    let paymentDS = {
        payments: [],
        summary: {}
    };
    // Setup variables to hold values
    let balance = amount;
    let totalInterest = 0;
    let monthlyPrincipal = 0;
    let monthlyInterest = 0;
    let monthlyTotalInterest = 0;
    // Create a loop for each month of the loan
    for (let month = 1; month <= term; month++) {
        //  Calculate the payment and interest
        monthlyInterest = calcInterest(balance, rate);
        totalInterest += monthlyInterest;
        monthlyPrincipal = payment - monthlyInterest;
        balance = balance - monthlyPrincipal;
        // Add the details to an object
        let curPayment = {
            month: month,
            payment: payment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            totalInterest: totalInterest,
            balance: balance
        };
        // Push the curPayment to the payments array
        paymentDS.payments.push(curPayment);
    }
    let summary = {
        payment: payment,
        totalPrincipal: amount,
        totalInterest: totalInterest,
        totalCost: (amount + totalInterest)
    };
    paymentDS.summary = summary;
    return paymentDS;
}

// Display the data to the user
function displayData(paymentDS) {
    // Get the table
    let tableBody = document.getElementById("scheduleBody");
    let template = document.getElementById("scheduleTemplate");
    // Clear the table
    tableBody.innerHTML = "";

    for (let i = 0; i < paymentDS.payments.length; i++) {
        // Get a clone row template
        payRow = template.content.cloneNode(true);
        // Grab only the columns in template
        paycols = payRow.querySelectorAll("td");
        // Six columns in our template
        paycols[0].textContent = paymentDS.payments[i].month;
        paycols[1].textContent = paymentDS.payments[i].payment.toFixed(2);
        paycols[2].textContent = paymentDS.payments[i].principal.toFixed(2);
        paycols[3].textContent = paymentDS.payments[i].interest.toFixed(2);
        paycols[4].textContent = paymentDS.payments[i].totalInterest.toFixed(2);
        paycols[5].textContent = Math.abs(paymentDS.payments[i].balance).toFixed(2);
        // Append to the table
        tableBody.appendChild(payRow);
    }
    // Total interest is in the last row of array
    let totalInterest = paymentDS.summary.totalInterest;
    let payment = paymentDS.summary.payment;
    let loanAmount = paymentDS.summary.totalPrincipal
    let totalCost = paymentDS.summary.totalCost;
    // Build summary area
    let labelPrincipal = document.getElementById("totalPrincipal");
    labelPrincipal.innerHTML = Number(loanAmount).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    let labelInterest = document.getElementById("totalInterest");
    labelInterest.innerHTML = Number(totalInterest).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    let paymentdiv = document.getElementById("payment");
    paymentdiv.innerHTML = Number(payment).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    let totalCostDiv = document.getElementById("totalCost");
    totalCostDiv.innerHTML = Number(totalCost).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}