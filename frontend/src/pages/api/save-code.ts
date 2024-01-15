export default async function handler(req: any, res: any) {

    const userInfo = req.body.userInfo;
    const token = userInfo.token; 
    fetch('https://descriptive-bubble-production.up.railway.app/api/code/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(req.body),
    })
      .then((r) =>
        !r.ok
          ? res.end(`[IDE] Error: server Cannot be reached.`)
          : r
      )
      .then((r) => r.text())
      .then((data) => res.end(data))
      .catch((err) =>
        res.end(`[IDE] Error: ${err}
    [IDE] Hint: Try saving again`)
      );
  }
  
  export const config = {
    api: {
      externalResolver: true,
    },
  };
  