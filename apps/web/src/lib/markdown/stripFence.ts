/**
 * Strip a surrounding code fence wrapping the whole document,
 * e.g. the ```markdown / ````markdown markers added by AI chat output.
 *
 * Returns the inner content, or null when the document is not wrapped
 * in a matching fence pair (per CommonMark, the closing fence must use
 * the same character and be at least as long as the opening one).
 */
export function stripSurroundingFence(content: string): string | null {
  const trimmed = content.trim()
  if (!trimmed)
    return null

  const lines = trimmed.split(/\r?\n/)
  if (lines.length < 2)
    return null

  const openLine = lines[0]!
  const closeLine = lines[lines.length - 1]!

  const openFence = takeFence(openLine)
  if (!openFence)
    return null

  const closeFence = takeFence(closeLine, true)
  if (!closeFence)
    return null

  if (openFence[0] !== closeFence[0] || closeFence.length < openFence.length)
    return null

  const inner = lines.slice(1, -1).join(`\n`)
  return inner.trim()
}

/** Extract a leading fence run (3+ backticks or tildes), or null. */
function takeFence(line: string, bareOnly: boolean): string | null {
  const ch = line[0]
  if (ch !== `\`` && ch !== `~`)
    return null

  let count = 0
  while (line[count] === ch)
    count++
  if (count < 3)
    return null

  const rest = line.slice(count)
  // Closing fences carry no info string (bareOnly); opening ones allow e.g. "markdown".
  if (bareOnly ? rest.trim() !== `` : rest.includes(ch))
    return null

  return line.slice(0, count)
}
