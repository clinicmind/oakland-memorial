// 把「自我檢核」段落裡的「Answer: X」／「答案：X」與其解釋包進 <details>，沒有 JS 也不會直接劇透。
// 選項（A.–D.）與互動由頁面的 quiz 腳本處理。
import { visit } from 'unist-util-visit';

const textOf = (n) => (n.type === 'text' ? n.value : (n.children ?? []).map(textOf).join(''));
const ANSWER = /^\s*(Answer|答案)\s*[:：]\s*\(?([A-D])\)?/i;

export default function rehypeQuiz() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'li' && node.tagName !== 'ol') return;
      if (node.tagName !== 'li') return;
      const kids = node.children;
      for (let i = 0; i < kids.length; i++) {
        const k = kids[i];
        if (k.type !== 'element' || k.tagName !== 'p') continue;
        const m = ANSWER.exec(textOf(k));
        if (!m) continue;
        // 答案段落，加上緊接著的解釋段落（若有）
        const group = [k];
        // 空白文字節點不算：找下一個元素
        let j = i + 1;
        while (kids[j] && kids[j].type === 'text' && !kids[j].value.trim()) j++;
        const next = kids[j];
        if (next && next.type === 'element' && next.tagName === 'p' && !ANSWER.test(textOf(next))) { group.push(...kids.slice(i + 1, j + 1)); }
        const zh = /答案/.test(m[1]);
        const details = {
          type: 'element', tagName: 'details',
          properties: { className: ['quiz-answer'], 'data-answer': m[2].toUpperCase() },
          children: [
            { type: 'element', tagName: 'summary', properties: {}, children: [{ type: 'text', value: zh ? '顯示答案' : 'Show answer' }] },
            ...group,
          ],
        };
        kids.splice(i, group.length, details);
        break;
      }
    });
  };
}
