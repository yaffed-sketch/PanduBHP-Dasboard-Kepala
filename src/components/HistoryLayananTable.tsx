import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { HistoryServiceItem } from '../types/bhp';

interface HistoryLayananTableProps {
  items: HistoryServiceItem[];
}

export const HistoryLayananTable: React.FC<HistoryLayananTableProps> = ({
  items,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayanan, setSelectedLayanan] = useState('semua');

  const layananOptions = useMemo(() => {
    const unique = Array.from(new Set(items.map((i) => i.jenisLayanan)));
    return unique;
  }, [items]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchLayanan =
        selectedLayanan === 'semua' || item.jenisLayanan === selectedLayanan;
      const matchSearch =
        !q ||
        item.nomorLayanan.toLowerCase().includes(q) ||
        item.jenisLayanan.toLowerCase().includes(q) ||
        item.namaPemohon.toLowerCase().includes(q);
      return matchLayanan && matchSearch;
    });
  }, [items, searchQuery, selectedLayanan]);

  const renderSlaBadge = (item: HistoryServiceItem) => {
    if (item.slaStatus === 'terlambat') {
      return (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-red-700">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="font-mono tabular-nums">
            {item.slaRealisasiHari} / {item.slaTargetHari} Hari
          </span>
          <span>·</span>
          <span>Melewati SLA</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="font-mono tabular-nums">
          {item.slaRealisasiHari} / {item.slaTargetHari} Hari
        </span>
        <span>·</span>
        <span>Tepat Waktu</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search & Jenis Layanan Filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari no layanan, jenis layanan, atau pemohon..."
            aria-label="Cari riwayat layanan"
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="history-jenis-layanan"
            className="text-xs font-semibold text-slate-600 whitespace-nowrap"
          >
            Jenis Layanan
          </label>
          <select
            id="history-jenis-layanan"
            value={selectedLayanan}
            onChange={(e) => setSelectedLayanan(e.target.value)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-900 focus:border-blue-600 focus:outline-none"
          >
            <option value="semua">Semua Jenis Layanan</option>
            {layananOptions.map((jenis) => (
              <option key={jenis} value={jenis}>
                {jenis}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* History Layanan Table */}
      <div className="rounded-xl border border-slate-200 bg-white">
        {filteredItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                  <th className="w-20 px-5 py-3.5 text-center">No Urut</th>
                  <th className="px-4 py-3.5">No Layanan</th>
                  <th className="px-4 py-3.5">Jenis Layanan</th>
                  <th className="px-4 py-3.5">Nama Pemohon</th>
                  <th className="px-4 py-3.5">Tanggal Permohonan</th>
                  <th className="px-4 py-3.5">SLA</th>
                  <th className="px-5 py-3.5">Status Layanan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-5 py-3.5 text-center font-mono text-sm font-medium text-slate-700 tabular-nums">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs font-semibold text-slate-900 whitespace-nowrap">
                      {item.nomorLayanan}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-slate-900">
                      {item.jenisLayanan}
                    </td>
                    <td className="px-4 py-3.5 text-slate-800">
                      {item.namaPemohon}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-slate-700 tabular-nums whitespace-nowrap">
                      {item.tanggalPermohonan}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {renderSlaBadge(item)}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                        <CheckCircle2
                          className="h-3.5 w-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-mono tabular-nums">
                          Selesai {item.tanggalSelesai}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-14 text-center text-sm text-slate-500">
            Tidak ada riwayat layanan yang sesuai dengan pencarian atau filter.
          </div>
        )}
      </div>
    </div>
  );
};
