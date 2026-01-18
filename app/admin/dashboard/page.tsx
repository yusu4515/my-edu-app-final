"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [results, setResults] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adminInfo, setAdminInfo] = useState({ companyName: "", companyId: "", picName: "" });

  useEffect(() => {
    const savedAdmin = JSON.parse(localStorage.getItem("admin_account") || "null");
    if (!savedAdmin) {
      router.push("/login");
      return;
    }
    setAdminInfo(savedAdmin);
    const data = JSON.parse(localStorage.getItem("training_results") || "[]");
    setResults(data);
  }, [router]);

  const getFilteredData = () => {
    return results.filter((r) => {
      if (r.companyId !== adminInfo.companyId) return false;
      const rawDate = r.date.split(" ")[0].replace(/\//g, "-");
      const recordDate = new Date(rawDate).getTime();
      const start = startDate ? new Date(startDate).getTime() : 0;
      const end = endDate ? new Date(endDate).getTime() : Infinity;
      return recordDate >= start && recordDate <= end;
    });
  };

  const downloadCSV = () => {
    const targetData = getFilteredData();
    if (targetData.length === 0) { alert("データがありません"); return; }
    let csvContent = "\uFEFF受講日時,従業員番号,スコア,判定\n";
    targetData.forEach(r => {
      csvContent += `${r.date},${r.employeeNum},${r.score}/10,${r.score >= 8 ? "合格" : "不合格"}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `report_${adminInfo.companyId}.csv`;
    link.click();
  };

  const filteredResults = getFilteredData();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <div className="flex flex-1">
        <aside className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col">
          <div className="mb-10"><h2 className="text-xl font-black text-blue-400 italic">ISMS Admin</h2></div>
          <nav className="space-y-4 flex-1">
            <div className="bg-blue-600 p-3 rounded-xl font-bold text-sm cursor-default">受講状況一覧</div>
            <button onClick={() => router.push("/admin/settings")} className="w-full text-left text-slate-400 p-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">企業情報設定</button>
          </nav>
          <button onClick={() => router.push("/login")} className="text-rose-400 text-sm font-bold text-left hover:underline">← ログアウト</button>
        </aside>

        <main className="flex-1 p-8">
          <header className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-black">{adminInfo.companyName}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">企業ID</span>
                <span className="font-mono font-bold text-blue-600">{adminInfo.companyId}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 font-bold">担当: {adminInfo.picName} 様</p>
            </div>
          </header>

          {/* メインの数値表示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-white">
            <div className="bg-slate-800 p-6 rounded-3xl shadow-lg">
              <p className="text-slate-400 text-xs font-bold mb-1 uppercase">自社受講数</p>
              <p className="text-4xl font-black">{filteredResults.length} <span className="text-lg font-normal">件</span></p>
            </div>
            <div className="bg-blue-600 p-6 rounded-3xl shadow-lg">
              <p className="text-blue-100 text-xs font-bold mb-1 uppercase">平均スコア</p>
              <p className="text-4xl font-black">
                {filteredResults.length > 0 ? (filteredResults.reduce((acc, r) => acc + r.score, 0) / filteredResults.length).toFixed(1) : "0.0"} 
                <span className="text-lg font-normal"> / 10</span>
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <input type="date" className="border rounded-lg px-3 py-2 text-sm outline-none" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <span className="text-slate-300">〜</span>
              <input type="date" className="border rounded-lg px-3 py-2 text-sm outline-none" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button onClick={downloadCSV} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg">CSVデータを抽出</button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold">
                <tr><th className="p-6">受講日時</th><th className="p-6">従業員番号</th><th className="p-6">スコア</th><th className="p-6 text-center">判定</th></tr>
              </thead>
              <tbody>
                {filteredResults.length === 0 ? (
                  <tr><td colSpan={4} className="p-20 text-center text-slate-300">自社のデータはまだありません</td></tr>
                ) : (
                  filteredResults.reverse().map((res, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="p-6 text-sm text-slate-500">{res.date}</td>
                      <td className="p-6 font-bold text-slate-700">{res.employeeNum}</td>
                      <td className="p-6 font-black text-slate-900 text-lg">{res.score} / 10</td>
                      <td className="p-6 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${res.score >= 8 ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"}`}>
                          {res.score >= 8 ? "合格" : "不合格"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}