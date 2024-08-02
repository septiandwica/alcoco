document.getElementById('currentYear').textContent = new Date().getFullYear();

function checkQuantity() {
  let quantity = document.getElementById('quantity').value;
  let originalPriceContainer = document.getElementById('originalPriceContainer');
  
  if (quantity  <1) {
    originalPriceContainer.style.display= 'none';
  } else {
    originalPriceContainer.style.display= 'block';
  }
}

const countdown = document.getElementById('countdown');
const now = new Date();
const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59, 59).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
        countdown.innerHTML = "PROMO BERAKHIR";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

const pricePerItem = 50000;  // Harga per item
const discountForOne = 40000; 
const discountForTwo = 72000; // Harga total untuk 2 item
const discountPerItemForMoreThanTwo = 8000; // Diskon per item untuk pembelian lebih dari 2 produk
const discountCode = "ALCOCOHEMAT"; // Kode diskon

function updatePrice() {
    const selectedPackage = document.getElementById('package').value;
    let quantity = 0;
    let totalPrice = 0;

    if (selectedPackage === 'C') {
        quantity = parseInt(document.getElementById('customQuantityInput').value) || 0;
    } else {
        // Set a default quantity for packages A, B, Reseller, and Distributor
        quantity = 1;
    }

    if (selectedPackage === 'A') {
        totalPrice = discountForOne;
    } else if (selectedPackage === 'B') {
        totalPrice = discountForTwo;
    } else if (selectedPackage === 'C') {
        if (quantity === 1) {
            totalPrice = discountForOne;
        } else if (quantity === 2) {
            totalPrice = discountForTwo;
        } else if (quantity > 2) {
            totalPrice = (quantity * pricePerItem) - (discountPerItemForMoreThanTwo);
        }
    } else {
        totalPrice = 0; // Default to 0 for packages that are not handled explicitly
    }

    document.getElementById('totalPrice').value = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice);
    document.getElementById('originalPrice').textContent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(pricePerItem * quantity);
    document.getElementById('discountCode').value = discountCode;

    if (selectedPackage === 'A' || selectedPackage === 'B' || (selectedPackage === 'C' && quantity > 0)) {
        document.getElementById('discountCode').classList.add('show');
    } else {
        document.getElementById('discountCode').classList.remove('show');
    }
}

function updatePackageDetails() {
  const packageSelect = document.getElementById('package');
  const selectedPackage = packageSelect.value;
  const customQuantityInput = document.getElementById('customQuantityInput');
  const customQuantityContainer = document.getElementById('customQuantityContainer');

  customQuantityInput.value = '';
  customQuantityInput.removeAttribute('readonly'); // Remove readonly attribute initially
  customQuantityInput.removeAttribute('placeholder'); // Remove placeholder initially

  if (selectedPackage === 'A') {
    customQuantityContainer.classList.remove('d-none'); // Show container for Paket A
    customQuantityInput.setAttribute('readonly', true); // Make input read-only for Paket A
    customQuantityInput.value = 1; // Set default quantity for Paket A
  } else if (selectedPackage === 'B') {
    customQuantityContainer.classList.remove('d-none'); // Show container for Paket B
    customQuantityInput.setAttribute('readonly', true); // Make input read-only for Paket B
    customQuantityInput.value = 2; // Set default quantity for Paket B
  } else if (selectedPackage === 'C') { 
    customQuantityInput.removeAttribute('readonly'); // Make input editable for Paket C
    customQuantityInput.setAttribute('placeholder', 'Silahkan Masukan Jumlah Barang Minimal 3');
    customQuantityContainer.classList.remove('d-none'); // Show container for Paket C
    validateQuantity(); // Validate the input on Paket C
  } else {
    customQuantityContainer.classList.add('d-none'); // Hide container for other cases
  }

  updatePrice(); // Call updatePrice to update pricing details based on the selection
}

function validateQuantity() {
  const customQuantityInput = document.getElementById('customQuantityInput');
  const errorMessage = document.getElementById('error-message');

  // Check if value is less than 3 and not empty
  if (customQuantityInput.value < 3 && customQuantityInput.value !== '') {
    errorMessage.textContent = 'Jumlah barang harus minimal 3';
    customQuantityInput.classList.add('error'); // Optionally add an error class for styling
  } else {
    errorMessage.textContent = '';
    customQuantityInput.classList.remove('error'); // Remove error class if valid
  }
}

// Add event listener for the input field to validate on input
document.getElementById('customQuantityInput').addEventListener('input', validateQuantity);

function submitForm() {
  const selectedPackage = document.getElementById('package').value;
  const quantityInput = selectedPackage === 'C' ? document.getElementById('customQuantityInput').value : 1;
  const quantity = parseInt(quantityInput, 10);
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const notel = document.getElementById('notel').value;

  const custnum = 6281392385176;

  // Validate quantity based on the selected package
  if (selectedPackage === 'C' && (isNaN(quantity) || quantity < 3)) {
    alert('Untuk Paket C, jumlah barang harus minimal 3.');
    return false; 
  }

  if (quantity <= 0) {
    alert('Harga total tidak valid. Pastikan jumlah barang sudah benar.');
    return false; 
  }

  const product = "Minyak Goreng Alcoco Promo";
  const message = `Saya Mau Order *${product}*\n\nPaket: ${selectedPackage}\nDetail Produk: ${quantity} Minyak Goreng Alcoco 1L\nNama Pembeli: ${name}\nNo Telp Yang Bisa Dihubungi: ${notel}\nAlamat Pengiriman: ${address}`;
  const waLink = `https://wa.me/${custnum}?text=${encodeURIComponent(message)}`;
  
  window.open(waLink, '_parent');
  return false;
}