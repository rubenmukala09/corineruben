// dev-refresh-guard.ts
declare global {
  interface Window {
    $RefreshReg$?: any;
    $RefreshSig$?: any;
  }
}

if (import.meta.env.DEV && typeof window !== 'undefined') {
  if (!window.$RefreshReg$) {
    window.$RefreshReg$ = () => {};
  }
  if (!window.$RefreshSig$) {
    window.$RefreshSig$ = () => (type: any) => type;
  }
}

export {};
