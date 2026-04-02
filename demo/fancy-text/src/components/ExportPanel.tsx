import { useState } from 'react';
import type { FancyStyle } from '../App';
import {
  buildSnippet,
  buildFullPage,
  downloadHTMLFile,
  copyToClipboard,
} from '../utils/exportHTML';

interface Props {
  style: FancyStyle;
  text: string;
}

export function ExportPanel({ style, text }: Props) {
  const [toast, setToast] = useState('');
  const [preview, setPreview] = useState<'snippet' | 'page' | null>(null);

  if (!text) return null;

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  const handleCopySnippet = async () => {
    const ok = await copyToClipboard(buildSnippet(style));
    flash(ok ? '已复制代码片段 ✓' : '复制失败');
  };

  const handleCopyPage = async () => {
    const ok = await copyToClipboard(buildFullPage(style));
    flash(ok ? '已复制完整页面 ✓' : '复制失败');
  };

  const handleDownload = () => {
    downloadHTMLFile(style);
    flash('已下载 ✓');
  };

  const togglePreview = (mode: 'snippet' | 'page') =>
    setPreview(prev => (prev === mode ? null : mode));

  return (
    <div className="export-panel">
      <div className="export-actions">
        <button onClick={handleCopySnippet} title="复制可直接嵌入网页的 HTML + CSS 代码片段">
          📋 复制代码片段
        </button>
        <button onClick={handleCopyPage} title="复制完整 HTML 页面，可保存为 .html 文件">
          📄 复制完整页面
        </button>
        <button onClick={handleDownload} title="下载为 .html 文件">
          📥 下载 HTML
        </button>
        <button
          className={preview ? 'active' : ''}
          onClick={() => togglePreview(preview === 'page' ? 'page' : 'snippet')}
          title="预览生成的代码"
        >
          {'<>'} 预览代码
        </button>
      </div>

      {toast && <div className="export-toast">{toast}</div>}

      {preview && (
        <div className="export-preview">
          <div className="export-tabs">
            <button
              className={preview === 'snippet' ? 'active' : ''}
              onClick={() => setPreview('snippet')}
            >
              代码片段
            </button>
            <button
              className={preview === 'page' ? 'active' : ''}
              onClick={() => setPreview('page')}
            >
              完整页面
            </button>
          </div>
          <pre className="export-code">
            <code>
              {preview === 'snippet' ? buildSnippet(style) : buildFullPage(style)}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
