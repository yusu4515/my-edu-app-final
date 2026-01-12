"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [step, setStep] = useState('login'); // login, exam, result
  const [compId, setCompId] = useState('');
  const [empId, setEmpId] = useState('');
  const [score, setScore] = useState(0);

  // ログイン処理（企業IDチェック）
  const handleLogin = async () => {
    const { data } = await supabase
      .from('companies')
      .select('*')
      .eq('company_id', compId)
      .eq('is_active', true)
      .single();

    if (data) {
      setStep('exam');
    } else {
      alert('無効な企業IDです。');
    }
  };

  // 受講完了処理
  const handleComplete = async () => {
    const finalScore = 100; // 本来はクイズの結果を集計
    await supabase.from('exam_results').insert([
      { company_id: compId, emp_number: empId, score: finalScore, status: '合格' }
    ]);
    setScore(finalScore);
    setStep('result');
  };

  return (
    <main className="flex flex-col items-center p-10 font-sans">
      <h1 className="text-2xl font-bold mb-8">情報セキュリティ研修</h1>
      
      {step === 'login' && (
        <div className="flex flex-col gap-4 w-80">
          <input className="border p-2" placeholder="企業ID" onChange={e => setCompId(e.target.value)} />
          <input className="border p-2" placeholder="従業員番号" onChange={e => setEmpId(e.target.value)} />
          <button className="bg-blue-600 text-white p-2 rounded" onClick={handleLogin}>研修を開始する</button>
        </div>
      )}

      {step === 'exam' && (
        <div className="max-w-xl text-left">
          <h2 className="text-xl font-bold mb-4">最新のセキュリティトレンド</h2>
          <p className="mb-4">生成AIの利用時は、機密情報を入力しないように注意が必要です...</p>
          <button className="bg-green-600 text-white p-2 rounded" onClick={handleComplete}>受講完了を記録する</button>
        </div>
      )}

      {step === 'result' && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-green-600">お疲れ様でした！</h2>
          <p className="mt-4">あなたのスコア: {score}点</p>
          <p>受講記録が正常に保存されました。</p>
        </div>
      )}
    </main>
  );
}