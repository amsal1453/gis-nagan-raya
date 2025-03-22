<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Data Spasial</title>
    <style>
        body {
            font-family: Helvetica, sans-serif; /* Ganti Arial dengan Helvetica */
            font-size: 12px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h2 {
            font-size: 18px;
            margin-bottom: 5px;
        }
        .header h3 {
            font-size: 16px;
            margin-top: 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #000;
            padding: 8px;
            font-size: 11px;
            text-align: left;
        }
        th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
        .footer {
            font-size: 10px;
            text-align: right;
            margin-top: 30px;
        }
        .signature {
            margin-top: 40px;
            text-align: right;
        }
        .signature p {
            margin-bottom: 40px;
        }
        .filter-info {
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .filter-info p {
            margin-bottom: 5px;
        }
        .filter-info strong {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>LAPORAN DATA SPASIAL</h2>
        <h3>SISTEM INFORMASI GEOGRAFIS NAGAN RAYA</h3>
        <p>Tanggal: {{ $printDate }}</p>
    </div>

    <div class="filter-info">
        <p><strong>Filter yang digunakan:</strong></p>
        <p>Pencarian: {{ $filterInfo['search'] ?? 'Semua' }}</p>
        <p>Desa: {{ $filterInfo['village'] ?? 'Semua' }}</p>
        <p>Kategori: {{ $filterInfo['category'] ?? 'Semua' }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 5%;">No</th>
                <th style="width: 25%;">Nama</th>
                <th style="width: 20%;">Desa</th>
                <th style="width: 20%;">Kecamatan</th>
                <th style="width: 30%;">Kategori</th>
            </tr>
        </thead>
        <tbody>
            @forelse($spatialData as $index => $data)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ htmlspecialchars($data->name_spatial) }}</td>
                    <td>{{ htmlspecialchars($data->village?->name_village ?? '-') }}</td>
                    <td>{{ htmlspecialchars($data->subdistrict?->name_subdistrict ?? '-') }}</td>
                    <td>{{ htmlspecialchars($data->categories->pluck('name_category')->join(', ') ?: '-') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" style="text-align: center;">Tidak ada data yang tersedia</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="signature">
        <p>Nagan Raya, {{ now()->translatedFormat('d F Y') }}</p>
        <p>{{ $user->name }}</p>
    </div>

    <div class="footer">
        <p>Dicetak dari Sistem Informasi Geografis Nagan Raya</p>
    </div>
</body>
</html>