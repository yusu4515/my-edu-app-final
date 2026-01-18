"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSettings() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    tel: "",
    picName: "",
    email: "",
    password: "",
    companyId: ""
  });

  useEffect(() => {
    const savedAdmin = JSON.parse(localStorage.getItem("admin_account") || "null");
    if (!savedAdmin) {
      router.push("/login");
      return;
    }
    setFormData(savedAdmin);
  }, [router]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("admin_account", JSON.stringify(formData));
    alert("企業情報を更新しました！");
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* サイドバー */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col">
        <div className="mb-10"><h2 className="text-xl font-black text-blue-400 italic">ISMS Admin</h2></div>
        <nav className="space-y-4 flex-1">
          <button onClick={() => router.push("/admin/dashboard")} className="w-full text-left text-slate-400 p-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">受講状況一覧</button>
          <div className="bg-blue-600 p-3 rounded-xl font-bold text-sm">企業情報設定</div>
        </nav>
        <button onClick={() => router.push("/login")} className="text-rose-400 text-sm font-bold text-left hover:underline">← ログアウト</button>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-black">企業情報設定</h1>
          <p className="text-slate-500 mt-2 font-medium">登録情報の確認・変更ができます。</p>
        </header>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 max-w-2xl">
          <form onSubmit={saveSettings} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">企業ID（変更不可）</label>
                <input type="text" value={formData.companyId} disabled className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-blue-600 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">会社名</label>
                <input name="companyName" type="text" value={formData.companyName} onChange={handleInput} required className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">住所</label>
                <input name="address" type="text" value={formData.address} onChange={handleInput} required className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">電話番号</label>
                <input name="tel" type="text" value={formData.tel} onChange={handleInput} required className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">担当者名</label>
                <input name="picName" type="text" value={formData.picName} onChange={handleInput} required className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-4">
              <button type="button" onClick={() => router.push("/admin/dashboard")} className="flex-1 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all text-center">
                キャンセル
              </button>
              <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95">
                設定を保存する
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}