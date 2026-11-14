import React, { useEffect } from 'react';
import {
  Clock,
  FileCheck2,
  Scale,
  X,
} from 'lucide-react';
import { LegalDocumentItem } from '../types/bhp';

interface DocumentPreviewModalProps {
  document: LegalDocumentItem | null;
  onClose: () => void;
  onApproveFromPreview?: (doc: LegalDocumentItem) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  onClose,
  onApproveFromPreview,
}) => {
  useEffect(() => {
    if (!document) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [document, onClose]);

  if (!document) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="min-w-0">
            <h2
              id="preview-modal-title"
              className="truncate font-display text-base font-bold text-slate-900"
            >
              Pratinjau Dokumen Hukum · {document.jenisLayanan}
            </h2>
            <p className="mt-0.5 font-mono text-xs text-slate-500">
              Nomor Berkas: {document.nomorBerkas} · Pemohon: {document.namaPemohon}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Tutup pratinjau dokumen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Legal Document Paper Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="mx-auto max-w-2xl rounded-lg border border-slate-300 bg-white p-6 sm:p-10 shadow-sm text-slate-900">
            {/* Kop Surat Resmi */}
            <div className="flex items-center gap-4 border-b-2 border-slate-900 pb-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-800">
                <Scale className="h-7 w-7" aria-hidden="true" />
              </div>
              <div className="text-center flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Kementerian Hukum Republik Indonesia
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                  Kantor Wilayah Jawa Timur
                </p>
                <p className="mt-0.5 font-display text-sm sm:text-base font-bold uppercase tracking-tight text-slate-900">
                  Balai Harta Peninggalan Surabaya
                </p>
                <p className="mt-0.5 text-[11px] text-slate-600">
                  Jl. Kayoon No. 50, Embong Kaliasin, Kec. Genteng, Kota Surabaya 60271
                </p>
              </div>
            </div>

            {/* Document Title & Number */}
            <div className="mt-7 text-center">
              <h3 className="font-display text-base font-bold uppercase tracking-wide text-slate-900 underline underline-offset-4">
                {document.judulDokumen}
              </h3>
              <p className="mt-1.5 font-mono text-xs text-slate-700">
                Nomor: {document.nomorBerkas}
              </p>
            </div>

            {/* Metadata Pemohon */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/70 p-4 text-xs sm:text-sm">
              <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-slate-500">Nama Pemohon</dt>
                  <dd className="font-semibold text-slate-900">
                    {document.namaPemohon}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Wilayah / Domisili</dt>
                  <dd className="font-medium text-slate-900">
                    {document.domisili}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Tanggal Registrasi</dt>
                  <dd className="font-mono text-slate-900">
                    {document.tanggalMasuk}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Pemeriksa Berkas</dt>
                  <dd className="font-medium text-slate-900">
                    {document.pejabatPemeriksa}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Dasar Hukum */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-800">
                Dasar Hukum:
              </h4>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
                {document.dasarHukum.map((pasal, i) => (
                  <li key={i}>{pasal}</li>
                ))}
              </ol>
            </div>

            {/* Isi Penetapan / Keterangan */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-800">
                Uraian Substansi Hukum:
              </h4>
              <div className="mt-2 space-y-3 text-sm leading-relaxed text-slate-800 text-justify">
                {document.isiRingkas.map((paragraf, i) => (
                  <p key={i}>{paragraf}</p>
                ))}
              </div>
            </div>

            {/* Signature & Barcode Verification Block */}
            <div className="mt-10 flex flex-col gap-6 border-t border-slate-200 pt-6 sm:flex-row sm:items-end sm:justify-between">
              {/* Barcode Status Box */}
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3.5 sm:max-w-xs">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                  <div>
                    <p className="font-semibold text-slate-800">
                      Slot Barcode & TTE (Akun Pertama)
                    </p>
                    <p className="mt-0.5 leading-snug text-slate-600">
                      {document.stage === 'menunggu_kepala'
                        ? 'Akan disematkan oleh Akun Pertama setelah Kepala BHP Surabaya menyetujui dokumen ini.'
                        : 'Dokumen telah disetujui Kepala BHP dan diteruskan ke Akun Pertama untuk penyematan Barcode & TTE.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pejabat Penandatangan */}
              <div className="text-left sm:text-right text-sm">
                <p className="text-xs text-slate-600">Surabaya, 13 November 2026</p>
                <p className="font-semibold text-slate-900">
                  Kepala Balai Harta Peninggalan Surabaya
                </p>
                <div className="my-4 text-xs italic text-slate-400">
                  {document.stage === 'antrean_akun_pertama'
                    ? '[ Disetujui Kepala · Menunggu Barcode & TTE di Akun Pertama ]'
                    : '[ Menunggu Persetujuan Kepala BHP Surabaya ]'}
                </div>
                <p className="font-semibold text-slate-900 underline underline-offset-4">
                  Dr. H. Prasetyo Wibowo, S.H., M.H.
                </p>
                <p className="font-mono text-xs text-slate-600">
                  NIP. 19760514 200112 1 002
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Status saat ini:{' '}
            <strong className="font-semibold text-slate-800">
              {document.stage === 'menunggu_kepala'
                ? 'Menunggu Persetujuan Kepala BHP'
                : 'Diteruskan ke Akun Pertama (Menunggu Barcode & TTE)'}
            </strong>
          </p>
          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              Tutup Pratinjau
            </button>
            {document.stage === 'menunggu_kepala' && onApproveFromPreview && (
              <button
                type="button"
                onClick={() => onApproveFromPreview(document)}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-blue-700 px-4 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap"
              >
                <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                Setuju & Teruskan ke Akun Pertama
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
