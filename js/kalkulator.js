// kalkulator

// console.log('Hello, ini halaman kalkulator');

// membuat objek kalkulator
const kalkulator = {
    angkaDisplay: '0',
    operator: null,
    angkaPertama: null,
    tungguAngkaKedua: false
}

// membbuat fungsi updating display
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = kalkulator.angkaDisplay;
}

// membuat fungsi reset display kalkulator
function resetKalkulator() {
    kalkulator.angkaDisplay = '0';
    kalkulator.operator = null;
    kalkulator.angkaPertama = null;
    kalkulator.tungguAngkaKedua = false;
}

// membuat fungsi mengimput angka 

function inputDigit(digit) {
    if (kalkulator.angkaDisplay == '0') {
        kalkulator.angkaDisplay = digit;
    } else {
        kalkulator.angkaDisplay += digit;
    }
}

// input angka menjadi negatif/positif
function inverseAngka() {
    if (kalkulator.angkaDisplay == '0') {
        return;
    }
    kalkulator.angkaDisplay = kalkulator.angkaDisplay * -1;
}

// fungsi perhitungan / kalkulasi

function hitungKalkulasi() {
    // jika kondisi angka pertama / operator belum ada
    if (kalkulator.angkaPertama == null || kalkulator.operator == null) {
        alert('Masukan angka terlebih dahulu');
        return;
    }

    let hasil = 0;
    if (kalkulator.operator === '+') {
        hasil = parseInt(kalkulator.angkaPertama) + parseInt(kalkulator.angkaDisplay);
    } else {
        hasil = parseInt(kalkulator.angkaPertama) - parseInt(kalkulator.angkaDisplay);
    }
    kalkulator.angkaDisplay = hasil;
}

function gunakanOperator(operator) {
    if (!kalkulator.tungguAngkaKedua) {
        kalkulator.operator = operator;
        kalkulator.tungguAngkaKedua = true;
        kalkulator.angkaPertama = kalkulator.angkaDisplay;

        // mengatur ulang nilai angka display supaya button selanjutnya dimulai dari angga pertama lagi
        kalkulator.angkaDisplay = '0';
    } else {
        alert('Operator sudah ditetapkan')
    }
}

// memilih elemen button dalam kalkulator.html
const buttons = document.querySelectorAll(".button");

// loopping buttons dengan fungsi setiap button;
for (let button of buttons) {
    button.addEventListener ('click', function (event) {
        // mendapatkan objek elemen yang diklik
        const target = event.target;

        // button clear kalkulator diklik
        if (target.classList.contains('clear')) {
            resetKalkulator();
            updateDisplay();
            return;
        }

        // jika button -/+ diklik menghasilkan input angka negatif atau positif
        if (target.classList.contains('negative')) {
            inverseAngka();
            updateDisplay();
            return;
        }

        // jika button = atau sama dengan diklik untuk menampilkan hasil perhitungan
        if (target.classList.contains('equals')) {
            hitungKalkulasi();
            updateDisplay();
            return;
        }

        // jika button operator +, -, *, / diklik
        if (target.classList.contains('operator')) {
            gunakanOperator(target.innerText);
            return;
        }

        // masukan angka
        inputDigit(target.innerText);
        updateDisplay();
    })
}