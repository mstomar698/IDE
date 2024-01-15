export default async function handler(req: any, res: any) {
    const userInfo = req.body.userInfo;
    const token = userInfo.token; 
    fetch('https://descriptive-bubble-production.up.railway.app/api/code/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(req.body),
    })
    .then((r) => r.json())
    .then((data) => res.end(JSON.stringify(data)))
    .catch((err) =>
      res.end(`[IDE] Error: ${err}
[IDE] Hint: Try re-running`)
    );
  }
  
  export const config = {
    api: {
      externalResolver: true,
    },
  };
  