import React, { useState } from "react";


export const WelcomeView: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [msg, setMsg] = useState<string>("");

  async function requestCode() {
    setMsg("");
    const e = email.trim().toLowerCase();
    if (!e.includes("@")) {
      setMsg("Digite um e-mail válido.");
      return;
    }

    const res = await fetch("/api/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: e }),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setMsg(j?.error || "Erro ao enviar código.");
      return;
    }

    setStep("code");
    setMsg("Código enviado. Verifique seu e-mail.");
  }

  async function verifyCode() {
    setMsg("");
    const e = email.trim().toLowerCase();
    const c = otp.trim();

    if (c.length !== 6) {
      setMsg("O código deve ter 6 dígitos.");
      return;
    }

    const res = await fetch("/api/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: e, code: c }),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setMsg(j?.error || "Código inválido.");
      return;
    }

    setMsg("Logado com sucesso!");
    // força recarregar pra app pegar sessão / estado
    setTimeout(() => window.location.reload(), 600);
  }

  return (
    <div style={{ padding: 16, maxWidth: 420, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>Bem-vindo ao FitScan</h2>
      <p style={{ opacity: 0.8, marginTop: 0, marginBottom: 16 }}>
        Entre com seu e-mail para salvar seus treinos, scans e Premium.
      </p>

      <label style={{ display: "block", marginBottom: 8 }}>
        E-mail
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@dominio.com"
          style={{ width: "100%", padding: 10, marginTop: 6 }}
          disabled={step === "code"}
        />
      </label>

      {step === "email" && (
        <button style={{ width: "100%", padding: 10 }} onClick={requestCode}>
          Receber código
        </button>
      )}

      {step === "code" && (
        <>
          <label style={{ display: "block", marginTop: 12, marginBottom: 8 }}>
            Código (6 dígitos)
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              style={{ width: "100%", padding: 10, marginTop: 6 }}
              inputMode="numeric"
            />
          </label>

          <button style={{ width: "100%", padding: 10 }} onClick={verifyCode}>
            Entrar
          </button>

          <button
            style={{ width: "100%", padding: 10, marginTop: 8, opacity: 0.85 }}
            onClick={() => {
              setStep("email");
              setOtp("");
              setMsg("");
            }}
          >
            Voltar
          </button>
        </>
      )}

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  );
};