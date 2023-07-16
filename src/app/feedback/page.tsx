"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

const initState = {
  name: "",
  email: "",
  message: "",
};
export default function Feedback() {
  const [data, setData] = useState(initState);
  const router = useRouter();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);

    router.push(`/thank-you/`);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const canSave = [...Object.values(data)].every(Boolean);

  const content = (
    <form
      onSubmit={handleSubmit}
      className={"flex flex-col mx-auto max-w-3xl p-6"}
    >
      <h1 className={"text-4xl mb-4"}>Contact Us</h1>

      <label className={"text-2xl mb-1"} htmlFor={"name"}>
        Name:
      </label>
      <input
        className={"p-3 mb-6 text-2xl rounded-2xl text-black"}
        type={"text"}
        name={"name"}
        id={"name"}
        value={data.name}
        onChange={handleChange}
        autoFocus
        placeholder={"Your Name"}
        pattern={"[A-Za-z ]{3,}"}
        required
      />

      <label className={"text-2xl mb-1"} htmlFor={"email"}>
        Email:
      </label>
      <input
        className={"p-3 mb-6 text-2xl rounded-2xl text-black"}
        type={"email"}
        name={"email"}
        id={"email"}
        value={data.email}
        onChange={handleChange}
        placeholder={"Your Email"}
        pattern={"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
      />

      <label className="text-2xl mb-1" htmlFor="message">
        Message:
      </label>
      <textarea
        className="p-3 mb-6 text-2xl rounded-2xl text-black"
        id="message"
        name="message"
        placeholder="Your message here..."
        rows={5}
        cols={33}
        value={data.message}
        onChange={handleChange}
      />

      <button
        className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-xs bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
        disabled={!canSave}
      >
        Submit
      </button>
    </form>
  );

  return content;
}
