export type MenuKey = 'dashboard' | 'tindak-lanjut' | 'history';

export type SlaStatus = 'aman' | 'mendekati' | 'terlambat';

export type DocumentStage = 'menunggu_kepala' | 'antrean_akun_pertama';

export interface HistoryServiceItem {
  id: string;
  nomorLayanan: string;
  jenisLayanan: string;
  namaPemohon: string;
  tanggalPermohonan: string; // DD/MM/YYYY
  slaTargetHari: number;
  slaRealisasiHari: number;
  slaStatus: SlaStatus;
  tanggalSelesai: string; // DD/MM/YYYY
}

export interface ServiceScoreItem {
  id: string;
  label: string;
  jumlah: number;
  row: 1 | 2;
}

export interface PenanggungJawabLayanan {
  kepalaSeksi: string;
  jfkkPertama: string;
  jfkkMuda: string;
  jfkkMadya: string;
}

export interface TindakLanjutKepalaRecord {
  arahan: string;
  instruksi: string;
  updatedAt: string;
}

export interface OverdueServiceItem {
  id: string;
  nomorLayanan: string;
  jenisLayanan: string;
  namaPemohon: string;
  tanggalPermohonan: string;
  bulan: number; // 1 - 12
  tahun: number; // 2026+
  slaStandarHari: number; // 14
  hariBerjalan: number;
  keterlambatanHari: number;
  penanggungJawab: PenanggungJawabLayanan;
  keteranganProses: string;
}

export interface LegalDocumentItem {
  id: string;
  noUrut: number;
  nomorBerkas: string;
  jenisLayanan: string;
  namaPemohon: string;
  domisili: string;
  tanggalMasuk: string;
  slaTargetHari: number;
  slaBerjalanHari: number;
  slaStatus: SlaStatus;
  stage: DocumentStage;
  judulDokumen: string;
  dasarHukum: string[];
  isiRingkas: string[];
  pejabatPemeriksa: string;
  catatanKepala?: string;
  approvedAt?: string;
}
