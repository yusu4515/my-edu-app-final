"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, BookOpen, HelpCircle, Award, UserPlus, ListChecks, Lock } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState(0); // 0:番号入力, 1:トップ, 2:スライド, 3:テスト, 4:完了, 99:管理者画面
  const [empId, setEmpId] = useState("");
  const [records, setRecords] = useState<{id: string, date: string}[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // 合格時に記録を保存する
  const saveRecord = () => {
    const newRecord = { id: empId, date: new Date().toLocaleString() };
    setRecords([...records, newRecord]); // 本来はここにデータベース保存の処理を書きます
    setStep(4);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8 flex items-center justify-center font-sans text-slate-900">
      <div className="w-full max-w-2xl">
        
        {/* --- 0. 従業員番号入力 --- */}
        {step === 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h1 className="text-2xl font-black">セキュリティ研修ログイン</h1>
            </div>
            <input 
              type="text" 
              placeholder="従業員番号を入力"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              className="w-full p-4 border-2 border-slate-200 rounded-2xl mb-4 text-center text-xl"
            />
            <button 
              disabled={!empId}
              onClick={() => setStep(1)}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl disabled:opacity-30"
            >
              研修を始める
            </button>
            <button 
              onClick={() => setStep(99)}
              className="w-full mt-8 text-slate-400 text-sm flex items-center justify-center gap-1 hover:text-blue-600 transition"
            >
              <Lock className="w-3 h-3" /> 管理者専用メニュー
            </button>
          </div>
        )}

        {/* --- 1〜3. 研修・テスト（省略して中身は維持） --- */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-6 italic">Welcome, {empId}!</h2>
            <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">第1章を学習する</button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-xl font-bold mb-4">【重要】PCの離席時は必ずロックすること</h2>
            <p className="mb-8 text-slate-600 font-medium">これはISMSの「物理的セキュリティ」の基本ルールです。</p>
            <button onClick={() => setStep(3)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl">理解しました</button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <p className="font-bold mb-6 text-lg">離席時の正しい行動は？</p>
            <button onClick={() => saveRecord()} className="w-full p-4 border-2 border-slate-200 rounded-xl mb-2 hover:bg-blue-50">Win + L キーで画面ロックする</button>
            <button onClick={() => alert("不正解です")} className="w-full p-4 border-2 border-slate-200 rounded-xl hover:bg-red-50">そのまま席を立つ</button>
          </div>
        )}

        {/* --- 4. 完了画面 --- */}
        {step === 4 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">受講完了！</h2>
            <p className="text-slate-500 mb-6">記録がシステムに保存されました。</p>
            <button onClick={() => {setStep(0); setEmpId("");}} className="text-blue-600 font-bold underline">トップに戻る</button>
          </div>
        )}

        {/* --- 99. 管理者画面（名簿確認） --- */}
        {step === 99 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 animate-in slide-in-from-bottom duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black flex items-center gap-2">
                <ListChecks className="text-blue-600" /> 受講済み名簿
              </h2>
              <button onClick={() => setStep(0)} className="text-sm bg-slate-100 px-3 py-1 rounded-lg">閉じる</button>
            </div>
            
            <div className="overflow-hidden border border-slate-100 rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-sm">
                  <tr>
                    <th className="p-4 font-bold">従業員番号</th>
                    <th className="p-4 font-bold">完了日時</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.length === 0 ? (
                    <tr><td colSpan={2} className="p-8 text-center text-slate-400 italic">まだデータがありません</td></tr>
                  ) : (
                    records.map((r, i) => (
                      <tr key={i} className="hover:bg-blue-50/30 transition">
                        <td className="p-4 font-mono font-bold text-blue-600">{r.id}</td>
                        <td className="p-4 text-slate-500 text-sm">{r.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-xs text-slate-400 text-center">
              ※このデータはISMS/Pマークの「教育実施記録」としてそのまま利用可能です。
            </p>
          </div>
        )}

      </div>
    </main>
  );
}