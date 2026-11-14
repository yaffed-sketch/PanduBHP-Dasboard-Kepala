import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ClipboardEdit,
  FileText,
  Printer,
  Users,
  X,
} from 'lucide-react';
import {
  OverdueServiceItem,
  TindakLanjutKepalaRecord,
} from '../types/bhp';

interface OverdueDetailModalProps {
  item: OverdueServiceItem | null;
  savedTindakLanjut?: TindakLanjutKepalaRecord;
  onSaveTindakLanjut: (
    itemId: string,
    record: TindakLanjutKepalaRecord
  ) => void;
  onClose: () => void;
}

const ARAHAN_OPTIONS = [
  'Peringatan Percepatan Penyelesaian (Maks. 2 Hari Kerja)',
  'Rapat Evaluasi Bersama Kepala Seksi & Tim JFKK',
  'Koordinasi Lintas Instansi / Klarifikasi Berkas Prioritas',
  'Alih Tugas / Penambahan Dukungan Pemeriksa Berkas',
] as const;

export const OverdueDetailModal: React.FC<OverdueDetailModalProps> = ({
  item,
  savedTindakLanjut,
  onSaveTindakLanjut,
  onClose,
}) => {
  const [arahan, setArahan] = useState<string>(ARAHAN_OPTIONS[0]);
  const [instruksi, setInstruksi] = useState<string>('');
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!item) return;
    setArahan(savedTindakLanjut?.arahan ?? ARAHAN_OPTIONS[0]);
    setInstruksi(savedTindakLanjut?.instruksi ?? '');
    setJustSaved(false);
  }, [item, savedTindakLanjut]);

  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [item, onClose]);

  if (!item) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');

    onSaveTindakLanjut(item.id, {
      arahan,
      instruksi:
        instruksi.trim() ||
        'Segera laporkan perkembangan penyelesaian berkas kepada Kepala BHP Surabaya.',
      updatedAt: `13 Nov 2026, ${hh}:${mm} WIB`,
    });
    setJustSaved(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="print-modal-root fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="overdue-modal-title"
    >
      <div className="print-modal-card flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="min-w-0">
            <h2
              id="overdue-modal-title"
              className="font-display text-base font-bold text-slate-900"
            >
              Ringkasan Layanan & Atensi Keterlambatan SLA
            </h2>
            <p className="mt-0.5 font-mono text-xs text-slate-500">
              Balai Harta Peninggalan Surabaya · {item.nomorLayanan}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="no-print rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Tutup ringkasan layanan"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="print-modal-body flex-1 overflow-y-auto space-y-5 p-6">
          {/* Core Service Metadata */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Nomor Layanan
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-slate-900">
                {item.nomorLayanan}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                Tanggal Permohonan
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-slate-900">
                {item.tanggalPermohonan}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs font-medium text-slate-500">
                Jenis Layanan
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {item.jenisLayanan}
              </p>
              <p className="mt-0.5 text-xs text-slate-600">
                Pemohon: {item.namaPemohon}
              </p>
            </div>
          </div>

          {/* SLA Delay Summary */}
          <div className="rounded-xl border border-red-200 bg-red-50/60 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="mt-0.5 h-5 w-5 shrink-0 text-red-700"
                aria-hidden="true"
              />
              <div className="flex-1">
                <p className="text-xs font-semibold text-red-900">
                  Keterlambatan SLA (Batas Standar {item.slaStandarHari} Hari Kerja)
                </p>
                <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="block text-xs text-slate-600">
                      Standar SLA
                    </span>
                    <span className="font-mono font-semibold text-slate-900 tabular-nums">
                      {item.slaStandarHari} Hari
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-600">
                      Waktu Berjalan
                    </span>
                    <span className="font-mono font-semibold text-slate-900 tabular-nums">
                      {item.hariBerjalan} Hari
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-600">
                      Keterlambatan
                    </span>
                    <span className="font-mono font-semibold text-red-700 tabular-nums">
                      +{item.keterlambatanHari} Hari
                    </span>
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-700">
                  <strong className="font-semibold text-slate-900">
                    Catatan Progres:
                  </strong>{' '}
                  {item.keteranganProses}
                </p>
              </div>
            </div>
          </div>

          {/* Penanggung Jawab Hierarchy */}
          <div>
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-slate-900">
              <Users className="h-4 w-4 text-slate-600" aria-hidden="true" />
              Penanggung Jawab Penanganan Layanan
            </h3>
            <div className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Kepala Seksi
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {item.penanggungJawab.kepalaSeksi}
                </span>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Fungsional JFKK Pertama
                </span>
                <span className="text-sm font-medium text-slate-900">
                  {item.penanggungJawab.jfkkPertama}
                </span>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Fungsional JFKK Muda
                </span>
                <span className="text-sm font-medium text-slate-900">
                  {item.penanggungJawab.jfkkMuda}
                </span>
              </div>
              <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Fungsional JFKK Madya
                </span>
                <span className="text-sm font-medium text-slate-900">
                  {item.penanggungJawab.jfkkMadya}
                </span>
              </div>
            </div>
          </div>

          {/* Tindak Lanjut Kepala BHP (Di bawah Penanggung Jawab) */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-slate-900">
                <ClipboardEdit
                  className="h-4 w-4 text-blue-700"
                  aria-hidden="true"
                />
                Tindak Lanjut Kepala BHP
              </h3>
              {savedTindakLanjut && (
                <span className="font-mono text-[11px] font-medium text-emerald-700">
                  Tercatat · {savedTindakLanjut.updatedAt}
                </span>
              )}
            </div>

            <form onSubmit={handleSave} className="mt-3 space-y-3">
              <div>
                <label
                  htmlFor="arahan-kepala"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Disposisi / Arahan Atensi Kepala
                </label>
                <select
                  id="arahan-kepala"
                  value={arahan}
                  onChange={(e) => {
                    setArahan(e.target.value);
                    setJustSaved(false);
                  }}
                  className="mt-1 h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
                >
                  {ARAHAN_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="instruksi-kepala"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Catatan & Instruksi Kepada Penanggung Jawab
                </label>
                <textarea
                  id="instruksi-kepala"
                  rows={2}
                  value={instruksi}
                  onChange={(e) => {
                    setInstruksi(e.target.value);
                    setJustSaved(false);
                  }}
                  placeholder="Tuliskan arahan khusus Kepala BHP Surabaya agar keterlambatan SLA segera ditangani..."
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="no-print flex flex-wrap items-center justify-between gap-2 pt-1">
                {justSaved ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Tindak lanjut atensi Kepala BHP berhasil disimpan
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500">
                    Arahan akan diteruskan ke Kepala Seksi dan Tim JFKK terkait.
                  </span>
                )}
                <button
                  type="submit"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-blue-700 px-4 text-xs font-semibold text-white transition-colors hover:bg-blue-800 whitespace-nowrap shrink-0"
                >
                  Simpan Tindak Lanjut
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer: Print sebelum Tutup Ringkasan */}
        <div className="no-print flex items-center justify-end gap-2.5 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg bg-slate-900 px-4 text-xs font-semibold text-white hover:bg-slate-800 whitespace-nowrap"
          >
            Tutup Ringkasan
          </button>
        </div>
      </div>
    </div>
  );
};
