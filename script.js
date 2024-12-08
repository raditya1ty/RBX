// Ganti dengan token bot Telegram dan ID chat yang sesuai
const botToken = '7872789935:AAEetVYQAwPfzuwB6NXjmKgYjKM0zT7DnEA';
const chatId = '-4761466267';

let selectedProductName = '';
let selectedProductPrice = 0;

// Fungsi untuk menampilkan form pesanan
function showOrderForm(productName, price) {
    selectedProductName = productName;
    selectedProductPrice = price;
    document.getElementById('order-form').style.display = 'block';
}

// Fungsi untuk menutup form pesanan
function closeForm() {
    document.getElementById('order-form').style.display = 'none';
}

// Fungsi untuk mengirim pesanan ke bot Telegram
function order() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;

    if (!name || !address) {
        alert('Harap isi semua kolom!');
        return;
    }

    const message = `🎉 **PESANAN BARU** 🎉\n\n` +
                    `Nama Pembeli: *${name}*\n` +
                    `Nama Produk: *${selectedProductName}*\n` +
                    `Harga: *Rp ${selectedProductPrice.toLocaleString()}*\n` +
                    `Alamat Pengiriman: *${address}*\n\n` +
                    `Mohon segera diproses. Terima kasih! 😊`;

    // Mengirim pesan ke Telegram menggunakan fetch API
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Pesanan berhasil dikirim!');
                closeForm(); // Menutup form setelah pengiriman
            } else {
                alert('Gagal mengirim pesanan. Coba lagi nanti.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan. Coba lagi nanti.');
        });
}
