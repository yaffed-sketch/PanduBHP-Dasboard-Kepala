import {
  HistoryServiceItem,
  LegalDocumentItem,
  OverdueServiceItem,
} from '../types/bhp';

export const BULAN_OPTIONS = [
  { value: 'all', label: 'Semua Bulan (Jan–Des)' },
  { value: '1', label: 'Januari' },
  { value: '2', label: 'Februari' },
  { value: '3', label: 'Maret' },
  { value: '4', label: 'April' },
  { value: '5', label: 'Mei' },
  { value: '6', label: 'Juni' },
  { value: '7', label: 'Juli' },
  { value: '8', label: 'Agustus' },
  { value: '9', label: 'September' },
  { value: '10', label: 'Oktober' },
  { value: '11', label: 'November' },
  { value: '12', label: 'Desember' },
] as const;

export const TAHUN_OPTIONS = [2026, 2027, 2028] as const;

export interface ServiceDefinition {
  id: string;
  label: string;
  row: 1 | 2;
}

export const SERVICE_DEFINITIONS: ServiceDefinition[] = [
  // Row 1 (after Jumlah Layanan)
  { id: 'skhw', label: 'Penerbitan SKHW', row: 1 },
  {
    id: 'pemisah-harta',
    label: 'Mewakili Pemisah Harta Peninggalan',
    row: 1,
  },
  { id: 'wasiat-tercatat', label: 'Pendaftaran Wasiat Tercatat', row: 1 },
  {
    id: 'wasiat-tertutup',
    label: 'Pembukaan dan Pembacaan Wasiat Tertutup/Rahasia',
    row: 1,
  },
  // Row 2
  {
    id: 'orang-tidak-hadir',
    label: 'Mewakili dan/atau Mengurus Harta Orang Tidak Hadir',
    row: 2,
  },
  {
    id: 'harta-tidak-terurus',
    label: 'Mewakili dan/atau Mengurus Harta Tidak Terurus',
    row: 2,
  },
  { id: 'perwalian', label: 'Perwalian', row: 2 },
  { id: 'pengampuan', label: 'Pengampuan', row: 2 },
  { id: 'kepailitan', label: 'Kepailitan', row: 2 },
  { id: 'upk', label: 'Penatausahaan UPK', row: 2 },
];

// Monthly service counts for Year 2026 (Jan - Nov populated, Dec projected/0 or current)
const MONTHLY_COUNTS_2026: Record<number, Record<string, number>> = {
  1: {
    skhw: 38,
    'pemisah-harta': 6,
    'wasiat-tercatat': 22,
    'wasiat-tertutup': 4,
    'orang-tidak-hadir': 5,
    'harta-tidak-terurus': 8,
    perwalian: 19,
    pengampuan: 7,
    kepailitan: 11,
    upk: 16,
  },
  2: {
    skhw: 35,
    'pemisah-harta': 5,
    'wasiat-tercatat': 19,
    'wasiat-tertutup': 3,
    'orang-tidak-hadir': 4,
    'harta-tidak-terurus': 7,
    perwalian: 17,
    pengampuan: 6,
    kepailitan: 9,
    upk: 14,
  },
  3: {
    skhw: 41,
    'pemisah-harta': 7,
    'wasiat-tercatat': 25,
    'wasiat-tertutup': 5,
    'orang-tidak-hadir': 6,
    'harta-tidak-terurus': 9,
    perwalian: 21,
    pengampuan: 8,
    kepailitan: 13,
    upk: 18,
  },
  4: {
    skhw: 36,
    'pemisah-harta': 4,
    'wasiat-tercatat': 20,
    'wasiat-tertutup': 2,
    'orang-tidak-hadir': 3,
    'harta-tidak-terurus': 6,
    perwalian: 18,
    pengampuan: 5,
    kepailitan: 10,
    upk: 15,
  },
  5: {
    skhw: 44,
    'pemisah-harta': 8,
    'wasiat-tercatat': 27,
    'wasiat-tertutup': 6,
    'orang-tidak-hadir': 5,
    'harta-tidak-terurus': 10,
    perwalian: 22,
    pengampuan: 9,
    kepailitan: 12,
    upk: 20,
  },
  6: {
    skhw: 39,
    'pemisah-harta': 6,
    'wasiat-tercatat': 24,
    'wasiat-tertutup': 4,
    'orang-tidak-hadir': 4,
    'harta-tidak-terurus': 8,
    perwalian: 20,
    pengampuan: 7,
    kepailitan: 11,
    upk: 17,
  },
  7: {
    skhw: 46,
    'pemisah-harta': 9,
    'wasiat-tercatat': 29,
    'wasiat-tertutup': 5,
    'orang-tidak-hadir': 7,
    'harta-tidak-terurus': 11,
    perwalian: 24,
    pengampuan: 8,
    kepailitan: 14,
    upk: 21,
  },
  8: {
    skhw: 43,
    'pemisah-harta': 7,
    'wasiat-tercatat': 26,
    'wasiat-tertutup': 4,
    'orang-tidak-hadir': 5,
    'harta-tidak-terurus': 9,
    perwalian: 21,
    pengampuan: 7,
    kepailitan: 12,
    upk: 19,
  },
  9: {
    skhw: 40,
    'pemisah-harta': 6,
    'wasiat-tercatat': 23,
    'wasiat-tertutup': 3,
    'orang-tidak-hadir': 4,
    'harta-tidak-terurus': 8,
    perwalian: 19,
    pengampuan: 6,
    kepailitan: 11,
    upk: 18,
  },
  10: {
    skhw: 45,
    'pemisah-harta': 8,
    'wasiat-tercatat': 28,
    'wasiat-tertutup': 5,
    'orang-tidak-hadir': 6,
    'harta-tidak-terurus': 10,
    perwalian: 23,
    pengampuan: 9,
    kepailitan: 15,
    upk: 22,
  },
  11: {
    skhw: 42,
    'pemisah-harta': 7,
    'wasiat-tercatat': 26,
    'wasiat-tertutup': 5,
    'orang-tidak-hadir': 5,
    'harta-tidak-terurus': 11,
    perwalian: 20,
    pengampuan: 8,
    kepailitan: 14,
    upk: 19,
  },
  12: {
    skhw: 0,
    'pemisah-harta': 0,
    'wasiat-tercatat': 0,
    'wasiat-tertutup': 0,
    'orang-tidak-hadir': 0,
    'harta-tidak-terurus': 0,
    perwalian: 0,
    pengampuan: 0,
    kepailitan: 0,
    upk: 0,
  },
};

export function getServiceCounts(
  tahun: number,
  bulan: string
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const def of SERVICE_DEFINITIONS) {
    result[def.id] = 0;
  }

  // Only 2026 has recorded data starting from first input year 2026
  if (tahun !== 2026) {
    return result;
  }

  if (bulan === 'all') {
    for (let m = 1; m <= 12; m++) {
      const monthData = MONTHLY_COUNTS_2026[m];
      for (const def of SERVICE_DEFINITIONS) {
        result[def.id] += monthData[def.id] ?? 0;
      }
    }
    return result;
  }

  const monthNum = Number(bulan);
  const monthData = MONTHLY_COUNTS_2026[monthNum];
  if (!monthData) return result;

  for (const def of SERVICE_DEFINITIONS) {
    result[def.id] = monthData[def.id] ?? 0;
  }
  return result;
}

export const OVERDUE_SLA_SERVICES: OverdueServiceItem[] = [
  {
    id: 'ovr-01',
    nomorLayanan: 'W15.AHU.BHP.04.04-0174',
    jenisLayanan: 'Mewakili dan/atau Mengurus Harta Tidak Terurus',
    namaPemohon: 'Kantor Pertanahan Kota Kediri',
    tanggalPermohonan: '19 Oktober 2026',
    bulan: 10,
    tahun: 2026,
    slaStandarHari: 14,
    hariBerjalan: 21,
    keterlambatanHari: 7,
    penanggungJawab: {
      kepalaSeksi: 'H. Ahmad Fauzi, S.H., M.H.',
      jfkkPertama: 'Rizky Pratama, S.H.',
      jfkkMuda: 'Ratna Sari Dewi, S.H., M.Kn.',
      jfkkMadya: 'Bagus Santoso, S.H., M.H.',
    },
    keteranganProses:
      'Menunggu balasan surat konfirmasi riwayat ahli waris dari Kecamatan Pesantren dan verifikasi objek bidang tanah.',
  },
  {
    id: 'ovr-02',
    nomorLayanan: 'W15.AHU.BHP.04.05-0302',
    jenisLayanan: 'Kepailitan',
    namaPemohon: 'PT Surya Logistik Nusantara (Dalam Pailit)',
    tanggalPermohonan: '21 Oktober 2026',
    bulan: 10,
    tahun: 2026,
    slaStandarHari: 14,
    hariBerjalan: 19,
    keterlambatanHari: 5,
    penanggungJawab: {
      kepalaSeksi: 'Dra. Sri Lestari, M.H.',
      jfkkPertama: 'Dimas Arya Wibisono, S.H.',
      jfkkMuda: 'Andhika Putra, S.H., M.H.',
      jfkkMadya: 'Drs. Hendro Kusumo, S.H., M.H.',
    },
    keteranganProses:
      'Proses pencocokan daftar piutang kreditur separatis dan penilaian aset bergerak gudang di kawasan Margomulyo.',
  },
  {
    id: 'ovr-03',
    nomorLayanan: 'W15.AHU.BHP.04.01-1109',
    jenisLayanan: 'Penerbitan SKHW',
    namaPemohon: 'Keluarga Alm. Ir. Soekarno Hadi',
    tanggalPermohonan: '23 Oktober 2026',
    bulan: 10,
    tahun: 2026,
    slaStandarHari: 14,
    hariBerjalan: 18,
    keterlambatanHari: 4,
    penanggungJawab: {
      kepalaSeksi: 'H. Ahmad Fauzi, S.H., M.H.',
      jfkkPertama: 'Nadia Kusumawati, S.H.',
      jfkkMuda: 'Ratna Sari Dewi, S.H., M.Kn.',
      jfkkMadya: 'Bagus Santoso, S.H., M.H.',
    },
    keteranganProses:
      'Perbaikan dokumen akta kelahiran salah satu ahli waris yang berdomisili di luar provinsi Jawa Timur.',
  },
  {
    id: 'ovr-04',
    nomorLayanan: 'W15.AHU.BHP.04.02-0941',
    jenisLayanan: 'Perwalian',
    namaPemohon: 'Siti Aminah Kusuma',
    tanggalPermohonan: '24 Oktober 2026',
    bulan: 10,
    tahun: 2026,
    slaStandarHari: 14,
    hariBerjalan: 17,
    keterlambatanHari: 3,
    penanggungJawab: {
      kepalaSeksi: 'Irwan Setiawan, S.H., M.Hum.',
      jfkkPertama: 'Dian Pertiwi, S.H.',
      jfkkMuda: 'Ratna Sari Dewi, S.H., M.Kn.',
      jfkkMadya: 'Bagus Santoso, S.H., M.H.',
    },
    keteranganProses:
      'Menunggu salinan resmi penetapan Pengadilan Negeri Sidoarjo dan berita acara penyumpahan wali pengawas.',
  },
  {
    id: 'ovr-05',
    nomorLayanan: 'W15.AHU.BHP.04.07-0088',
    jenisLayanan: 'Mewakili dan/atau Mengurus Harta Orang Tidak Hadir',
    namaPemohon: 'Keluarga Tjipto Rahardjo',
    tanggalPermohonan: '26 Oktober 2026',
    bulan: 10,
    tahun: 2026,
    slaStandarHari: 14,
    hariBerjalan: 16,
    keterlambatanHari: 2,
    penanggungJawab: {
      kepalaSeksi: 'H. Ahmad Fauzi, S.H., M.H.',
      jfkkPertama: 'Rizky Pratama, S.H.',
      jfkkMuda: 'Andhika Putra, S.H., M.H.',
      jfkkMadya: 'Drs. Hendro Kusumo, S.H., M.H.',
    },
    keteranganProses:
      'Validasi keterangan ketidakhadiran (afwezigheid) dan inventarisasi rekening simpanan pada bank terkait.',
  },
  {
    id: 'ovr-06',
    nomorLayanan: 'W15.AHU.BHP.04.06-0501',
    jenisLayanan: 'Penatausahaan UPK',
    namaPemohon: 'Ahli Waris Almh. Sri Wahyuni',
    tanggalPermohonan: '27 Oktober 2026',
    bulan: 10,
    tahun: 2026,
    slaStandarHari: 14,
    hariBerjalan: 15,
    keterlambatanHari: 1,
    penanggungJawab: {
      kepalaSeksi: 'Dra. Sri Lestari, M.H.',
      jfkkPertama: 'Nadia Kusumawati, S.H.',
      jfkkMuda: 'Ratna Sari Dewi, S.H., M.Kn.',
      jfkkMadya: 'Bagus Santoso, S.H., M.H.',
    },
    keteranganProses:
      'Verifikasi kesesuaian nomor rekening pencairan dana pihak ketiga dan kelengkapan materai elektronik.',
  },
];

export const INITIAL_DOCUMENTS: LegalDocumentItem[] = [
  {
    id: 'doc-001',
    noUrut: 1,
    nomorBerkas: 'W15.AHU.BHP.04.01-1182',
    jenisLayanan: 'Penerbitan SKHW',
    namaPemohon: 'Hendra Wijaya, S.H.',
    domisili: 'Kota Surabaya',
    tanggalMasuk: '09 Nov 2026',
    slaTargetHari: 14,
    slaBerjalanHari: 11,
    slaStatus: 'mendekati',
    stage: 'menunggu_kepala',
    judulDokumen: 'SURAT KETERANGAN HAK WARIS (SKHW)',
    dasarHukum: [
      'Kitab Undang-Undang Hukum Perdata (Burgerlijk Wetboek) Pasal 830 s.d. Pasal 873.',
      'Peraturan Menteri Hukum dan HAM RI Nomor 7 Tahun 2021 tentang Organisasi dan Tata Kerja Balai Harta Peninggalan.',
      'Akta Keterangan Hak Mewaris Nomor 42/XI/2026 tertanggal 06 November 2026.',
    ],
    isiRingkas: [
      'Menerangkan bahwa berdasarkan pemeriksaan berkas silsilah keluarga dan daftar pusat wasiat, Pewaris almarhum Gunawan Wijaya yang wafat di Surabaya pada 14 Agustus 2026 meninggalkan ahli waris sah sebanyak 3 (tiga) orang.',
      'Menetapkan bagian masing-masing ahli waris sesuai ketentuan hukum perdata yang berlaku guna keperluan balik nama sertifikat hak milik dan pencairan rekening simpanan bank.',
      'Dokumen ini berlaku sebagai alas hak administratif yang sah setelah memperoleh persetujuan Kepala BHP Surabaya serta penyematan Barcode verifikasi dan Tanda Tangan Elektronik (TTE).',
    ],
    pejabatPemeriksa: 'Ratna Sari Dewi, S.H., M.Kn. (JFKK Muda)',
  },
  {
    id: 'doc-002',
    noUrut: 2,
    nomorBerkas: 'W15.AHU.BHP.04.02-0941',
    jenisLayanan: 'Perwalian',
    namaPemohon: 'Siti Aminah Kusuma',
    domisili: 'Kab. Sidoarjo',
    tanggalMasuk: '24 Okt 2026',
    slaTargetHari: 14,
    slaBerjalanHari: 17,
    slaStatus: 'terlambat',
    stage: 'menunggu_kepala',
    judulDokumen: 'BERITA ACARA SUMPAH & PENETAPAN WALI PENGAWAS',
    dasarHukum: [
      'Kitab Undang-Undang Hukum Perdata Pasal 366 tentang Tugas Balai Harta Peninggalan sebagai Wali Pengawas.',
      'Penetapan Pengadilan Negeri Sidoarjo Nomor 318/Pdt.P/2026/PN.Sda tertanggal 29 Oktober 2026.',
    ],
    isiRingkas: [
      'Menetapkan pencatatan pengawasan perwalian atas anak di bawah umur bernama Rafi Pratama Kusuma (11 tahun) dengan wali ibu kandung Siti Aminah Kusuma.',
      'Mewajibkan Wali untuk menyerahkan daftar inventaris harta kekayaan anak di bawah perwalian selambat-lambatnya 30 (tiga puluh) hari kalender sejak penetapan ini diterbitkan.',
      'Segala tindakan pengalihan atau penjaminan aset milik anak di bawah umur wajib memperoleh izin tertulis dari Pengadilan Negeri dan pertimbangan BHP Surabaya.',
    ],
    pejabatPemeriksa: 'Bagus Santoso, S.H., M.H. (JFKK Madya)',
  },
  {
    id: 'doc-003',
    noUrut: 3,
    nomorBerkas: 'W15.AHU.BHP.04.03-2044',
    jenisLayanan: 'Pembukaan dan Pembacaan Wasiat Tertutup/Rahasia',
    namaPemohon: 'Notaris Felicia Tanoto, S.H., M.Kn.',
    domisili: 'Kota Malang',
    tanggalMasuk: '10 Nov 2026',
    slaTargetHari: 14,
    slaBerjalanHari: 3,
    slaStatus: 'aman',
    stage: 'menunggu_kepala',
    judulDokumen: 'BERITA ACARA PEMBUKAAN DAN PEMBACAAN WASIAT TERTUTUP',
    dasarHukum: [
      'Kitab Undang-Undang Hukum Perdata Pasal 937 dan Pasal 942 tentang Wasiat Rahasia/Tertutup.',
      'Surat Permohonan Pembukaan Wasiat dari Notaris Felicia Tanoto tanggal 09 November 2026.',
    ],
    isiRingkas: [
      'Menyatakan bahwa sampul wasiat tertutup atas nama almarhumah Margaretha Tanoto telah diperiksa keutuhan segelnya di hadapan para saksi dan pejabat BHP Surabaya.',
      'Isi wasiat dibacakan serta dicatat dalam register pembukaan wasiat Balai Harta Peninggalan Surabaya untuk selanjutnya didaftarkan ke Daftar Pusat Wasiat.',
    ],
    pejabatPemeriksa: 'Dian Pertiwi, S.H. (JFKK Pertama)',
  },
  {
    id: 'doc-004',
    noUrut: 4,
    nomorBerkas: 'W15.AHU.BHP.04.05-0319',
    jenisLayanan: 'Kepailitan',
    namaPemohon: 'PT Samudra Jaya Abadi (Dalam Pailit)',
    domisili: 'Kota Gresik',
    tanggalMasuk: '04 Nov 2026',
    slaTargetHari: 14,
    slaBerjalanHari: 8,
    slaStatus: 'aman',
    stage: 'menunggu_kepala',
    judulDokumen: 'PERSETUJUAN PENGURUSAN BOEDEL PAILIT TAHAP II',
    dasarHukum: [
      'Undang-Undang Nomor 37 Tahun 2004 tentang Kepailitan dan Penundaan Kewajiban Pembayaran Utang Pasal 70 ayat (2).',
      'Putusan Pengadilan Niaga pada Pengadilan Negeri Surabaya Nomor 24/Pdt.Sus-Pailit/2026/PN.Niaga.Sby.',
    ],
    isiRingkas: [
      'Memberikan persetujuan atas daftar verifikasi tagihan kreditur konkuren dan separatis dalam boedel pailit PT Samudra Jaya Abadi sebesar Rp 14.850.000.000,-.',
      'Menugaskan tim kurator BHP Surabaya untuk melakukan pemberesan aset bergerak di gudang kawasan industri Gresik sesuai mekanisme lelang negara KPKNL.',
    ],
    pejabatPemeriksa: 'Andhika Putra, S.H., M.H. (JFKK Muda)',
  },
  {
    id: 'doc-005',
    noUrut: 5,
    nomorBerkas: 'W15.AHU.BHP.04.06-0512',
    jenisLayanan: 'Penatausahaan UPK',
    namaPemohon: 'Dr. Budi Santoso, Sp.B.',
    domisili: 'Kota Surabaya',
    tanggalMasuk: '02 Nov 2026',
    slaTargetHari: 14,
    slaBerjalanHari: 11,
    slaStatus: 'mendekati',
    stage: 'menunggu_kepala',
    judulDokumen: 'SURAT PERINTAH PENCAIRAN UANG PIHAK KETIGA (UPK)',
    dasarHukum: [
      'Peraturan Pemerintah Nomor 28 Tahun 2019 tentang Jenis dan Tarif atas Jenis PNBP pada Kemenkumham.',
      'Berita Acara Verifikasi Kelengkapan Dokumen Ahli Waris Nomor BA-119/BHP.SBY/XI/2026.',
    ],
    isiRingkas: [
      'Menyetujui pencairan dana titipan uang pihak ketiga atas nama almarhumah Sri Wahyuni sebesar Rp 284.500.000,- kepada pemohon yang telah terbukti sah sebagai ahli waris tunggal.',
      'Bendahara Penerima dan Penatausahaan UPK wajib mentransfer dana melalui rekening resmi pemohon setelah dokumen bermeterai elektronik dan TTE diterbitkan.',
    ],
    pejabatPemeriksa: 'Nadia Kusumawati, S.H. (JFKK Pertama)',
  },
  {
    id: 'doc-006',
    noUrut: 6,
    nomorBerkas: 'W15.AHU.BHP.04.04-0188',
    jenisLayanan: 'Mewakili dan/atau Mengurus Harta Tidak Terurus',
    namaPemohon: 'Kantor Pertanahan Kota Kediri',
    domisili: 'Kota Kediri',
    tanggalMasuk: '05 Nov 2026',
    slaTargetHari: 14,
    slaBerjalanHari: 7,
    slaStatus: 'aman',
    stage: 'menunggu_kepala',
    judulDokumen: 'SURAT PENETAPAN PENGURUSAN HARTA TAK TERURUS',
    dasarHukum: [
      'Kitab Undang-Undang Hukum Perdata Pasal 1126 s.d. Pasal 1130 tentang Harta Peninggalan Tak Terurus.',
      'Surat Keterangan Kematian dan Penelusuran Ahli Waris Kecamatan Pesantren Kota Kediri.',
    ],
    isiRingkas: [
      'Menetapkan bahwa bidang tanah dan bangunan seluas 420 m² di Kelurahan Jamsaren, Kota Kediri berada di bawah pengurusan sementara Balai Harta Peninggalan Surabaya.',
      'Memerintahkan pemasangan papan pengumuman resmi BHP Surabaya selama 3 (tiga) bulan berturut-turut untuk memanggil pihak yang berhak.',
    ],
    pejabatPemeriksa: 'Bagus Santoso, S.H., M.H. (JFKK Madya)',
  },
  {
    id: 'doc-007',
    noUrut: 7,
    nomorBerkas: 'W15.AHU.BHP.04.08-0115',
    jenisLayanan: 'Mewakili Pemisah Harta Peninggalan',
    namaPemohon: 'Lina Marlina, S.T.',
    domisili: 'Kota Mojokerto',
    tanggalMasuk: '11 Nov 2026',
    slaTargetHari: 14,
    slaBerjalanHari: 2,
    slaStatus: 'aman',
    stage: 'menunggu_kepala',
    judulDokumen: 'PENETAPAN PERWAKILAN PEMISAH HARTA PENINGGALAN',
    dasarHukum: [
      'Kitab Undang-Undang Hukum Perdata Pasal 1071 s.d. Pasal 1079 tentang Pemisahan Harta Peninggalan.',
      'Akta Permohonan Pemisahan Harta Waris Nomor 19/XI/2026.',
    ],
    isiRingkas: [
      'Menerangkan kehadiran dan perwakilan Balai Harta Peninggalan Surabaya dalam proses pemisahan serta pembagian boedel waris atas nama almarhum Hendro Sudjatmiko.',
      'Menjamin hak bagian para ahli waris yang belum dewasa atau berhalangan hadir sesuai ketentuan perundang-undangan.',
    ],
    pejabatPemeriksa: 'Ratna Sari Dewi, S.H., M.Kn. (JFKK Muda)',
  },
  {
    id: 'doc-008',
    noUrut: 8,
    nomorBerkas: 'W15.AHU.BHP.04.01-1164',
    jenisLayanan: 'Penerbitan SKHW',
    namaPemohon: 'Ir. Bambang Hermanto',
    domisili: 'Kota Surabaya',
    tanggalMasuk: '07 Nov 2026',
    slaTargetHari: 14,
    slaBerjalanHari: 5,
    slaStatus: 'aman',
    stage: 'antrean_akun_pertama',
    judulDokumen: 'SURAT KETERANGAN HAK WARIS (SKHW)',
    dasarHukum: [
      'Kitab Undang-Undang Hukum Perdata Pasal 830 s.d. Pasal 873.',
      'Peraturan Menteri Hukum dan HAM RI Nomor 7 Tahun 2021.',
    ],
    isiRingkas: [
      'Menerangkan susunan ahli waris yang sah atas pewaris almarhumah Kartini Hermanto sesuai penetapan pemeriksaan berkas BHP Surabaya.',
      'Telah disetujui oleh Kepala BHP Surabaya dan diteruskan ke Akun Pertama untuk penyematan Barcode verifikasi dan Tanda Tangan Elektronik (TTE).',
    ],
    pejabatPemeriksa: 'Ratna Sari Dewi, S.H., M.Kn.',
    catatanKepala: 'Berkas lengkap, silakan lanjutkan penyematan Barcode & TTE.',
    approvedAt: '13 Nov 2026, 09:40 WIB',
  },
];

export const HISTORY_SERVICES: HistoryServiceItem[] = [
  {
    id: 'hist-01',
    nomorLayanan: 'W15.AHU.BHP.04.01-1148',
    jenisLayanan: 'Penerbitan SKHW',
    namaPemohon: 'Ir. H. Sutrisno Hadi',
    tanggalPermohonan: '03/11/2026',
    slaTargetHari: 14,
    slaRealisasiHari: 7,
    slaStatus: 'aman',
    tanggalSelesai: '12/11/2026',
  },
  {
    id: 'hist-02',
    nomorLayanan: 'W15.AHU.BHP.04.02-0920',
    jenisLayanan: 'Perwalian',
    namaPemohon: 'Dewi Anggraini, S.Pd.',
    tanggalPermohonan: '01/11/2026',
    slaTargetHari: 14,
    slaRealisasiHari: 8,
    slaStatus: 'aman',
    tanggalSelesai: '11/11/2026',
  },
  {
    id: 'hist-03',
    nomorLayanan: 'W15.AHU.BHP.04.03-1998',
    jenisLayanan: 'Pendaftaran Wasiat Tercatat',
    namaPemohon: 'Notaris Yohanes Gunawan, S.H.',
    tanggalPermohonan: '05/11/2026',
    slaTargetHari: 14,
    slaRealisasiHari: 4,
    slaStatus: 'aman',
    tanggalSelesai: '10/11/2026',
  },
  {
    id: 'hist-04',
    nomorLayanan: 'W15.AHU.BHP.04.06-0492',
    jenisLayanan: 'Penatausahaan UPK',
    namaPemohon: 'Dra. Endang Susilowati',
    tanggalPermohonan: '28/10/2026',
    slaTargetHari: 14,
    slaRealisasiHari: 10,
    slaStatus: 'aman',
    tanggalSelesai: '09/11/2026',
  },
  {
    id: 'hist-05',
    nomorLayanan: 'W15.AHU.BHP.04.05-0289',
    jenisLayanan: 'Kepailitan',
    namaPemohon: 'PT Sinar Makmur Sejahtera (Dalam Pailit)',
    tanggalPermohonan: '14/10/2026',
    slaTargetHari: 14,
    slaRealisasiHari: 16,
    slaStatus: 'terlambat',
    tanggalSelesai: '05/11/2026',
  },
  {
    id: 'hist-06',
    nomorLayanan: 'W15.AHU.BHP.04.09-0071',
    jenisLayanan: 'Pengampuan',
    namaPemohon: 'dr. Hartono Kusuma',
    tanggalPermohonan: '22/10/2026',
    slaTargetHari: 14,
    slaRealisasiHari: 9,
    slaStatus: 'aman',
    tanggalSelesai: '03/11/2026',
  },
  {
    id: 'hist-07',
    nomorLayanan: 'W15.AHU.BHP.04.08-0102',
    jenisLayanan: 'Mewakili Pemisah Harta Peninggalan',
    namaPemohon: 'Keluarga Alm. Rudy Hartawan',
    tanggalPermohonan: '19/10/2026',
    slaTargetHari: 14,
    slaRealisasiHari: 11,
    slaStatus: 'aman',
    tanggalSelesai: '02/11/2026',
  },
  {
    id: 'hist-08',
    nomorLayanan: 'W15.AHU.BHP.04.03-1965',
    jenisLayanan: 'Pembukaan dan Pembacaan Wasiat Tertutup/Rahasia',
    namaPemohon: 'Notaris Veronika Halim, S.H., M.Kn.',
    tanggalPermohonan: '21/10/2026',
    slaTargetHari: 14,
    slaRealisasiHari: 6,
    slaStatus: 'aman',
    tanggalSelesai: '29/10/2026',
  },
];

