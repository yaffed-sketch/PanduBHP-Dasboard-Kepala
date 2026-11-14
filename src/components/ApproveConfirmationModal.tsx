import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, QrCode, Send, X } from 'lucide-react';
import { LegalDocumentItem } from '../types/bhp';

interface ApproveConfirmationModalProps {
  document: LegalDocumentItem | null;
  onCancel: () => void;
  onConfirm: (doc: LegalDocumentItem, catatan: string) => void;
}

export const ApproveConfirmationModal: React.FC<
  ApproveConfirmationModalProps
> = ({ document, onCancel, onConfirm }) => {
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    setCatatan('');
  }, [document]);

  useEffect(() => {
    if (!document) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [document, onCancel]);

  if (!document) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="approve-modal-title"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2
            id="approve-modal-title"
            className="font-display text-base font-bold text-slate-900"
          >
            Konfirmasi Persetujuan Dokumen Hukum
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Tutup konfirmasi"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          {/* Document Summary */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-slate-900">
              {document.jenisLayanan}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Pemohon: <strong className="text-slate-900">{document.namaPemohon}</strong> ·{' '}
              <span className="font-mono">{document.nomorBerkas}</span>
            </p>
          </div>

          {/* Explicit Routing Explanation */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-700">
              Alur Penerusan Setelah Disetujui:
            </p>
            <div className="flex items-center justify-between gap-2 rounded-lg border border-blue-200 bg-blue-50/70 p-3.5 text-xs">
              <div className="flex flex-col items-center text-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                <span className="mt-1 font-semibold text-slate-900">
                  Kepala BHP
                </span>
                <span className="text-[11px] text-slate-600">Disetujui</span>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-blue-700" />

              <div className="flex flex-col items-center text-center rounded-md border border-blue-300 bg-white px-3 py-1.5">
                <QrCode className="h-5 w-5 text-blue-700" />
                <span className="mt-1 font-semibold text-blue-900">
                  Akun Pertama
                </span>
                <span className="text-[11px] text-blue-700">
                  Barcode & TTE
                </span>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />

              <div className="flex flex-col items-center text-center">
                <Send className="h-5 w-5 text-slate-500" />
                <span className="mt-1 font-semibold text-slate-700">
                  Pemohon
                </span>
                <span className="text-[11px] text-slate-500">
                  Kirim Final
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              Sesuai prosedur pengamanan dokumen, berkas yang disetujui tidak langsung dikirim ke Pemohon, melainkan masuk ke{' '}
              <strong className="font-semibold text-slate-900">Akun Pertama</strong>{' '}
              untuk dilakukan penyematan <strong className="font-semibold text-slate-900">Barcode</strong> dan{' '}
              <strong className="font-semibold text-slate-900">Tanda Tangan Elektronik (TTE)</strong>.
            </p>
          </div>

          {/* Optional Note */}
          <div>
            <label
              htmlFor="catatan-kepala"
              className="block text-xs font-semibold text-slate-700"
            >
              Catatan untuk Akun Pertama (Opsional)
            </label>
            <textarea
              id="catatan-kepala"
              rows={2}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Segera sematkan Barcode & TTE prioritas hari ini..."
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onConfirm(document, catatan)}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-blue-700 px-4 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Setuju & Masuk ke Akun Pertama
          </button>
        </div>
      </div>
    </div>
  );
};
