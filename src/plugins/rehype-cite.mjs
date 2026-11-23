// 把內文裡的 [N-T1-1] 或 [N-T1-1, N-T1-2] 轉成指向來源頁的小標籤。
import { visit } from 'unist-util-visit';

const RE = /\[(N-[A-Z0-9]+-\d+(?:\s*[,;]\s*N-[A-Z0-9]+-\d+)*)\]/g;
const base = process.env.CHECK_BUILD ? '' : '/oakland-memorial';

export default function rehypeCite() {
  return (tree, file) => {
    const lang = /[\\/]zh-hant[\\/]/.test(String(file.path ?? '')) ? 'zh-hant' : 'en';
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index == null || !RE.test(node.value)) return;
      RE.lastIndex = 0;
      const parts = [];
      let last = 0, m;
      while ((m = RE.exec(node.value))) {
        if (m.index > last) parts.push({ type: 'text', value: node.value.slice(last, m.index) });
        for (const id of m[1].split(/\s*[,;]\s*/)) {
          parts.push({
            type: 'element', tagName: 'a',
            properties: { className: ['src-ref'], href: `${base}/${lang}/sources/#${id}`, 'aria-label': `${lang === 'en' ? 'Source' : '來源'} ${id}` },
            children: [{ type: 'text', value: id }],
          });
        }
        last = m.index + m[0].length;
      }
      if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) });
      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}
