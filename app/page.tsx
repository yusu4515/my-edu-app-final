"use client";
import { useState } from "react";

export default function AdminRegister() {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    tel: "",
    adminName: "",
    email: "",
    password: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("登録データ:", formData);
    alert("管理者アカウントの発行を受け付けました！\n次は従業員ログイン画面を作成します。");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">1. 管理者アカウント発行</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">会社情報</label>
            <input type="text" placeholder="会社名" className="w-full p-2 border rounded" required 
              onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
            <input type="text" placeholder="会社住所" className="w-full p-2 border rounded" required 
              onChange={(e) => setFormData({...formData, address: e.target.value})} />
            <input type="tel" placeholder="電話番号" className="w-full p-2 border rounded" required 
              onChange={(e) => setFormData({...formData, tel: e.target.value})} />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">担当者・ログイン情報</label>
            <input type="text" placeholder="担当者名" className="w-full p-2 border rounded" required 
              onChange={(e) => setFormData({...formData, adminName: e.target.value})} />
            <input type="email" placeholder="メールアドレス" className="w-full p-2 border rounded" required 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="パスワード" className="w-full p-2 border rounded" required 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200">
            アカウントを発行する
          </button>
        </form>
      </div>
    </div>
  );
}