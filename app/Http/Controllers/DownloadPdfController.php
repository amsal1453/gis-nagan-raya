<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;
use App\Models\SpatialData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DownloadPdfController extends Controller
{
    public function index(Request $request)
    {

        try {
            // Initialize query for spatial data
            $query = SpatialData::with(['subdistrict', 'village', 'user', 'categories']);
            $user = Auth::user();

            // Role-based filters
            if ($user->hasRole('admin_desa')) {
                $query->where('village_id', $user->village_id);
            } elseif ($user->hasRole('admin_kecamatan')) {
                if ($request->filled('subdistrict_id')) {
                    $query->where('subdistrict_id', $request->subdistrict_id);
                }
            }

            // Apply filters
            if ($request->filled('village_id')) {
                $query->where('village_id', $request->village_id);
            }

            if ($request->filled('search')) {
                $query->where('name_spatial', 'like', '%' . $request->search . '%');
            }

            if ($request->filled('category')) {
                $query->whereHas('categories', function ($q) use ($request) {
                    $q->where('categories.id', $request->category);
                });
            }

            $spatialData = $query->latest()->get();

            // Setup mPDF
            $mpdf = new Mpdf([
                'mode' => 'utf-8',
                'format' => 'A4-L',
                'margin_header' => 5,
                'margin_top' => 15,
                'margin_bottom' => 15,
                'margin_footer' => 5,
            ]);

            // Set document metadata
            $mpdf->SetTitle('Data Spasial Nagan Raya');
            $mpdf->SetAuthor('GIS Nagan Raya');

            // Build HTML content
            $html = $this->buildSpatialDataHtml($spatialData, $user);

            // Write HTML to PDF
            $mpdf->WriteHTML($html);

            // Generate filename
            $filename = 'Data-Spasial-' . date('Y-m-d') . '.pdf';

            // Output PDF for download
            return $mpdf->Output($filename, 'D');
        } catch (\Exception $e) {
            Log::error('Error generating PDF: ' . $e->getMessage());
            return redirect()->back()
                ->withErrors(['error' => 'Terjadi kesalahan saat membuat PDF: ' . $e->getMessage()]);
        }
    }



    private function buildSpatialDataHtml($spatialData, $user)
    {
        // Tentukan nama desa berdasarkan role user
        $villageName = "Semua Desa";
        
        if ($user->hasRole('admin_desa') && $user->village) {
            $villageName = $user->village->name_village;
        } elseif (count($spatialData) > 0 && $spatialData[0]->village) {
            // Jika semua data berasal dari desa yang sama
            $firstVillageId = $spatialData[0]->village_id;
            $allSameVillage = true;
            
            foreach ($spatialData as $data) {
                if ($data->village_id !== $firstVillageId) {
                    $allSameVillage = false;
                    break;
                }
            }
            
            if ($allSameVillage) {
                $villageName = $spatialData[0]->village->name_village;
            } else {
                $villageName = "Beragam Desa";
            }
        }

        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Data Spasial Nagan Raya</title>
            <style>
                body { font-family: sans-serif; font-size: 10pt; }
                h1 { font-size: 16pt; text-align: center; margin-bottom: 4px; }
                h2 { font-size: 14pt; text-align: center; margin-top: 0; }
                .header { text-align: center; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #000; padding: 5px; }
                th { background-color: #f2f2f2; font-weight: bold; }
                .meta { margin-bottom: 15px; }
                .footer { text-align: right; margin-top: 20px; font-style: italic; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>LAPORAN DATA SPASIAL</h1>
                <h2>SISTEM INFORMASI GEOGRAFIS NAGAN RAYA</h2>
            </div>

            <div class="meta">
                <table style="width: 50%; border: none;">
                    <tr style="border: none;">
                        <td style="border: none; padding: 2px; width: 120px;">Tanggal Cetak</td>
                        <td style="border: none; padding: 2px;">: ' . date('d F Y H:i') . '</td>
                    </tr>
                    <tr style="border: none;">
                        <td style="border: none; padding: 2px;">Desa</td>
                        <td style="border: none; padding: 2px;">: ' . $villageName . '</td>
                    </tr>
                    <tr style="border: none;">
                        <td style="border: none; padding: 2px;">Dicetak Oleh</td>
                        <td style="border: none; padding: 2px;">: ' . $user->name . '</td>
                    </tr>
                    <tr style="border: none;">
                        <td style="border: none; padding: 2px;">Role</td>
                        <td style="border: none; padding: 2px;">: ' . ucwords(str_replace('_', ' ', $user->roles[0]->name)) . '</td>
                    </tr>
                    <tr style="border: none;">
                        <td style="border: none; padding: 2px;">Jumlah Data</td>
                        <td style="border: none; padding: 2px;">: ' . count($spatialData) . ' data</td>
                    </tr>
                </table>
            </div>

            <table>
                <thead>
                    <tr>
                        <th style="width: 5%;">No</th>
                        <th style="width: 25%;">Nama Data</th>
                        <th style="width: 15%;">Desa</th>
                        <th style="width: 15%;">Kecamatan</th>
                        <th style="width: 20%;">Kategori</th>
                        <th style="width: 20%;">Deskripsi</th>
                    </tr>
                </thead>
                <tbody>';

        foreach ($spatialData as $index => $data) {
            $categoryNames = collect($data->categories)->pluck('name_category')->implode(", ");

            $html .= '
                <tr>
                    <td style="text-align: center;">' . ($index + 1) . '</td>
                    <td>' . $data->name_spatial . '</td>
                    <td>' . ($data->village ? $data->village->name_village : '-') . '</td>
                    <td>' . ($data->subdistrict ? $data->subdistrict->name_subdistrict : '-') . '</td>
                    <td>' . $categoryNames . '</td>
                    <td>' . (strlen($data->description) > 100 ? substr($data->description, 0, 100) . '...' : $data->description) . '</td>
                </tr>';
        }

        $html .= '
                </tbody>
            </table>

            <div class="footer">
                <p>* Dokumen ini dicetak dari Sistem Informasi Geografis Nagan Raya</p>
            </div>
        </body>
        </html>';

        return $html;
    }
}
