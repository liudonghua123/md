import { describe, expect, it } from 'vitest'
import { stripSurroundingFence } from './stripFence'

describe(`stripSurroundingFence`, () => {
  it(`strips markdown fence pair`, () => {
    const content = `\`\`\`markdown\n# Title\n\nbody\n\`\`\``
    expect(stripSurroundingFence(content)).toBe(`# Title\n\nbody`)
  })

  it(`strips 4-backtick fence pair`, () => {
    const content = `\`\`\`\`markdown\n# Title\n\n\`\`\`inner\`\`\`\n\`\`\`\``
    expect(stripSurroundingFence(content)).toBe(`# Title\n\n\`\`\`inner\`\`\``)
  })

  it(`strips fences with no language tag`, () => {
    expect(stripSurroundingFence(`\`\`\`\nfoo\n\`\`\``)).toBe(`foo`)
  })

  it(`strips tilde fences`, () => {
    expect(stripSurroundingFence(`~~~md\nfoo\n~~~`)).toBe(`foo`)
  })

  it(`allows longer closing fence than opening`, () => {
    expect(stripSurroundingFence(`\`\`\`md\nfoo\n\`\`\`\``)).toBe(`foo`)
  })

  it(`strips leading and trailing blank lines inside`, () => {
    expect(stripSurroundingFence(`\`\`\`markdown\n\nfoo\n\n\`\`\``)).toBe(`foo`)
  })

  it(`tolerates surrounding whitespace outside the fence`, () => {
    expect(stripSurroundingFence(`  \n\`\`\`markdown\nfoo\n\`\`\`\n  `)).toBe(`foo`)
  })

  it(`returns null when not wrapped`, () => {
    expect(stripSurroundingFence(`# Just markdown\nbody`)).toBeNull()
  })

  it(`returns null when opening fence has no matching closer`, () => {
    expect(stripSurroundingFence(`\`\`\`markdown\nfoo\n\`\`\`\nmore`)).toBeNull()
  })

  it(`returns null when closing fence is shorter (CommonMark rule)`, () => {
    expect(stripSurroundingFence(`\`\`\`\`md\nfoo\n\`\`\``)).toBeNull()
  })

  it(`returns null when fence characters differ`, () => {
    expect(stripSurroundingFence(`\`\`\`md\nfoo\n~~~`)).toBeNull()
  })

  it(`returns null for single line`, () => {
    expect(stripSurroundingFence(`\`\`\`markdown`)).toBeNull()
  })

  it(`returns null for empty or whitespace-only content`, () => {
    expect(stripSurroundingFence(``)).toBeNull()
    expect(stripSurroundingFence(`   \n  `)).toBeNull()
  })
})
