import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchSavedCode } from '@/lib/save-api';
import Navbar from '@/components/navbar/navbar';
import '../../styles/globals.css';

interface CodeResponse {
  code: string;
  lang: string;
  stdin: string;
  result: string;
  userId: string;
}

const Code = () => {
  const [savedCode, setSavedCode] = useState<CodeResponse[] | null>(null);
  const router = useRouter();
  let userInfo: any = {};
  const userName = 'John Doe';

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (!userInfo.token) {
      router.push('/');
    }

    fetchSavedCode(userInfo)
      .then((response) => {
        console.log(typeof response);
        console.log('Saved code:', response);
        setSavedCode(JSON.parse(response) as unknown as CodeResponse[]);
      })
      .catch((error) => {
        console.error('Error fetching saved code:', error);
        setSavedCode([]); // Set to an empty array if there is an error
      });
  }, [userInfo.token, router]);

  let savedCodeElements = null;

  if (savedCode === null) {
    // Loading state
    savedCodeElements = <p>Loading...</p>;
  } else if (Array.isArray(savedCode) && savedCode.length > 0) {
    // Display saved code elements
    savedCodeElements = savedCode.map((item: CodeResponse) => (
      <div
        key={item.userId}
        className="text-white flex border border-white/70 rounded-lg flex-col text-xl p-4"
      >
        <div>
          <span>LANG:</span> 
          <span className='text-sm px-4'>{item.lang}</span>
        </div>
        <div>
          CODE: <br />
          <span className='text-sm'>{item.code}</span>
        </div>
        <div>
          STDIN: <br />
          <span className='text-sm'>{item.stdin}</span>
        </div>
        <div>
          RESULT: <br />
          <span className='text-sm'>{item.result}</span>
        </div>
      </div>
    ));
  } else {
    // No saved code or error occurred
    savedCodeElements = <p>No saved code found.</p>;
  }

  return (
    <div className="min-h-screen bg-[#1d1836]">
      <Navbar username={userInfo ? userInfo.name : userName} />
      <div className="flex flex-col justify-center items-center">
        <span className="text-3xl text-purple-500 text-center">
          Saved Codes
        </span>
        <div>{savedCodeElements}</div>
      </div>
    </div>
  );
};

export default Code;
