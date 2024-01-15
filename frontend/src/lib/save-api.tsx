export async function saveCode(
  code: any,
  lang: any,
  stdin = '',
  result: any,
  userInfo: any
) {
  return await fetch('/api/save-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      lang,
      stdin,
      result,
      userInfo,
    }),
  }).then((r) => r.text());
}

export async function fetchSavedCode(userInfo: any) {
  return await fetch('/api/fetch-saved-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userInfo,
    }),
  }).then((r) => r.text());
}
