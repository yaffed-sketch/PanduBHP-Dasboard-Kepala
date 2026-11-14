import React, { useMemo, useState } from 'react';
import { CheckCircle2, Menu, X } from 'lucide-react';
import { ApproveConfirmationModal } from './components/ApproveConfirmationModal';
import { DashboardLayanan } from './components/DashboardLayanan';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';
import { HistoryLayananTable } from './components/HistoryLayananTable';
import { Sidebar } from './components/Sidebar';
import { TindakLanjutTable } from './components/TindakLanjutTable';
import { HISTORY_SERVICES, INITIAL_DOCUMENTS } from './data/bhpData';
import { LegalDocumentItem, MenuKey } from './types/bhp';

interface ToastMessage {
  id: number;
  title: string;
  description: string;
}

const MENU_TITLES: Record<MenuKey, string> = {
  dashboard: 'Dashboard Layanan',
  'tindak-lanjut': 'Tindak Lanjut',
  history: 'History Layanan',
};

export function App() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [documents, setDocuments] =
    useState<LegalDocumentItem[]>(INITIAL_DOCUMENTS);
  const [previewDoc, setPreviewDoc] = useState<LegalDocumentItem | null>(null);
  const [approveDoc, setApproveDoc] = useState<LegalDocumentItem | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const pendingApprovalCount = useMemo(
    () => documents.filter((d) => d.stage === 'menunggu_kepala').length,
    [documents]
  );

  const formatCurrentWib = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    return `13 Nov 2026, ${hours}:${mins} WIB`;
  };

  const handleConfirmApprove = (doc: LegalDocumentItem, catatan: string) => {
    const approvedTime = formatCurrentWib();

    setDocuments((prev) =>
      prev.map((item) =>
        item.id === doc.id
          ? {
              ...item,
              stage: 'antrean_akun_pertama',
              approvedAt: approvedTime,
              catatanKepala: catatan.trim() || item.catatanKepala,
            }
          : item
      )
    );

    setApproveDoc(null);
    setToast({
      id: Date.now(),
      title: 'Dokumen Disetujui Kepala BHP Surabaya',
      description: `Berkas ${doc.nomorBerkas} (${doc.namaPemohon}) telah diteruskan ke Akun Pertama untuk penyematan Barcode dan Tanda Tangan Elektronik sebelum dikirim ke Pemohon.`,
    });
  };

  const handleApproveFromPreview = (doc: LegalDocumentItem) => {
    setPreviewDoc(null);
    setApproveDoc(doc);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar
        activeMenu={activeMenu}
        onSelectMenu={setActiveMenu}
        pendingApprovalCount={pendingApprovalCount}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Shell */}
      <div className="flex min-h-screen flex-col lg:pl-64 print:pl-0">
        {/* Clean Contextual Top Bar */}
        <header className="no-print sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
              aria-label="Buka menu navigasi"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm min-w-0"
            >
              <span className="hidden sm:inline text-slate-500 whitespace-nowrap">
                BHP Surabaya
              </span>
              <span className="hidden sm:inline text-slate-300" aria-hidden="true">
                /
              </span>
              <span className="truncate font-display font-semibold text-slate-900">
                {MENU_TITLES[activeMenu]}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {activeMenu !== 'tindak-lanjut' && (
              <button
                type="button"
                onClick={() => setActiveMenu('tindak-lanjut')}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-700 px-3.5 text-xs font-semibold text-white transition-colors hover:bg-blue-800 whitespace-nowrap shrink-0"
              >
                Tindak Lanjut
                <span className="font-mono tabular-nums text-blue-100">
                  ({pendingApprovalCount})
                </span>
              </button>
            )}
          </div>
        </header>

        {/* Active Page Viewport */}
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto max-w-7xl">
            {activeMenu === 'dashboard' && <DashboardLayanan />}

            {activeMenu === 'tindak-lanjut' && (
              <TindakLanjutTable
                documents={documents}
                onPreview={(doc) => setPreviewDoc(doc)}
                onRequestApprove={(doc) => setApproveDoc(doc)}
              />
            )}

            {activeMenu === 'history' && (
              <HistoryLayananTable items={HISTORY_SERVICES} />
            )}
          </div>
        </main>
      </div>

      {/* Toast Notification for Workflow Routing */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 w-[calc(100%-2.5rem)] max-w-md rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-semibold text-slate-900">
                {toast.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                {toast.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Tutup notifikasi"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Preview Legal Document Modal */}
      <DocumentPreviewModal
        document={previewDoc}
        onClose={() => setPreviewDoc(null)}
        onApproveFromPreview={handleApproveFromPreview}
      />

      {/* Approve Confirmation Modal */}
      <ApproveConfirmationModal
        document={approveDoc}
        onCancel={() => setApproveDoc(null)}
        onConfirm={handleConfirmApprove}
      />
    </div>
  );
}

export default App;
