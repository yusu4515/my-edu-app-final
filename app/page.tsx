"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TrainingPage() {
  const [companyId, setCompanyId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState("");

  // ログイン処理（企業IDの簡易認証）
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Supabaseの「companies」テーブルに、入力された企業IDが存在するか確認
    const { data, error: dbError } = await supabase
      .from("companies")
      .select("*")
      .eq("company_id", companyId)
      .single();

    if (dbError || !data) {
      setError("無効な企業IDです。正しいIDを入力してください。");
      return;
    }

    if (!employeeId) {
      setError("従業員番号を入力してください。");
      return;
    }

    setIsLoggedIn(true);
  };

  // 受講完了処理
  const handleComplete = async () => {
    const { error: dbError } = await supabase.from("exam_results").insert([
      {
        company_id: companyId,
        employee_id: employeeId,
        score: 100,
        status: "合格",
      },
    ]);

    if (dbError) {
      alert("エラーが発生しました: " + dbError.message);
    } else {
      setIsFinished(true);
    }
  };

  // 1. ログイン画面
  if (!isLoggedIn) {
    return (
      <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
        <h1>情報セキュリティ研修</h1>
        <p>受講を始めるには、会社から配布された情報を入力してください。</p>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label>企業ID:</label>
            <input
              type="text"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value.toUpperCase())}
              placeholder="例: TEST001"
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>従業員番号:</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="例: 12345"
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>
          <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            研修を開始する
          </button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    );
  }

  // 2. 完了画面
  if (isFinished) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>受講完了</h1>
        <p>お疲れ様でした。受講結果は正常に記録されました。</p>
        <p>ブラウザを閉じて終了してください。</p>
      </div>
    );
  }

  // 3. 研修コンテンツ画面
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>【2026年度】情報セキュリティ基礎研修</h1>
      <hr />
      <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
        <h2>セキュリティの基本ルール</h2>
        <ul>
          <li>離席時は必ずPCをロック（Win+L）する。</li>
          <li>不審なメールの添付ファイルは絶対に開かない。</li>
          <li>パスワードは他人に教えず、使い回さない。</li>
        </ul>
        <div style={{ marginTop: "30px", padding: "20px", border: "2px solid #0070f3" }}>
          <h3>ミニテスト</h3>
          <p>Q. 業務中に不審なメールを受信した場合、どうすべきですか？</p>
          <p><strong>A. 開かずに、すぐに情報セキュリティ担当者に報告する。</strong></p>
        </div>
      </div>
      <button
        onClick={handleComplete}
        style={{ marginTop: "40px", padding: "15px 30px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "18px" }}
      >
        研修内容を理解しました（受講完了を記録）
      </button>
    </div>
  );
}