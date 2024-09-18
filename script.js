const apiURL = 'https://open.er-api.com/v6/latest/';

// Função para carregar as opções de moedas
async function loadCurrencies() {
    const response = await fetch(apiURL + 'USD'); // Obtém as taxas de câmbio em relação ao dólar
    const data = await response.json();

    const currencies = Object.keys(data.rates); // Obtém todas as moedas disponíveis
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    // Popula as opções do dropdown de moedas
    currencies.forEach(currency => {
        let option1 = document.createElement('option');
        option1.text = currency;
        option1.value = currency;
        fromCurrency.add(option1);

        let option2 = document.createElement('option');
        option2.text = currency;
        option2.value = currency;
        toCurrency.add(option2);
    });

    // Define USD e BRL como padrões
    fromCurrency.value = 'USD';
    toCurrency.value = 'BRL';
}

// Função para converter as moedas
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '') {
        alert('Por favor, insira um valor.');
        return;
    }

    const response = await fetch(apiURL + fromCurrency);
    const data = await response.json();

    const rate = data.rates[toCurrency]; // Taxa de câmbio entre a moeda de origem e a moeda de destino
    const result = (amount * rate).toFixed(2);

    document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
}

// Carrega as moedas assim que a página é carregada
window.onload = loadCurrencies;
