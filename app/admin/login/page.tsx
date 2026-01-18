"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("管理者としてログインしました。\n次は管理者専用ダッシュボードを作成します。");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">管理者ログイン</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-600">メールアドレス</label>
            <input type="email" placeholder="admin@example.com" className="w-full p-2 border rounded mt-1" required 
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">パスワード</label>
            <input type="password" placeholder="••••••••" className="w-full p-2 border rounded mt-1" required 
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}