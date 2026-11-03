
// Data awal inventaris
let barang = JSON.parse(localStorage.getItem("inventarisWitapala")) || [
    { nama: "Tenda", jumlah: 5 },
    { nama: "Carrier", jumlah: 10 },
    { nama: "Kompas", jumlah: 8 },
    { nama: "Sleeping Bag", jumlah: 12 },
    { nama: "Matras", jumlah: 15 }
];

// Simpan data
function simpanData() {
    localStorage.setItem("inventarisWitapala", JSON.stringify(barang));
}

// Tampilkan data ke tabel
function tampilkanBarang() {
    const daftar = document.getElementById("daftarBarang");
    daftar.innerHTML = "";

    barang.forEach((item, index) => {
        daftar.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${item.jumlah} Unit</td>
                <td>
                    <button class="btn-edit"
                        onclick="editBarang(${index})">Edit</button>

                    <button class="btn-hapus"
                        onclick="hapusBarang(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// Tambah barang
document.getElementById("formBarang").addEventListener("submit", function(e) {
    e.preventDefault();

    const nama = document.getElementById("namaBarang").value.trim();
    const jumlah = Number(document.getElementById("jumlahBarang").value);

    if (!nama || !Number.isInteger(jumlah) || jumlah < 1) {
        alert("Masukkan nama dan jumlah barang yang valid!");
        return;
    }

    barang.push({ nama: nama, jumlah: jumlah });

    simpanData();
    tampilkanBarang();

    this.reset();
});

// Edit barang
function editBarang(index) {
    const namaBaru = prompt("Masukkan nama barang:", barang[index].nama);

    if (namaBaru === null) return;

    if (!namaBaru.trim()) {
        alert("Nama barang tidak boleh kosong!");
        return;
    }

    const jumlahBaru = prompt("Masukkan jumlah barang:", barang[index].jumlah);

    if (jumlahBaru === null) return;

    const jumlah = Number(jumlahBaru);

    if (!Number.isInteger(jumlah) || jumlah < 1) {
        alert("Jumlah harus berupa angka minimal 1!");
        return;
    }

    barang[index].nama = namaBaru.trim();
    barang[index].jumlah = jumlah;

    simpanData();
    tampilkanBarang();
}

// Hapus barang
function hapusBarang(index) {
    const konfirmasi = confirm("Yakin ingin menghapus barang ini?");

    if (konfirmasi) {
        barang.splice(index, 1);
        simpanData();
        tampilkanBarang();
    }
}

// Tampilkan saat halaman dibuka
tampilkanBarang();
