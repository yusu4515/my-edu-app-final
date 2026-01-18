"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mode, setMode] = useState<"user" | "admin" | "register">("user");
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyId: "", empNum: "",
    email: "", password: "",
    companyName: "", address: "", tel: "", picName: ""
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "user") {
      localStorage.setItem("current_user", formData.empNum);
      localStorage.setItem("current_company_id", formData.companyId);
      router.push("/training");
    } else if (mode === "admin") {
      // 簡易ログインチェック
      const savedAdmin = JSON.parse(localStorage.getItem("admin_account") || "{}");
      if (formData.email === savedAdmin.email && formData.password === savedAdmin.password) {
        router.push("/admin/dashboard");
      } else {
        alert("メールアドレスまたはパスワードが違います");
      }
    } else {
      // 【新規登録】情報を保存
      const companyId = "ID-" + Math.floor(Math.random() * 10000); // 簡易ID発行
      const adminData = { ...formData, companyId: companyId };
      localStorage.setItem("admin_account", JSON.stringify(adminData));
      
      alert(`登録完了！あなたの企業IDは [ ${companyId} ] です。このIDを従業員に伝えてください。`);
      setMode("admin");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-md text-slate-900">
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
          <button onClick={() => setMode("user")} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === "user" ? "bg-white shadow text-blue-600" : "text-slate-500"}`}>従業員</button>
          <button onClick={() => setMode(mode === "register" ? "register" : "admin")} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode !== "user" ? "bg-white shadow text-blue-600" : "text-slate-500"}`}>管理者</button>
        </div>

        <h1 className="text-2xl font-black mb-6 text-center">{mode === "user" ? "ISMS研修ログイン" : mode === "admin" ? "管理者ログイン" : "管理者新規登録"}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "user" ? (
            <>
              <input name="companyId" placeholder="企業ID" required onChange={handleInput} className="w-full p-4 border-2 rounded-xl outline-none focus:border-blue-500" />
              <input name="empNum" placeholder="従業員番号" required onChange={handleInput} className="w-full p-4 border-2 rounded-xl outline-none focus:border-blue-500" />
            </>
          ) : mode === "admin" ? (
            <>
              <input name="email" type="email" placeholder="メールアドレス" required onChange={handleInput} className="w-full p-4 border-2 rounded-xl outline-none focus:border-blue-500" />
              <input name="password" type="password" placeholder="パスワード" required onChange={handleInput} className="w-full p-4 border-2 rounded-xl outline-none focus:border-blue-500" />
            </>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              <input name="companyName" placeholder="会社名" required onChange={handleInput} className="w-full p-3 border rounded-xl" />
              <input name="address" placeholder="住所" required onChange={handleInput} className="w-full p-3 border rounded-xl" />
              <input name="tel" placeholder="電話番号" required onChange={handleInput} className="w-full p-3 border rounded-xl" />
              <input name="picName" placeholder="担当者名" required onChange={handleInput} className="w-full p-3 border rounded-xl" />
              <input name="email" type="email" placeholder="メールアドレス" required onChange={handleInput} className="w-full p-3 border rounded-xl" />
              <input name="password" type="password" placeholder="パスワード" required onChange={handleInput} className="w-full p-3 border rounded-xl" />
            </div>
          )}
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg transition-all active:scale-95">
            {mode === "user" ? "研修を開始する" : mode === "admin" ? "管理画面へ" : "登録を完了する"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          {mode === "admin" ? (
            <p className="text-sm text-slate-500">会員登録がまだの方は <button onClick={() => setMode("register")} className="text-blue-600 font-bold ml-1">新規登録はこちら</button></p>
          ) : mode === "register" ? (
            <button onClick={() => setMode("admin")} className="text-sm text-blue-600 font-bold">管理者ログインに戻る</button>
          ) : (
            <p className="text-xs text-slate-400 italic">企業IDをお持ちでない方は、管理者までお問合せください。</p>
          )}
        </div>
      </div>
    </div>
  );
}