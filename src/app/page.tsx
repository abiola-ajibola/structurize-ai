"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState<string[][]>([]);
  const [csv, setCsv] = useState("");
  const [csvUrl, setCsvUrl] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/result", {
      body: formData,
      method: "POST",
    });
    const data: { message: string } = await response.json();
    const cleanData = data.message.replace(/```/g, "").replace("csv\n", "");
    setCsv(cleanData);
    const parsed = Papa.parse<string[]>(cleanData, {
      header: false,
      skipEmptyLines: true,
    });
    const result: string[][] = parsed.data;
    setData(result);
  };
  useEffect(() => {
    const url = URL.createObjectURL(new Blob([csv]));
    setCsvUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [csv]);
  return (
    <>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-4 p-8 rounded-xl w-3xl max-w-3xl"
        >
          <h1 className="text-center font-medium text-3xl">
            Structurize AI
          </h1>
          <h2 className="text-center text-lg mb-6">Generate a structured CSV file from unstructured text data</h2>
          <fieldset className="mb-6">
            <legend className="mb-2 font-bold">Unstructured Data input</legend>
            <p className="text-xs mb-4 text-gray-500">
              Upload a text file containing your unstructured data, or type it in the
              textbox below.
            </p>
            <Input className="mb-4" name="input" type="file" accept="text/*" />
            <div className="my-4 text-center">OR</div>
            <Textarea name="input_text" />
          </fieldset>
          <fieldset>
            <legend className="mb-2 font-bold">CSV Headers</legend>
            <p className="text-xs mb-4 text-gray-500">Type in the headers you want your CSV output to have. One per line.</p>
            <Textarea name="schema_text" />
          </fieldset>
          <Button type="submit">Submit</Button>
        </form>
      </div>

      {data.length > 0 && (
        <div className="px-6">
          <h2 className="text-center text-2xl mb-6">Preview</h2>
          <div className="text-right">
            <Link
              href={csvUrl}
              download="Data.csv"
              className="text-xs underline p-6"
            >
              Download CSV
            </Link>
          </div>
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  {data[0].map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 1 && (
              <p className="text-center text-gray-500 py-4 text-sm">
                No data rows to display.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
