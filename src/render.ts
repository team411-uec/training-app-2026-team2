// 描画層 (render.ts)
// 状態を受け取って画面(DOM)に表示するだけを担当する。
// おみくじを引くロジックは omikuji.ts、ボタンと処理の連携は main.ts が持つ。


// なおちゃんみえますか


import type { OmikujiResult } from "./omikuji";
import { isOmikujiEmpty } from "./omikuji"; // ★ 追加：空かチェックする関数をインポート


// ステップ1（最初の課題）: この関数を実装する。
//
// いまは「引く」ボタンを押すと開発者ツール(F12)の Console に
// 「引いた結果: 大吉」と出るが、画面の文字は変わらない。
// この関数の中身が空だからで、ここに DOM 操作を書けば画面に反映される。
//
// ヒント:
//  - 表示先は index.html の id="result" の要素。document.getElementById で取れる。
//  - 要素の中の文字は textContent で書き換えられる。
//  - result が null のとき（リセット直後など）は初期メッセージを出す。
const resultElement = document.getElementById("result")!;


export function renderResult(result: OmikujiResult | null): void {
  console.log(result);

  // 1. まずは一度「show」クラスを外して、棒を筒の中に戻す
  resultElement.classList.remove("show");

  // 2. ほんの少し（50ミリ秒）待ってから、文字を書き換えて再び飛び出させる
  // ※一度クラスを外してすぐ付けるとアニメーションが発動しないため、setTimeout を使います
  setTimeout(() => {
    if (result !== null) {
      resultElement.textContent = `${result}`;
    } else {
      if (isOmikujiEmpty()) {
        // 棒からはみ出さないように少し短めの文章に変更
        resultElement.textContent = "空っぽです"; 
      } else {
        // リセット直後（初期状態）は文字を空にして、完全に筒の中に隠す
        resultElement.textContent = ""; 
      }
    }

    // 3. 結果が出たとき、または空っぽのときだけ、棒を飛び出させる
    if (result !== null || isOmikujiEmpty()) {
      resultElement.classList.add("show");
    }
  }, 50); 
}
// 拡張ポイント（ステップ2以降）。必要になったら関数を足す。
//  - 履歴をリスト表示する: document.createElement で <li> を作り、<ul id="history"> に足す関数。
//  - 残りくじ枚数を表示する: omikuji.ts に残数を返す関数を足したうえで表示用の関数を足す。
import { Omikujiremaining } from "./omikuji"; // ★ 追加：残り枚数を返す関数をインポート


const remainingElement = document.getElementById("remaining")!;


function updateRemaining(): void {
  if (remainingElement !== null) {
    remainingElement.textContent = `残りくじ枚数: ${Omikujiremaining()}枚`;
  }
}


//ボタンを押したときに自動で残り枚数を更新するようにする
document.getElementById("draw-button")?.addEventListener("click", () => {
  setTimeout(updateRemaining, 0);
});
document.getElementById("reset-button")?.addEventListener("click", () => {
  setTimeout(updateRemaining, 0);
} );


// 初期表示のときに残り枚数を更新する
updateRemaining();
