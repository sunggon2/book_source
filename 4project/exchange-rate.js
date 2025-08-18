const currencyNames = {
    USD: '달러',
    KRW: '원',
    EUR: '유로',
    JPY: '엔',
    CNY: '위안'
};

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || fromCurrency === toCurrency) {
        document.getElementById('result').innerText = "올바른 금액을 입력하세요.";
        return;
    }

    try {
        const apiKey = '21f8c2f9ebf8a0abb55bc6a0'; // 여기에 API 키를 입력하세요.
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.result === 'success') {
            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = amount * rate;
            const fromCurrencyName = currencyNames[fromCurrency];
            const toCurrencyName = currencyNames[toCurrency];

            document.getElementById('result').innerText =
                `${amount} ${fromCurrencyName}는 ${convertedAmount.toFixed(2)} ${toCurrencyName}입니다.`;
        } else {
            document.getElementById('result').innerText = "환율 정보를 가져오는 데 실패했습니다.";
        }
    } catch (error) {
        document.getElementById('result').innerText = "오류가 발생했습니다: " + error.message;
    }
}