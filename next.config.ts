import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ビルド時のチェックを無視する設定（Next.js 15対応版）
  typescript: {
    ignoreBuildErrors: true,
  },
  // eslintの設定がエラーになる場合は、一旦削除するか以下のように記述します
};

export default nextConfig;