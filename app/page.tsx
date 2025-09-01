'use client';
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <form className="sm:flex-row grid grid-cols-1 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <p key={i} className="text-sm text-gray-500">
          Dummy text {i + 1}
        </p>
      ))}
      <input
        type="text"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="!block w-full border border-gray-300 rounded p-2"
        placeholder="Email"
      />
      
      <input
        type="text"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="!block w-full border border-gray-300 rounded p-2"
        placeholder="Hasło"
      />
      {Array.from({ length: 3 }).map((_, i) => (
          <p key={i} className="text-sm text-gray-500">
            Dummy text {i + 1}
          </p>
        ))}
      <input
        type="text"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Email"
      />
      <input
        type="text"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Hasło"
      />
      {Array.from({ length: 3 }).map((_, i) => (
          <p key={i} className="text-sm text-gray-500">
            Dummy text {i + 1}
          </p>
        ))}
      <input
        type="text"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Email"
      />
      <input
        type="text"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Hasło"
      />{Array.from({ length: 3 }).map((_, i) => (
          <p key={i} className="text-sm text-gray-500">
            Dummy text {i + 1}
          </p>
        ))}
      <input
        type="text"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Email"
      />
      <input
        type="text"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Hasło"
      />
      {Array.from({ length: 30 }).map((_, i) => (
        <p key={i} className="text-sm text-gray-500">
          Dummy text {i + 1}
        </p>
      ))}
      <input
        type="text"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Email"
      />
      <input
        type="text"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Hasło"
      />
    </form>
  );
}