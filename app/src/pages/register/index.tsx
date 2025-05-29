import { useState } from "react";

export const Register = () => {
  const [disable] = useState(true);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-texture">
      <div className="flex flex-col bg-white gap-10 w-[384px] p-4 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text">Bem-vindo{"(a)"} ao</h2>
          <h1 className="title font-bold uppercase">
            Digi<span className="font-normal">prato</span>
          </h1>
        </div>
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-gray-600" htmlFor="">
              Nome
            </label>
            <input
              className="border border-gray-400 w-full h-[56px] rounded-[8px] placeholder:p-3"
              placeholder="Nome do Restaurante"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-gray-600" htmlFor="">
              Telefone
            </label>
            <input
              className="border border-gray-400 w-full h-[56px] rounded-[8px] placeholder:p-3"
              placeholder="Telefone do restaurante"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-gray-600" htmlFor="">
              E-mail
            </label>
            <input
              className="border border-gray-400 w-full h-[56px] rounded-[8px] placeholder:p-3"
              placeholder="Seu E-mail de acesso"
              type="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-gray-600" htmlFor="">
              Senha
            </label>
            <input
              className="border border-gray-400 w-full h-[56px] rounded-[8px] placeholder:p-3"
              placeholder="Informe uma senha"
              type="password"
            />
          </div>

          <div className="flex flex-col gap-2 items-center">
            <button
              className={`w-full rounded-[16px] h-[46px] ${
                disable ? "btn-disable" : "btn-primary"
              }`}
            >
              Criar conta
            </button>
            <span className="text-[13px]">
              Ja tenho conta{" "}
              <a className="text-[var(--color-detail)]" href="/login">
                fazer login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
