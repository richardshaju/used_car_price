import { NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';
import path from 'path';
import { promises as fs } from 'fs';

export async function POST(request) {
  const body = await request.json();
  const { input } = body;
  console.log(input);

  const options = {
    scriptPath: path.join(process.cwd(), 'python'),
    args: [input]
  };

  try {
    const result = await new Promise((resolve, reject) => {
      console.log("python is calling");
      
      PythonShell.run('predict.py', options, function (err, result) {
        if (err) reject(err);
        console.log(result);
        
        resolve(result);
      });
    });

    return NextResponse.json({ prediction: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}