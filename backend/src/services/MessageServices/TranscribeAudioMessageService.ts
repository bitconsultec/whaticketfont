import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import AppError from "../../errors/AppError";

type Response = { transcribedText: string } | string;

const TranscribeAudioMessageToText = async (
  fileName: string,
  companyId: number
): Promise<Response> => {
  if (!process.env.OPENAI_API_KEY) {
    console.error("API Key da OpenAI não configurada.");
    return "API Key não configurada.";
  }

  const publicFolder = path.resolve(__dirname, "..", "..", "..", "public");
  const filePath = `${publicFolder}/company${companyId}/${fileName}`;

  if (!fs.existsSync(publicFolder)) {
    console.error(`Pasta pública não encontrada: ${publicFolder}`);
    return "Pasta pública não encontrada";
  }

  if (!fs.existsSync(filePath)) {
    console.error(`Arquivo não encontrado: ${filePath}`);
    return "Arquivo não encontrado";
  }

  try {
    const audioFile = fs.createReadStream(filePath);
    const form = new FormData();
    form.append("file", audioFile);
    form.append("model", "whisper-1");
    form.append("response_format", "text");
    form.append("language", "pt");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        timeout: 30000 // Timeout de 30 segundos
      }
    );

    const transcribedText = response.data;
    if (typeof transcribedText !== "string") {
      console.error("Resposta inesperada da API:", transcribedText);
      return "Erro na resposta da API";
    }

    return { transcribedText };
  } catch (error: any) {
    if (error.response?.data?.error?.code === "insufficient_quota") {
      console.error(
        "Cota insuficiente para usar a API da OpenAI. Verifique seu plano e detalhes de cobrança."
      );
      throw new AppError("ERR_INSUFFICIENT_QUOTA", 500);
    }

    console.error(
      "Erro ao transcrever áudio:",
      error?.response?.data || error.message
    );
    return "Conversão para texto falhou";
  }
};

export default TranscribeAudioMessageToText;
