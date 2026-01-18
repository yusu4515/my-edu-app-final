"use client";
import { useState, useEffect } from "react";
import { allQuestions } from "@/data/questions";

export default function TrainingPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [userInfo, setUserInfo] = useState({ empNum: "", companyId: "" });

  useEffect(() => {
    // ログイン情報を取得
    const empNum = localStorage.getItem("current_user") || "不明";
    const companyId = localStorage.getItem("current_company_id") || "UNKNOWN";
    setUserInfo({ empNum, companyId });

    const shuffle = (array: any[]) => {
      const out = [...array];
      for (let i = out.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [out[i], out[r]] = [out[r], out[i]];
      }
      return out;
    };
    setQuestions(shuffle(allQuestions).slice(0, 10));
  }, []);

  const saveResult = (finalScore: number) => {
    const newResult = {
      date: new Date().toLocaleString(),
      employeeNum: userInfo.empNum,
      companyId: userInfo.companyId, // 企業IDを保存！
      score: finalScore,
      total: 10,
    };
    const existingData = JSON.parse(localStorage.getItem("training_results") || "[]");
    localStorage.setItem("training_results", JSON.stringify([...existingData, newResult]));
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const correct = idx === questions[currentIdx].correct;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      saveResult(score); 
      setShowResult(true);
    }
  };

  if (questions.length === 0) return <div className="p-10 text-white text-center">読み込み中...</div>;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {!showResult ? (
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-900">
            <div className="flex justify-between items-center mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold font-mono">
                {userInfo.companyId} / Q {currentIdx + 1}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-8 leading-relaxed">{questions[currentIdx].q}</h2>
            <div className="space-y-4">
              {questions[currentIdx].a.map((txt: string, i: number) => {
                let btnStyle = "border-gray-200 hover:border-blue-400";
                if (selectedAnswer !== null) {
                  if (i === questions[currentIdx].correct) btnStyle = "bg-green-100 border-green-500 text-green-700 ring-2 ring-green-200";
                  else if (i === selectedAnswer) btnStyle = "bg-red-100 border-red-500 text-red-700 ring-2 ring-red-200";
                  else btnStyle = "opacity-40 border-gray-100";
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={selectedAnswer !== null}
                    className={`w-full text-left p-5 border-2 rounded-2xl transition-all duration-200 font-bold ${btnStyle}`}>
                    {txt}
                  </button>
                );
              })}
            </div>
            {selectedAnswer !== null && (
              <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 animate-in fade-in slide-in-from-bottom-2">
                <p className={`text-lg font-black mb-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {isCorrect ? "✅ 正解！" : "❌ 不正解..."}
                </p>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{questions[currentIdx].hint}</p>
                <button onClick={nextQuestion} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg">
                  {currentIdx + 1 === questions.length ? "最終結果を確認" : "次の問題へ"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-1 shadow-2xl overflow-hidden border-8 border-double border-blue-600">
            <div className="bg-white p-10 text-center border-4 border-blue-100 m-1 rounded-2xl">
              <h3 className="text-4xl font-serif font-bold text-slate-800 mb-8 underline decoration-blue-500 underline-offset-8 text-slate-900">修了証</h3>
              <p className="text-slate-600 mb-2">受講者番号</p>
              <p className="text-2xl font-bold text-slate-900 mb-8 italic">{userInfo.empNum} 殿</p>
              <div className="bg-slate-50 p-6 rounded-2xl mb-8">
                <p className="text-5xl font-black text-slate-800 text-slate-900">{score} / 10</p>
                <p className={`mt-3 font-bold ${score >= 8 ? "text-green-600" : "text-red-500"}`}>
                  {score >= 8 ? "★ 合格" : "再受講推奨"}
                </p>
              </div>
              <button onClick={() => window.location.href = '/login'} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">終了</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}