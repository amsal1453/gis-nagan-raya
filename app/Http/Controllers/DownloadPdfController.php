<?php

namespace App\Http\Controllers;

use Mpdf\Mpdf;

class DownloadPdfController extends Controller
{

    public function index()
    {
        dd('testing 123');

        // Contoh sederhana untuk menghasilkan PDF
        $mpdf = new Mpdf();
        $mpdf->WriteHTML('<h1>Welcome to GIS Nagan Raya</h1><p>This is a test PDF.</p>');
        return $mpdf->Output('welcome.pdf', 'D'); // 'D' untuk download
    }
}
