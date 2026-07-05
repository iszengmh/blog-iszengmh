/**
 * 从原始 markdown 文本中提取 YAML frontmatter
 *
 * 手动解析而非 gray-matter，避免 YAML 解析错误拖垮整个页面。
 * 只解析我们关心的字段，不对外部文件做完整 YAML 校验。
 */
export function parseFrontmatter(raw: string): Record<string, any> {
  const result: Record<string, any> = {}

  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!match) return result

  const yaml = match[1]

  for (const line of yaml.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) continue

    const key = trimmed.slice(0, colonIdx).trim()
    let value: any = trimmed.slice(colonIdx + 1).trim()

    if (!key) continue
    if (key in result) continue

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1)
        .split(',')
        .map((item: string) => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    } else if (value === 'true') value = true
    else if (value === 'false') value = false
    else value = value.replace(/^['"]|['"]$/g, '')

    result[key] = value
  }

  return result
}
