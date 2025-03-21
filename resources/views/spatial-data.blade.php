<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Data Spasial</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .filter-info {
            margin-bottom: 15px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
        .footer {
            margin-top: 20px;
            font-size: 10px;
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>LAPORAN DATA SPASIAL</h2>
        <h3>SISTEM INFORMASI GEOGRAFIS NAGAN RAYA</h3>
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
                <th>No</th>
                <th>Nama</th>
                <th>Desa</th>
                <th>Kecamatan</th>
                <th>Kategori</th>
                <th>Dibuat Oleh</th>
            </tr>
        </thead>
        <tbody>
            @foreach($spatialData as $index => $data)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $data->name_spatial }}</td>
                <td>{{ $data->village?->name_village }}</td>
                <td>{{ $data->subdistrict?->name_subdistrict }}</td>
                <td>{{ $data->categories->pluck('name_category')->join(', ') }}</td>
                <td>{{ $data->user?->name }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>Dicetak oleh: {{ $user->name }}</p>
        <p>Tanggal: {{ $printDate }}</p>
    </div>
</body>
</html>