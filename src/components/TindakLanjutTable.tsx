import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck2,
  Search,
} from 'lucide-react';
import { LegalDocumentItem, SlaStatus } from '../types/bhp';

interface TindakLanjutTableProps {
  documents: LegalDocumentItem[];
  onPreview: (doc: LegalDocumentItem) => void;
  onRequestApprove: (doc: LegalDocumentItem) => void;
}

type TableViewTab = 'perlu-persetujuan' | 'riwayat-diteruskan';

const SLA_PRIORITY_ORDER: Record<SlaStatus, number> = {
  terlambat: 1, // 1. SLA Lebih (Merah)
  mendekati: 2, // 2. SLA Mendekati (Kuning)
  aman: 3, // 3. SLA Aman (Hijau)
};

export const TindakLanjutTable: React.FC<TindakLanjutTableProps> = ({
  documents,
  onPreview,
  onRequestApprove,
}) => {
  const [viewTab, setViewTab] = useState<TableViewTab>('perlu-persetujuan');
  const [searchQuery, setSearchQuery] = useState('');

  const pendingDocs = useMemo(
    () => documents.filter((d) => d.stage === 'menunggu_kepala'),
    [documents]
  );

  const forwardedDocs = useMemo(
    () => documents.filter((d) => d.stage !== 'menunggu_kepala'),
    [documents]
  );

  const activeBaseList =
    viewTab === 'perlu-persetujuan' ? pendingDocs : forwardedDocs;

  const filteredAndSortedDocs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return activeBaseList
      .filter((doc) => {
        if (!q) return true;
        return (
          doc.namaPemohon.toLowerCase().includes(q) ||
          doc.jenisLayanan.toLowerCase().includes(q) ||
          doc.nomorBerkas.toLowerCase().includes(q) ||
          doc.domisili.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const priorityDiff =
          SLA_PRIORITY_ORDER[a.slaStatus] - SLA_PRIORITY_ORDER[b.slaStatus];
        if (priorityDiff !== 0) return priorityDiff;
        return b.slaBerjalanHari - a.slaBerjalanHari;
      });
  }, [activeBaseList, searchQuery]);

  const renderSlaCell = (doc: LegalDocumentItem) => {
    const ratio = Math.min(
      Math.round((doc.slaBerjalanHari / doc.slaTargetHari) * 100),
      100
    );

    if (doc.slaStatus === 'terlambat') {
      return (
        <div className="min-w-[165px]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-700">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="font-mono tabular-nums">
              {doc.slaBerjalanHari} / {doc.slaTargetHari} Hari
            </span>
            <span>·</span>
            <span>SLA Lebih</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-full bg-red-600" />
          </div>
        </div>
      );
    }

    if (doc.slaStatus === 'mendekati') {
      return (
        <div className="min-w-[165px]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="font-mono tabular-nums">
              {doc.slaBerjalanHari} / {doc.slaTargetHari} Hari
            </span>
            <span>·</span>
            <span>SLA Mendekati</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              style={{ width: `${ratio}%` }}
              className="h-full bg-amber-500"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-w-[165px]">
        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="font-mono tabular-nums">
            {doc.slaBerjalanHari} / {doc.slaTargetHari} Hari
          </span>
          <span>·</span>
          <span>SLA Aman</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            style={{ width: `${ratio}%` }}
            className="h-full bg-emerald-600"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Toolbar: Pencarian (Search) tepat di depan menu Perlu Persetujuan */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pemohon, jenis layanan, atau nomor berkas..."
            aria-label="Cari dokumen tindak lanjut"
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Tab View Switcher: Perlu Persetujuan / Sudah Disetujui */}
        <div
          role="tablist"
          aria-label="Status Daftar Tindak Lanjut"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 self-start lg:self-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewTab === 'perlu-persetujuan'}
            onClick={() => setViewTab('perlu-persetujuan')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              viewTab === 'perlu-persetujuan'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            Perlu Persetujuan ({pendingDocs.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewTab === 'riwayat-diteruskan'}
            onClick={() => setViewTab('riwayat-diteruskan')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              viewTab === 'riwayat-diteruskan'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            Sudah Disetujui ({forwardedDocs.length})
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-xl border border-slate-200 bg-white">
        {filteredAndSortedDocs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                  <th className="w-20 px-5 py-3.5 text-center">No Urut</th>
                  <th className="px-4 py-3.5">Jenis Layanan</th>
                  <th className="px-4 py-3.5">Nama Pemohon</th>
                  <th className="px-4 py-3.5">SLA</th>
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAndSortedDocs.map((doc, idx) => (
                  <tr
                    key={doc.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-5 py-4 text-center font-mono text-sm font-medium text-slate-700 tabular-nums">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-900">
                        {doc.jenisLayanan}
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-slate-500">
                        {doc.nomorBerkas} · Masuk {doc.tanggalMasuk}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-900">
                        {doc.namaPemohon}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {doc.domisili}
                      </div>
                    </td>
                    <td className="px-4 py-4">{renderSlaCell(doc)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onPreview(doc)}
                          className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 whitespace-nowrap shrink-0"
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          Preview Dokumen Hukum
                        </button>

                        {doc.stage === 'menunggu_kepala' ? (
                          <button
                            type="button"
                            onClick={() => onRequestApprove(doc)}
                            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-blue-700 px-4 text-xs font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 whitespace-nowrap shrink-0"
                          >
                            <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Setuju
                          </button>
                        ) : (
                          <span className="inline-flex h-10 items-center px-3 text-xs font-medium text-slate-600 whitespace-nowrap shrink-0">
                            Masuk Akun Pertama (Menunggu Barcode & TTE)
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-slate-900">
              {searchQuery
                ? 'Tidak ada dokumen yang sesuai pencarian'
                : viewTab === 'perlu-persetujuan'
                ? 'Seluruh dokumen telah disetujui'
                : 'Belum ada dokumen yang diteruskan'}
            </h3>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              {searchQuery
                ? 'Ubah kata kunci pencarian untuk melihat berkas lainnya.'
                : 'Dokumen yang telah disetujui telah diteruskan ke Akun Pertama untuk penyematan Barcode dan Tanda Tangan Elektronik.'}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Atur Ulang Pencarian
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
