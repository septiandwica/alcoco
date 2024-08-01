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
            const quantity = parseInt(document.getElementById('quantity').value) || 0;
            let totalPrice = 0;

            if (quantity === 1) {
                totalPrice = discountForOne;
                document.getElementById('discountCode').value = discountCode;
                document.getElementById('discountCode').classList.remove('show');
            } else if (quantity === 2) {
                totalPrice = discountForTwo;
                document.getElementById('discountCode').value = discountCode;
                document.getElementById('discountCode').classList.add('show');
            } else if (quantity > 2) {
                totalPrice = (quantity * pricePerItem) - discountPerItemForMoreThanTwo;
                document.getElementById('discountCode').value = discountCode;
                document.getElementById('discountCode').classList.add('show');
            }
            document.getElementById('totalPrice').value = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice);
            document.getElementById('originalPrice').textContent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(pricePerItem * quantity);
            
        }
        
function submitForm() {


            

            const product = "Minyak Goreng Alcoco Promo"
            const quantity = document.getElementById('quantity').value;
            const name = document.getElementById('name').value;
            const alamat = document.getElementById('address').value;
            const notel = document.getElementById('notel').value;

            const custnum = 6287752380358;

            if (quantity <= 0) {
              alert('Harga total tidak valid. Pastikan jumlah barang sudah benar.');
              return false; 
          }
            const message = `Saya Mau Order *${product}*\n\nJumlah Barang: ${quantity}\nNama Pembeli: ${name}\nNo Telp Yang Bisa Dihubungi: ${notel}\nAlamat Pengiriman: ${alamat}`;
            const waLink = `https://wa.me/${custnum}?text=${encodeURIComponent(message)}`;
            
            window.open(waLink, '_blank');
            return false;
        }