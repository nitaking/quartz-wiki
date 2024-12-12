// /scripts/set-title.js

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// プロジェクトルートディレクトリのパスを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.join(__dirname, '..');

/**
 * MDファイルのfrontmatterにtitleがない場合、ファイル名をtitleとして追加する
 * @param {string} directory 処理対象のディレクトリパス
 */
async function addMissingTitles(directory) {
  try {
    const files = await findMarkdownFiles(directory);
    if (files.length === 0) {
      console.log('No markdown files found');
      return;
    }

    console.log(`Found ${files.length} markdown files`);
    for (const file of files) {
      await processFile(file);
    }

    console.log('Processing completed successfully');
  } catch (error) {
    console.error('Error in addMissingTitles:', error);
    process.exit(1);
  }
}

/**
 * 指定されたディレクトリから再帰的にMarkdownファイルを検索
 * @param {string} dir 検索対象のディレクトリ
 * @returns {Promise<string[]>} Markdownファイルのパスの配列
 */
async function findMarkdownFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return findMarkdownFiles(fullPath);
        }
        return entry.isFile() && entry.name.endsWith('.md') ? fullPath : [];
      })
    );
    return files.flat();
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

/**
 * 個々のMarkdownファイルを処理
 * @param {string} filePath ファイルパス
 */
async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const { data, content: markdownContent } = matter(content);

    if (!data.title) {
      const title = path.basename(filePath, '.md');
      const newFrontmatter = {
        ...data,
        title
      };

      const newContent = matter.stringify(markdownContent, newFrontmatter);
      await fs.writeFile(filePath, newContent);

      // プロジェクトルートからの相対パスで表示
      const relativePath = path.relative(PROJECT_ROOT, filePath);
      console.log(`✅ Added title '${title}' to ${relativePath}`);
    } else {
      const relativePath = path.relative(PROJECT_ROOT, filePath);
      console.log(`ℹ️ Skipped ${relativePath} (title already exists)`);
    }
  } catch (error) {
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    console.error(`❌ Error processing ${relativePath}:`, error);
  }
}

// コマンドライン引数からターゲットディレクトリを取得
// デフォルトはプロジェクトルートの content ディレクトリ
const targetDirectory = process.argv[2]
  ? path.resolve(PROJECT_ROOT, process.argv[2])
  : path.join(PROJECT_ROOT, 'content');

// ディレクトリの存在確認
try {
  const stats = await fs.stat(targetDirectory);
  if (!stats.isDirectory()) {
    console.error(`Error: ${targetDirectory} is not a directory`);
    process.exit(1);
  }
} catch (error) {
  console.error(`Error: Directory ${targetDirectory} does not exist`);
  process.exit(1);
}

console.log(`Starting to process files in: ${path.relative(PROJECT_ROOT, targetDirectory)}`);
await addMissingTitles(targetDirectory);
