import { format } from "util"

export async function captureLogs<T>(run: () => Promise<T>): Promise<{ result: T; output: string }> {
  const originalLog = console.log
  const originalWarn = console.warn
  const originalError = console.error
  const lines: string[] = []

  const record = (...args: unknown[]) => {
    const line = format(...args)
    lines.push(line)
    originalLog(...args)
  }

  console.log = record
  console.warn = (...args: unknown[]) => {
    const line = format(...args)
    lines.push(line)
    originalWarn(...args)
  }
  console.error = (...args: unknown[]) => {
    const line = format(...args)
    lines.push(line)
    originalError(...args)
  }

  try {
    const result = await run()
    return { result, output: lines.join("\n") }
  } finally {
    console.log = originalLog
    console.warn = originalWarn
    console.error = originalError
  }
}
