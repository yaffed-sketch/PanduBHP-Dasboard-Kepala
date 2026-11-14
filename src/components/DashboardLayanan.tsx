import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  Layers,
} from 'lucide-react';
import {
  BULAN_OPTIONS,
  OVERDUE_SLA_SERVICES,
  SERVICE_DEFINITIONS,
  TAHUN_OPTIONS,
  getServiceCounts,
} from '../data/bhpData';
import { OverdueServiceItem, TindakLanjutKepalaRecord } from '../types/bhp';
import { OverdueDetailModal } from './OverdueDetailModal';

export const DashboardLayanan: React.FC = () => {
  const [selectedBulan, setSelectedBulan] = useState<string>('all');
  const [selectedTahun, setSelectedTahun] = useState<number>(2026);
  const [selectedOverdue, setSelectedOverdue] =
    useState<OverdueServiceItem | null>(null);
  const [tindakLanjutMap, setTindakLanjutMap] = useState<
    Record<string, TindakLanjutKepalaRecord>
  >({});
  const [showOverdueTable, setShowOverdueTable] = useState<boolean>(true);

  const counts = useMemo(
    () => getServiceCounts(selectedTahun, selectedBulan),
    [selectedTahun, selectedBulan]
  );

  const totalLayanan = useMemo(
    () => Object.values(counts).reduce((sum, val) => sum + val, 0),
    [counts]
  );

  const row1Services = useMemo(
    () => SERVICE_DEFINITIONS.filter((s) => s.row === 1),
    []
  );

  const row2Services = useMemo(
    () => SERVICE_DEFINITIONS.filter((s) => s.row === 2),
    []
  );

  const filteredOverdue = useMemo(() => {
    return OVERDUE_SLA_SERVICES.filter((item) => {
      const matchYear = item.tahun === selectedTahun;
      const matchMonth =
        selectedBulan === 'all' || item.bulan === Number(selectedBulan);
      return matchYear && matchMonth;
    });
  }, [selectedTahun, selectedBulan]);

  const activePeriodText = useMemo(() => {
    const bulanLabel =
      BULAN_OPTIONS.find((b) => b.value === selectedBulan)?.label ?? '';
    return `${bulanLabel} · Tahun ${selectedTahun}`;
  }, [selectedBulan, selectedTahun]);

  const handleSaveTindakLanjut = (
    itemId: string,
    record: TindakLanjutKepalaRecord
  ) => {
    setTindakLanjutMap((prev) => ({
      ...prev,
      [itemId]: record,
    }));
  };

  return (
    <div className="space-y-6">
      <div className={selectedOverdue ? 'space-y-6 no-print' : 'space-y-6'}>
        {/* Filter Toolbar */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Periode Data:{' '}
            <span className="font-semibold text-slate-900">
              {activePeriodText}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {/* Pulldown Bulan */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="filter-bulan"
                className="text-xs font-semibold text-slate-600 whitespace-nowrap"
              >
                Bulan
              </label>
              <div className="relative">
                <select
                  id="filter-bulan"
                  value={selectedBulan}
                  onChange={(e) => setSelectedBulan(e.target.value)}
                  className="h-9 appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-8 text-xs font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
                >
                  {BULAN_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Pulldown Tahun */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="filter-tahun"
                className="text-xs font-semibold text-slate-600 whitespace-nowrap"
              >
                Tahun
              </label>
              <div className="relative">
                <select
                  id="filter-tahun"
                  value={selectedTahun}
                  onChange={(e) => setSelectedTahun(Number(e.target.value))}
                  className="h-9 appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-8 text-xs font-medium text-slate-900 font-mono tabular-nums focus:border-blue-600 focus:outline-none"
                >
                  {TAHUN_OPTIONS.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Score Cards Layout — Tulisan & Angka Rata Tengah (Center) */}
        <section aria-label="Score Jumlah Layanan per Jenis Layanan">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {/* Card 1: Jumlah Layanan (wider focal card, centered) */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-300 bg-slate-900 p-5 text-center text-white sm:col-span-2 md:col-span-3 xl:col-span-2">
              <div className="flex items-center justify-center gap-1.5">
                <Layers className="h-4 w-4 text-blue-400" aria-hidden="true" />
                <span className="text-xs font-medium text-slate-300">
                  Jumlah Layanan
                </span>
              </div>
              <p className="mt-2 font-mono text-3xl font-bold tracking-tight text-white tabular-nums">
                {totalLayanan.toLocaleString('id-ID')}
              </p>
              <p className="mt-1 text-xs text-slate-300">
                10 jenis layanan · {activePeriodText}
              </p>
            </div>

            {/* Row 1 Remaining 4 Service Score Cards (centered) */}
            {row1Services.map((srv) => (
              <div
                key={srv.id}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center"
              >
                <p className="text-xs font-medium leading-snug text-slate-600">
                  {srv.label}
                </p>
                <p className="mt-3 font-mono text-2xl font-semibold text-slate-900 tabular-nums">
                  {(counts[srv.id] ?? 0).toLocaleString('id-ID')}
                </p>
              </div>
            ))}

            {/* Row 2: 6 Service Score Cards (centered) */}
            {row2Services.map((srv) => (
              <div
                key={srv.id}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center"
              >
                <p className="text-xs font-medium leading-snug text-slate-600">
                  {srv.label}
                </p>
                <p className="mt-3 font-mono text-2xl font-semibold text-slate-900 tabular-nums">
                  {(counts[srv.id] ?? 0).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Table: Layanan Publik Melebihi SLA 14 Hari */}
        <section
          aria-labelledby="overdue-table-title"
          className="rounded-xl border border-slate-200 bg-white"
        >
          <div
            className={`flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${
              showOverdueTable ? 'border-b border-slate-200' : ''
            }`}
          >
            <div>
              <h2
                id="overdue-table-title"
                className="font-display text-base font-semibold text-slate-900"
              >
                Daftar Layanan Publik Melebihi SLA 14 Hari
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Permohonan layanan yang telah melampaui batas standar SLA 14 hari kerja ({activePeriodText})
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end shrink-0">
              <span className="font-mono text-xs font-semibold text-red-700 tabular-nums whitespace-nowrap">
                {filteredOverdue.length} Layanan Terlambat
              </span>
              <button
                type="button"
                onClick={() => setShowOverdueTable((prev) => !prev)}
                aria-expanded={showOverdueTable}
                aria-controls="overdue-table-content"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 whitespace-nowrap"
              >
                {showOverdueTable ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                    Sembunyikan
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    Tampilkan
                  </>
                )}
              </button>
            </div>
          </div>

          {showOverdueTable && (
            <div id="overdue-table-content">
              {filteredOverdue.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="w-20 px-5 py-3.5 text-center">No Urut</th>
                    <th className="px-4 py-3.5">Nomor Layanan</th>
                    <th className="px-4 py-3.5">Jenis Layanan</th>
                    <th className="px-4 py-3.5">Waktu Keterlambatan Layanan</th>
                    <th className="px-5 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOverdue.map((item, idx) => {
                    const tindakLanjut = tindakLanjutMap[item.id];
                    return (
                      <tr
                        key={item.id}
                        className="transition-colors hover:bg-slate-50/80"
                      >
                        <td className="px-5 py-3.5 text-center font-mono text-sm font-medium text-slate-700 tabular-nums">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-mono text-xs font-semibold text-slate-900">
                            {item.nomorLayanan}
                          </span>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Masuk {item.tanggalPermohonan}
                          </p>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="font-medium text-slate-900">
                            {item.jenisLayanan}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {item.namaPemohon}
                          </p>
                          {tindakLanjut && (
                            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-blue-800">
                              <CheckCircle2
                                className="h-3.5 w-3.5 shrink-0"
                                aria-hidden="true"
                              />
                              <span>
                                Atensi Kepala: {tindakLanjut.arahan}
                              </span>
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-700">
                            <AlertTriangle
                              className="h-3.5 w-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="font-mono tabular-nums">
                              Terlambat +{item.keterlambatanHari} Hari
                            </span>
                          </div>
                          <p className="mt-0.5 font-mono text-xs text-slate-500 tabular-nums">
                            Berjalan {item.hariBerjalan} hari (Standar{' '}
                            {item.slaStandarHari} hari)
                          </p>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedOverdue(item)}
                            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 whitespace-nowrap shrink-0"
                          >
                            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                            Ringkasan Layanan
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center text-sm text-slate-500">
              Tidak ada layanan publik yang melewati SLA 14 hari pada periode{' '}
              <strong className="font-semibold text-slate-800">
                {activePeriodText}
              </strong>
              .
            </div>
          )}
            </div>
          )}
        </section>
      </div>

      {/* Ringkasan Layanan Modal */}
      <OverdueDetailModal
        item={selectedOverdue}
        savedTindakLanjut={
          selectedOverdue ? tindakLanjutMap[selectedOverdue.id] : undefined
        }
        onSaveTindakLanjut={handleSaveTindakLanjut}
        onClose={() => setSelectedOverdue(null)}
      />
    </div>
  );
};
