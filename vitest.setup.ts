import "@testing-library/jest-dom"

// Provide a minimal localStorage mock for the test environment
let __STORE__: Record<string, string> = {}

;(globalThis as any).localStorage = {
  getItem: (key: string) => __STORE__[key] ?? null,
  setItem: (key: string, value: string) => {
    __STORE__[key] = String(value)
  },
  removeItem: (key: string) => {
    delete __STORE__[key]
  },
  clear: () => {
    __STORE__ = {}
  },
}

export {}